import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';

export default function MirrorModal() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>WEEKLY MIRROR</Text>
        <Text style={styles.heading}>Week 1</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A letter from Aether</Text>
          <Text style={styles.body}>
            This week, you showed up.{'\n\n'}
            The pattern I see: you engage most deeply when the pressure is external.
            What would it look like to bring that same urgency from within?
          </Text>
        </View>

        <View style={[styles.section, styles.lockedSection]}>
          <Text style={styles.sectionTitle}>Patterns</Text>
          <Text style={styles.lockedText}>Premium — upgrade to unlock</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.bg.base },
  content: { padding: 20, gap: Space.xl },
  label:   { ...Typography.label, color: Colors.text.tertiary, letterSpacing: 1.5 },
  heading: { fontSize: 32, fontWeight: '500', color: Colors.text.primary, letterSpacing: -0.5 },
  section: {
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg, padding: Space.xl, gap: Space.md,
    borderWidth: 1, borderColor: Colors.border.default,
    ...Shadows.card,
  },
  lockedSection: { opacity: 0.5 },
  sectionTitle:  { ...Typography.label, color: Colors.purple.soft, letterSpacing: 1 },
  body:          { ...Typography.body, color: Colors.text.secondary, lineHeight: 26 },
  lockedText:    { ...Typography.caption, color: Colors.text.tertiary },
  button: {
    backgroundColor: Colors.purple.strong,
    height: 54, borderRadius: Radius.lg,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.button,
  },
  buttonText: { ...Typography.cta, color: '#ffffff' },
});
