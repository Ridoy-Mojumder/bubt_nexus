// app/auth/sign-up.tsx
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
} from "firebase/firestore";

type Role = "student" | "teacher" | "admin";

// optional: hard-coded admin secret
const ADMIN_SECRET = "ADMIN-1234";

export default function SignUp() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // common / academic
  const [department, setDepartment] = useState("");

  // student
  const [intake, setIntake] = useState("");
  const [section, setSection] = useState("");

  // teacher
  const [teacherID, setTeacherID] = useState("");
  const [subject, setSubject] = useState("");

  // admin
  const [adminKey, setAdminKey] = useState("");
  const [officeID, setOfficeID] = useState("");

  const resetRoleSpecificFields = () => {
    setIntake("");
    setSection("");
    setTeacherID("");
    setSubject("");
    setAdminKey("");
    setOfficeID("");
    setDepartment("");
  };

  const validateInputs = () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Error", "Please fill the name, email and password fields.");
      return false;
    }

    if (role === "student") {
      if (!intake.trim() || !section.trim() || !department.trim()) {
        Alert.alert(
          "Error",
          "Please provide Intake, Section and Department for student."
        );
        return false;
      }
    }

    if (role === "teacher") {
      if (!teacherID.trim() || !subject.trim() || !department.trim()) {
        Alert.alert(
          "Error",
          "Please provide Teacher ID, Subject and Department for teacher."
        );
        return false;
      }
    }

    if (role === "admin") {
      if (!adminKey.trim() || !officeID.trim()) {
        Alert.alert("Error", "Please provide Admin Secret Key and Office ID.");
        return false;
      }

      if (adminKey.trim() !== ADMIN_SECRET) {
        Alert.alert("Error", "Invalid Admin Secret Key.");
        return false;
      }
    }

    return true;
  };

  // auto student ID: S001, S002, ...
  const generateStudentID = async () => {
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

      // IMPORTANT: field names match UserProfile in AuthContext
      const baseData: any = {
        uid: user.uid,
        fullName: trimmedName,
        email: trimmedEmail,
        role,
        createdAt: new Date().toISOString(),

        // profile image placeholder (can be updated later)
        photoURL: "",
      };

      if (role === "student") {
        baseData.intake = intake.trim();
        baseData.section = section.trim();
        baseData.department = department.trim();
        baseData.studentId = await generateStudentID(); // note: studentId
        console.log("🎓 Generated student ID:", baseData.studentId);
      } else if (role === "teacher") {
        baseData.teacherId = teacherID.trim(); // note: teacherId
        baseData.subject = subject.trim();
        baseData.department = department.trim();
      } else if (role === "admin") {
        baseData.officeId = officeID.trim(); // note: officeId
        baseData.adminSecretKey = adminKey.trim();
      }

      await saveUserToFirestore(user.uid, baseData);
      console.log("✅ User saved to Firestore");

      const msg =
        role === "student"
          ? `Account created! Your Student ID: ${baseData.studentId}`
          : "Account created!";

      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Success", msg);
      }

      console.log("➡️ Navigating to sign-in...");
      router.replace("/auth/sign-in" as Href);
    } catch (err: any) {
      console.log("❌ SignUp Error:", err?.code, err?.message ?? err);
      Alert.alert(
        "Error",
        err?.message ?? "Something went wrong during sign up"
      );
    }
  };

  const RoleButton = ({ r }: { r: Role }) => (
    <Pressable
      onPress={() => {
        setRole(r);
        resetRoleSpecificFields();
      }}
    >
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

      {/* STUDENT FIELDS */}
      {role === "student" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Department (e.g. CSE)"
            onChangeText={setDepartment}
            value={department}
          />
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

      {/* TEACHER FIELDS */}
      {role === "teacher" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Department (e.g. CSE)"
            onChangeText={setDepartment}
            value={department}
          />
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

      {/* ADMIN FIELDS */}
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

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Text style={{ color: "gray" }}>Already have an account? </Text>
        <Text
          style={{ color: "#ff9a9e", fontWeight: "600" }}
          onPress={() => router.push("/auth/sign-in" as Href)}
        >
          Sign In
        </Text>
      </View>
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
  active: {
    backgroundColor: "#ff9a9e",
    color: "#fff",
    borderColor: "#ff9a9e",
  },
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
