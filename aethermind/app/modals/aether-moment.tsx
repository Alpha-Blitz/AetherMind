import { useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { Colors, Typography, Space } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';
import type { AetherExpression } from '../../components/aether/AetherCharacter';

interface Props {
  message?:    string;
  expression?: AetherExpression;
  trigger?:    string;
}

export default function AetherMomentModal({
  message    = '"You say you want discipline.\nYet you avoid resistance."',
  expression = 'speaking',
  trigger    = 'PATTERN · 3 days',
}: Props) {
  const messageOp = useSharedValue(0);
  const labelOp   = useSharedValue(0);
  const dismissOp = useSharedValue(0);

  useEffect(() => {
    messageOp.value = withDelay(400,  withTiming(1, { duration: 400 }));
    labelOp.value   = withDelay(700,  withTiming(1, { duration: 350 }));
    dismissOp.value = withDelay(3000, withTiming(1, { duration: 500 }));
  }, []);

  const messageStyle = useAnimatedStyle(() => ({ opacity: messageOp.value }));
  const labelStyle   = useAnimatedStyle(() => ({ opacity: labelOp.value }));
  const dismissStyle = useAnimatedStyle(() => ({ opacity: dismissOp.value }));

  return (
    <Pressable style={styles.overlay} onPress={() => router.back()}>
      <View style={styles.content}>
        <AetherCharacter expression={expression} size="large" />

        <Animated.Text style={[styles.message, messageStyle]}>
          {message}
        </Animated.Text>

        <Animated.Text style={[styles.triggerLabel, labelStyle]}>
          {trigger}
        </Animated.Text>

        <Animated.Text style={[styles.dismissText, dismissStyle]}>
          Sit with this
        </Animated.Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
    padding:        40,
    backgroundColor: 'rgba(13,10,26,0.97)',
  },
  content: {
    alignItems: 'center',
    gap:        Space.xxl,
    width:      '100%',
  },
  message: {
    ...Typography.aetherSpeech,
    fontSize:   22,
    lineHeight: 34,
    textAlign:  'center',
    color:      Colors.text.primary,
  },
  triggerLabel: {
    ...Typography.label,
    color:         Colors.text.tertiary,
    letterSpacing: 1.5,
  },
  dismissText: {
    ...Typography.body,
    color:     Colors.purple.mid,
    marginTop: Space.sm,
  },
});
