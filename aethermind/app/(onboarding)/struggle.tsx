import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import AetherCharacter from '../../components/aether/AetherCharacter';
import ProgressDots from '../../components/onboarding/ProgressDots';

export default function StruggleScreen() {
  const [text, setText] = useState('');
  const canContinue = text.trim().length >= 10;

  function handleContinue() {
    onboardingData.struggle = text.trim();
    router.push('/(onboarding)/baseline');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <ProgressDots total={6} current={2} />
          </View>

          <View style={styles.aetherWrap}>
            <AetherCharacter expression="empathetic" size="medium" />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>What's the main thing{'\n'}you keep running into?</Text>
            <Text style={styles.sub}>Write anything. I'm listening.</Text>
          </View>

          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type here..."
            placeholderTextColor={Colors.text.tertiary}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            autoFocus
            maxLength={500}
          />

          <TouchableOpacity
            style={[styles.button, !canContinue && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={!canContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: Colors.bg.base },
  flex:      { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, paddingBottom: 20, gap: Space.lg },
  topBar:    { paddingTop: Space.lg, alignItems: 'center' },
  aetherWrap:{ alignItems: 'center', paddingVertical: Space.sm },
  header:    { gap: Space.sm },
  title: {
    fontSize: 24, fontWeight: '500', lineHeight: 32,
    color: Colors.text.primary, letterSpacing: -0.3,
  },
  sub: { ...Typography.body, color: Colors.text.secondary },
  input: {
    flex: 1,
    backgroundColor: Colors.bg.elevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border.active,
    paddingVertical: 14, paddingHorizontal: 14,
    color: Colors.text.primary,
    ...Typography.body,
    minHeight: 120,
  },
  button: {
    backgroundColor: Colors.purple.strong,
    height: 54, borderRadius: Radius.lg,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.button,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { ...Typography.cta, color: '#ffffff' },
});
