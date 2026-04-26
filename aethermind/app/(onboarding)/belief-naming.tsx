import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../components/AuthProvider';
import AetherCharacter from '../../components/aether/AetherCharacter';
import ProgressDots from '../../components/onboarding/ProgressDots';

export default function BeliefNamingScreen() {
  const { user } = useAuth();
  const [beliefName, setBeliefName] = useState('');
  const [newStory,   setNewStory]   = useState('');
  const [saving,     setSaving]     = useState(false);

  const canContinue = beliefName.trim().length > 5 && newStory.trim().length > 10;

  async function handleFinish() {
    if (!canContinue || saving) return;
    setSaving(true);

    onboardingData.beliefName = beliefName.trim();
    onboardingData.newStory   = newStory.trim();

    try {
      if (user) {
        await supabase.from('users').upsert({
          id: user.id, email: user.email ?? '',
          timezone: 'UTC', is_premium: false,
        });
        await supabase.from('identity_profiles').upsert({
          user_id:          user.id,
          origin_statement: onboardingData.struggle,
          desired_self:     onboardingData.newStory,
          transition_type:  onboardingData.intent,
          key_vocabulary:   [],
          chapter:          1,
        });
        await supabase.from('beliefs').insert({
          user_id:           user.id,
          old_belief:        onboardingData.beliefName,
          new_story:         onboardingData.newStory,
          baseline_score:    onboardingData.baseline,
          current_score:     onboardingData.baseline,
          score_history:     [],
          trigger_patterns:  [],
          breakthrough_days: [],
          status:            'active',
        });
      }
    } catch (_) {
      // preview mode — continue without backend
    }

    try {
      router.replace('/(tabs)/home');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <ProgressDots total={6} current={6} />
          </View>

          <View style={styles.aetherWrap}>
            <AetherCharacter expression="speaking" size="medium" />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>I hear something{'\n'}underneath this.✦</Text>
            <Text style={styles.sub}>What would you call the belief that's been running the show?</Text>
          </View>

          <TextInput
            style={styles.input}
            value={beliefName}
            onChangeText={setBeliefName}
            placeholder="Type your belief here..."
            placeholderTextColor={Colors.text.tertiary}
            maxLength={120}
          />

          <View style={styles.newStorySection}>
            <Text style={styles.newStoryLabel}>Who are you becoming?</Text>
            <Text style={styles.newStoryHint}>Write 1–2 sentences. Make it true, not a wish.</Text>
            <TextInput
              style={[styles.input, styles.inputMulti]}
              value={newStory}
              onChangeText={setNewStory}
              placeholder="I am someone who..."
              placeholderTextColor={Colors.text.tertiary}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              maxLength={280}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, (!canContinue || saving) && styles.buttonDisabled]}
            onPress={handleFinish}
            disabled={!canContinue || saving}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>{saving ? 'Saving…' : "Let's begin"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: Colors.bg.base },
  flex:   { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 32, gap: Space.lg },
  topBar: { paddingTop: Space.lg, alignItems: 'center' },
  aetherWrap: { alignItems: 'center', paddingVertical: Space.sm },
  header: { gap: Space.sm },
  title: {
    fontSize: 24, fontWeight: '500', lineHeight: 32,
    color: Colors.text.primary, letterSpacing: -0.3,
  },
  sub: { ...Typography.body, color: Colors.text.secondary, lineHeight: 22 },
  input: {
    backgroundColor: Colors.bg.elevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border.active,
    paddingVertical: 14, paddingHorizontal: 14,
    color: Colors.text.primary,
    ...Typography.body,
  },
  inputMulti: { minHeight: 90, textAlignVertical: 'top' },
  newStorySection: { gap: Space.sm },
  newStoryLabel: { ...Typography.subheading, color: Colors.text.primary },
  newStoryHint:  { ...Typography.caption, color: Colors.text.tertiary },
  button: {
    backgroundColor: Colors.purple.strong,
    height: 54, borderRadius: Radius.lg,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.button,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { ...Typography.cta, color: '#ffffff' },
});
