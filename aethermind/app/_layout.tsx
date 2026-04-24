import '../global.css';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#1a1228' } }}>
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
