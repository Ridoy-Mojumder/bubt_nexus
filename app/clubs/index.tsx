import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
const { height, width } = Dimensions.get("window");

export default function Clubs() {
  const clubs = [
    { name: 'Robotics Club', description: '🤖 Learn and build robots' },
    { name: 'Art & Craft Club', description: '🎨 Explore creativity' },
    { name: 'Debate Club', description: '🗣️ Enhance speaking skills' },
    { name: 'Sports Club', description: '🏀 Participate in sports events' },
    { name: 'Cultural Club', description: '🎭 Organize cultural programs' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🤝 Campus Clubs</Text>

        {clubs.map((club, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.clubName}>{club.name}</Text>
            <Text style={styles.clubDesc}>{club.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    backgroundColor: '#FFF8F8', // soft off-white with pinkish tint
    height: height,
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
  clubName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff9a9e',
    marginBottom: 6,
  },
  clubDesc: {
    fontSize: 14,
    color: '#555',
  },
});
