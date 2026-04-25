import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../components/AuthProvider';

export default function BeliefNamingScreen() {
  const { user } = useAuth();
  const [beliefName, setBeliefName] = useState('');
  const [newStory, setNewStory] = useState('');
  const [saving, setSaving] = useState(false);

  const canContinue = beliefName.trim().length > 5 && newStory.trim().length > 10;

  async function handleFinish() {
    if (!canContinue || saving) return;
    setSaving(true);

    onboardingData.beliefName = beliefName.trim();
    onboardingData.newStory = newStory.trim();

    try {
      if (user) {
        await supabase.from('users').upsert({
          id: user.id,
          email: user.email ?? '',
          timezone: 'UTC',
          is_premium: false,
        });

        const { error: profileError } = await supabase.from('identity_profiles').upsert({
          user_id: user.id,
          origin_statement: onboardingData.struggle,
          desired_self: onboardingData.newStory,
          transition_type: onboardingData.intent,
          key_vocabulary: [],
          chapter: 1,
        });
        if (profileError) throw profileError;

        const { error: beliefError } = await supabase.from('beliefs').insert({
          user_id: user.id,
          old_belief: onboardingData.beliefName,
          new_story: onboardingData.newStory,
          baseline_score: onboardingData.baseline,
          current_score: onboardingData.baseline,
          score_history: [],
          trigger_patterns: [],
          breakthrough_days: [],
          status: 'active',
        });
        if (beliefError) throw beliefError;
      }

      router.replace('/(tabs)/home');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      Alert.alert('Something went wrong', msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.step}>6 of 6</Text>
            <Text style={styles.title}>Name your belief</Text>
          </View>

          <View style={styles.struggleCard}>
            <Text style={styles.struggleLabel}>Your struggle</Text>
            <Text style={styles.struggleText}>{onboardingData.struggle || '—'}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>What's the belief behind this?</Text>
            <Text style={styles.hint}>e.g. "I'm not good enough" · "I always fail" · "I don't belong"</Text>
            <TextInput
              style={styles.input}
              value={beliefName}
              onChangeText={setBeliefName}
              placeholder="I believe that..."
              placeholderTextColor={Colors.text3}
              maxLength={120}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Who are you becoming?</Text>
            <Text style={styles.hint}>Write 1–2 sentences. Make it true in the future, not a wish.</Text>
            <TextInput
              style={[styles.input, styles.inputMulti]}
              value={newStory}
              onChangeText={setNewStory}
              placeholder="I am someone who..."
              placeholderTextColor={Colors.text3}
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
            <Text style={styles.buttonText}>{saving ? 'Saving…' : 'Begin your journey'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  flex: { flex: 1 },
  scroll: { padding: Spacing.lg, gap: Spacing.lg, paddingBottom: Spacing.xxl },
  back: { paddingTop: Spacing.sm },
  backText: { ...Typography.body, color: Colors.text3 },
  header: { gap: Spacing.sm },
  step: { ...Typography.caption, color: Colors.text3, letterSpacing: 1.5, textTransform: 'uppercase' },
  title: { ...Typography.heading, fontSize: 28, fontWeight: '700', color: Colors.text1 },
  struggleCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  struggleLabel: { ...Typography.caption, color: Colors.text3, textTransform: 'uppercase', letterSpacing: 1 },
  struggleText: { ...Typography.body, color: Colors.text2, lineHeight: 22, fontStyle: 'italic' },
  section: { gap: Spacing.sm },
  label: { ...Typography.body, fontWeight: '600', color: Colors.text1 },
  hint: { ...Typography.caption, color: Colors.text3, lineHeight: 18 },
  input: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    color: Colors.text1,
    fontSize: 15,
    lineHeight: 22,
  },
  inputMulti: { minHeight: 90, textAlignVertical: 'top' },
  button: {
    borderRadius: Radius.full,
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginTop: Spacing.sm,
  },
  buttonDisabled: { opacity: 0.35 },
  buttonText: { ...Typography.body, fontWeight: '700', color: Colors.text1 },
});
