import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Space } from '../../constants/theme';

export type DividerVariant = 'default' | 'dashed' | 'section';

interface Props {
  variant?: DividerVariant;
  style?:   ViewStyle;
}

export default function Divider({ variant = 'default', style }: Props) {
  if (variant === 'section') {
    return (
      <View style={[styles.sectionRow, style]}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionIcon}>✦</Text>
        <View style={styles.sectionLine} />
      </View>
    );
  }

  if (variant === 'dashed') {
    return (
      <View style={[styles.dashedRow, style]}>
        {Array.from({ length: 30 }, (_, i) => (
          <View key={i} style={styles.dash} />
        ))}
      </View>
    );
  }

  return <View style={[styles.line, style]} />;
}

const styles = StyleSheet.create({
  line: {
    height:          0.5,
    backgroundColor: 'rgba(124,108,255,0.15)',
    alignSelf:       'stretch',
  },

  dashedRow: {
    flexDirection:  'row',
    alignSelf:      'stretch',
    height:         1,
    overflow:       'hidden',
    gap:            4,
  },
  dash: {
    width:           6,
    height:          0.5,
    backgroundColor: 'rgba(124,108,255,0.15)',
  },

  sectionRow: {
    flexDirection:  'row',
    alignItems:     'center',
    alignSelf:      'stretch',
    gap:            Space[3],
  },
  sectionLine: {
    flex:            1,
    height:          0.5,
    backgroundColor: 'rgba(124,108,255,0.25)',
  },
  sectionIcon: {
    color:    Colors.purple.soft,
    fontSize: 12,
  },
});
