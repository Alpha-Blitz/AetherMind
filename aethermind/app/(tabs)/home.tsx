import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Colors, Typography, Space, Radius } from '../../constants/theme';
import { useAuth } from '../../components/AuthProvider';
import AetherCharacter from '../../components/aether/AetherCharacter';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';
import type { TagVariant } from '../../components/ui/Tag';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Belief          = Database['public']['Tables']['beliefs']['Row'];
type IdentityProfile = Database['public']['Tables']['identity_profiles']['Row'];

const TODAY_QUESTIONS = [
  "What's the main thing you're focusing on today?",
  "Where are you holding back, and what would it look like not to?",
  "What small act today would prove your new story to yourself?",
];

function getDayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function daysBetween(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export default function HomeScreen() {
  const { user } = useAuth();

  const { data: profile, isLoading: profileLoading } = useQuery<IdentityProfile | null>({
    queryKey: ['identity_profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('identity_profiles').select('*')
        .eq('user_id', user.id).maybeSingle();
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
        .from('beliefs').select('*')
        .eq('user_id', user.id).eq('status', 'active')
        .order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: todayCount } = useQuery<number>({
    queryKey: ['today_entries', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const start = new Date(); start.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from('journal_entries').select('id', { count: 'exact', head: true })
        .eq('user_id', user.id).gte('created_at', start.toISOString());
      return count ?? 0;
    },
    enabled: !!user,
  });

  const isSupabaseConfigured =
    !!process.env.EXPO_PUBLIC_SUPABASE_URL &&
    !process.env.EXPO_PUBLIC_SUPABASE_URL.includes('placeholder');

  if (isSupabaseConfigured && !profileLoading && !profile) {
    router.replace('/(onboarding)');
    return null;
  }

  const isLoading = profileLoading || beliefLoading;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingState}>
          <AetherCharacter expression="thinking" size="medium" />
        </View>
      </SafeAreaView>
    );
  }

  const hasCheckedIn  = (todayCount ?? 0) > 0;
  const daysSinceJoin = user ? daysBetween(new Date(user.created_at ?? Date.now()), new Date()) : 0;
  const weeklyLocked  = daysSinceJoin < 7;
  const beliefDay     = belief ? daysBetween(new Date(belief.created_at ?? Date.now()), new Date()) + 1 : 1;
  const todayQ        = TODAY_QUESTIONS[getDayIndex() % TODAY_QUESTIONS.length];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{greeting()} ✦</Text>
            <Text style={styles.date}>{formatDate()}</Text>
          </View>
          <AetherCharacter expression="idle" size="small" />
        </View>

        {/* Aether question */}
        <Card>
          <Text style={styles.questionText}>{todayQ}</Text>
          <Text style={styles.questionHint}>Share what's on your mind.</Text>
        </Card>

        {/* Today section */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>TODAY</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.moduleRow}>
          <ModuleCard
            title="Morning check-in"
            status={hasCheckedIn ? 'done' : 'pending'}
            onPress={() => router.push('/(tabs)/reflect')}
          />
          <ModuleCard
            title="Daily reflection"
            status="pending"
            onPress={() => router.push('/(tabs)/reflect')}
          />
        </View>

        <ModuleCard
          title="Weekly mirror"
          status={weeklyLocked ? 'locked' : 'pending'}
          lockNote={weeklyLocked ? `${7 - daysSinceJoin} days left` : undefined}
          wide
          onPress={() => {}}
        />

        {/* Active belief */}
        <Text style={styles.sectionLabel}>ACTIVE BELIEF</Text>

        {belief ? (
          <BeliefCard belief={belief} day={beliefDay} />
        ) : (
          <Card>
            <Text style={styles.emptyText}>No active belief yet.</Text>
            <TouchableOpacity onPress={() => router.push('/(onboarding)')}>
              <Text style={styles.emptyLink}>Begin onboarding →</Text>
            </TouchableOpacity>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

type ModuleStatus = 'done' | 'pending' | 'locked';

const STATUS_TAG_VARIANT: Record<ModuleStatus, TagVariant> = {
  done:    'success',
  pending: 'purple',
  locked:  'default',
};

const STATUS_LABEL: Record<ModuleStatus, string> = {
  done:    'Done',
  pending: 'Pending',
  locked:  'Locked',
};

const STATUS_BORDER: Record<ModuleStatus, string> = {
  done:    Colors.success,
  pending: Colors.border.active,
  locked:  Colors.border.subtle,
};

function ModuleCard({
  title, status, lockNote, wide, onPress,
}: {
  title:      string;
  status:     ModuleStatus;
  lockNote?:  string;
  wide?:      boolean;
  onPress:    () => void;
}) {
  return (
    <Card
      onPress={status !== 'locked' ? onPress : undefined}
      style={[
        styles.moduleCard,
        wide && styles.moduleCardWide,
        status === 'locked' && styles.moduleCardLocked,
        { borderLeftWidth: 2, borderLeftColor: STATUS_BORDER[status] },
      ] as any}
    >
      <Tag label={STATUS_LABEL[status]} variant={STATUS_TAG_VARIANT[status]} />
      <Text style={styles.moduleTitle}>{title}</Text>
      {lockNote && <Text style={styles.lockNote}>{lockNote}</Text>}
    </Card>
  );
}

function BeliefCard({ belief, day }: { belief: Belief; day: number }) {
  const scorePercent = ((belief.current_score ?? 0) / 10) * 100;

  return (
    <Card>
      <View style={styles.beliefHeader}>
        <Text style={styles.beliefDayLabel}>Day {day} of 30</Text>
        <Text style={styles.beliefScore}>{belief.current_score?.toFixed(1) ?? '—'}</Text>
      </View>

      <Text style={styles.beliefOld}>"{belief.old_belief}"</Text>

      <View style={styles.scoreTrack}>
        <View style={[styles.scoreFill, { width: `${scorePercent}%` as any }]} />
      </View>
      <Text style={styles.scoreHint}>Hold strength · 0 = resolved</Text>

      <View style={styles.divider} />

      <Text style={styles.newStoryLabel}>NEW STORY</Text>
      <Text style={styles.newStory}>{belief.new_story}</Text>

      <View style={styles.dotGrid}>
        {Array.from({ length: 30 }, (_, i) => (
          <View
            key={i}
            style={[styles.dayDot, i < day && styles.dayDotFilled]}
          />
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex:            1,
    backgroundColor: Colors.bg.base,
  },
  loadingState: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  scroll:  { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop:        Space.lg,
    paddingBottom:     Space.xxxl,
    gap:               Space.xl,
  },

  headerRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
  },
  headerLeft: { gap: 2 },
  greeting: {
    ...Typography.heading,
    color: Colors.text.primary,
  },
  date: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },

  questionText: {
    ...Typography.aetherSpeech,
    color:      Colors.text.primary,
    lineHeight: 24,
  },
  questionHint: {
    ...Typography.caption,
    color:     Colors.text.tertiary,
    marginTop: Space.xs,
  },

  sectionRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
  sectionLabel: {
    ...Typography.label,
    color:         Colors.text.tertiary,
    letterSpacing: 1,
  },
  viewAll: {
    ...Typography.caption,
    color: Colors.purple.mid,
  },

  moduleRow: {
    flexDirection: 'row',
    gap:           Space.md,
  },
  moduleCard: {
    flex: 1,
    gap:  Space.sm,
  },
  moduleCardWide: {
    flex: 0,
  },
  moduleCardLocked: {
    opacity: 0.5,
  },
  moduleTitle: {
    ...Typography.body,
    color:      Colors.text.primary,
    fontWeight: '500',
  },
  lockNote: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },

  beliefHeader: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
  beliefDayLabel: {
    ...Typography.label,
    color:         Colors.text.tertiary,
    letterSpacing: 1,
  },
  beliefScore: {
    fontSize:   32,
    fontWeight: '600',
    color:      Colors.purple.primary,
    lineHeight: 38,
  },
  beliefOld: {
    ...Typography.body,
    color:      Colors.text.secondary,
    fontStyle:  'italic',
    lineHeight: 22,
  },
  scoreTrack: {
    height:          4,
    backgroundColor: Colors.bg.elevated,
    borderRadius:    2,
    overflow:        'hidden',
  },
  scoreFill: {
    height:          '100%',
    backgroundColor: Colors.purple.primary,
    borderRadius:    2,
  },
  scoreHint: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  divider: {
    height:          1,
    backgroundColor: Colors.border.subtle,
  },
  newStoryLabel: {
    ...Typography.label,
    color:         Colors.success,
    letterSpacing: 1,
  },
  newStory: {
    ...Typography.body,
    color:      Colors.text.primary,
    lineHeight: 22,
  },
  dotGrid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    gap:           4,
    marginTop:     Space.sm,
  },
  dayDot: {
    width:           8,
    height:          8,
    borderRadius:    4,
    backgroundColor: Colors.bg.elevated,
    borderWidth:     1,
    borderColor:     Colors.border.default,
  },
  dayDotFilled: {
    backgroundColor: Colors.purple.primary,
    borderColor:     Colors.purple.primary,
  },

  emptyText: {
    ...Typography.body,
    color:         Colors.text.tertiary,
    textAlign:     'center',
    paddingVertical: Space.lg,
  },
  emptyLink: {
    ...Typography.body,
    color:           Colors.purple.primary,
    textAlign:       'center',
    paddingBottom:   Space.md,
  },
});
