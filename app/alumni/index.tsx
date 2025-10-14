import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Alumni() {
  const demoAlumni = [
    { name: 'Abdullah Jayed', dept: 'CSE', year: '2019' },
    { name: 'Sadia Rahman', dept: 'BBA', year: '2018' },
    { name: 'Ridoy Mojumder', dept: 'CSE', year: '2024' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👥 Alumni Network</Text>
      {demoAlumni.map((alumni, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{alumni.name}</Text>
          <Text style={styles.details}>{alumni.dept} - Batch {alumni.year}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0F172A' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00FFFF', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#1E293B', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#00FFFF', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, elevation: 3 },
  name: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 4 },
  details: { fontSize: 14, color: '#B0E0E6' },
});
