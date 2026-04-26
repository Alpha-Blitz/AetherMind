import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { Colors, Typography, Radius, Shadows, Space } from '../../constants/theme';

export type SliderVariant = 'default' | 'progress';

interface Props {
  value:        number;
  min?:         number;
  max?:         number;
  onChange?:    (v: number) => void;
  variant?:     SliderVariant;
  showLabels?:  boolean;
  label?:       string;
}

export default function Slider({
  value,
  min        = 1,
  max        = 10,
  onChange,
  variant    = 'default',
  showLabels = true,
  label,
}: Props) {
  const trackWidth = useSharedValue(0);
  const thumbX     = useSharedValue(0);

  const clampedRatio = Math.min(Math.max((value - min) / (max - min), 0), 1);

  function onLayout(e: LayoutChangeEvent) {
    const w = e.nativeEvent.layout.width;
    trackWidth.value = w;
    thumbX.value     = clampedRatio * w;
  }

  function emitValue(x: number) {
    if (!onChange) return;
    const ratio = Math.min(Math.max(x / trackWidth.value, 0), 1);
    onChange(Math.round(min + ratio * (max - min)));
  }

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      thumbX.value = Math.min(Math.max(e.x, 0), trackWidth.value);
      runOnJS(emitValue)(thumbX.value);
    })
    .onUpdate((e) => {
      thumbX.value = Math.min(Math.max(e.x, 0), trackWidth.value);
      runOnJS(emitValue)(thumbX.value);
    });

  const fillStyle = useAnimatedStyle(() => ({
    width: variant === 'progress'
      ? (`${clampedRatio * 100}%` as unknown as number)
      : thumbX.value,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value - 9 }],
  }));

  const isReadOnly = variant === 'progress';
  const pct        = `${Math.round(clampedRatio * 100)}%`;

  const trackEl = (
    <View style={styles.trackWrap} onLayout={onLayout}>
      <View style={[styles.track, isReadOnly && styles.trackProgress]}>
        <Animated.View style={[
          styles.fill,
          isReadOnly && styles.fillProgress,
          fillStyle,
        ]} />
      </View>
      {!isReadOnly && (
        <Animated.View style={[styles.thumb, Shadows.purpleGlow, thumbStyle]} />
      )}
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.row}>
        {showLabels && !isReadOnly && (
          <Text style={styles.rangeLabel}>{min}</Text>
        )}

        <View style={styles.trackContainer}>
          {isReadOnly
            ? trackEl
            : <GestureDetector gesture={gesture}>{trackEl}</GestureDetector>
          }
        </View>

        {showLabels && !isReadOnly && (
          <Text style={styles.rangeLabel}>{max}</Text>
        )}
        {isReadOnly && (
          <Text style={styles.pctLabel}>{pct}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Space[2],
  },
  label: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Space[2],
  },
  trackContainer: {
    flex: 1,
  },
  trackWrap: {
    height:         18,
    justifyContent: 'center',
  },
  track: {
    height:          4,
    borderRadius:    Radius.full,
    backgroundColor: Colors.bg.elevated,
    overflow:        'hidden',
  },
  trackProgress: {
    height: 6,
  },
  fill: {
    height:          4,
    borderRadius:    Radius.full,
    backgroundColor: Colors.purple.primary,
  },
  fillProgress: {
    height:          6,
    backgroundColor: Colors.purple.soft,
  },
  thumb: {
    position:        'absolute',
    top:             0,
    width:           18,
    height:          18,
    borderRadius:    Radius.full,
    backgroundColor: Colors.purple.primary,
  },
  rangeLabel: {
    ...Typography.caption,
    color:     Colors.text.muted,
    minWidth:  14,
    textAlign: 'center',
  },
  pctLabel: {
    ...Typography.caption,
    color:     Colors.text.muted,
    minWidth:  32,
    textAlign: 'right',
  },
});
