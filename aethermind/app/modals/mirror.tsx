import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// Weekly Mirror modal — Sunday night, delivered via Mirror Engine
// Premium: full Sonnet 4.6 version. Free: truncated Haiku version.
// Sprint 4: wired to weekly_summaries table
export default function MirrorModal() {
  const C = Colors.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.label, { color: C.textMuted }]}>WEEKLY MIRROR</Text>
        <Text style={[styles.heading, { color: C.text }]}>Week 1</Text>

        {/* Aether's letter */}
        <View style={[styles.section, { backgroundColor: C.surface }]}>
          <Text style={[styles.sectionTitle, { color: C.primaryLight }]}>A letter from Aether</Text>
          <Text style={[styles.body, { color: C.textSecondary }]}>
            This week, you showed up.{'\n\n'}
            The pattern I see: you engage most deeply when the pressure is external.
            What would it look like to bring that same urgency from within?
          </Text>
        </View>

        {/* Pattern analysis — premium */}
        <View style={[styles.section, { backgroundColor: C.surface }]}>
          <Text style={[styles.sectionTitle, { color: C.text }]}>Patterns</Text>
          <Text style={[styles.body, { color: C.textMuted }]}>Premium — upgrade to unlock</Text>
        </View>

        <TouchableOpacity onPress={() => router.back()} style={[styles.button, { backgroundColor: C.primary }]}>
          <Text style={[styles.buttonText, { color: C.text }]}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, gap: 20 },
  label: { fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase' },
  heading: { fontSize: 32, fontWeight: '800' },
  section: { borderRadius: 16, padding: 20, gap: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  body: { fontSize: 16, lineHeight: 26 },
  button: { borderRadius: 100, padding: 18, alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
