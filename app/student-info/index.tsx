import { auth, db } from "@/firebaseConfig";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function StudentInfoScreen() {
  const user = auth.currentUser; // 🔹 direct access

  const [userName, setUserName] = useState<string | null>(user?.displayName ?? null);
  const [userEmail, setUserEmail] = useState<string | null>(user?.email ?? null);

  // signup theke ashar field
  const [studentId, setStudentId] = useState<string | null>(null);
  const [intake, setIntake] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // editable extra info
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [roll, setRoll] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [initialLoading, setInitialLoading] = useState(true); // শুধু data fetch er jonno
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        if (!user) {
          setInitialLoading(false);
          return;
        }

        console.log("🔹 StudentInfoScreen: loading Firestore user doc for uid:", user.uid);

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data() as any;
          console.log("✅ Firestore data:", data);

          setRole(data.role ?? null);
          setStudentId(data.studentID ?? null);
          setIntake(data.intake ?? null);
          setSection(data.section ?? null);

          setDepartment(data.department ?? "");
          setSession(data.session ?? "");
          setRoll(data.roll ?? "");

          const photo = data.photoURL ?? (user as any)?.photoURL ?? null;
          if (photo) {
            setImage(photo);
          }
        } else {
          console.log("⚠️ No user doc found in Firestore, showing only auth info");
          const photo = (user as any)?.photoURL ?? null;
          if (photo) setImage(photo);
        }
      } catch (error) {
        console.log("❌ StudentInfoScreen load error:", error);
        Alert.alert("Error", "Failed to load your profile information.");
      } finally {
        setInitialLoading(false);
      }
    };

    load();
  }, [user]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Please allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!user) {
      Alert.alert("Error", "No logged-in user found.");
      return;
    }

    try {
      setSaving(true);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        department: department.trim(),
        session: session.trim(),
        roll: roll.trim(),
        photoURL: image ?? null,
      });

      Alert.alert("Info Saved", "Your information has been updated successfully!");
      console.log("✅ Saved profile:", {
        name: userName,
        email: userEmail,
        studentId,
        intake,
        section,
        department,
        session,
        roll,
        image,
      });
    } catch (error) {
      console.log("❌ Save student info error:", error);
      Alert.alert("Error", "Failed to save your information.");
    } finally {
      setSaving(false);
    }
  };

  // jodi kono login na thake
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "#ff4f6a", fontSize: 16, fontWeight: "600" }}>
          No student logged in.
        </Text>
        <Text style={{ color: "#777", marginTop: 4 }}>
          Please sign in first.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🎓 Student Profile</Text>

        {/* Profile Image + Name */}
        <View style={styles.profileSection}>
          <Image
            source={
              image
                ? { uri: image }
                : require("@/assets/images/all-images/user-profile.png")
            }
            style={styles.profileImage}
            contentFit="cover"
          />
          <Pressable style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadText}>Upload Image</Text>
          </Pressable>

          <Text style={styles.nameText}>{userName || "Unknown User"}</Text>
          <Text style={styles.emailText}>{userEmail || "No Email"}</Text>
        </View>

        {/* jodi data load hocche, small indicator */}
        {initialLoading && (
          <View style={{ marginBottom: 16, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#ff9a9e" />
            <Text style={{ marginTop: 4, color: "#ff9a9e" }}>
              Loading academic info...
            </Text>
          </View>
        )}

        {/* Student Info Card */}
        <View style={styles.card}>
          <View style={styles.badgeRow}>
            {role && (
              <View style={[styles.badge, { backgroundColor: "#ff9a9e22" }]}>
                <Text style={styles.badgeText}>{role.toUpperCase()}</Text>
              </View>
            )}
            {studentId && (
              <View style={[styles.badge, { backgroundColor: "#ffe0e6" }]}>
                <Text style={styles.badgeText}>ID: {studentId}</Text>
              </View>
            )}
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Intake</Text>
              <Text style={styles.infoValue}>{intake || "-"}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Section</Text>
              <Text style={styles.infoValue}>{section || "-"}</Text>
            </View>
          </View>
        </View>

        {/* Editable Academic Info */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Academic Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Department (e.g., CSE)"
            placeholderTextColor="#ffb8bc"
            value={department}
            onChangeText={setDepartment}
          />
          <TextInput
            style={styles.input}
            placeholder="Session (e.g., 2021-2022)"
            placeholderTextColor="#ffb8bc"
            value={session}
            onChangeText={setSession}
          />
          <TextInput
            style={styles.input}
            placeholder="Roll Number"
            placeholderTextColor="#ffb8bc"
            value={roll}
            onChangeText={setRoll}
          />

          <Pressable
            style={[styles.saveButton, saving && { opacity: 0.7 }]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? "Saving..." : "💾 Save Info"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFF8F8",
    alignItems: "center",
    paddingBottom: 40,
  },
  container: {
    width: "92%",
    alignItems: "center",
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFF8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ff9a9e",
    marginBottom: 24,
    textShadowColor: "rgba(255, 154, 158, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#ff9a9e",
    marginBottom: 10,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  uploadButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#ff9a9e22",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ff9a9e44",
    marginBottom: 8,
  },
  uploadText: {
    color: "#ff9a9e",
    fontWeight: "600",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 4,
  },
  emailText: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ff4f6a",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff7b88",
    marginBottom: 14,
  },
  input: {
    height: 50,
    borderColor: "#ff9a9e",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#333",
    marginBottom: 14,
    backgroundColor: "#FFF9FA",
  },
  saveButton: {
    backgroundColor: "#ff9a9e",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
