import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, Linking } from 'react-native';

export default function Alumni() {
  const demoAlumni = [
    { 
      name: 'Abdullah Jayed', 
      dept: 'CSE', 
      year: '2019', 
      position: 'Software Engineer', 
      company: 'ABC Ltd',
      futureWork: 'Planning to pursue higher studies in AI & Machine Learning.'
    },
    { 
      name: 'Sadia Rahman', 
      dept: 'BBA', 
      year: '2018', 
      position: 'Marketing Manager', 
      company: 'XYZ Corp',
      futureWork: 'Wants to start her own digital marketing agency.'
    },
    { 
      name: 'Ridoy Mojumder', 
      dept: 'CSE', 
      year: '2024', 
      position: 'Intern Developer', 
      company: 'Tech Studio',
      futureWork: 'Aiming to become a senior front-end engineer & build SaaS products.'
    },
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

            {/* Future Work */}
            <Text style={styles.futureTitle}>🔮 Future Work / Plan</Text>
            <Text style={styles.futureText}>{alumni.futureWork}</Text>

            {/* LinkedIn Button */}
            <Pressable 
              style={styles.contactButton}
              onPress={() => Linking.openURL('https://www.linkedin.com')}
            >
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
    backgroundColor: '#FFF8F8',
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

  // Future work style
  futureTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  futureText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
    lineHeight: 20,
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
