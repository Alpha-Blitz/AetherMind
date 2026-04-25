import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { signInWithEmail, signInWithGoogle } from '../../lib/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) return;
    setLoading(true);
    const { error } = await signInWithEmail(email.trim(), password);
    setLoading(false);
    if (error) {
      Alert.alert('Sign in failed', error.message);
    } else {
      router.replace('/(tabs)/home');
    }
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
          <View style={styles.header}>
            <Text style={styles.brand}>AetherMind</Text>
            <Text style={styles.tagline}>Rewrite Yourself.</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={Colors.text3}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={Colors.text3}
              secureTextEntry
              autoComplete="password"
            />
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>{loading ? 'Signing in…' : 'Continue'}</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogle}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.link}>No account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  flex: { flex: 1 },
  container: { flex: 1, padding: Spacing.lg, justifyContent: 'center', gap: Spacing.xl },
  header: { gap: Spacing.xs, alignItems: 'center' },
  brand: { fontSize: 36, fontWeight: '800', color: Colors.primary },
  tagline: { ...Typography.body, color: Colors.text2 },
  form: { gap: Spacing.sm },
  input: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    color: Colors.text1,
    fontSize: 15,
  },
  button: {
    borderRadius: Radius.full,
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginTop: Spacing.xs,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...Typography.body, fontWeight: '700', color: Colors.text1 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { ...Typography.caption, color: Colors.text3 },
  googleButton: {
    borderRadius: Radius.full,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  googleButtonText: { ...Typography.body, color: Colors.text1 },
  link: { ...Typography.body, color: Colors.text2, textAlign: 'center' },
});
