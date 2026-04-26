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
import { AetherImages } from '../../constants/images';

export type AetherExpression =
  | 'idle' | 'happy' | 'curious' | 'empathetic'
  | 'thinking' | 'celebrating' | 'speaking' | 'waiting';

export type AetherSize = 'small' | 'medium' | 'large';

const SIZE_MAP: Record<AetherSize, number> = {
  small:  32,
  medium: 80,
  large:  160,
};

interface Props {
  expression?: AetherExpression;
  size?: AetherSize;
}

export default function AetherCharacter({ expression = 'idle', size = 'medium' }: Props) {
  const dim = SIZE_MAP[size];

  const opacity    = useSharedValue(0);
  const scale      = useSharedValue(0);
  const translateY = useSharedValue(30);
  const floatY     = useSharedValue(0);
  const glowAnim   = useSharedValue(0.6);

  useEffect(() => {
    opacity.value    = withTiming(1, { duration: 400 });
    scale.value      = withSpring(1, { damping: 14, stiffness: 120 });
    translateY.value = withSpring(0, { damping: 14, stiffness: 120 });

    if (size !== 'small') {
      floatY.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0,  { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1, false,
      );
    }

    glowAnim.value = withRepeat(
      withSequence(
        withTiming(1.0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1, false,
    );
  }, []);

  const motionStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value + floatY.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowColor:   '#c8bff8',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: glowAnim.value * 0.3,
    shadowRadius:  glowAnim.value * 28,
    elevation:     8,
  }));

  return (
    <Animated.View style={[{ width: dim, height: dim }, motionStyle, glowStyle]}>
      <Image
        source={AetherImages[expression]}
        style={{ width: dim, height: dim }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}
