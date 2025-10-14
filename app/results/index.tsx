import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Results() {
  const results = [
    { subject: 'Mathematics', grade: 'A+', marks: '95/100' },
    { subject: 'Physics', grade: 'A', marks: '90/100' },
    { subject: 'CSE', grade: 'A+', marks: '98/100' },
    { subject: 'English', grade: 'A', marks: '92/100' },
    { subject: 'Chemistry', grade: 'B+', marks: '85/100' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Exam Results</Text>
      {results.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text style={styles.grade}>Grade: {item.grade}</Text>
          <Text style={styles.marks}>Marks: {item.marks}</Text>
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
  subject: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  grade: {
    fontSize: 14,
    color: '#B0E0E6',
  },
  marks: {
    fontSize: 14,
    color: '#ccc',
  },
});
