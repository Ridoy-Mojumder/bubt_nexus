import React from "react";
import { Pressable, StyleSheet, View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    { title: "Student Info", route: "/student-info", emoji: "🎓" },
    { title: "Notice Board", route: "/notice", emoji: "📜" },
    { title: "Events", route: "/events", emoji: "🎉" },
    { title: "Class Routine", route: "/class-routine", emoji: "🕒" },
    { title: "Clubs & Activities", route: "/clubs", emoji: "🤝" },
    { title: "Results", route: "/results", emoji: "📊" },
    { title: "Job & Internship", route: "/jobs", emoji: "💼" },
    { title: "Alumni Network", route: "/alumni", emoji: "👥" },
    { title: "Authentication", route: "/auth/sign-in", emoji: "🔑" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#0F2027", "#203A43", "#2C5364"]}
        style={styles.header}
      >
        <Image
            source={require("../../assets/images/all-images/logo.png")} 
            style={styles.profileImage}
          />
        <Text style={styles.headerTitle}>BUBT Nexus</Text>
        <Text style={styles.headerSubtitle}>Your Campus, All in One App</Text>
      </LinearGradient>

      {/* Features Grid */}
      <ScrollView
        contentContainerStyle={styles.cardGrid}
        showsVerticalScrollIndicator={false}
      >
        {features.map((item) => (
          <Pressable
            key={item.route}
            style={({ pressed }) => [
              styles.card,
              pressed && { transform: [{ scale: 0.97 }], shadowOpacity: 0.5 },
            ]}
            onPress={() => router.push(item.route)}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A",},
  header: {
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00FFFF",
    marginBottom: 6,
  },
  headerSubtitle: { fontSize: 14, color: "#B0E0E6", textAlign: "center" },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    padding: 10,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    shadowColor: "#00FFFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  emoji: { fontSize: 36, marginBottom: 10 },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
