import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Colors, Typography, Space, Radius } from '../../constants/theme';
import { useAuth } from '../../components/AuthProvider';
import { supabase } from '../../lib/supabase';
import Card from '../../components/ui/Card';
import type { Database } from '../../lib/database.types';

type Belief = Database['public']['Tables']['beliefs']['Row'];

interface MenuRow {
  label:   string;
  value?:  string;
  danger?: boolean;
  onPress: () => void;
}

export default function MeScreen() {
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

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out', style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          router.replace('/(auth)');
        },
      },
    ]);
  }

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'recently';

  const menuRows: MenuRow[] = [
    {
      label:   'Current belief',
      value:   belief?.old_belief ?? '—',
      onPress: () => {},
    },
    {
      label:   'Edit belief',
      onPress: () => {},
    },
    {
      label:   'Notification settings',
      value:   '9:00 AM · 9:00 PM',
      onPress: () => {},
    },
    {
      label:   'Export my data',
      onPress: () => {},
    },
    {
      label:   'Delete my account',
      danger:  true,
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profile & settings</Text>

        {/* User card */}
        <Card style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email?.[0]?.toUpperCase() ?? 'A'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userEmail}>{user?.email ?? 'alex@email.com'}</Text>
            <Text style={styles.userSince}>Member since {memberSince}</Text>
          </View>
        </Card>

        {/* Menu */}
        <Card style={styles.menuCard}>
          {menuRows.map((row, i) => (
            <TouchableOpacity
              key={row.label}
              style={[styles.menuRow, i < menuRows.length - 1 && styles.menuRowBorder]}
              onPress={row.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuRowLeft}>
                <Text style={[styles.menuLabel, row.danger && styles.menuLabelDanger]}>
                  {row.label}
                </Text>
                {row.value && (
                  <Text style={styles.menuValue} numberOfLines={1}>{row.value}</Text>
                )}
              </View>
              <Text style={[styles.menuChevron, row.danger && styles.menuLabelDanger]}>›</Text>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
          <Text style={styles.signOutText}>↪ Sign out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex:            1,
    backgroundColor: Colors.bg.base,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop:        Space.lg,
    paddingBottom:     Space.xxxl,
    gap:               Space.xl,
  },
  title: {
    ...Typography.heading,
    color: Colors.text.primary,
  },
  userCard: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Space.md,
  },
  avatar: {
    width:          44,
    height:         44,
    borderRadius:   22,
    backgroundColor: Colors.purple.deep,
    alignItems:     'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize:   18,
    fontWeight: '600',
    color:      Colors.purple.soft,
  },
  userInfo: {
    gap: 2,
    flex: 1,
  },
  userEmail: {
    ...Typography.body,
    color:      Colors.text.primary,
    fontWeight: '500',
  },
  userSince: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  menuCard: {
    paddingVertical:  0,
    paddingHorizontal: 0,
    overflow:         'hidden',
  },
  menuRow: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingVertical:   14,
    paddingHorizontal: 14,
    gap:               Space.md,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  menuRowLeft: {
    flex: 1,
    gap:  2,
  },
  menuLabel: {
    ...Typography.body,
    color: Colors.text.primary,
  },
  menuLabelDanger: {
    color: Colors.error,
  },
  menuValue: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },
  menuChevron: {
    ...Typography.body,
    color: Colors.text.tertiary,
  },
  signOutBtn: {
    height:          48,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.border.active,
    alignItems:      'center',
    justifyContent:  'center',
  },
  signOutText: {
    ...Typography.body,
    color: Colors.purple.soft,
  },
});
