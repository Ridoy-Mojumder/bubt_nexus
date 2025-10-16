import { auth } from "@/firebaseConfig";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function StudentInfoScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [roll, setRoll] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "Unknown User");
      setUserEmail(user.email || "No Email Found");
    }
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  const handleSave = () => {
    Alert.alert("Info Saved", "Your information has been updated successfully!");
    console.log({
      name: userName,
      email: userEmail,
      department,
      session,
      roll,
      image,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🎓 Student Profile</Text>

        {/* Profile Image */}
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
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.info}>Name: {userName}</Text>
          <Text style={styles.info}>Email: {userEmail}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Department (e.g., CSE)"
            placeholderTextColor="#ff9a9e"
            value={department}
            onChangeText={setDepartment}
          />
          <TextInput
            style={styles.input}
            placeholder="Session (e.g., 2021-2022)"
            placeholderTextColor="#ff9a9e"
            value={session}
            onChangeText={setSession}
          />
          <TextInput
            style={styles.input}
            placeholder="Roll Number"
            placeholderTextColor="#ff9a9e"
            value={roll}
            onChangeText={setRoll}
          />

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>💾 Save Info</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFF8F8", // soft off-white with pink tint
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  container: {
    width: "90%",
    alignItems: "center",
    paddingTop: 40,
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
  },
  uploadText: {
    color: "#ff9a9e",
    fontWeight: "600",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  info: {
    fontSize: 16,
    color: "#444",
    marginVertical: 4,
    fontWeight: "500",
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
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
