import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { Colors, Typography, Space } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';

export default function SplashScreen() {
  const brandOp  = useSharedValue(0);
  const tagOp    = useSharedValue(0);
  const footerOp = useSharedValue(0);

  useEffect(() => {
    brandOp.value  = withDelay(600,  withTiming(1, { duration: 400 }));
    tagOp.value    = withDelay(1000, withTiming(1, { duration: 400 }));
    footerOp.value = withDelay(1400, withTiming(1, { duration: 400 }));

    const t = setTimeout(() => router.replace('/(auth)/login'), 2800);
    return () => clearTimeout(t);
  }, []);

  const brandStyle  = useAnimatedStyle(() => ({ opacity: brandOp.value }));
  const tagStyle    = useAnimatedStyle(() => ({ opacity: tagOp.value }));
  const footerStyle = useAnimatedStyle(() => ({ opacity: footerOp.value }));

  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <AetherCharacter expression="idle" size="large" />

        <Animated.Text style={[styles.brand, brandStyle]}>
          AetherMind
        </Animated.Text>

        <Animated.Text style={[styles.tagline, tagStyle]}>
          Rewrite Yourself.
        </Animated.Text>
      </View>

      <Animated.Text style={[styles.footer, footerStyle]}>
        Readying your space…
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:              1,
    backgroundColor:   Colors.bg.primary,
    alignItems:        'center',
    justifyContent:    'center',
    paddingHorizontal: 20,
    paddingBottom:     Space[7],
  },
  center: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Space[4],
  },
  brand: {
    ...Typography.h1,
    textAlign: 'center',
  },
  tagline: {
    ...Typography.body,
    color:     Colors.text.secondary,
    textAlign: 'center',
  },
  footer: {
    ...Typography.caption,
    textAlign:     'center',
    paddingBottom: Space[5],
  },
});
