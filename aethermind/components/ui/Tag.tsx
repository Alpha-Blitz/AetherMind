import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography, Radius, Space, Timing } from '../../constants/theme';

export type TagVariant =
  | 'filterActive' | 'filterInactive'
  | 'pending' | 'done' | 'inProgress' | 'locked'
  | 'label';

interface Props {
  label:     string;
  variant?:  TagVariant;
  onPress?:  () => void;
  icon?:     string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Tag({ label, variant = 'filterInactive', onPress, icon }: Props) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    if (onPress) scale.value = withTiming(0.95, { duration: Timing.tap });
  }
  function handlePressOut() {
    if (onPress) scale.value = withTiming(1, { duration: Timing.tap });
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!onPress}
      style={[styles.base, chipStyles[variant], animStyle]}
    >
      {icon ? <Text style={[styles.text, labelStyles[variant]]}>{icon}</Text> : null}
      <Text style={[styles.text, labelStyles[variant]]}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection:  'row',
    alignItems:     'center',
    alignSelf:      'flex-start',
    borderRadius:   Radius.full,
    gap:            Space[1],
  },
  text: {
    ...Typography.caption,
  },
});

const chipStyles = StyleSheet.create({
  filterActive: {
    backgroundColor:   Colors.purple.primary,
    paddingVertical:   6,
    paddingHorizontal: 14,
  },
  filterInactive: {
    backgroundColor:   'transparent',
    borderWidth:       1,
    borderColor:       'rgba(124,108,255,0.30)',
    paddingVertical:   6,
    paddingHorizontal: 14,
  },
  pending: {
    backgroundColor:   'rgba(255,196,61,0.15)',
    borderWidth:       1,
    borderColor:       Colors.warning,
    paddingVertical:   4,
    paddingHorizontal: 10,
  },
  done: {
    backgroundColor:   'rgba(74,222,128,0.15)',
    borderWidth:       1,
    borderColor:       Colors.success,
    paddingVertical:   4,
    paddingHorizontal: 10,
  },
  inProgress: {
    backgroundColor:   'rgba(77,171,255,0.15)',
    borderWidth:       1,
    borderColor:       Colors.info,
    paddingVertical:   4,
    paddingHorizontal: 10,
  },
  locked: {
    backgroundColor:   'rgba(107,113,153,0.15)',
    borderWidth:       1,
    borderColor:       Colors.text.muted,
    paddingVertical:   4,
    paddingHorizontal: 10,
  },
  label: {
    backgroundColor:   'rgba(124,108,255,0.12)',
    borderWidth:       1,
    borderColor:       'rgba(124,108,255,0.25)',
    paddingVertical:   4,
    paddingHorizontal: Space[3],
  },
});

const labelStyles = StyleSheet.create({
  filterActive:   { ...Typography.caption, fontWeight: '600' as const, color: Colors.text.primary },
  filterInactive: { ...Typography.caption, color: Colors.text.secondary },
  pending:        { ...Typography.caption, color: Colors.warning },
  done:           { ...Typography.caption, color: Colors.success },
  inProgress:     { ...Typography.caption, color: Colors.info },
  locked:         { ...Typography.caption, color: Colors.text.muted },
  label:          { ...Typography.caption, color: Colors.purple.soft },
});
