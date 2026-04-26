import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Radius } from '../../constants/theme';

interface Props { score: number; baseline: number; }

export default function ScoreArc({ score }: Props) {
  const pct = score / 10;
  const borderColor = pct > 0.6 ? Colors.error : pct > 0.3 ? Colors.warning : Colors.success;

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor }]}>
        <Text style={styles.value}>{score.toFixed(1)}</Text>
        <Text style={styles.label}>/ 10</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  circle:    { width: 80, height: 80, borderRadius: 40, borderWidth: 3, justifyContent: 'center', alignItems: 'center' },
  value:     { fontSize: 20, fontWeight: '600', color: Colors.text.primary },
  label:     { ...Typography.caption, color: Colors.text.tertiary },
});
