import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';

export default function MirrorModal() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.label}>WEEKLY MIRROR</Text>
          <Text style={styles.heading}>Week 1</Text>
        </View>

        <View style={styles.aetherWrap}>
          <AetherCharacter expression="empathetic" size="medium" />
        </View>

        <Card style={styles.letterCard}>
          <Text style={styles.sectionTitle}>A LETTER FROM AETHER</Text>
          <Text style={styles.letterBody}>
            This week, you showed up.{'\n\n'}
            The pattern I see: you engage most deeply when the pressure is external.
            What would it look like to bring that same urgency from within?
          </Text>
        </Card>

        <Card style={styles.lockedCard}>
          <View style={styles.lockedHeader}>
            <Text style={styles.sectionTitle}>PATTERNS</Text>
            <Tag label="Premium" variant="purple" />
          </View>
          <Text style={styles.lockedBody}>
            Full pattern analysis unlocks after Day 7.
          </Text>
        </Card>

        <Card style={styles.lockedCard}>
          <View style={styles.lockedHeader}>
            <Text style={styles.sectionTitle}>LANGUAGE SHIFT</Text>
            <Tag label="Premium" variant="purple" />
          </View>
          <Text style={styles.lockedBody}>
            See how your words are changing over time.
          </Text>
        </Card>

        <Button label="Close" onPress={() => router.back()} variant="ghost" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex:            1,
    backgroundColor: Colors.bg.base,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop:        Space.lg,
    paddingBottom:     Space.xxxl,
    gap:               Space.xl,
  },
  header: {
    gap: Space.xs,
  },
  label: {
    ...Typography.label,
    color:         Colors.text.tertiary,
    letterSpacing: 1.5,
  },
  heading: {
    ...Typography.display,
    color: Colors.text.primary,
  },
  aetherWrap: {
    alignItems: 'center',
  },
  letterCard: {
    gap: Space.md,
  },
  sectionTitle: {
    ...Typography.label,
    color:         Colors.purple.soft,
    letterSpacing: 1,
  },
  letterBody: {
    ...Typography.body,
    color:      Colors.text.secondary,
    lineHeight: 26,
  },
  lockedCard: {
    gap:     Space.md,
    opacity: 0.5,
  },
  lockedHeader: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  lockedBody: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
});
