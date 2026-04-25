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
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text3,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => <TabIcon name="sunny-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reflect"
        options={{
          title: 'Reflect',
          tabBarIcon: ({ color }) => <TabIcon name="journal-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Journey',
          tabBarIcon: ({ color }) => <TabIcon name="stats-chart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => <TabIcon name="person-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
