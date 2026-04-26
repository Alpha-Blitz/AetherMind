import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { Colors, Typography, Space } from '../../constants/theme';
import { useAuth } from '../../components/AuthProvider';
import { supabase } from '../../lib/supabase';
import AetherCharacter from '../../components/aether/AetherCharacter';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';
import type { Database } from '../../lib/database.types';

type Belief = Database['public']['Tables']['beliefs']['Row'];

function daysBetween(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ProgressScreen() {
  const { user } = useAuth();

  const { data: belief } = useQuery<Belief | null>({
    queryKey: ['active_belief', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('beliefs').select('*')
        .eq('user_id', user.id).eq('status', 'active')
        .order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const beliefDay = belief
    ? daysBetween(new Date(belief.created_at ?? Date.now()), new Date()) + 1
    : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.headerRow}>
          <Text style={styles.title}>Progress</Text>
          <Tag label="Sprint 1" variant="purple" />
        </View>

        <View style={styles.emptyState}>
          <AetherCharacter expression="thinking" size="medium" />
          <View style={styles.emptyTextWrap}>
            <Text style={styles.emptyHeading}>Your growth map is building.</Text>
            <Text style={styles.emptyBody}>Keep showing up.</Text>
          </View>
        </View>

        {belief && (
          <Card style={styles.sprintCard}>
            <Text style={styles.sprintLabel}>SPRINT 1</Text>
            <Text style={styles.beliefName}>{belief.old_belief}</Text>
            <Text style={styles.beliefDay}>Day {beliefDay} of 30</Text>
          </Card>
        )}

        <Card style={styles.comingSoonCard}>
          <Text style={styles.comingSoonLabel}>More sprints coming soon</Text>
          <Text style={styles.comingSoonBody}>Keep building your streak.</Text>
        </Card>

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
    gap:               Space.xl,
  },
  headerRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  title: {
    ...Typography.heading,
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
    color:     Colors.text.secondary,
    textAlign: 'center',
  },
  sprintCard: {
    gap: Space.sm,
  },
  sprintLabel: {
    ...Typography.label,
    color:         Colors.purple.primary,
    letterSpacing: 1,
  },
  beliefName: {
    ...Typography.body,
    color:      Colors.text.primary,
    fontWeight: '500',
    fontStyle:  'italic',
  },
  beliefDay: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  comingSoonCard: {
    gap:     Space.xs,
    opacity: 0.5,
  },
  comingSoonLabel: {
    ...Typography.body,
    color:      Colors.text.secondary,
    fontWeight: '500',
  },
  comingSoonBody: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
});
