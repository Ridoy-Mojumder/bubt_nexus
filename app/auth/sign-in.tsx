import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCredential.user);

      Alert.alert("Success", "Signed in successfully!");
      router.push("/"); // Redirect to your Home screen
    } catch (error: any) {
      console.error("Sign In Error:", error);
      Alert.alert("Sign In Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔑 Sign In</Text>

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

      <Pressable style={styles.button} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/auth/sign-up")}>
        <Text style={styles.switchText}>Do not have an account? Sign Up</Text>
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
