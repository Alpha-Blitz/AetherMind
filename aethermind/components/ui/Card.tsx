import { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { Colors, Radius, Shadows, Space } from '../../constants/theme';

interface Props {
  children:   ReactNode;
  style?:     ViewStyle;
  onPress?:   () => void;
  elevated?:  boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Card({ children, style, onPress, elevated = false }: Props) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn  = () => { if (onPress) scale.value = withTiming(0.98, { duration: 150 }); };
  const handlePressOut = () => { if (onPress) scale.value = withTiming(1,    { duration: 150 }); };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!onPress}
      style={[styles.card, elevated && styles.elevated, style, animStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bg.surface,
    borderRadius:    Radius.lg,
    borderWidth:     0.5,
    borderColor:     Colors.border.default,
    paddingVertical: Space.md,
    paddingHorizontal: 14,
    ...Shadows.card,
  },
  elevated: {
    backgroundColor: Colors.bg.elevated,
  },
});
