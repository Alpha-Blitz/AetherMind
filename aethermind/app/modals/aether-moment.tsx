import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';

export default function AetherMomentModal() {
  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <AetherCharacter expression="speaking" size="large" />

        <Text style={styles.message}>
          "You say you want discipline.{'\n'}Yet you avoid resistance."
        </Text>

        <Text style={styles.triggerLabel}>PATTERN · 3 days</Text>

        <TouchableOpacity onPress={() => router.back()} style={styles.dismiss}>
          <Text style={styles.dismissText}>Sit with this</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 40, backgroundColor: 'rgba(13,10,26,0.97)',
  },
  content:      { alignItems: 'center', gap: Space.xxl, width: '100%' },
  message: {
    fontSize: 22, fontWeight: '500', textAlign: 'center',
    lineHeight: 34, fontStyle: 'italic', color: Colors.text.primary,
  },
  triggerLabel: { ...Typography.label, color: Colors.text.tertiary, letterSpacing: 1.5 },
  dismiss:      { marginTop: Space.sm },
  dismissText:  { ...Typography.body, color: Colors.purple.mid },
});
