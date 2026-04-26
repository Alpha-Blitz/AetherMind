import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet,
  PanResponder, LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Shadows } from '../../constants/theme';
import { onboardingData } from '../../lib/onboardingState';
import ProgressDots from '../../components/onboarding/ProgressDots';
import Button from '../../components/ui/Button';

const THUMB_SIZE = 28;

export default function BaselineScreen() {
  const [value,      setValue]      = useState(0.4);
  const [trackWidth, setTrackWidth] = useState(1);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder:  () => true,
    onPanResponderGrant: (e) => {
      setValue(Math.max(0, Math.min(1, e.nativeEvent.locationX / trackWidth)));
    },
    onPanResponderMove: (e) => {
      setValue(Math.max(0, Math.min(1, e.nativeEvent.locationX / trackWidth)));
    },
  });

  function handleLayout(e: LayoutChangeEvent) {
    setTrackWidth(e.nativeEvent.layout.width);
  }

  function handleContinue() {
    onboardingData.baseline = Math.round(value * 9) + 1;
    router.push('/(onboarding)/disclaimer');
  }

  const displayValue = Math.round(value * 9) + 1;
  const thumbLeft    = Math.max(0, value * trackWidth - THUMB_SIZE / 2);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.topBar}>
          <ProgressDots total={6} current={2} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>How heavy does it feel right now?</Text>
          <Text style={styles.sub}>No right answer. Just what's true.</Text>
        </View>

        <Text style={styles.valueDisplay}>{displayValue}</Text>

        <View style={styles.sliderSection}>
          <View
            style={styles.track}
            onLayout={handleLayout}
            {...panResponder.panHandlers}
          >
            <View style={[styles.trackFill, { width: `${value * 100}%` }]} />
            <View style={[styles.thumb, { left: thumbLeft }]} />
          </View>

          <View style={styles.trackLabels}>
            <Text style={styles.trackLabel}>Clear</Text>
            <Text style={styles.trackLabel}>Heavy</Text>
          </View>
        </View>

        <Button label="Continue" onPress={handleContinue} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex:            1,
    backgroundColor: Colors.bg.primary,
  },
  container: {
    flex:              1,
    paddingHorizontal: 20,
    paddingBottom:     20,
    gap:               Space[5],
    justifyContent:    'center',
  },
  topBar: {
    position:   'absolute',
    top:        Space[5],
    left:       0,
    right:      0,
    alignItems: 'center',
  },
  header: {
    gap: Space[2],
  },
  title: {
    ...Typography.h1,
  },
  sub: {
    ...Typography.aetherSpeech,
    color: Colors.text.secondary,
  },
  valueDisplay: {
    fontSize:   48,
    fontWeight: '300',
    color:      Colors.purple.soft,
    textAlign:  'center',
    lineHeight: 56,
    fontFamily: 'Inter_400Regular',
  },
  sliderSection: {
    gap: Space[2],
  },
  track: {
    height:          6,
    backgroundColor: Colors.bg.elevated,
    borderRadius:    3,
    position:        'relative',
  },
  trackFill: {
    position:        'absolute',
    top:             0,
    left:            0,
    bottom:          0,
    backgroundColor: Colors.purple.primary,
    borderRadius:    3,
  },
  thumb: {
    position:        'absolute',
    top:             -(THUMB_SIZE / 2 - 3),
    width:           THUMB_SIZE,
    height:          THUMB_SIZE,
    borderRadius:    THUMB_SIZE / 2,
    backgroundColor: Colors.purple.primary,
    ...Shadows.purpleGlow,
  },
  trackLabels: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    marginTop:      Space[1],
  },
  trackLabel: {
    ...Typography.caption,
    color: Colors.text.muted,
  },
});
