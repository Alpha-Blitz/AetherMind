import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import AetherCharacter from '../../components/aether/AetherCharacter';
import ProgressDots from '../../components/onboarding/ProgressDots';

const OPTIONS = [
  { id: 'identity_shift', label: 'Identity shift' },
  { id: 'patterns',       label: 'Stuck in patterns' },
  { id: 'grow',           label: 'Want to grow' },
  { id: 'transition',     label: 'Going through a transition' },
];

export default function IntentScreen() {
  const [selected, setSelected] = useState('');

  function handleContinue() {
    if (!selected) return;
    onboardingData.intent = selected;
    router.push('/(onboarding)/struggle');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <ProgressDots total={6} current={1} />
        </View>

        <View style={styles.aetherWrap}>
          <AetherCharacter expression="curious" size="medium" />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Before we begin —{'\n'}what brought you here?</Text>
          <Text style={styles.sub}>You can select up to four.</Text>
        </View>

        <View style={styles.options}>
          {OPTIONS.map((opt) => {
            const active = selected === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.card, active && styles.cardActive]}
                onPress={() => setSelected(opt.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.radio, active && styles.radioActive]} />
                <Text style={[styles.cardText, active && styles.cardTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  safe:      { flex: 1, backgroundColor: Colors.bg.base },
  container: { flex: 1, paddingHorizontal: 20, paddingBottom: 20, gap: Space.lg },
  topBar:    { paddingTop: Space.lg, alignItems: 'center' },
  aetherWrap:{ alignItems: 'center', paddingVertical: Space.sm },
  header:    { gap: Space.sm },
  title: {
    fontSize: 24, fontWeight: '500', lineHeight: 32,
    color: Colors.text.primary, letterSpacing: -0.3,
  },
  sub: { ...Typography.caption, color: Colors.text.tertiary },
  options: { flex: 1, gap: Space.sm, justifyContent: 'center' },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: Space.md,
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    paddingVertical: 16, paddingHorizontal: 16,
    ...Shadows.card,
  },
  cardActive: { borderColor: Colors.purple.primary, backgroundColor: Colors.bg.elevated },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: Colors.border.active,
  },
  radioActive: { borderColor: Colors.purple.primary, backgroundColor: Colors.purple.primary },
  cardText:       { ...Typography.body, color: Colors.text.secondary, flex: 1 },
  cardTextActive: { color: Colors.text.primary },
  button: {
    backgroundColor: Colors.purple.strong,
    height: 54, borderRadius: Radius.lg,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.button,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { ...Typography.cta, color: '#ffffff' },
});
