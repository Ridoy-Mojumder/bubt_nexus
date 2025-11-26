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
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/(tabs)"); // Go to Home
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your journey
        </Text>

        {/* Email */}
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Password */}
        <View>
          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry={secure}
              onChangeText={setPassword}
              value={password}
            />

            <TouchableOpacity
              onPress={() => setSecure(!secure)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={secure ? "eye-off" : "eye"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Button */}
        <Pressable
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </Pressable>

        {/* Switch to Signup */}
        <Pressable onPress={() => router.push("/auth/sign-up")}>
          <Text style={styles.switchText}>
            Do not have an account?
            <Text style={styles.link}> Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#ff9a9e",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
    marginTop: 5,
    fontSize: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ff9a9e",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 15,
  },

  button: {
    marginTop: 25,
    backgroundColor: "#ff9a9e",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  switchText: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },

  link: {
    color: "#ff9a9e",
    fontWeight: "700",
  },
});
