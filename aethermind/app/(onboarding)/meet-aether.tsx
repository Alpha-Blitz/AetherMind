import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withTiming, withDelay,
} from 'react-native-reanimated';
import { Colors, Typography, Space } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';
import ProgressDots from '../../components/onboarding/ProgressDots';

export default function MeetAetherScreen() {
  const textOp   = useSharedValue(0);
  const footerOp = useSharedValue(0);

  useEffect(() => {
    textOp.value   = withDelay(700, withTiming(1, { duration: 600 }));
    footerOp.value = withDelay(1400, withTiming(1, { duration: 500 }));
  }, []);

  const textStyle   = useAnimatedStyle(() => ({ opacity: textOp.value }));
  const footerStyle = useAnimatedStyle(() => ({ opacity: footerOp.value }));

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => router.push('/(onboarding)/belief-naming')}
      >
        <View style={styles.topBar}>
          <ProgressDots total={6} current={5} />
        </View>

        <View style={styles.center}>
          <AetherCharacter expression="happy" size="large" />

          <Animated.View style={[styles.textBlock, textStyle]}>
            <Text style={styles.title}>Hey, I'm Aether.✦</Text>
            <Text style={styles.body}>
              A reflection of the part of you that already knows the way. I'm here for the long journey.
            </Text>
          </Animated.View>
        </View>

        <Animated.Text style={[styles.footer, footerStyle]}>
          Tap anywhere to continue
        </Animated.Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg.base },
  container: {
    flex: 1, paddingHorizontal: 20, paddingBottom: 20,
    alignItems: 'center',
  },
  topBar: { paddingTop: Space.lg, alignSelf: 'stretch', alignItems: 'center' },
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: Space.xxl,
  },
  textBlock: { alignItems: 'center', gap: Space.lg, paddingHorizontal: Space.lg },
  title: {
    fontSize: 28, fontWeight: '500', lineHeight: 36,
    color: Colors.text.primary, textAlign: 'center', letterSpacing: -0.5,
  },
  body: {
    ...Typography.aetherSpeech,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
    paddingBottom: Space.xl,
  },
});
