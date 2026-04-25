import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';

const POINTS = [
  {
    title: 'Not a substitute for therapy',
    body: 'AetherMind is a reflection and identity tool. It does not provide therapy, counselling, or psychiatric services.',
  },
  {
    title: 'Not medical advice',
    body: 'Nothing in this app constitutes medical or mental health advice. If you are experiencing a mental health crisis, please contact a qualified professional.',
  },
  {
    title: 'No crisis support',
    body: 'AetherMind is not equipped to handle emergencies. If you are in immediate danger, call your local emergency services.',
  },
  {
    title: 'Your data is private',
    body: 'Your journal entries are encrypted at rest and in transit. They are never used to train AI models.',
  },
];

export default function DisclaimerScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.step}>4 of 6</Text>
          <Text style={styles.title}>Before we begin</Text>
          <Text style={styles.sub}>Please read and acknowledge the following.</Text>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.points}>
            {POINTS.map((point) => (
              <View key={point.title} style={styles.point}>
                <View style={styles.pointDot} />
                <View style={styles.pointContent}>
                  <Text style={styles.pointTitle}>{point.title}</Text>
                  <Text style={styles.pointBody}>{point.body}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(onboarding)/meet-aether')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>I understand</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  back: { paddingTop: Spacing.sm },
  backText: { ...Typography.body, color: Colors.text3 },
  header: { gap: Spacing.sm },
  step: { ...Typography.caption, color: Colors.text3, letterSpacing: 1.5, textTransform: 'uppercase' },
  title: { ...Typography.heading, fontSize: 28, fontWeight: '700', color: Colors.text1 },
  sub: { ...Typography.body, color: Colors.text2, lineHeight: 22 },
  scroll: { flex: 1 },
  points: { gap: Spacing.md, paddingBottom: Spacing.lg },
  point: { flexDirection: 'row', gap: Spacing.md, backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md },
  pointDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginTop: 6 },
  pointContent: { flex: 1, gap: Spacing.xs },
  pointTitle: { ...Typography.body, fontWeight: '600', color: Colors.text1 },
  pointBody: { ...Typography.body, color: Colors.text2, lineHeight: 22 },
  button: {
    borderRadius: Radius.full,
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  buttonText: { ...Typography.body, fontWeight: '700', color: Colors.text1 },
});
