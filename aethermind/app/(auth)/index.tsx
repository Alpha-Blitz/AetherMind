import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withTiming, withDelay, Easing,
} from 'react-native-reanimated';
import { Colors, Typography, Space } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';

export default function SplashScreen() {
  const titleOp  = useSharedValue(0);
  const tagOp    = useSharedValue(0);
  const footerOp = useSharedValue(0);

  useEffect(() => {
    titleOp.value  = withDelay(600,  withTiming(1, { duration: 600 }));
    tagOp.value    = withDelay(1000, withTiming(1, { duration: 500 }));
    footerOp.value = withDelay(1400, withTiming(1, { duration: 500 }));

    const t = setTimeout(() => router.replace('/(auth)/login'), 2800);
    return () => clearTimeout(t);
  }, []);

  const titleStyle  = useAnimatedStyle(() => ({ opacity: titleOp.value }));
  const tagStyle    = useAnimatedStyle(() => ({ opacity: tagOp.value }));
  const footerStyle = useAnimatedStyle(() => ({ opacity: footerOp.value }));

  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <AetherCharacter expression="idle" size="large" />
        <Animated.View style={[styles.titleWrap, titleStyle]}>
          <Text style={styles.brand}>AetherMind</Text>
        </Animated.View>
        <Animated.Text style={[styles.tagline, tagStyle]}>
          Your inner guide. Always with you.
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
    flex: 1,
    backgroundColor: Colors.bg.base,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Space.lg },
  titleWrap: { alignItems: 'center' },
  brand: {
    fontSize: 36,
    fontWeight: '600',
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  footer: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
    paddingBottom: Space.xl,
  },
});
