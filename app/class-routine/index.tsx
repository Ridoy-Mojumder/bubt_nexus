import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ClassRoutine() {
  const routine = [
    { day: 'Monday', subject: 'Mathematics', time: '8:00 AM - 9:30 AM' },
    { day: 'Tuesday', subject: 'Physics', time: '10:00 AM - 11:30 AM' },
    { day: 'Wednesday', subject: 'CSE Lab', time: '9:00 AM - 11:00 AM' },
    { day: 'Thursday', subject: 'English', time: '11:00 AM - 12:30 PM' },
    { day: 'Friday', subject: 'Chemistry', time: '1:00 PM - 2:30 PM' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🕒 Class Routine</Text>

        {routine.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    backgroundColor: '#FFF8F8', // soft off-white with pink tint
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
  day: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff9a9e',
  },
  subject: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginVertical: 4,
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
});
