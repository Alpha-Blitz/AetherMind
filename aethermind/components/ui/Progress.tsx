import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  useEffect,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography, Radius, Space } from '../../constants/theme';

// ─── Linear ───────────────────────────────────────────────────────────────────

interface LinearProps {
  value:       number;  // 0–100
  showLabel?:  boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function LinearProgress({ value, showLabel = true }: LinearProps) {
  const pct    = Math.min(Math.max(value, 0), 100);
  const width  = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(pct, { duration: 600 });
  }, [pct]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%` as unknown as number,
  }));

  return (
    <View style={styles.linearRow}>
      <View style={styles.linearTrack}>
        <AnimatedView style={[styles.linearFill, fillStyle]} />
      </View>
      {showLabel && <Text style={styles.pctLabel}>{pct}%</Text>}
    </View>
  );
}

// ─── Circular ─────────────────────────────────────────────────────────────────

interface CircularProps {
  value:    number;  // 0–100
  size?:    number;
  orange?:  boolean;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function CircularProgress({ value, size = 80, orange = false }: CircularProps) {
  const pct      = Math.min(Math.max(value, 0), 100);
  const radius   = (size - 8) / 2;
  const circ     = 2 * Math.PI * radius;
  const color    = orange ? Colors.orange.primary : Colors.purple.primary;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(pct / 100, { duration: 800 });
  }, [pct]);

  const animProps = useAnimatedProps(() => ({
    strokeDashoffset: circ * (1 - progress.value),
  }));

  return (
    <View style={[styles.circularWrap, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.bg.elevated}
          strokeWidth={4}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={4}
          fill="none"
          strokeDasharray={circ}
          strokeLinecap="round"
          animatedProps={animProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.circularInner}>
        <Text style={styles.circularValue}>{pct}</Text>
        <Text style={styles.circularSub}>/100</Text>
      </View>
    </View>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

interface StepsProps {
  total:    number;
  current:  number;  // 1-based
  labels?:  string[];
}

export function StepProgress({ total, current, labels }: StepsProps) {
  return (
    <View style={styles.stepsRow}>
      {Array.from({ length: total }, (_, i) => {
        const step      = i + 1;
        const completed = step < current;
        const active    = step === current;
        const future    = step > current;

        return (
          <View key={i} style={styles.stepItem}>
            {i > 0 && (
              <View style={[styles.connector, completed && styles.connectorDone]} />
            )}
            <View style={[
              styles.stepDot,
              completed && styles.stepDone,
              active    && styles.stepActive,
              future    && styles.stepFuture,
            ]}>
              <Text style={[styles.stepNum, future && styles.stepNumFuture]}>
                {step}
              </Text>
            </View>
            {labels?.[i] ? (
              <Text style={styles.stepLabel}>{labels[i]}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  linearRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Space[2],
  },
  linearTrack: {
    flex:            1,
    height:          6,
    borderRadius:    Radius.full,
    backgroundColor: Colors.bg.elevated,
    overflow:        'hidden',
  },
  linearFill: {
    height:          6,
    borderRadius:    Radius.full,
    backgroundColor: Colors.purple.primary,
  },
  pctLabel: {
    ...Typography.caption,
    color:     Colors.text.muted,
    minWidth:  32,
    textAlign: 'right',
  },

  circularWrap: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  circularInner: {
    position:       'absolute',
    flexDirection:  'row',
    alignItems:     'flex-end',
    gap:            2,
  },
  circularValue: {
    ...Typography.h2,
  },
  circularSub: {
    ...Typography.caption,
    color:        Colors.text.muted,
    marginBottom: 3,
  },

  stepsRow: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    justifyContent: 'center',
  },
  stepItem: {
    alignItems: 'center',
    flex:       1,
  },
  connector: {
    position:        'absolute',
    top:             10,
    right:           '50%',
    left:            '-50%',
    height:          2,
    backgroundColor: Colors.bg.elevated,
  },
  connectorDone: {
    backgroundColor: Colors.purple.primary,
  },
  stepDot: {
    width:           20,
    height:          20,
    borderRadius:    Radius.full,
    backgroundColor: Colors.purple.primary,
    alignItems:      'center',
    justifyContent:  'center',
  },
  stepActive: {
    width:  24,
    height: 24,
  },
  stepDone: {
    backgroundColor: Colors.purple.primary,
  },
  stepFuture: {
    backgroundColor: 'transparent',
    borderWidth:     1.5,
    borderColor:     Colors.text.muted,
  },
  stepNum: {
    ...Typography.caption,
    color: Colors.text.primary,
  },
  stepNumFuture: {
    color: Colors.text.muted,
  },
  stepLabel: {
    ...Typography.caption,
    color:     Colors.text.muted,
    marginTop: Space[1],
    textAlign: 'center',
  },
});
