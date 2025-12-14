import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserProfile = {
  uid: string;
  fullName: string;
  email: string;
  role: "student" | "teacher" | "admin";

  studentId?: string;
  department?: string;
  intake?: string;
  section?: string;

  teacherId?: string;
  subject?: string;

  officeId?: string;
};

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubProfile: (() => void) | undefined;

    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", firebaseUser.uid);

      unsubProfile = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          setProfile({
            uid: firebaseUser.uid,
            ...(snap.data() as Omit<UserProfile, "uid">),
          });
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
    });

    return () => {
      unsubAuth();
      unsubProfile?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
