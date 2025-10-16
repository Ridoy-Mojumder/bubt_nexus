import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

export default function Jobs() {
  const demoJobs = [
    { 
      title: 'Frontend Developer Intern', 
      company: 'ABC Ltd', 
      duration: '3 months',
      location: 'Dhaka, Bangladesh',
      stipend: '$150/month',
      deadline: '30 Oct 2025'
    },
    { 
      title: 'Backend Developer Intern', 
      company: 'XYZ Ltd', 
      duration: '6 months',
      location: 'Remote',
      stipend: '$200/month',
      deadline: '15 Nov 2025'
    },
    { 
      title: 'UI/UX Designer', 
      company: 'Creative Studio', 
      duration: '3 months',
      location: 'Chittagong, Bangladesh',
      stipend: '$180/month',
      deadline: '10 Nov 2025'
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>💼 Job & Internship Opportunities</Text>

        {demoJobs.map((job, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.company}>{job.company}</Text>
            <Text style={styles.details}>🕒 Duration: {job.duration}</Text>
            <Text style={styles.details}>📍 Location: {job.location}</Text>
            <Text style={styles.details}>💰 Stipend: {job.stipend}</Text>
            <Text style={styles.details}>⏰ Apply By: {job.deadline}</Text>

            {/* Placeholder button for future functionality */}
            <Pressable style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
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
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff9a9e',
    marginBottom: 6,
  },
  company: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: '#ff9a9e',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
