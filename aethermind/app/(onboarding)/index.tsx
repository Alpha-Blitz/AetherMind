import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';

const INTENT_OPTIONS = [
  { id: 'limiting_belief', label: 'Break free from a limiting belief' },
  { id: 'patterns', label: 'Understand my patterns' },
  { id: 'new_identity', label: 'Build a new identity' },
  { id: 'becoming', label: 'Become who I want to be' },
];

export default function IntentScreen() {
  const [selected, setSelected] = useState('');

  function handleContinue() {
    onboardingData.intent = selected;
    router.push('/(onboarding)/struggle');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.step}>1 of 6</Text>
          <Text style={styles.title}>Why are you here?</Text>
          <Text style={styles.sub}>Choose what resonates most right now.</Text>
        </View>

        <View style={styles.options}>
          {INTENT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.card, selected === opt.id && styles.cardSelected]}
              onPress={() => setSelected(opt.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.dot, selected === opt.id && styles.dotSelected]} />
              <Text style={[styles.cardText, selected === opt.id && styles.cardTextSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !selected && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selected}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, padding: Spacing.lg, justifyContent: 'space-between' },
  header: { paddingTop: Spacing.xl, gap: Spacing.sm },
  step: { ...Typography.caption, color: Colors.text3, letterSpacing: 1.5, textTransform: 'uppercase' },
  title: { ...Typography.heading, fontSize: 28, fontWeight: '700', color: Colors.text1, marginTop: Spacing.xs },
  sub: { ...Typography.body, color: Colors.text2, lineHeight: 22 },
  options: { gap: Spacing.sm, flex: 1, justifyContent: 'center' },
  card: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  cardSelected: { borderColor: Colors.primary, backgroundColor: Colors.elevated },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.text3,
  },
  dotSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  cardText: { ...Typography.body, color: Colors.text2, flex: 1, lineHeight: 22 },
  cardTextSelected: { color: Colors.text1 },
  button: {
    borderRadius: Radius.full,
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  buttonDisabled: { opacity: 0.35 },
  buttonText: { ...Typography.body, fontWeight: '700', color: Colors.text1 },
});
