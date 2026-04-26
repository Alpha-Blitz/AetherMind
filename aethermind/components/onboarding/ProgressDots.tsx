import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Radius } from '../../constants/theme';

interface Props {
  total:   number;
  current: number;
}

function Dot({ state }: { state: 'done' | 'current' | 'future' }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (state === 'current') {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 800 }),
          withTiming(1.0, { duration: 800 }),
        ),
        -1, false,
      );
    }
  }, [state]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  if (state === 'current') {
    return <Animated.View style={[styles.dotCurrent, animStyle]} />;
  }

  return (
    <View style={[styles.dot, state === 'done' ? styles.dotDone : styles.dotFuture]} />
  );
}

export default function ProgressDots({ total, current }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <Dot
          key={i}
          state={i < current ? 'done' : i === current ? 'current' : 'future'}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            8,
  },
  dot: {
    width:        8,
    height:       8,
    borderRadius: Radius.full,
  },
  dotDone: {
    backgroundColor: Colors.purple.primary,
  },
  dotFuture: {
    backgroundColor: Colors.border.default,
  },
  dotCurrent: {
    width:           20,
    height:          10,
    borderRadius:    Radius.full,
    backgroundColor: Colors.purple.soft,
  },
});
