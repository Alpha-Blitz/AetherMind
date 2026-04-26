import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography, IconSize, Radius } from '../../constants/theme';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

const ROUTE_CONFIG: Record<string, { label: string; icon: FeatherName }> = {
  home:    { label: 'Home',     icon: 'home'        },
  reflect: { label: 'Reflect',  icon: 'feather'     },
  journey: { label: 'Progress', icon: 'bar-chart-2' },
  journal: { label: 'Journal',  icon: 'book-open'   },
  profile: { label: 'Settings', icon: 'settings'    },
};

function TabItem({
  label, icon, active, onPress,
}: { label: string; icon: FeatherName; active: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withTiming(0.88, { duration: 100 }); }}
      onPressOut={() => { scale.value = withTiming(1,    { duration: 100 }); }}
      style={styles.tab}
    >
      {active ? <View style={styles.indicator} /> : null}
      <Animated.View style={[styles.tabInner, animStyle]}>
        <Feather
          name={icon}
          size={IconSize.md}
          color={active ? Colors.purple.primary : Colors.text.muted}
        />
        <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export default function BottomNav({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, i) => {
        const cfg = ROUTE_CONFIG[route.name];
        if (!cfg) return null;

        return (
          <TabItem
            key={route.key}
            label={cfg.label}
            icon={cfg.icon}
            active={state.index === i}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:   'row',
    backgroundColor: Colors.bg.surface,
    borderTopWidth:  0.5,
    borderTopColor:  'rgba(124,108,255,0.15)',
    minHeight:       60,
  },
  tab: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    paddingTop:     8,
    paddingBottom:  8,
    position:       'relative',
  },
  indicator: {
    position:        'absolute',
    top:             0,
    left:            '20%',
    right:           '20%',
    height:          2,
    borderRadius:    Radius.full,
    backgroundColor: Colors.purple.primary,
  },
  tabInner: {
    alignItems: 'center',
    gap:        4,
  },
  tabLabel: {
    ...Typography.caption,
    color: Colors.text.muted,
  },
  tabLabelActive: {
    color: Colors.purple.primary,
  },
});
