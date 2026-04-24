import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

// Sprint 3: belief score timeline, breakthrough markers, growth tracker
export default function JourneyScreen() {
  const C = Colors.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <View style={styles.content}>
        <Text style={[styles.heading, { color: C.text }]}>Journey</Text>
        <Text style={[styles.sub, { color: C.textMuted }]}>Belief score · Breakthroughs · Growth tracker</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  sub: { fontSize: 14, textAlign: 'center' },
});
