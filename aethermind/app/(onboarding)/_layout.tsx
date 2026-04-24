import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0D0B1E' }, animation: 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="struggle" />
      <Stack.Screen name="belief" />
      <Stack.Screen name="story" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
