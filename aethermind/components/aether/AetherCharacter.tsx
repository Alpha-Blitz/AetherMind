import React, { useEffect } from 'react';
import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../../constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type AetherExpression =
  | 'idle'
  | 'happy'
  | 'curious'
  | 'empathetic'
  | 'thinking'
  | 'celebrating';

export type AetherSize = 'small' | 'medium' | 'large';

const SIZE_MAP: Record<AetherSize, { w: number; h: number }> = {
  small: { w: 44, h: 57 },
  medium: { w: 88, h: 114 },
  large: { w: 176, h: 228 },
};

const DARK = '#1a1228';
const WHITE = '#ffffff';

function FaceFeatures({ expression }: { expression: AetherExpression }) {
  switch (expression) {
    case 'happy':
      return (
        <G>
          <Path d="M33 43 Q38 49 43 43" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <Path d="M57 43 Q62 49 67 43" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <Path d="M41 53 Q50 62 59 53" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </G>
      );

    case 'curious':
      return (
        <G>
          <Ellipse cx="38" cy="45" rx="5" ry="6" fill={DARK} />
          <Circle cx="40" cy="43" r="1.8" fill={WHITE} />
          <Ellipse cx="62" cy="45" rx="5" ry="4.5" fill={DARK} />
          <Circle cx="64" cy="43" r="1.8" fill={WHITE} />
          <Path d="M33 38 Q38 35 43 37" stroke={DARK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <Path d="M57 36 Q62 32 67 35" stroke={DARK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <Ellipse cx="50" cy="57" rx="3.5" ry="3" fill={DARK} />
        </G>
      );

    case 'empathetic':
      return (
        <G>
          <Ellipse cx="38" cy="45" rx="5" ry="5.5" fill={DARK} />
          <Circle cx="40" cy="43" r="1.8" fill={WHITE} />
          <Ellipse cx="62" cy="45" rx="5" ry="5.5" fill={DARK} />
          <Circle cx="64" cy="43" r="1.8" fill={WHITE} />
          <Path d="M33 39 Q38 37 43 39" stroke={DARK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <Path d="M57 39 Q62 37 67 39" stroke={DARK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <Path d="M43 56 Q50 59 57 56" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
        </G>
      );

    case 'thinking':
      return (
        <G>
          <Ellipse cx="38" cy="45" rx="5" ry="6" fill={DARK} />
          <Circle cx="37" cy="42" r="1.8" fill={WHITE} />
          <Ellipse cx="62" cy="45" rx="5" ry="6" fill={DARK} />
          <Circle cx="61" cy="42" r="1.8" fill={WHITE} />
          <Path d="M44 56 Q50 55 56 56" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
          <Circle cx="72" cy="28" r="2.5" fill={Colors.soft} opacity={0.7} />
          <Circle cx="78" cy="21" r="2" fill={Colors.soft} opacity={0.5} />
          <Circle cx="83" cy="15" r="1.5" fill={Colors.soft} opacity={0.3} />
        </G>
      );

    case 'celebrating':
      return (
        <G>
          <Path d="M33 43 Q38 49 43 43" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <Path d="M57 43 Q62 49 67 43" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <Path d="M40 52 Q45 63 50 64 Q55 63 60 52 Q55 57 50 57 Q45 57 40 52 Z" fill={DARK} />
          <Path d="M17 30 L19 25 L21 30 Z" fill={Colors.soft} opacity={0.9} />
          <Path d="M79 34 L81 29 L83 34 Z" fill={Colors.soft} opacity={0.9} />
          <Circle cx="14" cy="21" r="2" fill={Colors.primary} opacity={0.6} />
          <Circle cx="86" cy="24" r="2" fill={Colors.primary} opacity={0.6} />
          <Circle cx="22" cy="18" r="1.5" fill={Colors.soft} opacity={0.5} />
          <Circle cx="78" cy="20" r="1.5" fill={Colors.soft} opacity={0.5} />
        </G>
      );

    default: // idle
      return (
        <G>
          <Ellipse cx="38" cy="45" rx="5" ry="6" fill={DARK} />
          <Circle cx="40" cy="43" r="1.8" fill={WHITE} />
          <Ellipse cx="62" cy="45" rx="5" ry="6" fill={DARK} />
          <Circle cx="64" cy="43" r="1.8" fill={WHITE} />
          <Path d="M44 55 Q50 58 56 55" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
        </G>
      );
  }
}

interface Props {
  expression?: AetherExpression;
  size?: AetherSize;
}

export default function AetherCharacter({ expression = 'idle', size = 'medium' }: Props) {
  const { w, h } = SIZE_MAP[size];
  const glowAnim = useSharedValue(0.3);

  useEffect(() => {
    glowAnim.value = withRepeat(
      withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [glowAnim]);

  const orbGlowProps = useAnimatedProps(() => ({ opacity: glowAnim.value }));
  const ambientProps = useAnimatedProps(() => ({ opacity: glowAnim.value * 0.07 }));

  return (
    <Svg width={w} height={h} viewBox="0 0 100 130">
      {/* Ambient body glow */}
      <AnimatedCircle cx="50" cy="72" r="48" fill={Colors.primary} animatedProps={ambientProps} />

      {/* Ghost body */}
      <Path
        d="M50 20 C26 20 15 38 15 58 L15 96 Q21 88 28 94 Q35 86 42 94 Q46 88 50 94 Q54 88 58 94 Q65 86 72 94 Q79 88 85 96 L85 58 C85 38 74 20 50 20 Z"
        fill={Colors.primary}
      />

      {/* Dark cloak overlay */}
      <Path
        d="M18 67 Q32 75 50 75 Q68 75 82 67 L82 96 Q79 88 72 94 Q65 86 58 94 Q54 88 50 94 Q46 88 42 94 Q35 86 28 94 Q21 88 18 96 Z"
        fill={Colors.elevated}
      />

      {/* Head */}
      <Circle cx="50" cy="44" r="27" fill={Colors.soft} />

      {/* Left ear/horn */}
      <Ellipse cx="33" cy="23" rx="6" ry="11" fill={Colors.soft} transform="rotate(-18 33 23)" />
      <Ellipse cx="33" cy="23" rx="3" ry="6" fill={Colors.primary} opacity={0.35} transform="rotate(-18 33 23)" />

      {/* Right ear/horn */}
      <Ellipse cx="67" cy="23" rx="6" ry="11" fill={Colors.soft} transform="rotate(18 67 23)" />
      <Ellipse cx="67" cy="23" rx="3" ry="6" fill={Colors.primary} opacity={0.35} transform="rotate(18 67 23)" />

      {/* Collar accent */}
      <Path
        d="M26 68 Q38 74 50 74 Q62 74 74 68"
        stroke={Colors.primary}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* Face features */}
      <FaceFeatures expression={expression} />

      {/* Chest orb — outer pulse glow */}
      <AnimatedCircle cx="50" cy="87" r="15" fill={Colors.soft} animatedProps={orbGlowProps} />

      {/* Chest orb — mid ring */}
      <Circle cx="50" cy="87" r="9" fill={Colors.soft} opacity={0.9} />

      {/* Chest orb — bright core */}
      <Circle cx="50" cy="87" r="5.5" fill={WHITE} opacity={0.95} />

      {/* Orb highlight */}
      <Circle cx="47.5" cy="84.5" r="1.8" fill={WHITE} opacity={0.6} />
    </Svg>
  );
}
