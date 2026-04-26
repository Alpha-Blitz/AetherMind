import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import ProgressDots from '../../components/onboarding/ProgressDots';
import Button from '../../components/ui/Button';

const OPTIONS = [
  { id: 'pattern',    label: "I want to change a pattern I can't shake"                    },
  { id: 'sabotage',   label: 'I want to understand why I self-sabotage'                    },
  { id: 'gap',        label: 'I want to close the gap between who I am and who I could be' },
  { id: 'rebuild',    label: 'I want to build a new version of myself'                     },
] as const;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function OptionCard({
  label,
  active,
  onPress,
}: {
  label:   string;
  active:  boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withTiming(0.97, { duration: 150 }); }}
      onPressOut={() => { scale.value = withTiming(1,    { duration: 150 }); }}
      style={[styles.card, active && styles.cardActive, animStyle]}
    >
      <View style={[styles.radio, active && styles.radioActive]} />
      <Text style={[styles.cardText, active && styles.cardTextActive]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

export default function IntentScreen() {
  const [selected, setSelected] = useState('');

  function handleContinue() {
    if (!selected) return;
    onboardingData.intent = selected;
    router.push('/(onboarding)/struggle');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.topBar}>
          <ProgressDots total={6} current={0} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Why are you here?</Text>
          <Text style={styles.sub}>Be honest. This seeds everything.</Text>
        </View>

        <View style={styles.options}>
          {OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              label={opt.label}
              active={selected === opt.id}
              onPress={() => setSelected(opt.id)}
            />
          ))}
        </View>

        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={!selected}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex:            1,
    backgroundColor: Colors.bg.base,
  },
  container: {
    flex:              1,
    paddingHorizontal: 20,
    paddingBottom:     20,
    gap:               Space.xl,
  },
  topBar: {
    paddingTop: Space.xl,
    alignItems: 'center',
  },
  header: {
    gap: Space.sm,
  },
  title: {
    ...Typography.display,
    color: Colors.text.primary,
  },
  sub: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  options: {
    flex: 1,
    gap:  Space.sm,
    justifyContent: 'center',
  },
  card: {
    flexDirection:    'row',
    alignItems:       'center',
    gap:              Space.md,
    backgroundColor:  Colors.bg.surface,
    borderRadius:     Radius.lg,
    borderWidth:      1,
    borderColor:      Colors.border.default,
    paddingVertical:  16,
    paddingHorizontal: 16,
    ...Shadows.card,
  },
  cardActive: {
    backgroundColor: Colors.bg.elevated,
    borderColor:     Colors.border.active,
  },
  radio: {
    width:        20,
    height:       20,
    borderRadius: 10,
    borderWidth:  2,
    borderColor:  Colors.border.active,
  },
  radioActive: {
    borderColor:     Colors.purple.primary,
    backgroundColor: Colors.purple.primary,
  },
  cardText: {
    ...Typography.body,
    color: Colors.text.secondary,
    flex:  1,
  },
  cardTextActive: {
    color: Colors.text.primary,
  },
});
