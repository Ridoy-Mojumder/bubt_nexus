import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set displayName
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      Alert.alert("Success", "Account created successfully!");
      router.push("/auth/sign-in"); // Redirect to Sign In
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      Alert.alert("Sign Up Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#B0E0E6"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0E0E6"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B0E0E6"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/auth/sign-in")}>
        <Text style={styles.switchText}>Already have an account? Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00FFFF",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#00FFFF",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    marginBottom: 12,
    maxWidth: 600,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "#00FFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    maxWidth: 600,
  },
  buttonText: { color: "#0F172A", fontWeight: "700" },
  switchText: {
    color: "#B0E0E6",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});
