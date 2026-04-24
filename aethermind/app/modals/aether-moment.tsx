import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

const { height } = Dimensions.get('window');

// Full-screen Aether takeover modal — fires ONLY at trigger events
// Sprint 3: wired to aether_events + push notifications
// Design rule: 1–3 sentences max. Reflective. Never instructive.
export default function AetherMomentModal() {
  const C = Colors.dark;

  return (
    <View style={[styles.overlay, { backgroundColor: 'rgba(13,11,30,0.97)' }]}>
      <View style={styles.content}>
        {/* TODO Sprint 3: AetherCharacter animated (Large size) */}
        <View style={[styles.aetherIcon, { backgroundColor: C.surface }]}>
          <Text style={{ fontSize: 40, color: C.primaryLight }}>✦</Text>
        </View>

        {/* Message injected from route params / aether_events table */}
        <Text style={[styles.message, { color: C.text }]}>
          "You say you want discipline.{'\n'}Yet you avoid resistance."
        </Text>

        <Text style={[styles.triggerLabel, { color: C.textMuted }]}>PATTERN · 3 days</Text>

        <TouchableOpacity onPress={() => router.back()} style={styles.dismiss}>
          <Text style={[styles.dismissText, { color: C.textSecondary }]}>Sit with this</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  content: { alignItems: 'center', gap: 32, width: '100%' },
  aetherIcon: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  message: { fontSize: 22, fontWeight: '600', textAlign: 'center', lineHeight: 34, fontStyle: 'italic' },
  triggerLabel: { fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase' },
  dismiss: { marginTop: 20 },
  dismissText: { fontSize: 16 },
});
