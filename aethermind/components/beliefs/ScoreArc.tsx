import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface Props {
  score: number;      // 0–10 (lower = more resolved)
  baseline: number;
}

// TODO Sprint 3: implement as SVG arc (react-native-svg)
// Shows belief intensity as a circular arc — high score = full red arc, low = near-empty green
export default function ScoreArc({ score, baseline }: Props) {
  const C = Colors.dark;
  const pct = score / 10;

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: pct > 0.6 ? C.danger : pct > 0.3 ? C.gold : C.mint }]}>
        <Text style={[styles.value, { color: C.text }]}>{score.toFixed(1)}</Text>
        <Text style={[styles.label, { color: C.textMuted }]}>/ 10</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  circle: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, justifyContent: 'center', alignItems: 'center' },
  value: { fontSize: 20, fontWeight: '800' },
  label: { fontSize: 10 },
});
