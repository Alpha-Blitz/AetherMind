import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Radius } from '../../constants/theme';

export type TagVariant = 'default' | 'purple' | 'success' | 'warning' | 'error';

interface Props {
  label:    string;
  variant?: TagVariant;
  style?:   ViewStyle;
}

const VARIANT_STYLES: Record<TagVariant, { bg: string; text: string }> = {
  default: { bg: Colors.bg.elevated,  text: Colors.text.tertiary },
  purple:  { bg: Colors.bg.overlay,   text: Colors.purple.soft   },
  success: { bg: '#E1F5EE',           text: '#085041'            },
  warning: { bg: '#FAEEDA',           text: '#633806'            },
  error:   { bg: '#FCEBEB',           text: '#791F1F'            },
};

export default function Tag({ label, variant = 'default', style }: Props) {
  const { bg, text } = VARIANT_STYLES[variant];

  return (
    <View style={[styles.tag, { backgroundColor: bg }, style]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf:        'flex-start',
    borderRadius:     Radius.full,
    paddingVertical:  3,
    paddingHorizontal: 10,
  },
  label: {
    ...Typography.label,
  },
});
