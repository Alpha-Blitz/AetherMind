import { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  Pressable, TextInputProps, ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography, Space, Timing } from '../../constants/theme';

interface Props extends Omit<TextInputProps, 'style'> {
  label?:          string;
  disabled?:       boolean;
  onClear?:        () => void;
  containerStyle?: ViewStyle;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Input({
  label,
  disabled  = false,
  value,
  onClear,
  multiline = false,
  containerStyle,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);

  const borderColor   = useSharedValue('rgba(124,108,255,0.20)');
  const shadowOpacity = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    borderColor:    borderColor.value,
    shadowOpacity:  shadowOpacity.value,
    shadowColor:    '#20104C',
    shadowRadius:   30,
    shadowOffset:   { width: 0, height: 8 },
  }));

  function handleFocus() {
    setFocused(true);
    borderColor.value   = withTiming(Colors.purple.primary,  { duration: Timing.quick });
    shadowOpacity.value = withTiming(0.46,                   { duration: Timing.quick });
  }

  function handleBlur() {
    setFocused(false);
    const filled = typeof value === 'string' && value.length > 0;
    borderColor.value   = withTiming(
      filled ? 'rgba(124,108,255,0.40)' : 'rgba(124,108,255,0.20)',
      { duration: Timing.quick },
    );
    shadowOpacity.value = withTiming(0, { duration: Timing.quick });
  }

  const hasValue  = typeof value === 'string' && value.length > 0;
  const showClear = hasValue && !disabled && !!onClear;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <AnimatedView style={[
        styles.container,
        multiline && styles.textArea,
        disabled  && styles.containerDisabled,
        animStyle,
      ]}>
        <TextInput
          value={value}
          editable={!disabled}
          multiline={multiline}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={Colors.text.muted}
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            disabled  && styles.inputDisabled,
          ]}
          {...rest}
        />
        {showClear ? (
          <Pressable onPress={onClear} hitSlop={8} style={styles.iconWrap}>
            <Text style={styles.clearIcon}>×</Text>
          </Pressable>
        ) : null}
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Space[2],
  },
  label: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  container: {
    backgroundColor:   Colors.bg.elevated,
    borderWidth:       1,
    borderRadius:      10,
    height:            48,
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: Space[4],
    elevation:         8,
  },
  textArea: {
    height:          undefined,
    minHeight:       100,
    alignItems:      'flex-start',
    paddingVertical: Space[3],
  },
  containerDisabled: {
    backgroundColor: Colors.bg.surface,
    borderColor:     'rgba(124,108,255,0.10)',
    opacity:         0.6,
  },
  input: {
    flex:    1,
    ...Typography.bodyLarge,
    color:   Colors.text.primary,
    padding: 0,
  },
  inputMultiline: {
    ...Typography.body,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    color: Colors.text.muted,
  },
  iconWrap: {
    paddingLeft: Space[2],
  },
  clearIcon: {
    ...Typography.bodyLarge,
    color:      Colors.text.secondary,
    lineHeight: 20,
  },
});
