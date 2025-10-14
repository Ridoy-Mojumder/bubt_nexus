import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Clubs() {
  const clubs = [
    { name: 'Robotics Club', description: '🤖 Learn and build robots' },
    { name: 'Art & Craft Club', description: '🎨 Explore creativity' },
    { name: 'Debate Club', description: '🗣️ Enhance speaking skills' },
    { name: 'Sports Club', description: '🏀 Participate in sports events' },
    { name: 'Cultural Club', description: '🎭 Organize cultural programs' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🤝 Campus Clubs</Text>
      {clubs.map((club, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.clubDesc}>{club.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FFFF',
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
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  clubDesc: {
    fontSize: 14,
    color: '#ccc',
  },
});
