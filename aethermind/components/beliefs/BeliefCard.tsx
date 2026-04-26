import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';

interface Belief {
  old_belief: string; new_story: string;
  current_score: number; baseline_score: number;
  status: 'active' | 'resolved' | 'surfaced';
}

export default function BeliefCard({ belief }: { belief: Belief }) {
  const delta = belief.baseline_score - belief.current_score;
  const pct   = Math.round((delta / belief.baseline_score) * 100);
  const fillW = `${((10 - belief.current_score) / 10) * 100}%` as any;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ACTIVE BELIEF</Text>
      <Text style={styles.newStory}>{belief.new_story}</Text>
      <Text style={styles.oldBelief}>was: {belief.old_belief}</Text>
      <View style={styles.scoreRow}>
        <Text style={styles.score}>{belief.current_score.toFixed(1)}</Text>
        <Text style={styles.scoreSub}>↓{pct}% from baseline</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: fillW }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg, padding: Space.xl, gap: Space.sm,
    ...Shadows.card,
  },
  label:     { ...Typography.label, color: Colors.text.tertiary, letterSpacing: 1.5 },
  newStory:  { ...Typography.subheading, color: Colors.text.primary, lineHeight: 26 },
  oldBelief: { ...Typography.caption, color: Colors.text.secondary },
  scoreRow:  { flexDirection: 'row', alignItems: 'baseline', gap: Space.md, marginTop: Space.sm },
  score:     { fontSize: 36, fontWeight: '600', color: Colors.purple.primary },
  scoreSub:  { ...Typography.body, color: Colors.success },
  track:     { height: 4, borderRadius: 2, backgroundColor: Colors.bg.elevated, overflow: 'hidden', marginTop: Space.sm },
  fill:      { height: '100%', borderRadius: 2, backgroundColor: Colors.purple.primary },
});
