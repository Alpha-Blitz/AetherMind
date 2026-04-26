import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import { signUpWithEmail, signInWithGoogle } from '../../lib/auth';
import AetherCharacter from '../../components/aether/AetherCharacter';

export default function SignupScreen() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSignup() {
    if (!email.trim() || password.length < 6) {
      Alert.alert('Check your details', 'Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await signUpWithEmail(email.trim(), password);
    setLoading(false);
    if (error) Alert.alert('Sign up failed', error.message);
    else router.replace('/(onboarding)');
  }

  async function handleGoogle() {
    setLoading(true);
    const { error } = await signInWithGoogle();
    setLoading(false);
    if (error) Alert.alert('Google sign in failed', error.message);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>

          <View style={styles.aetherWrap}>
            <AetherCharacter expression="curious" size="medium" />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.sub}>Start your journey with AetherMind.</Text>
          </View>

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
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={Colors.text.tertiary}
              secureTextEntry
              autoComplete="new-password"
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>{loading ? 'Creating account…' : 'Continue'}</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.googleBtn}
              onPress={handleGoogle}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.link}>Already have an account? <Text style={styles.linkAccent}>Sign in</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.base },
  flex: { flex: 1 },
  container: {
    flex: 1, paddingHorizontal: 20, paddingTop: Space.lg,
    paddingBottom: Space.xl, justifyContent: 'center', gap: Space.xl,
  },
  aetherWrap: { alignItems: 'center' },
  header: { gap: Space.sm },
  title: { ...Typography.display, color: Colors.text.primary, textAlign: 'center' },
  sub:   { ...Typography.body, color: Colors.text.secondary, textAlign: 'center' },
  form:  { gap: Space.md },
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
    marginTop: Space.sm,
    ...Shadows.button,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { ...Typography.cta, color: '#ffffff' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: Space.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border.default },
  dividerText: { ...Typography.caption, color: Colors.text.tertiary },
  googleBtn: {
    height: 48,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.active,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: { ...Typography.body, color: Colors.purple.soft },
  link: { ...Typography.body, color: Colors.text.secondary, textAlign: 'center' },
  linkAccent: { color: Colors.purple.primary },
});
