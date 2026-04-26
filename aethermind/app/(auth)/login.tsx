import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius } from '../../constants/theme';
import { signInWithEmail, signInWithGoogle } from '../../lib/auth';
import AetherCharacter from '../../components/aether/AetherCharacter';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const DEV_MODE =
  !process.env.EXPO_PUBLIC_SUPABASE_URL ||
  process.env.EXPO_PUBLIC_SUPABASE_URL.includes('placeholder');

export default function LoginScreen() {
  const [email,    setEmail]    = useState(DEV_MODE ? 'test@aethermind.app' : '');
  const [password, setPassword] = useState(DEV_MODE ? 'password' : '');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  async function handleLogin() {
    if (!email.trim() || !password) return;
    setError('');

    if (DEV_MODE) {
      router.replace('/(tabs)/home');
      return;
    }

    setLoading(true);
    const { error: authError } = await signInWithEmail(email.trim(), password);
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      router.replace('/(tabs)/home');
    }
  }

  async function handleGoogle() {
    if (DEV_MODE) {
      router.replace('/(tabs)/home');
      return;
    }
    setError('');
    setLoading(true);
    const { error: authError } = await signInWithGoogle();
    setLoading(false);
    if (authError) setError(authError.message);
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
          {DEV_MODE && (
            <View style={styles.devBanner}>
              <Text style={styles.devText}>Dev mode · credentials pre-filled</Text>
            </View>
          )}

          <View style={styles.aetherWrap}>
            <AetherCharacter expression="idle" size="medium" />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.sub}>Your practice continues.</Text>
          </View>

          <View style={styles.form}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordWrap}>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.forgotWrap}
                onPress={() => router.push('/(auth)/forgot-password')}
              >
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button
              label="Sign in"
              onPress={handleLogin}
              loading={loading}
              disabled={!email.trim() || !password}
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

          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.footerLink}>Sign up</Text>
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
    backgroundColor: Colors.bg.primary,
  },
  flex: { flex: 1 },
  container: {
    flexGrow:          1,
    paddingHorizontal: 20,
    paddingTop:        Space[4],
    paddingBottom:     Space[5],
    justifyContent:    'center',
    gap:               Space[5],
  },
  devBanner: {
    backgroundColor:   Colors.bg.elevated,
    borderRadius:      Radius.md,
    borderWidth:       1,
    borderColor:       Colors.purple.primary,
    paddingVertical:   Space[2],
    paddingHorizontal: Space[3],
    alignItems:        'center',
  },
  devText: {
    ...Typography.caption,
    color: Colors.purple.soft,
  },
  aetherWrap: {
    alignItems: 'center',
  },
  header: {
    gap:        Space[2],
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    textAlign: 'center',
  },
  sub: {
    ...Typography.body,
    color:     Colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    gap: Space[3],
  },
  passwordWrap: {
    gap: Space[2],
  },
  forgotWrap: {
    alignSelf: 'flex-end',
  },
  forgot: {
    ...Typography.caption,
    color: Colors.purple.soft,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
  },
  divider: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Space[2],
  },
  dividerLine: {
    flex:            1,
    height:          1,
    backgroundColor: 'rgba(124, 108, 255, 0.15)',
  },
  dividerText: {
    ...Typography.caption,
    color: Colors.text.muted,
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
