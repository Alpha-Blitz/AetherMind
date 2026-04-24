import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// Belief resolution ceremony — fires when current_score <= 2.0 for 3 consecutive days
// Sprint 4: chapter counter, shareable card, next belief prompt
export default function CeremonyModal() {
  const C = Colors.dark;

  return (
    <View style={[styles.overlay, { backgroundColor: 'rgba(13,11,30,0.98)' }]}>
      <View style={styles.content}>
        <Text style={[styles.chapter, { color: C.textMuted }]}>CHAPTER 1 COMPLETE</Text>

        <Text style={[styles.heading, { color: C.gold }]}>You rewrote this.</Text>

        {/* The sealed new_story from beliefs table */}
        <View style={[styles.storyCard, { backgroundColor: C.surface, borderColor: C.gold }]}>
          <Text style={[styles.storyLabel, { color: C.textMuted }]}>Who you became</Text>
          <Text style={[styles.story, { color: C.text }]}>
            "I am someone who meets resistance with curiosity."
          </Text>
        </View>

        <Text style={[styles.stats, { color: C.textSecondary }]}>
          32 days · 31 entries · 3 breakthroughs
        </Text>

        {/* TODO Sprint 4: shareable card export */}
        <TouchableOpacity style={[styles.shareButton, { borderColor: C.gold }]}>
          <Text style={[styles.shareText, { color: C.gold }]}>Save transformation card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: C.primary }]}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={[styles.nextText, { color: C.text }]}>Begin Chapter 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  content: { alignItems: 'center', gap: 24, width: '100%' },
  chapter: { fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' },
  heading: { fontSize: 36, fontWeight: '800', textAlign: 'center' },
  storyCard: { borderRadius: 16, padding: 24, borderWidth: 1, width: '100%', gap: 8 },
  storyLabel: { fontSize: 11, letterSpacing: 1 },
  story: { fontSize: 18, lineHeight: 28, fontStyle: 'italic', fontWeight: '600' },
  stats: { fontSize: 14 },
  shareButton: { borderRadius: 100, paddingHorizontal: 32, paddingVertical: 14, borderWidth: 1 },
  shareText: { fontSize: 15, fontWeight: '600' },
  nextButton: { borderRadius: 100, paddingHorizontal: 48, paddingVertical: 18, width: '100%', alignItems: 'center' },
  nextText: { fontSize: 16, fontWeight: '700' },
});
