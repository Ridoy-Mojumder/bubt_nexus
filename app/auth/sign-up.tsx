import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function SignUp() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width > 700; // show two-column layout on wide screens

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      Alert.alert("Success", "Account created successfully!");
      router.push("/auth/sign-in");
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      Alert.alert("Sign Up Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
          <Text style={styles.title}>📝 Sign Up</Text>
      <View style={[styles.container, isWide && styles.row]}>
          {/* Left Side - Image */}
          {isWide && (
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/all-images/internal-error.png")}
                style={styles.image}
                contentFit="contain"
                transition={300}
              />
            </View>
          )}

        {/* Right Side - Form */}
        <View style={styles.formContainer}>
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

          <Pressable
            style={styles.button}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push("/auth/sign-in")}>
            <Text style={styles.switchText}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 1100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  formContainer: {
    flex: 1,
    // backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 24,
    maxWidth: 500,
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00FFFF",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#00FFFF",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    marginBottom: 14,
  },
  button: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#00FFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#0F172A",
    fontWeight: "700",
  },
  switchText: {
    color: "#B0E0E6",
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
