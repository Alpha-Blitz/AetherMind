import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';

export default function JournalScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Journal</Text>
        <View style={styles.emptyState}>
          <AetherCharacter expression="waiting" size="medium" />
          <View style={styles.emptyText}>
            <Text style={styles.emptyHeading}>Your reflections will live here.</Text>
            <Text style={styles.emptyBody}>
              Every check-in and reflection you complete will grow up here.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: Colors.bg.base },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: Space.lg },
  title: {
    fontSize: 22, fontWeight: '500', color: Colors.text.primary,
    letterSpacing: -0.3, marginBottom: Space.xl,
  },
  emptyState: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: Space.xl,
  },
  emptyText: { alignItems: 'center', gap: Space.sm, paddingHorizontal: Space.xl },
  emptyHeading: {
    ...Typography.subheading, color: Colors.text.primary, textAlign: 'center',
  },
  emptyBody: {
    ...Typography.body, color: Colors.text.secondary, textAlign: 'center', lineHeight: 24,
  },
});
