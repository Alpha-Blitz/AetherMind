import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Space } from '../../constants/theme';

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
    maxWidth:              '80%',
    backgroundColor:       Colors.bg.overlay,
    borderWidth:           0.5,
    borderColor:           Colors.purple.deep,
    borderTopLeftRadius:   14,
    borderTopRightRadius:  14,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 4,
    paddingVertical:       10,
    paddingHorizontal:     14,
  },
  text: {
    ...Typography.aetherSpeech,
    color: Colors.text.primary,
  },
});
