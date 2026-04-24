import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// Step 4: set check-in times + request notification permission
export default function NotificationsScreen() {
  const C = Colors.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <View style={styles.content}>
        <Text style={[styles.heading, { color: C.text }]}>Aether speaks twice a day.</Text>
        <Text style={[styles.sub, { color: C.textSecondary }]}>
          A morning intention. An evening reflection.{'\n'}
          When is right for you?
        </Text>

        {/* TODO Sprint 1: time picker UI */}
        <View style={[styles.timeRow, { backgroundColor: C.surface }]}>
          <Text style={[styles.timeLabel, { color: C.textSecondary }]}>Morning</Text>
          <Text style={[styles.timeValue, { color: C.text }]}>8:00 AM</Text>
        </View>

        <View style={[styles.timeRow, { backgroundColor: C.surface }]}>
          <Text style={[styles.timeLabel, { color: C.textSecondary }]}>Evening</Text>
          <Text style={[styles.timeValue, { color: C.text }]}>9:00 PM</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: C.primary }]}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={[styles.buttonText, { color: C.text }]}>Begin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 32, justifyContent: 'center', gap: 20 },
  heading: { fontSize: 26, fontWeight: '700', lineHeight: 36 },
  sub: { fontSize: 16, lineHeight: 26 },
  timeRow: { borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeLabel: { fontSize: 16 },
  timeValue: { fontSize: 18, fontWeight: '600' },
  button: { borderRadius: 100, padding: 18, alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
