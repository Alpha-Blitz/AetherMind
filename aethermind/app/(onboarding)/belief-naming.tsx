import { useState } from 'react';
import {
  View, Text, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../components/AuthProvider';
import AetherCharacter from '../../components/aether/AetherCharacter';
import ProgressDots from '../../components/onboarding/ProgressDots';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

export default function BeliefNamingScreen() {
  const { user } = useAuth();
  const [beliefName, setBeliefName] = useState('');
  const [newStory,   setNewStory]   = useState('');
  const [saving,     setSaving]     = useState(false);

  const canContinue = beliefName.trim().length >= 5 && newStory.trim().length >= 5;

  async function handleFinish() {
    if (!canContinue || saving) return;
    setSaving(true);

    onboardingData.beliefName = beliefName.trim();
    onboardingData.newStory   = newStory.trim();

    try {
      if (user) {
        await supabase.from('users').upsert({
          id:         user.id,
          email:      user.email ?? '',
          timezone:   'UTC',
          is_premium: false,
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
      // dev preview — continue without backend
    }

    setSaving(false);
    router.replace('/(tabs)/home');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <ProgressDots total={6} current={5} />
          </View>

          <View style={styles.aetherWrap}>
            <AetherCharacter expression="encouraging" size="medium" />
          </View>

          <Text style={styles.reflectLabel}>I hear something underneath this. ✦</Text>

          {onboardingData.struggle ? (
            <Card>
              <Text style={styles.struggleEcho}>{onboardingData.struggle}</Text>
            </Card>
          ) : null}

          <View style={styles.form}>
            <Input
              label="The belief underneath this is…"
              value={beliefName}
              onChangeText={setBeliefName}
              placeholder="I am not ___. I don't deserve ___."
            />

            <Input
              label="The person I'm becoming believes…"
              value={newStory}
              onChangeText={setNewStory}
              placeholder="I am someone who ___."
              multiline
              numberOfLines={3}
            />
          </View>

          <Button
            label="Begin"
            onPress={handleFinish}
            loading={saving}
            disabled={!canContinue}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex:            1,
    backgroundColor: Colors.bg.primary,
  },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom:     Space[7],
    gap:               Space[5],
  },
  topBar: {
    paddingTop: Space[5],
    alignItems: 'center',
  },
  aetherWrap: {
    alignItems: 'center',
  },
  reflectLabel: {
    ...Typography.aetherSpeech,
    color: Colors.purple.soft,
  },
  struggleEcho: {
    ...Typography.aetherSpeech,
    color: Colors.text.secondary,
  },
  form: {
    gap: Space[4],
  },
});
