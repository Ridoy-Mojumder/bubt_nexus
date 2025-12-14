import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { auth, db } from "@/firebaseConfig";
import { useAuth } from "@/src/context/AuthContext";
import {
  loadLocalAvatar,
  pickAndSaveLocalAvatar,
} from "@/src/utils/localAvatar";
import { doc, updateDoc } from "firebase/firestore";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ProfileScreen() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [editing, setEditing] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    loadLocalAvatar().then(setAvatarUri);
  }, []);

  useEffect(() => {
    if (profile) setFullName(profile.fullName || "");
  }, [profile]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user || !profile) {
    return (
      <View style={styles.center}>
        <Text>No profile found</Text>
      </View>
    );
  }

  const handleChangePhoto = async () => {
    const uri = await pickAndSaveLocalAvatar();
    if (uri) setAvatarUri(uri);
  };

  const handleSaveName = async () => {
    if (!fullName.trim()) {
      Alert.alert("Name cannot be empty");
      return;
    }
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), { fullName });
      setEditing(false);
    } catch (err) {
      Alert.alert("Error saving name");
      console.log(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/auth/sign-in");
  };

  const isStudent = profile.role === "student";
  const isTeacher = profile.role === "teacher";
  const isAdmin = profile.role === "admin";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#ffecd2", "#fcb69f", "#ff9a9e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Pressable onPress={handleChangePhoto} style={styles.avatarWrapper}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle" size={96} color="#fff" />
          )}
        </Pressable>
        <Text style={styles.tapText}>Tap to change photo</Text>

        {editing ? (
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.nameInput}
            placeholder="Enter name"
            placeholderTextColor="#fff"
          />
        ) : (
          <Text style={styles.name}>{fullName}</Text>
        )}

        <Pressable
          style={styles.editBtn}
          onPress={editing ? handleSaveName : () => setEditing(true)}
        >
          <Text style={styles.editBtnText}>
            {editing ? "Save Name" : "Edit Name"}
          </Text>
        </Pressable>
        <Text style={styles.role}>{profile.role.toUpperCase()}</Text>
      </LinearGradient>

      {/* DETAILS CARD */}
      <View style={styles.card}>
        <Text style={styles.section}>Details</Text>
        <Row label="Email" value={profile.email} />
        {isStudent && (
          <>
            <Row label="Student ID" value={profile.studentId} />
            <Row label="Department" value={profile.department} />
            <Row label="Intake" value={profile.intake} />
            <Row label="Section" value={profile.section} />
          </>
        )}
        {isTeacher && (
          <>
            <Row label="Teacher ID" value={profile.teacherId} />
            <Row label="Department" value={profile.department} />
            <Row label="Subject" value={profile.subject} />
          </>
        )}
        {isAdmin && <Row label="Office ID" value={profile.officeId} />}
      </View>

      {/* LOGOUT CARD */}
      <View style={styles.card}>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: "#FFF8F8",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },

  header: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 48,
    overflow: "hidden",
  },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  tapText: { fontSize: 12, color: "#fff", marginTop: 4 },

  name: { fontSize: 22, fontWeight: "700", color: "#fff", marginTop: 6 },
  nameInput: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.7)",
    width: SCREEN_WIDTH * 0.5,
    textAlign: "center",
    marginTop: 6,
  },
  editBtn: {
    backgroundColor: "#ff9a9e",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  editBtnText: { color: "#fff", fontWeight: "600" },
  role: { fontSize: 14, color: "#fff", marginTop: 4 },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },

  section: { fontSize: 16, fontWeight: "600", marginBottom: 8 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  label: { fontSize: 13, color: "#888" },
  value: { fontSize: 14, fontWeight: "500" },

  logoutBtn: {
    backgroundColor: "#ffe3e3",
    padding: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  logoutText: { color: "#ff5a4f", fontWeight: "600" },
});
