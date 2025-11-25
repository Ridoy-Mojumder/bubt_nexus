import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { events } from "../../data/events";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const event = events.find((e) => e.id === id);

  if (!event) return <Text>Event not found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={event.image} style={styles.image} />
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.details}>📅 {event.date}</Text>
        <Text style={styles.details}>📍 {event.venue}</Text>
        <Text style={styles.desc}>{event.description}</Text>
      </View>

      {/* Speakers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎤 Speakers</Text>
        {event.speakers.map((speaker, idx) => (
          <Text key={idx} style={styles.listItem}>
            • {speaker}
          </Text>
        ))}
      </View>

      {/* Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Highlights</Text>
        {event.highlights.map((highlight, idx) => (
          <Text key={idx} style={styles.listItem}>
            • {highlight}
          </Text>
        ))}
      </View>

      {/* Registration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Registration</Text>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(event.registrationLink)}
        >
          <Text style={styles.buttonText}>Register Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#FFF8F8" },
  header: { alignItems: "center", marginBottom: 20 },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#ff9a9e",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ff9a9e",
    marginBottom: 4,
    textAlign: "center",
  },
  details: { fontSize: 14, color: "#555", marginBottom: 2 },
  desc: { fontSize: 14, color: "#555", textAlign: "center", marginTop: 8 },
  section: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff9a9e",
    marginBottom: 8,
  },
  listItem: { fontSize: 14, color: "#555", marginBottom: 4 },
  button: {
    backgroundColor: "#ff9a9e",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
