import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Events() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Upcoming Events</Text>
      <View style={styles.card}>
        <Text style={styles.eventTitle}>Tech Fest 2025</Text>
        <Text style={styles.eventDetails}>📅 Date: 25 Oct 2025</Text>
        <Text style={styles.eventDetails}>📍 Venue: BUBT Auditorium</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.eventTitle}>CSE Project Showcase</Text>
        <Text style={styles.eventDetails}>📅 Date: 10 Nov 2025</Text>
        <Text style={styles.eventDetails}>📍 Venue: Lab 304</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  title: {
    color: '#00FFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#00FFFF',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 6,
  },
  eventDetails: {
    color: '#ccc',
    fontSize: 14,
  },
});
