import { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function CeremonyModal() {
  const chapterOp  = useSharedValue(0);
  const headingOp  = useSharedValue(0);
  const cardScale  = useSharedValue(0.9);
  const cardOp     = useSharedValue(0);
  const statsOp    = useSharedValue(0);
  const actionsOp  = useSharedValue(0);

  useEffect(() => {
    chapterOp.value = withDelay(400,  withTiming(1,   { duration: 350 }));
    headingOp.value = withDelay(700,  withTiming(1,   { duration: 400 }));
    cardOp.value    = withDelay(1000, withTiming(1,   { duration: 400 }));
    cardScale.value = withDelay(1000, withSpring(1,   { damping: 14, stiffness: 120 }));
    statsOp.value   = withDelay(1300, withTiming(1,   { duration: 350 }));
    actionsOp.value = withDelay(1600, withTiming(1,   { duration: 350 }));
  }, []);

  const chapterStyle  = useAnimatedStyle(() => ({ opacity: chapterOp.value }));
  const headingStyle  = useAnimatedStyle(() => ({ opacity: headingOp.value }));
  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity:   cardOp.value,
    transform: [{ scale: cardScale.value }],
  }));
  const statsStyle   = useAnimatedStyle(() => ({ opacity: statsOp.value }));
  const actionsStyle = useAnimatedStyle(() => ({ opacity: actionsOp.value }));

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <AetherCharacter expression="celebrating" size="large" />

        <Animated.Text style={[styles.chapter, chapterStyle]}>
          CHAPTER 1 COMPLETE
        </Animated.Text>

        <Animated.Text style={[styles.heading, headingStyle]}>
          You rewrote this.
        </Animated.Text>

        <Animated.View style={[{ width: '100%' }, cardAnimStyle]}>
          <Card style={styles.storyCard}>
            <Text style={styles.storyLabel}>WHO YOU BECAME</Text>
            <Text style={styles.storyText}>
              "I am someone who meets resistance with curiosity."
            </Text>
          </Card>
        </Animated.View>

        <Animated.Text style={[styles.stats, statsStyle]}>
          32 days · 31 entries · 3 breakthroughs
        </Animated.Text>

        <Animated.View style={[styles.actions, actionsStyle]}>
          <Pressable style={styles.shareBtn}>
            <Text style={styles.shareText}>Save transformation card</Text>
          </Pressable>

          <Button
            label="Begin Chapter 2"
            onPress={() => router.replace('/(tabs)/home')}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:            1,
    justifyContent:  'center',
    alignItems:      'center',
    padding:         40,
    backgroundColor: 'rgba(13,10,26,0.98)',
  },
  content: {
    alignItems: 'center',
    gap:        Space.xl,
    width:      '100%',
  },
  chapter: {
    ...Typography.label,
    color:         Colors.text.tertiary,
    letterSpacing: 2,
  },
  heading: {
    fontSize:   36,
    fontWeight: '500',
    color:      Colors.gold,
    textAlign:  'center',
    lineHeight: 42,
  },
  storyCard: {
    borderColor: Colors.gold,
    gap:         Space.sm,
  },
  storyLabel: {
    ...Typography.label,
    color:         Colors.text.tertiary,
    letterSpacing: 1,
  },
  storyText: {
    fontSize:   18,
    lineHeight: 28,
    fontStyle:  'italic',
    fontWeight: '500',
    color:      Colors.text.primary,
  },
  stats: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  actions: {
    width: '100%',
    gap:   Space.md,
  },
  shareBtn: {
    height:          48,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.gold,
    alignItems:      'center',
    justifyContent:  'center',
  },
  shareText: {
    ...Typography.body,
    color:      Colors.gold,
    fontWeight: '500',
  },
});
