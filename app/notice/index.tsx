import { View, Text, StyleSheet } from 'react-native';

export default function NoticeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>University Notices 📰</Text>
      <Text style={styles.notice}>📅 Midterm Exam starts: 20 Oct 2025</Text>
      <Text style={styles.notice}>🎉 Annual Fest: 12 Nov 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#101820' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00FFFF', marginBottom: 12 },
  notice: { fontSize: 16, color: '#fff', marginVertical: 4 },
});
