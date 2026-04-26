import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';
import ProgressDots from '../../components/onboarding/ProgressDots';

const POINTS = [
  'This is not therapy.',
  'This is not medical advice.',
  'This is a space for your own reflection.',
  'Your data is encrypted and never shared.',
];

export default function DisclaimerScreen() {
  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <ProgressDots total={6} current={4} />
        </View>

        <View style={styles.aetherWrap}>
          <AetherCharacter expression="idle" size="medium" />
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>A few things to know.✦</Text>
          </View>

          <View style={styles.points}>
            {POINTS.map((p) => (
              <View key={p} style={styles.pointRow}>
                <View style={styles.bullet} />
                <Text style={styles.pointText}>{p}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.checkRow} onPress={() => setChecked(v => !v)} activeOpacity={0.8}>
            <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
              {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkLabel}>I understand.</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={[styles.button, !checked && styles.buttonDisabled]}
          onPress={() => router.push('/(onboarding)/meet-aether')}
          disabled={!checked}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Let's begin</Text>
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
  scroll:    { flex: 1 },
  header:    { marginBottom: Space.xl },
  title: {
    fontSize: 24, fontWeight: '500', lineHeight: 32,
    color: Colors.text.primary, letterSpacing: -0.3,
  },
  points: { gap: Space.lg, paddingBottom: Space.xl },
  pointRow: { flexDirection: 'row', gap: Space.md, alignItems: 'flex-start' },
  bullet: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: Colors.purple.primary, marginTop: 8,
  },
  pointText: { ...Typography.body, color: Colors.text.secondary, flex: 1, lineHeight: 24 },
  checkRow:  { flexDirection: 'row', alignItems: 'center', gap: Space.md, paddingBottom: Space.xl },
  checkbox: {
    width: 22, height: 22, borderRadius: Radius.sm,
    borderWidth: 1.5, borderColor: Colors.border.active,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: Colors.purple.primary, borderColor: Colors.purple.primary },
  checkmark: { fontSize: 12, color: '#fff', fontWeight: '700' },
  checkLabel: { ...Typography.body, color: Colors.text.primary },
  button: {
    backgroundColor: Colors.purple.strong,
    height: 54, borderRadius: Radius.lg,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.button,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { ...Typography.cta, color: '#ffffff' },
});
