import { ReactNode } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Radius, Shadows, Space } from '../../constants/theme';
import AetherCharacter from '../aether/AetherCharacter';

export type ButtonVariant = 'primary' | 'ghost';

interface Props {
  label:     string;
  onPress:   () => void;
  variant?:  ButtonVariant;
  disabled?: boolean;
  loading?:  boolean;
  icon?:     ReactNode;
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
  const scale = useSharedValue(1);
  const bg    = useSharedValue(
    variant === 'primary' ? Colors.purple.strong : 'transparent',
  );

  const animStyle = useAnimatedStyle(() => ({
    transform:       [{ scale: scale.value }],
    backgroundColor: bg.value,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 150 });
    if (variant === 'primary') {
      bg.value = withTiming(Colors.purple.deep, { duration: 150 });
    }
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
    if (variant === 'primary') {
      bg.value = withTiming(Colors.purple.strong, { duration: 150 });
    }
  };

  const handlePress = () => {
    if (variant === 'primary') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const isPrimary = variant === 'primary';

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.ghost,
        isPrimary && !disabled ? Shadows.button : undefined,
        disabled ? styles.disabled : undefined,
        animStyle,
      ]}
    >
      {loading ? (
        <AetherCharacter expression="thinking" size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelGhost]}>
            {label}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width:          '100%',
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'row',
    gap:            Space.sm,
    borderRadius:   Radius.lg,
  },
  primary: {
    height:          54,
    backgroundColor: Colors.purple.strong,
  },
  ghost: {
    height:          48,
    backgroundColor: 'transparent',
    borderWidth:     1,
    borderColor:     Colors.border.active,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    ...Typography.cta,
  },
  labelPrimary: {
    color: '#ffffff',
  },
  labelGhost: {
    ...Typography.body,
    color:      Colors.purple.soft,
    fontWeight: '500',
  },
});
