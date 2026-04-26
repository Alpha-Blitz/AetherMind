import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';
import { useAuth } from '../../components/AuthProvider';
import { supabase } from '../../lib/supabase';

const ROW_ITEMS = [
  { label: 'Edit belief',          icon: '✏️', route: null },
  { label: 'Notification settings', icon: '🔔', route: null },
  { label: 'Export my data',        icon: '📤', route: null },
  { label: 'Delete my account',     icon: '🗑', route: null, danger: true },
];

export default function MeScreen() {
  const { user } = useAuth();

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile & settings</Text>

        {/* User info */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email?.[0]?.toUpperCase() ?? 'A'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userEmail}>{user?.email ?? 'alex@email.com'}</Text>
            <Text style={styles.userSince}>
              Member since {user?.created_at
                ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : 'recently'}
            </Text>
          </View>
        </View>

        {/* Menu rows */}
        <View style={styles.menuCard}>
          {ROW_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuRow, i < ROW_ITEMS.length - 1 && styles.menuRowBorder]}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                {item.label}
              </Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: Colors.bg.base },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: Space.lg, gap: Space.xl },
  title: {
    fontSize: 22, fontWeight: '500', color: Colors.text.primary, letterSpacing: -0.3,
  },
  userCard: {
    flexDirection: 'row', alignItems: 'center', gap: Space.md,
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    padding: 16,
    ...Shadows.card,
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.purple.deep,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '600', color: Colors.purple.soft },
  userInfo: { gap: 2 },
  userEmail: { ...Typography.body, color: Colors.text.primary, fontWeight: '500' },
  userSince: { ...Typography.caption, color: Colors.text.tertiary },
  menuCard: {
    backgroundColor: Colors.bg.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    overflow: 'hidden',
    ...Shadows.card,
  },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', gap: Space.md,
    paddingVertical: 14, paddingHorizontal: 16,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border.subtle },
  menuIcon:  { fontSize: 16, width: 24, textAlign: 'center' },
  menuLabel: { ...Typography.body, color: Colors.text.primary, flex: 1 },
  menuLabelDanger: { color: Colors.error },
  menuChevron: { ...Typography.body, color: Colors.text.tertiary },
  signOutBtn: {
    height: 48, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Colors.border.active,
    alignItems: 'center', justifyContent: 'center',
  },
  signOutText: { ...Typography.body, color: Colors.purple.soft },
});
