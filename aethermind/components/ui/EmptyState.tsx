import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Space } from '../../constants/theme';
import AetherCharacter from '../aether/AetherCharacter';
import Button from './Button';

interface Props {
  title:      string;
  subtitle?:  string;
  ctaLabel?:  string;
  onCta?:     () => void;
}

export default function EmptyState({ title, subtitle, ctaLabel, onCta }: Props) {
  return (
    <View style={styles.container}>
      <AetherCharacter expression="waiting" size="medium" />

      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}

      {ctaLabel && onCta ? (
        <View style={styles.cta}>
          <Button label={ctaLabel} onPress={onCta} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding:    Space[5],
  },
  title: {
    ...Typography.h3,
    marginTop:  Space[4],
    textAlign:  'center',
  },
  subtitle: {
    ...Typography.body,
    color:      Colors.text.secondary,
    maxWidth:   260,
    textAlign:  'center',
    marginTop:  Space[2],
  },
  cta: {
    width:     '100%',
    marginTop: Space[5],
  },
});
