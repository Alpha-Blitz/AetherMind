import '../global.css';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '../components/AuthProvider';
import { Colors } from '../constants/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// True only when real Supabase credentials are present in .env.local
const isSupabaseConfigured =
  !!process.env.EXPO_PUBLIC_SUPABASE_URL &&
  !process.env.EXPO_PUBLIC_SUPABASE_URL.includes('placeholder');

function AppGate() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      // Without real credentials, skip auth and go straight to onboarding
      router.replace(isSupabaseConfigured ? '/(auth)/login' : '/(onboarding)');
    }
  }, [user, loading]);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.bg } }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modals/aether-moment" options={{ presentation: 'transparentModal', animation: 'fade' }} />
      <Stack.Screen name="modals/mirror" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modals/ceremony" options={{ presentation: 'transparentModal', animation: 'fade' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppGate />
      </AuthProvider>
    </QueryClientProvider>
  );
}
