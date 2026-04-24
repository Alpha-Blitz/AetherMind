import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface Belief {
  old_belief: string;
  new_story: string;
  current_score: number;
  baseline_score: number;
  status: 'active' | 'resolved' | 'surfaced';
}

interface Props {
  belief: Belief;
}

export default function BeliefCard({ belief }: Props) {
  const C = Colors.dark;
  const delta = belief.baseline_score - belief.current_score;
  const pct = Math.round((delta / belief.baseline_score) * 100);

  return (
    <View style={[styles.container, { backgroundColor: C.surface }]}>
      <Text style={[styles.label, { color: C.textMuted }]}>ACTIVE BELIEF</Text>
      <Text style={[styles.newStory, { color: C.text }]}>{belief.new_story}</Text>
      <Text style={[styles.oldBelief, { color: C.textMuted }]}>was: {belief.old_belief}</Text>

      <View style={styles.scoreRow}>
        <Text style={[styles.score, { color: C.primary }]}>{belief.current_score.toFixed(1)}</Text>
        <Text style={[styles.scoreSub, { color: C.mint }]}>↓{pct}% from baseline</Text>
      </View>

      {/* Sprint 3: replace with ScoreArc progress component */}
      <View style={[styles.track, { backgroundColor: C.border }]}>
        <View style={[styles.fill, { backgroundColor: C.primary, width: `${((10 - belief.current_score) / 10) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 20, padding: 24, gap: 8 },
  label: { fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' },
  newStory: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
  oldBelief: { fontSize: 13 },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12, marginTop: 8 },
  score: { fontSize: 36, fontWeight: '800' },
  scoreSub: { fontSize: 14 },
  track: { height: 4, borderRadius: 2, marginTop: 8, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2 },
});
