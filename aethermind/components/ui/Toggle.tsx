import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Shadows, Timing } from '../../constants/theme';

// ─── Toggle Switch ────────────────────────────────────────────────────────────

interface ToggleProps {
  value:     boolean;
  onChange:  (v: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ value, onChange, disabled = false }: ToggleProps) {
  const progress = useSharedValue(value ? 1 : 0);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [Colors.bg.elevated, Colors.purple.primary],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform:       [{ translateX: progress.value * 20 }],
    backgroundColor: progress.value > 0.5 ? '#E8ECFF' : Colors.text.muted,
  }));

  function handlePress() {
    if (disabled) return;
    const next = !value;
    progress.value = withTiming(next ? 1 : 0, { duration: Timing.quick });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(next);
  }

  return (
    <Pressable onPress={handlePress} disabled={disabled}
      style={[styles.trackWrap, disabled && styles.disabledOuter]}
    >
      <Animated.View style={[styles.track, !value && styles.trackOff, trackStyle]}>
        <Animated.View style={[styles.thumb, Shadows.sm, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxProps {
  value:     boolean;
  onChange:  (v: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({ value, onChange, disabled = false }: CheckboxProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  function handlePress() {
    if (disabled) return;
    scale.value = withTiming(0.85, { duration: Timing.tap }, () => {
      scale.value = withTiming(1, { duration: Timing.tap });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(!value);
  }

  return (
    <Pressable onPress={handlePress} disabled={disabled} hitSlop={8}>
      <Animated.View style={[
        styles.checkbox,
        value    && styles.checkboxSelected,
        disabled && styles.checkboxDisabled,
        animStyle,
      ]}>
        {value ? <View style={styles.checkmark} /> : null}
      </Animated.View>
    </Pressable>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────

interface RadioProps {
  value:     boolean;
  onChange:  () => void;
  disabled?: boolean;
}

export function Radio({ value, onChange, disabled = false }: RadioProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  function handlePress() {
    if (disabled) return;
    scale.value = withTiming(0.85, { duration: Timing.tap }, () => {
      scale.value = withTiming(1, { duration: Timing.tap });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange();
  }

  return (
    <Pressable onPress={handlePress} disabled={disabled} hitSlop={8}>
      <Animated.View style={[
        styles.radio,
        value    && styles.radioSelected,
        disabled && styles.radioDisabled,
        animStyle,
      ]}>
        {value ? <View style={styles.radioDot} /> : null}
      </Animated.View>
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Toggle
  trackWrap: {
    alignSelf: 'flex-start',
  },
  track: {
    width:             44,
    height:            24,
    borderRadius:      Radius.full,
    justifyContent:    'center',
    paddingHorizontal: 2,
  },
  trackOff: {
    borderWidth: 1,
    borderColor: 'rgba(124,108,255,0.30)',
  },
  thumb: {
    width:        20,
    height:       20,
    borderRadius: Radius.full,
  },
  disabledOuter: {
    opacity: 0.5,
  },

  // Checkbox
  checkbox: {
    width:          20,
    height:         20,
    borderRadius:   Radius.xs,
    borderWidth:    1.5,
    borderColor:    Colors.text.secondary,
    alignItems:     'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.purple.primary,
    borderWidth:     0,
  },
  checkboxDisabled: {
    backgroundColor: Colors.bg.elevated,
    borderColor:     Colors.text.muted,
    opacity:         0.5,
  },
  checkmark: {
    width:             10,
    height:            6,
    borderBottomWidth: 2,
    borderLeftWidth:   2,
    borderColor:       Colors.text.primary,
    transform:         [{ rotate: '-45deg' }, { translateY: -1 }],
  },

  // Radio
  radio: {
    width:          20,
    height:         20,
    borderRadius:   Radius.full,
    borderWidth:    1.5,
    borderColor:    Colors.text.secondary,
    alignItems:     'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderWidth: 2,
    borderColor: Colors.purple.primary,
  },
  radioDisabled: {
    borderColor: Colors.text.muted,
    opacity:     0.5,
  },
  radioDot: {
    width:           8,
    height:          8,
    borderRadius:    Radius.full,
    backgroundColor: Colors.purple.primary,
  },
});
