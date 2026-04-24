import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// Step 3: name the belief + generate first new_story
// Sprint 1: form capture only. Sprint 2: Aether reflects back, names together.
export default function BeliefScreen() {
  const C = Colors.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <View style={styles.content}>
        <Text style={[styles.label, { color: C.textMuted }]}>The old story</Text>
        <Text style={[styles.question, { color: C.text }]}>
          Name the belief we're rewriting.
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: C.surface, color: C.text, borderColor: C.border }]}
          placeholder="I am not..."
          placeholderTextColor={C.textMuted}
          multiline
        />

        <Text style={[styles.label, { color: C.textMuted }]}>The new story</Text>
        <Text style={[styles.hint, { color: C.textSecondary }]}>
          Who are you becoming? Write it in the present tense.
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: C.surface, color: C.text, borderColor: C.border }]}
          placeholder="I am becoming someone who..."
          placeholderTextColor={C.textMuted}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: C.primary }]}
          onPress={() => router.push('/(onboarding)/notifications')}
        >
          <Text style={[styles.buttonText, { color: C.text }]}>This is my story</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 32, justifyContent: 'center', gap: 12 },
  label: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  question: { fontSize: 24, fontWeight: '700', lineHeight: 32, marginBottom: 4 },
  hint: { fontSize: 14, marginBottom: 4 },
  input: { borderRadius: 16, padding: 16, fontSize: 16, borderWidth: 1, minHeight: 80, lineHeight: 24 },
  button: { borderRadius: 100, padding: 18, alignItems: 'center', marginTop: 16 },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
