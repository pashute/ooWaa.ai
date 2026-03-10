import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 ooWaa.ai</Text>
      <Text style={styles.subtitle}>The AI reformer</Text>
      <Text style={styles.description}>
        Knows what it doesn't. Teams with you to get it right.
      </Text>
      {/* Todo: For testing only. The actual new chat will be defined in the dashboard features */}
      <TouchableOpacity style={styles.newChatButton} testID="new-chat-button">
        <Text style={styles.newChatText}>New Chat</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

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
  newChatButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  newChatText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
