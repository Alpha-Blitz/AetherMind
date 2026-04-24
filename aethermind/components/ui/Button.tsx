import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '@/constants/Colors';

type Variant = 'primary' | 'ghost' | 'danger';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({ label, onPress, variant = 'primary', loading, disabled }: Props) {
  const C = Colors.dark;
  const bg = variant === 'primary' ? C.primary : variant === 'danger' ? C.danger : 'transparent';
  const color = variant === 'ghost' ? C.textSecondary : C.text;
  const border = variant === 'ghost' ? { borderWidth: 1, borderColor: C.border } : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, { backgroundColor: bg, opacity: disabled ? 0.4 : 1 }, border]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={[styles.label, { color }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 100, padding: 18, alignItems: 'center' },
  label: { fontSize: 16, fontWeight: '700' },
});
