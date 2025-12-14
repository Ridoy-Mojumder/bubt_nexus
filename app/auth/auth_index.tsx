import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Auth() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔑 Login / Register</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ff9a9e" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#ff9a9e" secureTextEntry />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.register]}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center', padding: 20,  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00FFFF', marginBottom: 20 },
  input: { width: '100%', height: 50, borderColor: '#00FFFF', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, color: '#fff', marginBottom: 12 },
  button: { width: '100%', height: 50, borderRadius: 12, backgroundColor: '#00FFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  register: { backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#00FFFF' },
  buttonText: { color: '#FAFAFA', fontWeight: '700' },
});
