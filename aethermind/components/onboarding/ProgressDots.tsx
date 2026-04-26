import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

interface Props {
  total: number;
  current: number; // 1-based
}

export default function ProgressDots({ total, current }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              done   && styles.dotDone,
              active && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border.default,
  },
  dotDone: {
    backgroundColor: Colors.purple.primary,
  },
  dotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.purple.soft,
  },
});
