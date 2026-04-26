import { useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { Colors, Typography, Space } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';
import ProgressDots from '../../components/onboarding/ProgressDots';
import SpeechBubble from '../../components/ui/SpeechBubble';

export default function MeetAetherScreen() {
  const bubbleOp = useSharedValue(0);
  const hintOp   = useSharedValue(0);

  useEffect(() => {
    bubbleOp.value = withDelay(600,  withTiming(1, { duration: 400 }));
    hintOp.value   = withDelay(1200, withTiming(1, { duration: 400 }));
  }, []);

  const bubbleStyle = useAnimatedStyle(() => ({ opacity: bubbleOp.value }));
  const hintStyle   = useAnimatedStyle(() => ({ opacity: hintOp.value }));

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable
        style={styles.container}
        onPress={() => router.push('/(onboarding)/belief-naming')}
      >
        <View style={styles.topBar}>
          <ProgressDots total={6} current={4} />
        </View>

        <View style={styles.center}>
          <AetherCharacter expression="happy" size="large" />

          <Animated.View style={[styles.bubbleWrap, bubbleStyle]}>
            <SpeechBubble message="I've been waiting for you." />
          </Animated.View>
        </View>

        <Animated.Text style={[styles.hint, hintStyle]}>
          Tap anywhere to continue
        </Animated.Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex:            1,
    backgroundColor: Colors.bg.base,
  },
  container: {
    flex:           1,
    paddingHorizontal: 20,
    paddingBottom:  20,
    alignItems:     'center',
  },
  topBar: {
    paddingTop: Space.xl,
    alignSelf:  'stretch',
    alignItems: 'center',
  },
  center: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Space.xxl,
  },
  bubbleWrap: {
    alignItems: 'center',
  },
  hint: {
    ...Typography.caption,
    color:         Colors.text.tertiary,
    textAlign:     'center',
    paddingBottom: Space.xl,
  },
});
