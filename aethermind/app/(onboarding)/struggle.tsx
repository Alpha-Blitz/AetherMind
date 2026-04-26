import { useState } from 'react';
import {
  View, Text, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import ProgressDots from '../../components/onboarding/ProgressDots';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const MAX_LENGTH  = 500;
const MIN_LENGTH  = 20;

export default function StruggleScreen() {
  const [text, setText] = useState('');

  const canContinue = text.trim().length >= MIN_LENGTH;

  function handleContinue() {
    onboardingData.struggle = text.trim();
    router.push('/(onboarding)/baseline');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topBar}>
            <ProgressDots total={6} current={1} />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>
              What's the pattern you keep running into?
            </Text>
            <Text style={styles.sub}>Write anything. I'm listening.</Text>
          </View>

          <View style={styles.inputWrap}>
            <Input
              value={text}
              onChangeText={(t) => setText(t.slice(0, MAX_LENGTH))}
              placeholder="Something I keep doing, feeling, or avoiding is…"
              multiline
              numberOfLines={6}
              autoCapitalize="sentences"
            />
            <Text style={styles.charCount}>
              {text.length} / {MAX_LENGTH}
            </Text>
          </View>

          <Button
            label="Continue"
            onPress={handleContinue}
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
    backgroundColor: Colors.bg.base,
  },
  flex: { flex: 1 },
  container: {
    flexGrow:          1,
    paddingHorizontal: 20,
    paddingBottom:     20,
    gap:               Space.xl,
    justifyContent:    'center',
  },
  topBar: {
    paddingTop: Space.xl,
    alignItems: 'center',
  },
  header: {
    gap: Space.sm,
  },
  title: {
    ...Typography.display,
    color: Colors.text.primary,
  },
  sub: {
    ...Typography.aetherSpeech,
    color: Colors.text.secondary,
  },
  inputWrap: {
    gap: Space.xs,
  },
  charCount: {
    ...Typography.caption,
    color:     Colors.text.tertiary,
    textAlign: 'right',
  },
});
