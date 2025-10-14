import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Jobs() {
  const demoJobs = [
    { title: 'Frontend Developer Intern', company: 'ABC Ltd', duration: '3 months' },
    { title: 'Backend Developer Intern', company: 'XYZ Ltd', duration: '6 months' },
    { title: 'UI/UX Designer', company: 'Creative Studio', duration: '3 months' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💼 Job & Internship</Text>
      {demoJobs.map((job, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.company}>{job.company}</Text>
          <Text style={styles.duration}>{job.duration}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0F172A' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00FFFF', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#1E293B', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#00FFFF', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, elevation: 3 },
  jobTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 4 },
  company: { fontSize: 14, color: '#B0E0E6', marginBottom: 2 },
  duration: { fontSize: 14, color: '#ccc' },
});
