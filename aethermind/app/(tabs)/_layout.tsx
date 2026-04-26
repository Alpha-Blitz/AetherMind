import { Tabs } from 'expo-router';
import BottomNav from '../../components/ui/BottomNav';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tabs.Screen name="home"    options={{ title: 'Home'     }} />
      <Tabs.Screen name="reflect" options={{ title: 'Reflect'  }} />
      <Tabs.Screen name="journey" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
