import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  Platform,
} from "firebase/firestore";

export default function SignUp() {
  const router = useRouter();

  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // student
  const [intake, setIntake] = useState("");
  const [section, setSection] = useState("");

  // teacher
  const [teacherID, setTeacherID] = useState("");
  const [subject, setSubject] = useState("");

  // admin
  const [adminKey, setAdminKey] = useState("");
  const [officeID, setOfficeID] = useState("");

  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Error", "Please fill the name, email and password fields.");
      return false;
    }
    if (role === "teacher" && !teacherID.trim()) {
      Alert.alert("Error", "Please provide Teacher ID.");
      return false;
    }
    if (role === "admin" && !adminKey.trim()) {
      Alert.alert("Error", "Please provide Admin Secret Key.");
      return false;
    }
    return true;
  };

  const generateStudentID = async () => {
    // Simple approach: count existing student users and increment.
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "student"));
    const snap = await getDocs(q);
    const next = snap.size + 1;
    return `S${String(next).padStart(3, "0")}`;
  };

  const saveUserToFirestore = async (uid: string, userData: any) => {
    await setDoc(doc(db, "users", uid), userData);
  };

const handleSignUp = async () => {
  if (!validateInputs()) return;

  setLoading(true);

  try {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    console.log("🔹 Starting signup...");

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      trimmedEmail,
      password
    );
    const user: User = userCredential.user;

    console.log("✅ Firebase auth user created:", user.uid);

    await updateProfile(user, { displayName: trimmedName });
    console.log("✅ Profile updated");

    const baseData: any = {
      name: trimmedName,
      email: trimmedEmail,
      role,
      createdAt: new Date().toISOString(),
    };

    if (role === "student") {
      baseData.intake = intake.trim();
      baseData.section = section.trim();
      baseData.studentID = await generateStudentID();
      console.log("🎓 Generated student ID:", baseData.studentID);
    } else if (role === "teacher") {
      baseData.teacherID = teacherID.trim();
      baseData.subject = subject.trim();
    } else if (role === "admin") {
      baseData.adminKey = adminKey.trim();
      baseData.officeID = officeID.trim();
    }

    await saveUserToFirestore(user.uid, baseData);
    console.log("✅ User saved to Firestore");

    const msg =
      role === "student"
        ? `Account created! Your Student ID: ${baseData.studentID}`
        : "Account created!";

    // 🔻 শুধুই feedback, navigation আলাদাভাবে করব
    if (Platform.OS === "web") {
      window.alert(msg);
    } else {
      Alert.alert("Success", msg);
    }

    console.log("➡️ Navigating to sign-in...");

    // ❗❗ এখানেই main change: সব প্ল্যাটফর্মে direct navigate
    // এখানে PATH টা তোমার ফাইল স্ট্রাকচার অনুযায়ী ঠিক করবে
    router.replace("/auth/sign-in");
    // যদি sign-in screen থাকে app/(auth)/sign-in.tsx এ:
    // router.replace("/(auth)/sign-in");
    // অথবা শুধু app/sign-in.tsx হলে:
    // router.replace("/sign-in");

  } catch (err: any) {
    console.log("❌ SignUp Error:", err?.code, err?.message ?? err);
    Alert.alert(
      "Error",
      err?.message ?? "Something went wrong during sign up"
    );
  } finally {
    console.log("🔚 Signup finished, turning loading off");
    setLoading(false);
  }
};


  const RoleButton = ({ r }: { r: "student" | "teacher" | "admin" }) => (
    <Pressable onPress={() => setRole(r)}>
      <Text style={[styles.option, role === r && styles.active]}>
        {r[0].toUpperCase() + r.slice(1)}
      </Text>
    </Pressable>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.label}>Select Role</Text>
      <View style={styles.dropdown}>
        <RoleButton r="student" />
        <RoleButton r="teacher" />
        <RoleButton r="admin" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {role === "student" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Intake"
            onChangeText={setIntake}
            value={intake}
          />
          <TextInput
            style={styles.input}
            placeholder="Section"
            onChangeText={setSection}
            value={section}
          />
          <Text style={{ marginBottom: 10, color: "gray" }}>
            Student ID will be generated automatically
          </Text>
        </>
      )}

      {role === "teacher" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Teacher ID"
            onChangeText={setTeacherID}
            value={teacherID}
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
            onChangeText={setSubject}
            value={subject}
          />
        </>
      )}

      {role === "admin" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Admin Secret Key"
            onChangeText={setAdminKey}
            value={adminKey}
          />
          <TextInput
            style={styles.input}
            placeholder="Office ID"
            onChangeText={setOfficeID}
            value={officeID}
          />
        </>
      )}

      <Pressable
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Sign Up"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 16, marginBottom: 6 },
  dropdown: { flexDirection: "row", marginBottom: 20, gap: 10 },
  option: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    borderColor: "#ff9a9e",
  },
  active: { backgroundColor: "#ff9a9e", color: "#fff", borderColor: "#ff9a9e" },
  input: {
    borderWidth: 1,
    borderColor: "#ff9a9e",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#ff9a9e",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
