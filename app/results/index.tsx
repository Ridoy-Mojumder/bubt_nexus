import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Results() {
  const results = [
    { subject: 'Mathematics', grade: 'A+', marks: '95/100' },
    { subject: 'Physics', grade: 'A', marks: '90/100' },
    { subject: 'CSE', grade: 'A+', marks: '98/100' },
    { subject: 'English', grade: 'A', marks: '92/100' },
    { subject: 'Chemistry', grade: 'B+', marks: '85/100' },
  ];

  const overallGPA = '4.8 / 5.0';
  const bestSubject = 'CSE';
  const improvementSubject = 'Chemistry';

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>📊 Exam Results</Text>

        {/* Overall GPA */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>Overall GPA: {overallGPA}</Text>
          <Text style={styles.summaryText}>Best Subject: {bestSubject}</Text>
          <Text style={styles.summaryText}>Needs Improvement: {improvementSubject}</Text>
        </View>

        {/* Individual Results */}
        {results.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.grade}>Grade: {item.grade}</Text>
            <Text style={styles.marks}>Marks: {item.marks}</Text>
          </View>
        ))}

        {/* Teacher Remarks */}
        <View style={styles.remarksCard}>
          <Text style={styles.remarksTitle}>📝 Teacher Remarks</Text>
          <Text style={styles.remarksText}>
            Excellent performance overall. Focus on Chemistry to improve scores further.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    backgroundColor: '#FFF8F8', // soft off-white with pinkish tint
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
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#ff9a9e',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  summaryText: {
    fontSize: 16,
    color: '#ff9a9e',
    marginVertical: 2,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#ff9a9e',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  subject: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff9a9e',
    marginBottom: 6,
  },
  grade: {
    fontSize: 14,
    color: '#444',
  },
  marks: {
    fontSize: 14,
    color: '#555',
  },
  remarksCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    shadowColor: '#ff9a9e',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  remarksTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ff9a9e',
    marginBottom: 6,
  },
  remarksText: {
    fontSize: 14,
    color: '#555',
  },
});
