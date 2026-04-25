import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';

export default function StruggleScreen() {
  const [text, setText] = useState('');
  const canContinue = text.trim().length >= 20;

  function handleContinue() {
    onboardingData.struggle = text.trim();
    router.push('/(onboarding)/baseline');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.step}>2 of 6</Text>
            <Text style={styles.title}>What's holding you back?</Text>
            <Text style={styles.sub}>
              Describe what you're struggling with. Be honest — this seeds your first belief.
            </Text>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="I've always felt like I'm not capable enough to..."
              placeholderTextColor={Colors.text3}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              autoFocus
              maxLength={500}
            />
            <Text style={styles.charCount}>{text.length}/500</Text>
          </View>

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
  safe: { flex: 1, backgroundColor: Colors.bg },
  flex: { flex: 1 },
  container: { flex: 1, padding: Spacing.lg, gap: Spacing.lg },
  back: { paddingTop: Spacing.sm },
  backText: { ...Typography.body, color: Colors.text3 },
  header: { gap: Spacing.sm },
  step: { ...Typography.caption, color: Colors.text3, letterSpacing: 1.5, textTransform: 'uppercase' },
  title: { ...Typography.heading, fontSize: 28, fontWeight: '700', color: Colors.text1 },
  sub: { ...Typography.body, color: Colors.text2, lineHeight: 22 },
  inputWrap: { flex: 1 },
  input: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    color: Colors.text1,
    fontSize: 15,
    lineHeight: 24,
  },
  charCount: { ...Typography.caption, color: Colors.text3, textAlign: 'right', marginTop: Spacing.xs },
  button: {
    borderRadius: Radius.full,
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  buttonDisabled: { opacity: 0.35 },
  buttonText: { ...Typography.body, fontWeight: '700', color: Colors.text1 },
});
