import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';

interface Question {
  id: string;
  text: string;
  placeholder: string;
}

interface Props {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
}

// One-question-at-a-time flow — used in evening reflection (3 questions)
// Answers feed into the Scoring Engine and Aether Core context
export default function QuestionFlow({ questions, onComplete }: Props) {
  const C = Colors.dark;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState('');

  const q = questions[index];

  const advance = () => {
    const updated = { ...answers, [q.id]: current };
    if (index < questions.length - 1) {
      setAnswers(updated);
      setCurrent('');
      setIndex(index + 1);
    } else {
      onComplete(updated);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.progress, { color: C.textMuted }]}>
        {index + 1} / {questions.length}
      </Text>
      <Text style={[styles.question, { color: C.text }]}>{q.text}</Text>

      <TextInput
        style={[styles.input, { backgroundColor: C.surface, color: C.text, borderColor: C.border }]}
        placeholder={q.placeholder}
        placeholderTextColor={C.textMuted}
        value={current}
        onChangeText={setCurrent}
        multiline
        autoFocus
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: current.trim() ? C.primary : C.surface }]}
        onPress={advance}
        disabled={!current.trim()}
      >
        <Text style={[styles.buttonText, { color: current.trim() ? C.text : C.textMuted }]}>
          {index === questions.length - 1 ? 'Done' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
  progress: { fontSize: 12, letterSpacing: 1 },
  question: { fontSize: 22, fontWeight: '700', lineHeight: 32 },
  input: { borderRadius: 16, padding: 18, fontSize: 16, borderWidth: 1, minHeight: 120, lineHeight: 24, textAlignVertical: 'top' },
  button: { borderRadius: 100, padding: 18, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
