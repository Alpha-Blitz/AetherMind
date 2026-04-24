import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';

const OPTIONS = [
  { label: 'Barely', value: 2 },
  { label: 'Somewhat', value: 5 },
  { label: 'A lot', value: 7.5 },
  { label: 'It took over', value: 10 },
] as const;

interface Props {
  onSelect: (value: number) => void;
}

// Primary signal for the Scoring Engine (35% weight).
// Maps qualitative labels to the numeric intensity_rating stored on journal_entries.
export default function IntensityTagger({ onSelect }: Props) {
  const C = Colors.dark;
  const [selected, setSelected] = useState<number | null>(null);

  const handle = (value: number) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: C.textSecondary }]}>
        How much did this belief show up today?
      </Text>
      <View style={styles.options}>
        {OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            onPress={() => handle(opt.value)}
            style={[
              styles.option,
              { backgroundColor: selected === opt.value ? C.primary : C.surface },
            ]}
          >
            <Text style={[styles.optionText, { color: selected === opt.value ? C.text : C.textSecondary }]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  question: { fontSize: 15, lineHeight: 22 },
  options: { gap: 10 },
  option: { borderRadius: 14, padding: 18, alignItems: 'center' },
  optionText: { fontSize: 16, fontWeight: '600' },
});
