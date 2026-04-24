import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface Props {
  message: string;
  triggerType?: 'PATTERN' | 'SPIKE' | 'MILESTONE';
}

// Renders Aether's 1–3 sentence message with the correct visual treatment.
// Used in: push notification deep-link, aether-moment modal, home screen card.
export default function AetherMessage({ message, triggerType }: Props) {
  const C = Colors.dark;

  return (
    <View style={[styles.container, { backgroundColor: C.surface, borderLeftColor: C.primary }]}>
      {triggerType && (
        <Text style={[styles.trigger, { color: C.textMuted }]}>{triggerType}</Text>
      )}
      <Text style={[styles.message, { color: C.text }]}>"{message}"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 16, padding: 20, borderLeftWidth: 3, gap: 8 },
  trigger: { fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' },
  message: { fontSize: 18, lineHeight: 28, fontStyle: 'italic', fontWeight: '500' },
});
