import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

export default function Alumni() {
  const demoAlumni = [
    { name: 'Abdullah Jayed', dept: 'CSE', year: '2019', position: 'Software Engineer', company: 'ABC Ltd' },
    { name: 'Sadia Rahman', dept: 'BBA', year: '2018', position: 'Marketing Manager', company: 'XYZ Corp' },
    { name: 'Ridoy Mojumder', dept: 'CSE', year: '2024', position: 'Intern Developer', company: 'Tech Studio' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>👥 Alumni Network</Text>

        {demoAlumni.map((alumni, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{alumni.name}</Text>
            <Text style={styles.details}>{alumni.dept} - Batch {alumni.year}</Text>
            <Text style={styles.details}>🏢 {alumni.position} @ {alumni.company}</Text>

            {/* Placeholder for future contact / LinkedIn */}
            <Pressable style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact / LinkedIn</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    backgroundColor: '#FFF8F8', // soft off-white
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
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff9a9e',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  contactButton: {
    marginTop: 10,
    backgroundColor: '#ff9a9e',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
