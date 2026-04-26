import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space } from '../../constants/theme';
import { signUpWithEmail, signInWithGoogle } from '../../lib/auth';
import AetherCharacter from '../../components/aether/AetherCharacter';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function SignupScreen() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  async function handleSignup() {
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    const { error: authError } = await signUpWithEmail(email.trim(), password);
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      router.replace('/(onboarding)');
    }
  }

  async function handleGoogle() {
    setError('');
    setLoading(true);
    const { error: authError } = await signInWithGoogle();
    setLoading(false);
    if (authError) setError(authError.message);
  }

  const canSubmit = email.trim().length > 0 && password.length > 0 && confirm.length > 0;

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
          <View style={styles.aetherWrap}>
            <AetherCharacter expression="curious" size="medium" />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.sub}>Your transformation starts here.</Text>
          </View>

          <View style={styles.form}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
            <Input
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Confirm password"
              secureTextEntry
              error={error && password !== confirm && confirm.length > 0 ? "Passwords don't match." : undefined}
            />

            {error && !(password !== confirm && confirm.length > 0) ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <Button
              label="Create account"
              onPress={handleSignup}
              loading={loading}
              disabled={!canSubmit}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              label="Continue with Google"
              onPress={handleGoogle}
              variant="ghost"
              disabled={loading}
            />
          </View>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.footerLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>
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
  aetherWrap: {
    alignItems: 'center',
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
  divider: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Space.sm,
  },
  dividerLine: {
    flex:            1,
    height:          1,
    backgroundColor: Colors.border.default,
  },
  dividerText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  footerText: {
    ...Typography.body,
    color:     Colors.text.secondary,
    textAlign: 'center',
  },
  footerLink: {
    color: Colors.purple.primary,
  },
});
