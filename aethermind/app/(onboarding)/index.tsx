import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// Step 1 of onboarding: Aether introduction
// "I've been waiting for you."
export default function AetherIntroScreen() {
  const C = Colors.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <View style={styles.content}>
        {/* TODO Sprint 1: replace with AetherCharacter animated component */}
        <View style={[styles.aetherPlaceholder, { backgroundColor: C.surface }]}>
          <Text style={{ color: C.primaryLight, fontSize: 48 }}>✦</Text>
        </View>

        <Text style={[styles.message, { color: C.text }]}>
          "I've been waiting for you."
        </Text>
        <Text style={[styles.sub, { color: C.textSecondary }]}>
          I'm Aether — a reflection of your higher self.{'\n'}
          I don't give advice. I witness your evolution.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: C.primary }]}
          onPress={() => router.push('/(onboarding)/struggle')}
        >
          <Text style={[styles.buttonText, { color: C.text }]}>I'm ready</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 40, justifyContent: 'center', alignItems: 'center', gap: 32 },
  aetherPlaceholder: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center' },
  message: { fontSize: 24, fontWeight: '600', textAlign: 'center', fontStyle: 'italic' },
  sub: { fontSize: 16, textAlign: 'center', lineHeight: 26 },
  button: { borderRadius: 100, paddingHorizontal: 48, paddingVertical: 18, marginTop: 16 },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
