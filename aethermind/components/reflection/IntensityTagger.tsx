import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography, Space, Radius } from '../../constants/theme';

const OPTIONS = [
  { label: 'Barely',       value: 2   },
  { label: 'Somewhat',     value: 5   },
  { label: 'A lot',        value: 7.5 },
  { label: 'It took over', value: 10  },
] as const;

interface Props {
  onSelect: (value: number) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Option({
  label,
  value,
  active,
  onPress,
}: {
  label:   string;
  value:   number;
  active:  boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withTiming(0.97, { duration: 150 }); }}
      onPressOut={() => { scale.value = withTiming(1,    { duration: 150 }); }}
      style={[styles.option, active && styles.optionActive, animStyle]}
    >
      <Text style={[styles.optionText, active && styles.optionTextActive]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

export default function IntensityTagger({ onSelect }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handle = (value: number) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How much did this belief show up today?</Text>
      <View style={styles.options}>
        {OPTIONS.map((opt) => (
          <Option
            key={opt.value}
            label={opt.label}
            value={opt.value}
            active={selected === opt.value}
            onPress={() => handle(opt.value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Space[4],
  },
  question: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  options: {
    gap: Space[2],
  },
  option: {
    backgroundColor:   Colors.bg.elevated,
    borderRadius:      Radius.lg,
    borderWidth:       1,
    borderColor:       'rgba(124, 108, 255, 0.15)',
    paddingVertical:   16,
    paddingHorizontal: 16,
    alignItems:        'center',
  },
  optionActive: {
    backgroundColor: Colors.purple.primary,
    borderColor:     Colors.purple.primary,
  },
  optionText: {
    ...Typography.body,
    color:      Colors.text.secondary,
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
});
