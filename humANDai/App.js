import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function App({ apiBase = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000' }) {
  const [status, setStatus] = useState('idle');
  const [response, setResponse] = useState(null);

  const handleSendTest = async () => {
    setStatus('sending');
    setResponse(null);

    try {
      const res = await fetch(`${apiBase}/test-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: 'test message' }),
      });
      const data = await res.json();
      setResponse(data);
      setStatus('received');
    } catch (error) {
      setStatus('error');
      setResponse({ error: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 ooWaa.ai</Text>
      <Text style={styles.subtitle}>The AI reformer</Text>
      <Text style={styles.description}>
        Knows what it doesn't. Teams with you to get it right.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={handleSendTest}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Send Test Message</Text>
      </Pressable>
      <Text style={styles.status}>Status: {status}</Text>
      {response?.type ? (
        <Text style={styles.response}>Response: {response.type}</Text>
      ) : null}
      {response?.error ? (
        <Text style={styles.error}>Error: {response.error}</Text>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    maxWidth: 300,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111827',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  status: {
    marginTop: 12,
    color: '#374151',
  },
  response: {
    marginTop: 6,
    color: '#2563eb',
  },
  error: {
    marginTop: 6,
    color: '#dc2626',
  },
});
