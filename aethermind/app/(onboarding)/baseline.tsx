import { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  PanResponder, LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import AetherCharacter from '../../components/aether/AetherCharacter';
import ProgressDots from '../../components/onboarding/ProgressDots';

export default function BaselineScreen() {
  const [value,      setValue]      = useState(0.5); // 0–1
  const [trackWidth, setTrackWidth] = useState(1);
  const trackRef = useRef<View>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder:  () => true,
    onPanResponderGrant: (e) => {
      const x = e.nativeEvent.locationX;
      setValue(Math.max(0, Math.min(1, x / trackWidth)));
    },
    onPanResponderMove: (e) => {
      const x = e.nativeEvent.locationX;
      setValue(Math.max(0, Math.min(1, x / trackWidth)));
    },
  });

  function handleLayout(e: LayoutChangeEvent) {
    setTrackWidth(e.nativeEvent.layout.width);
  }

  function handleContinue() {
    onboardingData.baseline = Math.round(value * 9) + 1;
    router.push('/(onboarding)/disclaimer');
  }

  function handleSkip() {
    onboardingData.baseline = 7;
    router.push('/(onboarding)/disclaimer');
  }

  const thumbLeft = value * trackWidth - 12;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <ProgressDots total={6} current={3} />
        </View>

        <View style={styles.aetherWrap}>
          <AetherCharacter expression="empathetic" size="medium" />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>How are you feeling,{'\n'}right now — honestly?</Text>
          <Text style={styles.sub}>Use the slider to select how heavy it feels.</Text>
        </View>

        <View style={styles.sliderSection}>
          <View
            ref={trackRef}
            style={styles.track}
            onLayout={handleLayout}
            {...panResponder.panHandlers}
          >
            <View style={[styles.trackFill, { width: `${value * 100}%` }]} />
            <View style={[styles.thumb, { left: Math.max(0, thumbLeft) }]} />
          </View>
          <View style={styles.trackLabels}>
            <Text style={styles.trackLabel}>Clear</Text>
            <Text style={styles.trackLabel}>Heavy</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>↓ Skip this step</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: Colors.bg.base },
  container: { flex: 1, paddingHorizontal: 20, paddingBottom: 20, gap: Space.xl },
  topBar:    { paddingTop: Space.lg, alignItems: 'center' },
  aetherWrap:{ alignItems: 'center', paddingVertical: Space.sm },
  header:    { gap: Space.sm },
  title: {
    fontSize: 24, fontWeight: '500', lineHeight: 32,
    color: Colors.text.primary, letterSpacing: -0.3,
  },
  sub: { ...Typography.body, color: Colors.text.secondary },
  sliderSection: { gap: Space.sm },
  track: {
    height: 6, backgroundColor: Colors.bg.elevated,
    borderRadius: 3, position: 'relative',
    borderWidth: 1, borderColor: Colors.border.active,
  },
  trackFill: {
    position: 'absolute', top: 0, left: 0, bottom: 0,
    backgroundColor: Colors.purple.primary, borderRadius: 3,
  },
  thumb: {
    position: 'absolute', top: -9,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.purple.soft,
    borderWidth: 3, borderColor: Colors.bg.base,
    shadowColor: Colors.purple.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, shadowRadius: 6, elevation: 4,
  },
  trackLabels: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: Space.sm,
  },
  trackLabel: { ...Typography.caption, color: Colors.text.tertiary },
  button: {
    backgroundColor: Colors.purple.strong,
    height: 54, borderRadius: Radius.lg,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.button,
  },
  buttonText: { ...Typography.cta, color: '#ffffff' },
  skip: {
    ...Typography.caption, color: Colors.text.tertiary, textAlign: 'center',
  },
});
