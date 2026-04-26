import { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { AetherImages, AetherSize as SIZE_MAP } from '../../constants/images';
import type { AetherExpression } from '../../constants/images';
import { Colors } from '../../constants/theme';

export type { AetherExpression };
export type AetherSize = 'small' | 'medium' | 'large';

const DIM_MAP: Record<AetherSize, number> = {
  small:  SIZE_MAP.sm,
  medium: SIZE_MAP.md,
  large:  SIZE_MAP.lg,
};

interface Props {
  expression?: AetherExpression;
  size?:       AetherSize;
}

export default function AetherCharacter({ expression = 'idle', size = 'medium' }: Props) {
  const dim = DIM_MAP[size];

  // Animation 3 — Entrance spring
  const enterScale   = useSharedValue(0);
  const enterOpacity = useSharedValue(0);
  const enterY       = useSharedValue(30);

  // Animation 2 — Float (md/lg only)
  const floatY = useSharedValue(0);

  // Animation 1 — Glow pulse (always running)
  const glowOpacity = useSharedValue(0.15);

  useEffect(() => {
    enterScale.value   = withSpring(1, { damping: 14, stiffness: 120 });
    enterOpacity.value = withTiming(1, { duration: 400 });
    enterY.value       = withSpring(0, { damping: 14, stiffness: 120 });

    if (size !== 'small') {
      floatY.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0,  { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1, false,
      );
    }

    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.30, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1, false,
    );
  }, []);

  const entranceStyle = useAnimatedStyle(() => ({
    transform: [
      { scale:      enterScale.value },
      { translateY: enterY.value     },
    ],
    opacity: enterOpacity.value,
  }));

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowColor:   Colors.purple.primary,
    shadowOpacity: glowOpacity.value,
    shadowRadius:  28,
    shadowOffset:  { width: 0, height: 0 },
    elevation:     8,
  }));

  return (
    <Animated.View style={[{ width: dim, height: dim }, entranceStyle]}>
      <Animated.View style={[{ width: dim, height: dim }, floatStyle]}>
        <Animated.View style={[{ width: dim, height: dim }, glowStyle]}>
          <Image
            source={AetherImages[expression]}
            style={{ width: dim, height: dim }}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
