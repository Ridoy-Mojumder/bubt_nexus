import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
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

const SCREEN_WIDTH = Dimensions.get("window").width;

const Row = ({ label, value }: { label: string; value?: string | null }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value?.toString?.() || "-"}</Text>
  </View>
);

export default function ProfileScreen() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    loadLocalAvatar().then(setAvatarUri).catch(() => setAvatarUri(null));
  }, []);

  useEffect(() => {
    setFullName(profile?.fullName || "");
  }, [profile?.fullName]);

  const role = useMemo(() => (profile?.role ?? "user").toLowerCase(), [profile?.role]);
  const isStudent = role === "student";
  const isTeacher = role === "teacher";
  const isAdmin = role === "admin";

  const handleChangePhoto = async () => {
    try {
      const uri = await pickAndSaveLocalAvatar();
      if (uri) setAvatarUri(uri);
    } catch (e) {
      Alert.alert("Could not change photo");
      console.log(e);
    }
  };

  const handleSaveName = async () => {
    const trimmed = fullName.trim();
    if (!trimmed) {
      Alert.alert("Name cannot be empty");
      return;
    }
    if (!user) return;

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", user.uid), { fullName: trimmed });
      setEditing(false);
    } catch (err) {
      Alert.alert("Error saving name");
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Change this if your auth route is grouped:
      // router.replace("/(auth)/sign-in");
      router.replace("/auth/sign-in");
    } catch (e) {
      Alert.alert("Logout failed");
      console.log(e);
    }
  };

  // 1) Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading profile...</Text>
      </View>
    );
  }

  // 2) Not logged in
  if (!user) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={40} color="#ff7a7a" />
        <Text style={styles.centerTitle}>You are not logged in</Text>
        <Text style={styles.centerDesc}>Please sign in to view your profile.</Text>

        <Pressable
          style={[styles.primaryBtn, { marginTop: 14 }]}
          onPress={() => router.replace("/auth/sign-in")}
        >
          <Text style={styles.primaryBtnText}>Go to Sign In</Text>
        </Pressable>
      </View>
    );
  }

  // 3) User exists but profile doc not ready yet
  // (After you added auto-create in AuthContext, this will show briefly on first login)
  if (!profile) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.centerTitle}>Setting up your profile...</Text>
        <Text style={styles.centerDesc}>
          If this takes too long, check Firestore rules for users/{user.uid}.
        </Text>

        <Pressable style={[styles.secondaryBtn, { marginTop: 14 }]} onPress={() => router.replace("/")}>
          <Text style={styles.secondaryBtnText}>Go Home</Text>
        </Pressable>
      </View>
    );
  }

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
            placeholderTextColor="rgba(255,255,255,0.85)"
            autoCapitalize="words"
            editable={!saving}
          />
        ) : (
          <Text style={styles.name}>{profile.fullName || "Unnamed User"}</Text>
        )}

        <Pressable
          style={[styles.editBtn, saving && { opacity: 0.6 }]}
          disabled={saving}
          onPress={editing ? handleSaveName : () => setEditing(true)}
        >
          <Text style={styles.editBtnText}>
            {saving ? "Saving..." : editing ? "Save Name" : "Edit Name"}
          </Text>
        </Pressable>

        <Text style={styles.role}>
          {(profile.role ?? "USER").toString().toUpperCase()}
        </Text>
      </LinearGradient>

      {/* DETAILS CARD */}
      <View style={styles.card}>
        <Text style={styles.section}>Details</Text>

        <Row label="Email" value={profile.email ?? user.email ?? "-"} />

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

      {/* ACTIONS CARD */}
      <View style={styles.card}>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#ff5a4f" />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: "#FFF8F8",
    flexGrow: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF8F8",
  },
  centerTitle: { marginTop: 10, fontSize: 18, fontWeight: "700", color: "#222" },
  centerDesc: { marginTop: 6, fontSize: 13, color: "#666", textAlign: "center" },

  header: {
    width: "100%",
    paddingVertical: 22,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 18,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 48,
    overflow: "hidden",
  },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  tapText: { fontSize: 12, color: "#fff", marginTop: 6 },

  name: { fontSize: 22, fontWeight: "800", color: "#fff", marginTop: 10 },
  nameInput: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.8)",
    width: SCREEN_WIDTH * 0.7,
    textAlign: "center",
    marginTop: 10,
    paddingVertical: 4,
  },
  editBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  editBtnText: { color: "#fff", fontWeight: "700" },
  role: { fontSize: 13, color: "#fff", marginTop: 8, letterSpacing: 0.5 },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  section: { fontSize: 16, fontWeight: "800", marginBottom: 10, color: "#222" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f1f1f1",
  },
  label: { fontSize: 13, color: "#888" },
  value: { fontSize: 13, fontWeight: "700", color: "#222", maxWidth: "60%" },

  logoutBtn: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#ffe3e3",
    padding: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: { color: "#ff5a4f", fontWeight: "800" },

  primaryBtn: {
    backgroundColor: "#ff9a9e",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  primaryBtnText: { color: "#fff", fontWeight: "800" },

  secondaryBtn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ff9a9e",
  },
  secondaryBtnText: { color: "#ff9a9e", fontWeight: "800" },
});
