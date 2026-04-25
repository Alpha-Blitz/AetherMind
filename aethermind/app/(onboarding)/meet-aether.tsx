import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';

export default function MeetAetherScreen() {
  const charOpacity = useSharedValue(0);
  const charTranslate = useSharedValue(30);
  const bubbleOpacity = useSharedValue(0);
  const subOpacity = useSharedValue(0);
  const btnOpacity = useSharedValue(0);

  useEffect(() => {
    charOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
    charTranslate.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) });
    bubbleOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));
    subOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
    btnOpacity.value = withDelay(1800, withTiming(1, { duration: 500 }));
  }, [charOpacity, charTranslate, bubbleOpacity, subOpacity, btnOpacity]);

  const charStyle = useAnimatedStyle(() => ({
    opacity: charOpacity.value,
    transform: [{ translateY: charTranslate.value }],
  }));

  const bubbleStyle = useAnimatedStyle(() => ({ opacity: bubbleOpacity.value }));
  const subStyle = useAnimatedStyle(() => ({ opacity: subOpacity.value }));
  const btnStyle = useAnimatedStyle(() => ({ opacity: btnOpacity.value }));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.step}>5 of 6</Text>

        <View style={styles.center}>
          <Animated.View style={charStyle}>
            <AetherCharacter expression="happy" size="large" />
          </Animated.View>

          <Animated.View style={[styles.bubble, bubbleStyle]}>
            <Text style={styles.quote}>"I've been waiting for you."</Text>
          </Animated.View>

          <Animated.View style={[styles.subWrap, subStyle]}>
            <Text style={styles.subLine}>I'm Aether — a reflection of your higher self.</Text>
            <Text style={styles.subLine}>I don't give advice. I witness your patterns.</Text>
            <Text style={styles.subLine}>I speak rarely. When I do, it matters.</Text>
          </Animated.View>
        </View>

        <Animated.View style={btnStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(onboarding)/belief-naming')}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Begin</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, padding: Spacing.lg, justifyContent: 'space-between' },
  step: { ...Typography.caption, color: Colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', paddingTop: Spacing.sm },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.xl },
  bubble: {
    backgroundColor: Colors.elevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    maxWidth: 280,
  },
  quote: { ...Typography.body, fontSize: 18, fontStyle: 'italic', color: Colors.text1, textAlign: 'center', lineHeight: 28 },
  subWrap: { gap: Spacing.sm, alignItems: 'center' },
  subLine: { ...Typography.body, color: Colors.text2, textAlign: 'center', lineHeight: 22 },
  button: {
    borderRadius: Radius.full,
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  buttonText: { ...Typography.body, fontWeight: '700', color: Colors.text1 },
});
