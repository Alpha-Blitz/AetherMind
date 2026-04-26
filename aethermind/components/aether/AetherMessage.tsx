import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Space } from '../../constants/theme';

interface Props {
  message: string;
  triggerType?: 'PATTERN' | 'SPIKE' | 'MILESTONE';
}

export default function AetherMessage({ message, triggerType }: Props) {
  return (
    <View style={styles.container}>
      {triggerType && <Text style={styles.trigger}>{triggerType}</Text>}
      <Text style={styles.message}>"{message}"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.lg,
    padding: 20,
    borderLeftWidth: 3,
    gap: Space.sm,
    backgroundColor: Colors.bg.overlay,
    borderLeftColor: Colors.purple.primary,
  },
  trigger: { fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: Colors.text.tertiary },
  message: { fontSize: 18, lineHeight: 28, fontStyle: 'italic', fontWeight: '500', color: Colors.text.primary },
});
