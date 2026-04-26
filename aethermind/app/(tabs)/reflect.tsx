import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Space, Radius } from '../../constants/theme';
import AetherCharacter from '../../components/aether/AetherCharacter';

type FilterTab = 'All' | 'Reflections' | 'Insights';
const TABS: FilterTab[] = ['All', 'Reflections', 'Insights'];

export default function JournalScreen() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Text style={styles.title}>Journal</Text>

        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.emptyState}>
          <AetherCharacter expression="waiting" size="medium" />
          <View style={styles.emptyTextWrap}>
            <Text style={styles.emptyHeading}>Your reflections will live here.</Text>
            <Text style={styles.emptyBody}>
              Every check-in and reflection you complete will grow here.
            </Text>
          </View>
        </View>

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
    paddingTop:        Space.lg,
  },
  title: {
    ...Typography.heading,
    color:         Colors.text.primary,
    marginBottom:  Space.lg,
  },
  tabRow: {
    flexDirection:   'row',
    gap:             Space.sm,
    marginBottom:    Space.xl,
  },
  tab: {
    paddingVertical:  Space.xs,
    paddingHorizontal: Space.md,
    borderRadius:    Radius.full,
    backgroundColor: Colors.bg.elevated,
  },
  tabActive: {
    backgroundColor: Colors.purple.strong,
  },
  tabText: {
    ...Typography.label,
    color: Colors.text.tertiary,
  },
  tabTextActive: {
    color: Colors.text.primary,
  },
  emptyState: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Space.xl,
  },
  emptyTextWrap: {
    alignItems:        'center',
    gap:               Space.sm,
    paddingHorizontal: Space.xl,
  },
  emptyHeading: {
    ...Typography.subheading,
    color:     Colors.text.primary,
    textAlign: 'center',
  },
  emptyBody: {
    ...Typography.body,
    color:      Colors.text.secondary,
    textAlign:  'center',
    lineHeight: 24,
  },
});
