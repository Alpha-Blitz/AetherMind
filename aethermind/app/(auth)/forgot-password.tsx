import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import { supabase } from '../../lib/supabase';

export default function ForgotPasswordScreen() {
  const [email,  setEmail]  = useState('');
  const [sent,   setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!email.trim()) return;
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);
    setSent(true);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>

          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Reset your password</Text>
            <Text style={styles.sub}>
              {sent
                ? 'No worries! We\'ll send you a link.'
                : 'Enter your email and we\'ll send a reset link.'}
            </Text>
          </View>

          {!sent ? (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor={Colors.text.tertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <TouchableOpacity
                style={[styles.button, (!email.trim() || loading) && styles.buttonDisabled]}
                onPress={handleSend}
                disabled={!email.trim() || loading}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>{loading ? 'Sending…' : 'Send reset link'}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.sentCard}>
              <Text style={styles.sentTitle}>Check your inbox</Text>
              <Text style={styles.sentBody}>
                We sent a reset link to {email}. It may take a few moments. Check your spam folder too.
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.base },
  flex: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: Space.xl, gap: Space.xl },
  back: { paddingTop: Space.sm },
  backText: { ...Typography.body, color: Colors.text.tertiary },
  header: { gap: Space.sm },
  title: { ...Typography.display, color: Colors.text.primary },
  sub:   { ...Typography.body, color: Colors.text.secondary, lineHeight: 22 },
  form: { gap: Space.md },
  input: {
    backgroundColor: Colors.bg.elevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border.active,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: Colors.text.primary,
    ...Typography.body,
  },
  button: {
    backgroundColor: Colors.purple.strong,
    height: 54,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.button,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { ...Typography.cta, color: '#ffffff' },
  sentCard: {
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    padding: Space.xl,
    gap: Space.sm,
    ...Shadows.card,
  },
  sentTitle: { ...Typography.subheading, color: Colors.text.primary },
  sentBody:  { ...Typography.body, color: Colors.text.secondary, lineHeight: 22 },
});
