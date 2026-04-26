import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Typography, Radius, Shadows } from '../../constants/theme';

type Variant = 'primary' | 'ghost' | 'danger';

interface Props {
  label: string; onPress: () => void;
  variant?: Variant; loading?: boolean; disabled?: boolean;
}

export default function Button({ label, onPress, variant = 'primary', loading, disabled }: Props) {
  const bg = variant === 'primary'
    ? Colors.purple.strong
    : variant === 'danger'
    ? Colors.error
    : 'transparent';
  const color      = variant === 'ghost' ? Colors.purple.soft : '#ffffff';
  const borderStyle = variant === 'ghost'
    ? { borderWidth: 1, borderColor: Colors.border.active }
    : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button, { backgroundColor: bg, opacity: disabled ? 0.4 : 1 },
        borderStyle,
        variant === 'primary' && Shadows.button,
      ]}
    >
      {loading
        ? <ActivityIndicator color={color} />
        : <Text style={[styles.label, { color }]}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { height: 54, borderRadius: Radius.lg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  label:  { ...Typography.cta },
});
