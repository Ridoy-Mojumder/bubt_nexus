import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ClassRoutine() {
  const routine = [
    { day: 'Monday', subject: 'Mathematics', time: '8:00 AM - 9:30 AM' },
    { day: 'Tuesday', subject: 'Physics', time: '10:00 AM - 11:30 AM' },
    { day: 'Wednesday', subject: 'CSE Lab', time: '9:00 AM - 11:00 AM' },
    { day: 'Thursday', subject: 'English', time: '11:00 AM - 12:30 PM' },
    { day: 'Friday', subject: 'Chemistry', time: '1:00 PM - 2:30 PM' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🕒 Class Routine</Text>
      {routine.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.day}>{item.day}</Text>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text style={styles.time}>{item.time}</Text>
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
  day: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B0E0E6',
  },
  subject: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 4,
  },
  time: {
    fontSize: 14,
    color: '#ccc',
  },
});
