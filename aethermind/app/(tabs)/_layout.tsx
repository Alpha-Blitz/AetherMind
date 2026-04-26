import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color }: { name: IoniconsName; color: string }) {
  return <Ionicons name={name} size={22} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bg.surface,
          borderTopColor: Colors.border.subtle,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        tabBarActiveTintColor:   Colors.purple.primary,
        tabBarInactiveTintColor: Colors.text.tertiary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="sunny-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reflect"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <TabIcon name="book-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <TabIcon name="bar-chart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          tabBarIcon: ({ color }) => <TabIcon name="person-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
