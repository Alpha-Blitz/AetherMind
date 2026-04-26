import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Radius, Shadows } from '../../constants/theme';

interface Props {
  message: string;
  style?:  ViewStyle;
}

export default function SpeechBubble({ message, style }: Props) {
  return (
    <View style={[styles.bubble, style]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth:                '80%',
    backgroundColor:         'rgba(28, 20, 56, 0.95)',
    borderWidth:             0.5,
    borderColor:             'rgba(124, 108, 255, 0.40)',
    borderTopLeftRadius:     Radius.lg,
    borderTopRightRadius:    Radius.lg,
    borderBottomRightRadius: Radius.lg,
    borderBottomLeftRadius:  4,
    paddingVertical:         12,
    paddingHorizontal:       16,
    ...Shadows.purpleGlow,
  },
  text: {
    ...Typography.aetherSpeech,
  },
});
