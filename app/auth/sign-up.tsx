import { auth } from "@/firebaseConfig";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function SignUp() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width > 700;

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
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
              <Text style={styles.title}>Create Your Account</Text>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
              />
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
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Creating..." : "Sign Up"}
                </Text>
              </Pressable>

              <Pressable onPress={() => router.push("/auth/sign-in")}>
                <Text style={styles.switchText}>
                  Already have an account?{" "}
                  <Text style={styles.linkText}>Sign In</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAF9F6", // soft off-white
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  container: {
    width: "100%",
    maxWidth: 1000,
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
    height: 260,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    maxWidth: 420,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ff9a9e",
    marginBottom: 28,
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
