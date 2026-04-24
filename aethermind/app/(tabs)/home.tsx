import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

// Sprint 1: scaffold only — wired up in Sprint 2 (Daily Loop)
export default function HomeScreen() {
  const C = Colors.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.greeting, { color: C.textMuted }]}>Good morning</Text>
        <Text style={[styles.heading, { color: C.text }]}>Daily Dashboard</Text>

        {/* Belief score card — Sprint 3 */}
        <View style={[styles.card, { backgroundColor: C.surface }]}>
          <Text style={[styles.cardLabel, { color: C.textSecondary }]}>Active belief</Text>
          <Text style={[styles.cardValue, { color: C.text }]}>—</Text>
        </View>

        {/* Alignment protocol — Sprint 2 */}
        <View style={[styles.card, { backgroundColor: C.surface }]}>
          <Text style={[styles.cardLabel, { color: C.textSecondary }]}>Today's alignment</Text>
          <Text style={[styles.cardValue, { color: C.textMuted }]}>Not yet generated</Text>
        </View>

        {/* Streak — Sprint 3 */}
        <View style={[styles.card, { backgroundColor: C.surface }]}>
          <Text style={[styles.cardLabel, { color: C.textSecondary }]}>Streak</Text>
          <Text style={[styles.cardValue, { color: C.gold }]}>—</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, gap: 16 },
  greeting: { fontSize: 14, marginBottom: 4 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  card: { borderRadius: 16, padding: 20 },
  cardLabel: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  cardValue: { fontSize: 18, fontWeight: '600' },
});
