import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';

const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const LABELS: Record<number, string> = {
  1: 'Barely noticeable',
  2: 'Very mild',
  3: 'Mild',
  4: 'Somewhat present',
  5: 'Noticeably there',
  6: 'Often affects me',
  7: 'Frequently limits me',
  8: 'Strongly felt',
  9: 'Very strong hold',
  10: 'Controls my decisions',
};

export default function BaselineScreen() {
  const [score, setScore] = useState(7);

  function handleContinue() {
    onboardingData.baseline = score;
    router.push('/(onboarding)/disclaimer');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.step}>3 of 6</Text>
          <Text style={styles.title}>How much does this affect you?</Text>
          <Text style={styles.sub}>
            Rate the hold this belief has on you. This becomes your starting score — lower is better.
          </Text>
        </View>

        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.scoreLabel}>{LABELS[score]}</Text>
        </View>

        <View style={styles.ratingRow}>
          {RATINGS.map((n) => (
            <TouchableOpacity
              key={n}
              style={[styles.pip, n <= score && styles.pipActive, n === score && styles.pipSelected]}
              onPress={() => setScore(n)}
              activeOpacity={0.8}
            >
              <Text style={[styles.pipText, n <= score && styles.pipTextActive]}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.scaleLabels}>
          <Text style={styles.scaleLabelText}>Mild</Text>
          <Text style={styles.scaleLabelText}>Controls me</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { onboardingData.baseline = 7; router.push('/(onboarding)/disclaimer'); }}>
          <Text style={styles.skipText}>Skip — I'm not sure</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, padding: Spacing.lg, gap: Spacing.lg },
  back: { paddingTop: Spacing.sm },
  backText: { ...Typography.body, color: Colors.text3 },
  header: { gap: Spacing.sm },
  step: { ...Typography.caption, color: Colors.text3, letterSpacing: 1.5, textTransform: 'uppercase' },
  title: { ...Typography.heading, fontSize: 28, fontWeight: '700', color: Colors.text1 },
  sub: { ...Typography.body, color: Colors.text2, lineHeight: 22 },
  scoreDisplay: { alignItems: 'center', gap: Spacing.xs, paddingVertical: Spacing.lg },
  scoreNumber: { fontSize: 72, fontWeight: '700', color: Colors.primary, lineHeight: 80 },
  scoreLabel: { ...Typography.body, color: Colors.text2 },
  ratingRow: { flexDirection: 'row', gap: 6, justifyContent: 'center' },
  pip: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipActive: { backgroundColor: Colors.elevated, borderColor: Colors.primary },
  pipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  pipText: { fontSize: 12, fontWeight: '600', color: Colors.text3 },
  pipTextActive: { color: Colors.text1 },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -Spacing.sm },
  scaleLabelText: { ...Typography.caption, color: Colors.text3 },
  button: {
    borderRadius: Radius.full,
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonText: { ...Typography.body, fontWeight: '700', color: Colors.text1 },
  skipText: { ...Typography.caption, color: Colors.text3, textAlign: 'center', paddingBottom: Spacing.md },
});
