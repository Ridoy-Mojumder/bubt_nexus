import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

export default function Auth() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔑 Login / Register</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#B0E0E6" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#B0E0E6" secureTextEntry />
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
  container: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00FFFF', marginBottom: 20 },
  input: { width: '100%', height: 50, borderColor: '#00FFFF', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, color: '#fff', marginBottom: 12 },
  button: { width: '100%', height: 50, borderRadius: 12, backgroundColor: '#00FFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  register: { backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#00FFFF' },
  buttonText: { color: '#0F172A', fontWeight: '700' },
});
