import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius } from '../../constants/theme';
import ProgressDots from '../../components/onboarding/ProgressDots';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const POINTS = [
  'This is not therapy or medical advice.',
  'AetherMind works with patterns and identity — not diagnosis.',
  'If you are in crisis, please contact a mental health professional.',
  'Your data is private and never used to train AI models.',
];

export default function DisclaimerScreen() {
  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.topBar}>
          <ProgressDots total={6} current={3} />
        </View>

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Before we go deeper</Text>

          <Card style={styles.card}>
            {POINTS.map((point, i) => (
              <View key={i} style={styles.pointRow}>
                <View style={styles.bullet} />
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </Card>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setChecked(v => !v)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
              {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkLabel}>I understand and want to continue</Text>
          </TouchableOpacity>
        </ScrollView>

        <Button
          label="I'm ready"
          onPress={() => router.push('/(onboarding)/meet-aether')}
          disabled={!checked}
        />

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
  },
  topBar: {
    paddingTop: Space[5],
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap:           Space[5],
    paddingBottom: Space[3],
  },
  title: {
    ...Typography.h1,
  },
  card: {
    gap: Space[4],
  },
  pointRow: {
    flexDirection: 'row',
    gap:           Space[3],
    alignItems:    'flex-start',
  },
  bullet: {
    width:           6,
    height:          6,
    borderRadius:    3,
    backgroundColor: Colors.purple.primary,
    marginTop:       8,
  },
  pointText: {
    ...Typography.body,
    color:      Colors.text.secondary,
    flex:       1,
    lineHeight: 24,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Space[3],
  },
  checkbox: {
    width:          22,
    height:         22,
    borderRadius:   Radius.xs,
    borderWidth:    2,
    borderColor:    Colors.text.muted,
    alignItems:     'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.purple.primary,
    borderColor:     Colors.purple.primary,
  },
  checkmark: {
    fontSize:   12,
    color:      '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  checkLabel: {
    ...Typography.body,
    color: Colors.text.primary,
    flex:  1,
  },
});
