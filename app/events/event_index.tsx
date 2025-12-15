import { BackHeader } from "@/src/components/BackHeader";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { events } from "../../data/events";

export default function Events() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackHeader title="" />

      <Text style={styles.title}>🎉 Upcoming Events</Text>

      {events.map((event) => (
        <Pressable
          key={event.id}
          style={({ pressed }) => [
            styles.card,
            pressed && { transform: [{ scale: 0.97 }], shadowOpacity: 0.3 },
          ]}
          onPress={() => router.push(`/events/${event.id}`)} // ✅ FIX
        >
          <Image source={event.image} style={styles.image} />
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDetails}>📅 Date: {event.date}</Text>
          <Text style={styles.eventDetails}>📍 Venue: {event.venue}</Text>
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
  image: { width: 60, height: 60, borderRadius: 0, marginBottom: 8 },
  eventTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff9a9e",
    marginBottom: 4,
  },
  eventDetails: { fontSize: 14, color: "#444", marginVertical: 2 },
});
