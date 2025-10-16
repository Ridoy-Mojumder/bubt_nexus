import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

export default function NoticeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>University Notices 📰</Text>

        {/* Upcoming Notices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Upcoming Notices</Text>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>Midterm Exam starts</Text>
            <Text style={styles.noticeDate}>20 Oct 2025</Text>
          </View>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>Annual Fest</Text>
            <Text style={styles.noticeDate}>12 Nov 2025</Text>
          </View>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>Final Exam Schedule Release</Text>
            <Text style={styles.noticeDate}>5 Dec 2025</Text>
          </View>
        </View>

        {/* Recent Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Recent Updates</Text>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>New Library Books Added</Text>
            <Text style={styles.noticeDate}>10 Oct 2025</Text>
          </View>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>Hostel Maintenance Notice</Text>
            <Text style={styles.noticeDate}>8 Oct 2025</Text>
          </View>
        </View>

        {/* Important Links / Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔗 Important Links</Text>
          <Pressable style={styles.linkCard}>
            <Text style={styles.linkText}>Exam Guidelines</Text>
          </Pressable>
          <Pressable style={styles.linkCard}>
            <Text style={styles.linkText}>Academic Calendar</Text>
          </Pressable>
          <Pressable style={styles.linkCard}>
            <Text style={styles.linkText}>Library Portal</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    backgroundColor: '#FFF8F8', // soft off-white with pinkish hue
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff9a9e',
    marginBottom: 12,
  },
  noticeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#ff9a9e',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  noticeDate: {
    fontSize: 14,
    color: '#ff9a9e',
    marginTop: 4,
  },
  linkCard: {
    backgroundColor: '#ff9a9e22',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  linkText: {
    color: '#ff9a9e',
    fontWeight: '600',
    fontSize: 16,
  },
});
