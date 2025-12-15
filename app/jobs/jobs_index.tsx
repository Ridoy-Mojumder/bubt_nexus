import { BackHeader } from "@/src/components/BackHeader";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { jobs } from "../../data/jobs";

export default function Jobs() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackHeader title="" />

      <Text style={styles.title}>💼 Job & Internship Opportunities</Text>

      {jobs.map((job) => (
        <Pressable
          key={job.id}
          style={({ pressed }) => [
            styles.card,
            pressed && { transform: [{ scale: 0.97 }], shadowOpacity: 0.3 },
          ]}
          onPress={() => router.push(`/jobs/${job.id}`)} // ✅ FIX
        >
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.company}>{job.company}</Text>
          <Text style={styles.details}>🕒 Duration: {job.duration}</Text>
          <Text style={styles.details}>📍 Location: {job.location}</Text>
          <Text style={styles.details}>💰 Stipend: {job.stipend}</Text>
          <Text style={styles.details}>⏰ Apply By: {job.deadline}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#FFF8F8" },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ff9a9e",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff9a9e",
    marginBottom: 4,
  },
  company: { fontSize: 14, color: "#444", marginBottom: 4 },
  details: { fontSize: 14, color: "#555", marginVertical: 2 },
});
