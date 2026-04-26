import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colors, Typography, Space, Radius } from '../../constants/theme';

const OPTIONS = [
  { label: 'Barely',      value: 2   },
  { label: 'Somewhat',    value: 5   },
  { label: 'A lot',       value: 7.5 },
  { label: 'It took over', value: 10  },
] as const;

interface Props { onSelect: (value: number) => void; }

export default function IntensityTagger({ onSelect }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handle = (value: number) => { setSelected(value); onSelect(value); };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How much did this belief show up today?</Text>
      <View style={styles.options}>
        {OPTIONS.map((opt) => {
          const active = selected === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => handle(opt.value)}
              style={[styles.option, active && styles.optionActive]}
            >
              <Text style={[styles.optionText, active && styles.optionTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Space.lg },
  question:  { ...Typography.body, color: Colors.text.secondary, lineHeight: 22 },
  options:   { gap: Space.sm },
  option: {
    backgroundColor: Colors.bg.elevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    paddingVertical: 16, paddingHorizontal: 16,
    alignItems: 'center',
  },
  optionActive:     { backgroundColor: Colors.bg.overlay, borderColor: Colors.purple.primary },
  optionText:       { ...Typography.body, color: Colors.text.secondary, fontWeight: '500' },
  optionTextActive: { color: Colors.text.primary },
});
