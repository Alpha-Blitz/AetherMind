import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import AetherCharacter from '../../components/aether/AetherCharacter';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ForgotPasswordScreen() {
  const [email,   setEmail]   = useState('');
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  async function handleSend() {
    if (!email.trim()) return;
    setError('');
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setSent(true);
    }
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
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back to sign in</Text>
          </TouchableOpacity>

          <View style={styles.aetherWrap}>
            <AetherCharacter
              expression={sent ? 'happy' : 'empathetic'}
              size="medium"
            />
          </View>

          {sent ? (
            <View style={styles.header}>
              <Text style={styles.title}>Check your inbox</Text>
              <Text style={styles.sub}>A reset link is on its way.</Text>
            </View>
          ) : (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Reset your password</Text>
                <Text style={styles.sub}>
                  Enter your email and we'll send a reset link.
                </Text>
              </View>

              <View style={styles.form}>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Button
                  label="Send reset link"
                  onPress={handleSend}
                  loading={loading}
                  disabled={!email.trim()}
                />
              </View>
            </>
          )}
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
    paddingTop:        Space.lg,
    paddingBottom:     Space.xl,
    justifyContent:    'center',
    gap:               Space.xl,
  },
  back: {
    position: 'absolute',
    top:      Space.lg,
    left:     20,
  },
  backText: {
    ...Typography.caption,
    color: Colors.purple.mid,
  },
  aetherWrap: {
    alignItems:  'center',
    marginTop:   Space.xxxl,
  },
  header: {
    gap:        Space.sm,
    alignItems: 'center',
  },
  title: {
    ...Typography.heading,
    color:     Colors.text.primary,
    textAlign: 'center',
  },
  sub: {
    ...Typography.body,
    color:     Colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    gap: Space.md,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
  },
});
