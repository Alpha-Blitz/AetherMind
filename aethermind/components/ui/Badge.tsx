import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Radius, Space } from '../../constants/theme';

export type BadgeVariant = 'new' | 'beta' | 'popular' | 'label';

interface Props {
  variant:  BadgeVariant;
  label?:   string;
  style?:   ViewStyle;
}

const DEFAULTS: Record<BadgeVariant, string> = {
  new:     'New',
  beta:    'Beta',
  popular: 'Popular',
  label:   '',
};

export default function Badge({ variant, label, style }: Props) {
  const text = label ?? DEFAULTS[variant];

  return (
    <View style={[styles.base, chipStyle[variant], style]}>
      {variant === 'popular' && (
        <Text style={[styles.text, textStyle[variant]]}>🔥</Text>
      )}
      <Text style={[styles.text, textStyle[variant]]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection:  'row',
    alignItems:     'center',
    alignSelf:      'flex-start',
    borderRadius:   Radius.full,
    gap:            Space[1],
  },
  text: {
    ...Typography.caption,
  },
});

const chipStyle = StyleSheet.create({
  new: {
    backgroundColor:   Colors.purple.primary,
    paddingVertical:   4,
    paddingHorizontal: 10,
  },
  beta: {
    backgroundColor:   'rgba(124,108,255,0.20)',
    borderWidth:       1,
    borderColor:       Colors.purple.primary,
    paddingVertical:   4,
    paddingHorizontal: 10,
  },
  popular: {
    backgroundColor:   'rgba(255,159,67,0.20)',
    borderWidth:       1,
    borderColor:       Colors.orange.primary,
    paddingVertical:   4,
    paddingHorizontal: 10,
  },
  label: {
    backgroundColor:   'rgba(124,108,255,0.12)',
    borderWidth:       1,
    borderColor:       'rgba(124,108,255,0.25)',
    paddingVertical:   4,
    paddingHorizontal: Space[3],
  },
});

const textStyle = StyleSheet.create({
  new:     { ...Typography.caption, fontWeight: '600' as const, fontFamily: 'Inter_600SemiBold', color: Colors.text.primary },
  beta:    { ...Typography.caption, color: Colors.purple.primary },
  popular: { ...Typography.caption, color: Colors.orange.primary },
  label:   { ...Typography.caption, color: Colors.purple.soft },
});
