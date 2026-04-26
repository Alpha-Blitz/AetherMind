import { Stack } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: Colors.bg.base },
      animation: 'fade',
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
