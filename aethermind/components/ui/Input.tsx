import { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
  TextInputProps,
} from 'react-native';
import { Colors, Typography, Radius, Space } from '../../constants/theme';

interface Props {
  value:            string;
  onChangeText:     (text: string) => void;
  placeholder?:     string;
  label?:           string;
  error?:           string;
  multiline?:       boolean;
  numberOfLines?:   number;
  secureTextEntry?: boolean;
  autoCapitalize?:  TextInputProps['autoCapitalize'];
  keyboardType?:    KeyboardTypeOptions;
}

export default function Input({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  multiline        = false,
  numberOfLines    = 1,
  secureTextEntry  = false,
  autoCapitalize   = 'sentences',
  keyboardType     = 'default',
}: Props) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? Colors.error
    : focused
    ? Colors.purple.primary
    : Colors.border.active;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.text.tertiary}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          { borderColor },
          multiline && styles.multiline,
        ]}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Space.xs,
  },
  label: {
    ...Typography.label,
    color: Colors.text.tertiary,
  },
  input: {
    backgroundColor:  Colors.bg.elevated,
    borderWidth:      1,
    borderRadius:     Radius.md,
    paddingVertical:  Space.md,
    paddingHorizontal: 14,
    ...Typography.body,
    color:            Colors.text.primary,
  },
  multiline: {
    textAlignVertical: 'top',
    minHeight:         100,
  },
  error: {
    ...Typography.caption,
    color: Colors.error,
  },
});
