import React from "react";
import { ScrollView, View, Text, StyleSheet, Image, Pressable, Linking } from "react-native";
import { alumniData } from '../../data/alumniData';

type Props = { route: any; navigation: any };

export default function AlumniProfile({ route, navigation }: Props) {
  const { alumniId } = route.params;
  const alumni = alumniData.find(a => a.id === alumniId);

  if (!alumni) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Alumni not found</Text>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: alumni.photo }} style={styles.photo} />
      <Text style={styles.name}>{alumni.name}</Text>
      <Text style={styles.details}>{alumni.dept} - Batch {alumni.year}</Text>
      <Text style={styles.details}>🏢 {alumni.position} @ {alumni.company}</Text>

      <Text style={styles.futureTitle}>🔮 Future Work / Plan</Text>
      <Text style={styles.futureText}>{alumni.futureWork}</Text>

      <Text style={styles.skillsTitle}>💡 Skills</Text>
      <View style={styles.skillsContainer}>
        {alumni.skills.map((skill, i) => (
          <Text key={i} style={styles.skillBadge}>{skill}</Text>
        ))}
      </View>

      <Pressable
        style={styles.contactButton}
        onPress={() => Linking.openURL(alumni.linkedin)}
      >
        <Text style={styles.contactButtonText}>Connect via LinkedIn</Text>
      </Pressable>

      <Pressable
        style={[styles.contactButton, { backgroundColor: "#333", marginTop: 10 }]}
        onPress={() => Linking.openURL(`mailto:${alumni.email}`)}
      >
        <Text style={styles.contactButtonText}>Send Email</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center", backgroundColor: "#FFF8F8", minHeight: "100vh" },
  photo: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: "700", color: "#ff9a9e", marginBottom: 4 },
  details: { fontSize: 14, color: "#555", marginVertical: 2 },
  futureTitle: { marginTop: 15, fontSize: 16, fontWeight: "700", color: "#333" },
  futureText: { fontSize: 14, color: "#666", marginVertical: 4, lineHeight: 20, textAlign: "center" },
  skillsTitle: { marginTop: 15, fontSize: 15, fontWeight: "700", color: "#333" },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 5, gap: 5 },
  skillBadge: { backgroundColor: "#ff9a9e", color: "#fff", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, fontSize: 12, margin: 2 },
  contactButton: { marginTop: 15, backgroundColor: "#ff9a9e", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12, alignItems: "center" },
  contactButtonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  notFound: { flex: 1, justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#FFF8F8" },
  notFoundText: { fontSize: 18, fontWeight: "700", color: "#ff9a9e", marginBottom: 15 },
  backButton: { backgroundColor: "#ff9a9e", paddingVertical: 10, paddingHorizontal: 25, borderRadius: 10 },
  backButtonText: { color: "#fff", fontWeight: "700" },
});
