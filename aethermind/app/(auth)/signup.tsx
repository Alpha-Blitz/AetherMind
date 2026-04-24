import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

export default function SignupScreen() {
  const C = Colors.dark;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <View style={styles.content}>
        <Text style={[styles.heading, { color: C.text }]}>Create account</Text>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { backgroundColor: C.surface, color: C.text, borderColor: C.border }]}
            placeholder="Email"
            placeholderTextColor={C.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, { backgroundColor: C.surface, color: C.text, borderColor: C.border }]}
            placeholder="Password"
            placeholderTextColor={C.textMuted}
            secureTextEntry
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: C.primary }]}>
            <Text style={[styles.buttonText, { color: C.text }]}>Begin your journey</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.link, { color: C.textSecondary }]}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 32, justifyContent: 'center', gap: 24 },
  heading: { fontSize: 32, fontWeight: '700', textAlign: 'center' },
  form: { gap: 12 },
  input: { borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1 },
  button: { borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 16, fontWeight: '700' },
  link: { textAlign: 'center', fontSize: 14 },
});
