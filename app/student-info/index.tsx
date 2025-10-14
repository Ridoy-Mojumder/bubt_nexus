import { View, Text, StyleSheet } from 'react-native';

export default function StudentInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Info</Text>
      <Text style={styles.info}>🎓 Name: Ridoy Mojumder</Text>
      <Text style={styles.info}>📚 Dept: CSE</Text>
      <Text style={styles.info}>🏫 University: BUBT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#101820' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00FFFF', marginBottom: 12 },
  info: { fontSize: 16, color: '#fff', marginVertical: 4 },
});
