import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';

export default function CeremonyModal() {
  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <AetherCharacter expression="celebrating" size="large" />

        <Text style={styles.chapter}>CHAPTER 1 COMPLETE</Text>
        <Text style={styles.heading}>You rewrote this.</Text>

        <View style={styles.storyCard}>
          <Text style={styles.storyLabel}>Who you became</Text>
          <Text style={styles.story}>
            "I am someone who meets resistance with curiosity."
          </Text>
        </View>

        <Text style={styles.stats}>32 days · 31 entries · 3 breakthroughs</Text>

        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>Save transformation card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.nextText}>Begin Chapter 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 40, backgroundColor: 'rgba(13,10,26,0.98)',
  },
  content:    { alignItems: 'center', gap: Space.xl, width: '100%' },
  chapter:    { ...Typography.label, color: Colors.text.tertiary, letterSpacing: 2 },
  heading:    { fontSize: 36, fontWeight: '500', color: Colors.gold, textAlign: 'center' },
  storyCard: {
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg, padding: Space.xl,
    borderWidth: 1, borderColor: Colors.gold,
    width: '100%', gap: Space.sm,
  },
  storyLabel: { ...Typography.caption, color: Colors.text.tertiary },
  story: {
    fontSize: 18, lineHeight: 28, fontStyle: 'italic',
    fontWeight: '500', color: Colors.text.primary,
  },
  stats:       { ...Typography.body, color: Colors.text.secondary },
  shareButton: {
    borderRadius: Radius.full, paddingHorizontal: 32, paddingVertical: 14,
    borderWidth: 1, borderColor: Colors.gold,
  },
  shareText: { ...Typography.body, color: Colors.gold, fontWeight: '500' },
  nextButton: {
    backgroundColor: Colors.purple.strong,
    height: 54, borderRadius: Radius.lg,
    width: '100%', alignItems: 'center', justifyContent: 'center',
    ...Shadows.button,
  },
  nextText: { ...Typography.cta, color: '#ffffff' },
});
