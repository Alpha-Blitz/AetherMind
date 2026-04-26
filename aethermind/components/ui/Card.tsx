import { ReactNode } from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Shadows, Space, Radius, Timing } from '../../constants/theme';

export type CardVariant =
  | 'default' | 'elevated' | 'interactive'
  | 'feature' | 'gradient' | 'status';

interface Props {
  children:  ReactNode;
  variant?:  CardVariant;
  onPress?:  () => void;
  style?:    ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView      = Animated.createAnimatedComponent(View);

export default function Card({ children, variant = 'default', onPress, style }: Props) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withTiming(0.98, { duration: Timing.tap });
  }
  function handlePressOut() {
    scale.value = withTiming(1, { duration: Timing.tap });
  }

  const containerStyle = [
    styles.base,
    variant === 'default'     && styles.cardDefault,
    variant === 'elevated'    && styles.cardElevated,
    variant === 'interactive' && styles.cardInteractive,
    variant === 'feature'     && styles.cardFeature,
    variant === 'gradient'    && styles.cardGradient,
    variant === 'status'      && styles.cardStatus,
    variant === 'default'     && Shadows.sm,
    variant === 'elevated'    && Shadows.md,
    variant === 'interactive' && Shadows.orangeGlow,
    style,
    animStyle,
  ];

  const inner = variant === 'gradient' ? (
    <LinearGradient
      colors={[Colors.bg.elevated, Colors.bg.surface]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientFill}
    >
      {children}
    </LinearGradient>
  ) : children;

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={containerStyle}
      >
        {inner}
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedView style={containerStyle}>
      {inner}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    overflow:     'hidden',
  },
  cardDefault: {
    backgroundColor: Colors.bg.surface,
    borderWidth:     0.5,
    borderColor:     'rgba(124,108,255,0.15)',
    padding:         Space[4],
  },
  cardElevated: {
    backgroundColor: Colors.bg.elevated,
    borderWidth:     0.5,
    borderColor:     'rgba(124,108,255,0.25)',
    padding:         Space[4],
  },
  cardInteractive: {
    backgroundColor: Colors.bg.elevated,
    borderWidth:     1,
    borderColor:     Colors.orange.primary,
    padding:         Space[4],
  },
  cardFeature: {
    backgroundColor: Colors.bg.surface,
    borderWidth:     0.5,
    borderColor:     'rgba(124,108,255,0.15)',
    borderRadius:    Radius.lg,
    padding:         Space[5],
  },
  cardGradient: {
    borderWidth:  0.5,
    borderColor:  'rgba(124,108,255,0.20)',
  },
  cardStatus: {
    backgroundColor:   Colors.bg.surface,
    borderWidth:       0.5,
    borderColor:       'rgba(124,108,255,0.15)',
    paddingVertical:   14,
    paddingHorizontal: Space[4],
  },
  gradientFill: {
    flex:    1,
    padding: Space[4],
  },
});
