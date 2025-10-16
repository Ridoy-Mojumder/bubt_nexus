import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");

export default function Events() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🎉 Upcoming Events</Text>

        {/* Event Cards */}
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

        <View style={styles.card}>
          <Text style={styles.eventTitle}>Annual Sports Meet</Text>
          <Text style={styles.eventDetails}>📅 Date: 15 Dec 2025</Text>
          <Text style={styles.eventDetails}>📍 Venue: University Grounds</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    backgroundColor: '#FFF8F8', // soft off-white with subtle pink tint
    height: height, // এটা হলো 100vh
    width: width, 
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ff9a9e',
    marginBottom: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(255,154,158,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#ff9a9e',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff9a9e',
    marginBottom: 6,
  },
  eventDetails: {
    fontSize: 14,
    color: '#444',
    marginVertical: 2,
  },
});
