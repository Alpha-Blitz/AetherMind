import { ReactNode } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Radius, Shadows, Space, Timing } from '../../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'icon';

interface Props {
  label?:    string;
  onPress:   () => void;
  variant?:  ButtonVariant;
  disabled?: boolean;
  loading?:  boolean;
  icon?:     ReactNode;
}

function defaultBg(v: ButtonVariant): string {
  if (v === 'primary') return Colors.purple.primary;
  if (v === 'icon')    return Colors.bg.elevated;
  return 'transparent';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Button({
  label,
  onPress,
  variant  = 'primary',
  disabled = false,
  loading  = false,
  icon,
}: Props) {
  const scale   = useSharedValue(1);
  const bgColor = useSharedValue(defaultBg(variant));

  const animStyle = useAnimatedStyle(() => ({
    transform:       [{ scale: scale.value }],
    backgroundColor: bgColor.value,
  }));

  function handlePressIn() {
    const d = Timing.tap;
    if (variant === 'primary') {
      scale.value   = withTiming(0.97, { duration: d });
      bgColor.value = withTiming(Colors.purple.deep, { duration: d });
    } else if (variant === 'secondary') {
      scale.value   = withTiming(0.97, { duration: d });
      bgColor.value = withTiming('rgba(124,108,255,0.10)', { duration: d });
    } else if (variant === 'icon') {
      scale.value   = withTiming(0.95, { duration: d });
      bgColor.value = withTiming('rgba(124,108,255,0.15)', { duration: d });
    }
  }

  function handlePressOut() {
    scale.value   = withTiming(1,                { duration: Timing.tap });
    bgColor.value = withTiming(defaultBg(variant), { duration: Timing.tap });
  }

  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        styles.base,
        variant === 'primary'   && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'tertiary'  && styles.tertiary,
        variant === 'icon'      && styles.icon,
        variant === 'primary'   && !isDisabled && Shadows.purpleGlow,
        variant === 'icon'      && !isDisabled && Shadows.sm,
        isDisabled && styles.disabled,
        animStyle,
      ]}
    >
      {loading ? (
        <Text style={[styles.label, variant !== 'primary' && styles.labelSecondary]}>
          {'   '}
        </Text>
      ) : variant === 'icon' ? (
        icon
      ) : (
        <>
          {icon ? <View>{icon}</View> : null}
          {label ? (
            <Text style={[
              styles.label,
              variant === 'secondary' && styles.labelSecondary,
              variant === 'tertiary'  && styles.labelTertiary,
            ]}>
              {label}
            </Text>
          ) : null}
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'row',
    gap:            Space[2],
  },
  primary: {
    width:             '100%',
    height:            44,
    borderRadius:      10,
    paddingHorizontal: Space[5],
  },
  secondary: {
    width:             '100%',
    height:            44,
    borderRadius:      10,
    borderWidth:       1,
    borderColor:       Colors.purple.primary,
    paddingHorizontal: Space[5],
  },
  tertiary: {
    height: 36,
  },
  icon: {
    width:        44,
    height:       44,
    borderRadius: Radius.full,
    borderWidth:  1,
    borderColor:  'rgba(124,108,255,0.25)',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    ...Typography.cta,
  },
  labelSecondary: {
    color: Colors.purple.primary,
  },
  labelTertiary: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
});
