import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// Step 2: capture the struggle — seeds the first belief
export default function StruggleScreen() {
  const C = Colors.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <View style={styles.content}>
        <Text style={[styles.question, { color: C.text }]}>
          What's one thing you tell yourself{'\n'}that holds you back?
        </Text>
        <Text style={[styles.hint, { color: C.textMuted }]}>
          Write freely. This is between you and Aether.
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: C.surface, color: C.text, borderColor: C.border }]}
          placeholder="I tell myself that I..."
          placeholderTextColor={C.textMuted}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: C.primary }]}
          onPress={() => router.push('/(onboarding)/belief')}
        >
          <Text style={[styles.buttonText, { color: C.text }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 32, justifyContent: 'center', gap: 20 },
  question: { fontSize: 26, fontWeight: '700', lineHeight: 36 },
  hint: { fontSize: 14 },
  input: { borderRadius: 16, padding: 20, fontSize: 16, borderWidth: 1, minHeight: 140, lineHeight: 24 },
  button: { borderRadius: 100, padding: 18, alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
