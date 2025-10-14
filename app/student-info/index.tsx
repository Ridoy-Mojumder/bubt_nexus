import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { auth } from "@/firebaseConfig";

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

        <View style={styles.card}>
          <Text style={styles.info}>👤 Name: {userName}</Text>
          <Text style={styles.info}>📧 Email: {userEmail}</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Department (e.g., CSE)"
            placeholderTextColor="#B0E0E6"
            value={department}
            onChangeText={setDepartment}
          />
          <TextInput
            style={styles.input}
            placeholder="Session (e.g., 2021-2022)"
            placeholderTextColor="#B0E0E6"
            value={session}
            onChangeText={setSession}
          />
          <TextInput
            style={styles.input}
            placeholder="Roll Number"
            placeholderTextColor="#B0E0E6"
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
    backgroundColor: "#0F172A",
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#00FFFF",
    marginBottom: 24,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#00FFFF",
    marginBottom: 10,
  },
  uploadButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#00FFFF33",
    borderRadius: 12,
  },
  uploadText: {
    color: "#00FFFF",
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  info: {
    fontSize: 16,
    color: "#E0F2FE",
    marginVertical: 4,
  },
  form: {
    width: "100%",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: "#00FFFF",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#00FFFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 16,
  },
});
