import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  useEffect,
} from 'react-native-reanimated';
import { Colors, Typography, Radius, Space, Timing } from '../../constants/theme';
import AetherCharacter from '../aether/AetherCharacter';

export type LoadingVariant = 'aetherThinking' | 'skeleton' | 'dots';

interface Props {
  variant?:  LoadingVariant;
  width?:    number | string;
  height?:   number;
  radius?:   number;
}

// ─── Dots ─────────────────────────────────────────────────────────────────────

function Dots() {
  const a = useSharedValue(0.3);
  const b = useSharedValue(0.3);
  const c = useSharedValue(0.3);

  useEffect(() => {
    const cfg = { duration: Timing.deliberate };
    a.value = withRepeat(withSequence(withTiming(1, cfg), withTiming(0.3, cfg)), -1, false);
    b.value = withRepeat(withDelay(300, withSequence(withTiming(1, cfg), withTiming(0.3, cfg))), -1, false);
    c.value = withRepeat(withDelay(600, withSequence(withTiming(1, cfg), withTiming(0.3, cfg))), -1, false);
  }, []);

  const s1 = useAnimatedStyle(() => ({ opacity: a.value }));
  const s2 = useAnimatedStyle(() => ({ opacity: b.value }));
  const s3 = useAnimatedStyle(() => ({ opacity: c.value }));

  return (
    <View style={styles.dotsRow}>
      <Animated.View style={[styles.dot, s1]} />
      <Animated.View style={[styles.dot, s2]} />
      <Animated.View style={[styles.dot, s3]} />
    </View>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ width = '100%', height = 16, radius = Radius.xs }: Omit<Props, 'variant'>) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1,   { duration: 750 }),
        withTiming(0.4, { duration: 750 }),
      ),
      -1,
      false,
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[
      styles.skeleton,
      { width: width as number, height, borderRadius: radius },
      animStyle,
    ]} />
  );
}

// ─── Aether Thinking ──────────────────────────────────────────────────────────

function AetherThinking() {
  return (
    <View style={styles.thinkingWrap}>
      <AetherCharacter expression="thinking" size="medium" />
      <Text style={styles.thinkingText}>Aether is thinking...</Text>
    </View>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function LoadingState({ variant = 'aetherThinking', width, height, radius }: Props) {
  if (variant === 'dots')           return <Dots />;
  if (variant === 'skeleton')       return <Skeleton width={width} height={height} radius={radius} />;
  return <AetherThinking />;
}

export { Skeleton, Dots };

const styles = StyleSheet.create({
  dotsRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Space[2],
  },
  dot: {
    width:           8,
    height:          8,
    borderRadius:    Radius.full,
    backgroundColor: Colors.purple.primary,
  },

  skeleton: {
    backgroundColor: Colors.bg.elevated,
  },

  thinkingWrap: {
    alignItems: 'center',
    gap:        Space[3],
  },
  thinkingText: {
    ...Typography.body,
    fontStyle: 'italic',
    color:     Colors.text.secondary,
  },
});
