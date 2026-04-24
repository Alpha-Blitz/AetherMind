import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

export type AetherExpression = 'idle' | 'happy' | 'curious' | 'encouraging' | 'thinking' | 'empathetic' | 'playful';
export type AetherSize = 'small' | 'medium' | 'large';

interface Props {
  expression?: AetherExpression;
  size?: AetherSize;
}

const sizeDimensions: Record<AetherSize, number> = {
  small: 40,
  medium: 80,
  large: 160,
};

// TODO Sprint 1: replace placeholder with Lottie animation from design assets
// Expressions map to specific animation frames from the character sheet
export default function AetherCharacter({ expression = 'idle', size = 'medium' }: Props) {
  const C = Colors.dark;
  const dim = sizeDimensions[size];
  const glow = useSharedValue(0.6);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <View style={[styles.container, { width: dim, height: dim }]}>
      <Animated.View
        style={[
          styles.glow,
          { width: dim * 1.4, height: dim * 1.4, borderRadius: dim * 0.7, backgroundColor: C.primary },
          glowStyle,
        ]}
      />
      <View style={[styles.body, { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: C.surface }]}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  glow: { position: 'absolute', opacity: 0.15 },
  body: { justifyContent: 'center', alignItems: 'center' },
});
