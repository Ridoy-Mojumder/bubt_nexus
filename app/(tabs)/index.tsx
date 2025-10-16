import React from "react";
import { Pressable, StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    { title: "Student Info", route: "/student-info", image: require("../../assets/images/home-page-images/student-info.png") },
    { title: "Notice Board", route: "/notice", image: require("../../assets/images/home-page-images/notice.png") },
    { title: "Events", route: "/events", image: require("../../assets/images/home-page-images/events.png") },
    { title: "Class Routine", route: "/class-routine", image: require("../../assets/images/home-page-images/routine.png") },
    { title: "Clubs & Activities", route: "/clubs", image: require("../../assets/images/home-page-images/clubs.png") },
    { title: "Results", route: "/results", image: require("../../assets/images/home-page-images/results.png") },
    { title: "Job & Internship", route: "/jobs", image: require("../../assets/images/home-page-images/jobs.png") },
    { title: "Alumni Network", route: "/alumni", image: require("../../assets/images/home-page-images/alumni.png") },
    { title: "Authentication", route: "/auth/sign-in", image: require("../../assets/images/home-page-images/authentication.png") },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#ffecd2", "#fcb69f", "#ff9a9e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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
              pressed && { transform: [{ scale: 0.97 }], shadowOpacity: 0.4 },
            ]}
            onPress={() => router.push(item.route)}
          >
            <Image source={item.image} style={styles.featureImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </Pressable>
        ))}

        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F8" }, // soft off-white

  header: {
    paddingVertical: 50,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10,
  },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 18,
    padding: 16,
    paddingBottom: 50,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  featureImage: {
    width: 55,
    height: 55,
    marginBottom: 12,
    resizeMode: "contain",
  },
  cardTitle: {
    color: "#ff9a9e",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

});
