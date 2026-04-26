import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colors, Typography, Space, Radius, Shadows } from '../../constants/theme';

interface Question { id: string; text: string; placeholder: string; }
interface Props { questions: Question[]; onComplete: (answers: Record<string, string>) => void; }

export default function QuestionFlow({ questions, onComplete }: Props) {
  const [index,   setIndex]   = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState('');

  const q = questions[index];

  const advance = () => {
    const updated = { ...answers, [q.id]: current };
    if (index < questions.length - 1) {
      setAnswers(updated); setCurrent(''); setIndex(index + 1);
    } else {
      onComplete(updated);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>{index + 1} / {questions.length}</Text>
      <Text style={styles.question}>{q.text}</Text>
      <TextInput
        style={styles.input}
        placeholder={q.placeholder}
        placeholderTextColor={Colors.text.tertiary}
        value={current}
        onChangeText={setCurrent}
        multiline
        autoFocus
      />
      <TouchableOpacity
        style={[styles.button, !current.trim() && styles.buttonDisabled]}
        onPress={advance}
        disabled={!current.trim()}
      >
        <Text style={styles.buttonText}>{index === questions.length - 1 ? 'Done' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Space.xl },
  progress:  { ...Typography.caption, color: Colors.text.tertiary, letterSpacing: 1 },
  question:  { fontSize: 22, fontWeight: '500', lineHeight: 32, color: Colors.text.primary },
  input: {
    backgroundColor: Colors.bg.elevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border.active,
    paddingVertical: 14, paddingHorizontal: 14,
    color: Colors.text.primary,
    ...Typography.body,
    minHeight: 120, textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.purple.strong,
    height: 54, borderRadius: Radius.lg,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.button,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { ...Typography.cta, color: '#ffffff' },
});
