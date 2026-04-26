import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Progress</Text>

        <View style={styles.sprintCard}>
          <Text style={styles.sprintLabel}>Sprint 1</Text>
          <View style={styles.sprintContent}>
            <AetherCharacter expression="thinking" size="medium" />
            <View style={styles.sprintText}>
              <Text style={styles.sprintHeading}>Day X of 30</Text>
              <Text style={styles.sprintBody}>
                Your growth map is building.{'\n'}Keep showing up.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyLabel}>More sprints coming soon</Text>
          <Text style={styles.emptyBody}>Keep building your streak.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: Colors.bg.base },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: Space.lg, gap: Space.xl },
  title: {
    fontSize: 22, fontWeight: '500', color: Colors.text.primary, letterSpacing: -0.3,
  },
  sprintCard: {
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    padding: 16, gap: Space.md,
    ...Shadows.card,
  },
  sprintLabel: { ...Typography.label, color: Colors.purple.primary, letterSpacing: 1 },
  sprintContent: { flexDirection: 'row', alignItems: 'center', gap: Space.lg },
  sprintText: { flex: 1, gap: Space.sm },
  sprintHeading: { ...Typography.subheading, color: Colors.text.primary },
  sprintBody: { ...Typography.body, color: Colors.text.secondary, lineHeight: 22 },
  emptyCard: {
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    padding: 16, gap: Space.sm, opacity: 0.5,
  },
  emptyLabel: { ...Typography.caption, color: Colors.text.tertiary },
  emptyBody:  { ...Typography.caption, color: Colors.text.tertiary },
});
