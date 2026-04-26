import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { useAuth } from '../../components/AuthProvider';
import AetherCharacter from '../../components/aether/AetherCharacter';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Belief = Database['public']['Tables']['beliefs']['Row'];
type IdentityProfile = Database['public']['Tables']['identity_profiles']['Row'];

const TODAY_QUESTIONS = [
  'What would the person you want to become do today?',
  'Where are you holding back, and what would it look like not to?',
  'What small act today would prove your new story to yourself?',
];

function getDayOfWeek(date: Date): number {
  return date.getDay() === 0 ? 6 : date.getDay() - 1;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function todayQuestion(): string {
  const idx = getDayOfWeek(new Date()) % TODAY_QUESTIONS.length;
  return TODAY_QUESTIONS[idx];
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function HomeScreen() {
  const { user } = useAuth();

  const { data: profile, isLoading: profileLoading } = useQuery<IdentityProfile | null>({
    queryKey: ['identity_profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('identity_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: belief, isLoading: beliefLoading } = useQuery<Belief | null>({
    queryKey: ['active_belief', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('beliefs')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: todayEntries } = useQuery<number>({
    queryKey: ['today_entries', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from('journal_entries')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', start.toISOString());
      return count ?? 0;
    },
    enabled: !!user,
  });

  const isLoading = profileLoading || beliefLoading;

  const supabaseConfigured =
    !!process.env.EXPO_PUBLIC_SUPABASE_URL &&
    !process.env.EXPO_PUBLIC_SUPABASE_URL.includes('placeholder');

  if (supabaseConfigured && !profileLoading && !profile) {
    router.replace('/(onboarding)');
    return null;
  }

  const beliefDay = belief
    ? daysBetween(new Date(belief.created_at ?? Date.now()), new Date()) + 1
    : 1;

  const daysSinceJoin = user
    ? daysBetween(new Date(user.created_at ?? Date.now()), new Date())
    : 0;

  const hasCheckedIn = (todayEntries ?? 0) > 0;
  const weeklyLocked = daysSinceJoin < 7;

  const scorePercent = belief
    ? ((belief.current_score ?? 0) / 10) * 100
    : 0;

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header row */}
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.date}>{formatDate()}</Text>
          </View>
          <AetherCharacter expression="idle" size="small" />
        </View>

        {/* Aether question bubble */}
        <View style={styles.questionCard}>
          <Text style={styles.questionLabel}>Today's question</Text>
          <Text style={styles.questionText}>{todayQuestion()}</Text>
        </View>

        {/* Module cards */}
        <Text style={styles.sectionTitle}>Your practice</Text>
        <View style={styles.moduleRow}>
          <ModuleCard
            title="Morning check-in"
            status={hasCheckedIn ? 'done' : 'pending'}
            onPress={() => router.push('/(tabs)/reflect')}
          />
          <ModuleCard
            title="Evening reflection"
            status="pending"
            onPress={() => router.push('/(tabs)/reflect')}
          />
        </View>
        <ModuleCard
          title="Weekly mirror"
          status={weeklyLocked ? 'locked' : 'pending'}
          lockNote={weeklyLocked ? `Unlocks day 7` : undefined}
          wide
          onPress={() => {}}
        />

        {/* Active belief card */}
        <Text style={styles.sectionTitle}>Active belief</Text>
        {isLoading ? (
          <View style={[styles.beliefCard, styles.skeleton]} />
        ) : belief ? (
          <BeliefCard belief={belief} day={beliefDay} scorePercent={scorePercent} />
        ) : (
          <View style={styles.beliefCard}>
            <Text style={styles.emptyText}>No active belief yet.</Text>
            <TouchableOpacity onPress={() => router.push('/(onboarding)')}>
              <Text style={styles.emptyLink}>Begin onboarding →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Streak */}
        <Text style={styles.sectionTitle}>Streak</Text>
        <View style={styles.streakCard}>
          <View style={styles.streakNumber}>
            <Text style={styles.streakCount}>{hasCheckedIn ? 1 : 0}</Text>
            <Text style={styles.streakLabel}>day{hasCheckedIn ? '' : 's'}</Text>
          </View>
          <View style={styles.dotRow}>
            {last7Days.map((d, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === 6 && hasCheckedIn ? styles.dotActive : styles.dotEmpty,
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ModuleCard({
  title,
  status,
  lockNote,
  wide,
  onPress,
}: {
  title: string;
  status: 'done' | 'pending' | 'locked';
  lockNote?: string;
  wide?: boolean;
  onPress: () => void;
}) {
  const statusColors: Record<string, string> = {
    done: Colors.success,
    pending: Colors.primary,
    locked: Colors.text3,
  };

  const statusLabels: Record<string, string> = {
    done: 'Done',
    pending: 'Pending',
    locked: 'Locked',
  };

  return (
    <TouchableOpacity
      style={[styles.moduleCard, wide && styles.moduleCardWide, status === 'locked' && styles.moduleCardLocked]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={status === 'locked'}
    >
      <View style={[styles.moduleStatus, { backgroundColor: statusColors[status] + '22' }]}>
        <View style={[styles.moduleDot, { backgroundColor: statusColors[status] }]} />
        <Text style={[styles.moduleStatusText, { color: statusColors[status] }]}>{statusLabels[status]}</Text>
      </View>
      <Text style={[styles.moduleTitle, status === 'locked' && styles.moduleTitleLocked]}>{title}</Text>
      {lockNote && <Text style={styles.lockNote}>{lockNote}</Text>}
    </TouchableOpacity>
  );
}

function BeliefCard({ belief, day, scorePercent }: { belief: Belief; day: number; scorePercent: number }) {
  return (
    <View style={styles.beliefCard}>
      <View style={styles.beliefMeta}>
        <Text style={styles.beliefDayLabel}>Day {day} of 30</Text>
        <Text style={styles.beliefScore}>{belief.current_score?.toFixed(1) ?? '—'}</Text>
      </View>

      <Text style={styles.beliefOld}>"{belief.old_belief}"</Text>

      <View style={styles.scoreBarBg}>
        <View style={[styles.scoreBarFill, { width: `${scorePercent}%` as any }]} />
      </View>
      <Text style={styles.scoreBarLabel}>Hold strength · 0 = resolved</Text>

      <View style={styles.beliefDivider} />
      <Text style={styles.beliefNewLabel}>New story</Text>
      <Text style={styles.beliefNew}>{belief.new_story}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl, gap: Spacing.md },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: Spacing.sm },
  headerText: { gap: 2 },
  greeting: { ...Typography.caption, color: Colors.text3, textTransform: 'uppercase', letterSpacing: 1 },
  date: { ...Typography.heading, fontSize: 20, fontWeight: '600', color: Colors.text1 },

  questionCard: {
    backgroundColor: Colors.elevated,
    borderRadius: Radius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  questionLabel: { ...Typography.caption, color: Colors.text3, textTransform: 'uppercase', letterSpacing: 1 },
  questionText: { ...Typography.body, color: Colors.text1, fontStyle: 'italic', lineHeight: 24 },

  sectionTitle: { ...Typography.caption, color: Colors.text3, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: Spacing.xs },

  moduleRow: { flexDirection: 'row', gap: Spacing.sm },
  moduleCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  moduleCardWide: { flex: 0 },
  moduleCardLocked: { opacity: 0.5 },
  moduleStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  moduleDot: { width: 6, height: 6, borderRadius: 3 },
  moduleStatusText: { fontSize: 11, fontWeight: '600' },
  moduleTitle: { ...Typography.body, color: Colors.text1, fontWeight: '500' },
  moduleTitleLocked: { color: Colors.text3 },
  lockNote: { ...Typography.caption, color: Colors.text3 },

  beliefCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  skeleton: { height: 160, opacity: 0.4 },
  beliefMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  beliefDayLabel: { ...Typography.caption, color: Colors.text3, textTransform: 'uppercase', letterSpacing: 1 },
  beliefScore: { fontSize: 28, fontWeight: '700', color: Colors.primary },
  beliefOld: { ...Typography.body, color: Colors.text2, fontStyle: 'italic', lineHeight: 22 },
  scoreBarBg: { height: 6, backgroundColor: Colors.elevated, borderRadius: 3, overflow: 'hidden' },
  scoreBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  scoreBarLabel: { ...Typography.caption, color: Colors.text3 },
  beliefDivider: { height: 1, backgroundColor: Colors.border },
  beliefNewLabel: { ...Typography.caption, color: Colors.success, textTransform: 'uppercase', letterSpacing: 1 },
  beliefNew: { ...Typography.body, color: Colors.text1, lineHeight: 22 },
  emptyText: { ...Typography.body, color: Colors.text3, textAlign: 'center', paddingVertical: Spacing.md },
  emptyLink: { ...Typography.body, color: Colors.primary, textAlign: 'center', paddingBottom: Spacing.sm },

  streakCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  streakNumber: { alignItems: 'center', minWidth: 48 },
  streakCount: { fontSize: 40, fontWeight: '700', color: Colors.primary, lineHeight: 44 },
  streakLabel: { ...Typography.caption, color: Colors.text3 },
  dotRow: { flex: 1, flexDirection: 'row', gap: 8, justifyContent: 'flex-end' },
  dot: { width: 28, height: 28, borderRadius: 14 },
  dotActive: { backgroundColor: Colors.primary },
  dotEmpty: { backgroundColor: Colors.elevated, borderWidth: 1, borderColor: Colors.border },
});
