import { Stack } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: Colors.bg.base },
      animation: 'slide_from_right',
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="struggle" />
      <Stack.Screen name="baseline" />
      <Stack.Screen name="disclaimer" />
      <Stack.Screen name="meet-aether" />
      <Stack.Screen name="belief-naming" />
    </Stack>
  );
}
