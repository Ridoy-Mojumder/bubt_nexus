import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
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

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      // cleanup previous profile listener when user changes
      unsubProfile?.();
      unsubProfile = undefined;

      setLoading(true);
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", firebaseUser.uid);

      // ✅ AUTO-CREATE PROFILE DOC IF MISSING
      try {
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          await setDoc(
            ref,
            {
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? "",
              fullName: firebaseUser.displayName ?? "",
              role: "student", // default role (change if needed)
              createdAt: serverTimestamp(),
            },
            { merge: true }
          );
        }
      } catch (e) {
        // If this fails, it's usually Firestore rules
        console.log("ensure profile error:", e);
      }

      // ✅ REALTIME LISTENER
      unsubProfile = onSnapshot(
        ref,
        (snap) => {
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
          } else {
            setProfile(null);
          }
          setLoading(false);
        },
        (err) => {
          console.log("profile snapshot error:", err);
          setProfile(null);
          setLoading(false);
        }
      );
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
