import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed in:", userCredential.user);
      Alert.alert("Success", "Signed in successfully!");
      router.push("/"); // redirect to home
    } catch (error: any) {
      console.error("Sign In Error:", error);
      Alert.alert("Sign In Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back 👋</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </Pressable>

            <Pressable onPress={() => router.push("/auth/sign-up")}>
              <Text style={styles.switchText}>
                Don’t have an account?{" "}
                <Text style={styles.linkText}>Sign Up</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAF9F6", // soft off-white background
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    width: "90%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ff9a9e",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 26,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ff9a9e",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    color: "#333",
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: "#FAFAFA",
  },
  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: "#ff9a9e",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  switchText: {
    color: "#555",
    marginTop: 14,
    textAlign: "center",
    fontSize: 14,
  },
  linkText: {
    color: "#ff9a9e",
    fontWeight: "600",
  },
});
