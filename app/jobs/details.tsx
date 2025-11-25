import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { jobs } from "../../data/jobs";

export default function JobDetails() {
  const { id } = useLocalSearchParams();
  const job = jobs.find((j) => j.id === id);

  if (!job) return <Text style={styles.notFound}>Job not found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.details}>🕒 Duration: {job.duration}</Text>
        <Text style={styles.details}>📍 Location: {job.location}</Text>
        <Text style={styles.details}>💰 Stipend: {job.stipend}</Text>
        <Text style={styles.details}>⏰ Apply By: {job.deadline}</Text>
      </View>

      {/* Job Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📄 Job Description</Text>
        <Text style={styles.text}>{job.description}</Text>
      </View>

      {/* Company Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏢 Company Overview</Text>
        <Text style={styles.text}>{job.companyOverview}</Text>
      </View>

      {/* Responsibilities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛠️ Responsibilities</Text>
        {job.responsibilities.map((item, idx) => (
          <Text key={idx} style={styles.listItem}>• {item}</Text>
        ))}
      </View>

      {/* Skills Required */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Skills Required</Text>
        {job.skillsRequired.map((skill, idx) => (
          <Text key={idx} style={styles.listItem}>• {skill}</Text>
        ))}
      </View>

      {/* Perks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎁 Perks / Benefits</Text>
        {job.perks.map((perk, idx) => (
          <Text key={idx} style={styles.listItem}>• {perk}</Text>
        ))}
      </View>

      {/* Apply Button */}
      <View style={styles.section}>
        <Pressable style={styles.button} onPress={() => Linking.openURL(job.applyLink)}>
          <Text style={styles.buttonText}>Apply Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#FFF8F8", flexGrow: 1 },
  header: { alignItems: "center", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "800", color: "#ff9a9e", marginBottom: 4, textAlign: "center" },
  company: { fontSize: 16, color: "#444", marginBottom: 6 },
  details: { fontSize: 14, color: "#555", marginBottom: 2 },
  section: { marginTop: 20, backgroundColor: "#fff", borderRadius: 16, padding: 16, shadowColor: "#ff9a9e", shadowOpacity: 0.15, shadowOffset: { width: 0, height: 3 }, shadowRadius: 6, elevation: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#ff9a9e", marginBottom: 8 },
  text: { fontSize: 14, color: "#555", marginBottom: 4 },
  listItem: { fontSize: 14, color: "#555", marginBottom: 2 },
  button: { backgroundColor: "#ff9a9e", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  notFound: { fontSize: 18, textAlign: "center", color: "#ff9a9e", marginTop: 50 },
});
