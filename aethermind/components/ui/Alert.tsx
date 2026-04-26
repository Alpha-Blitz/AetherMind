import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, IconSize, Space } from '../../constants/theme';

export type AlertVariant = 'success' | 'info' | 'warning' | 'error';

interface Props {
  variant:   AlertVariant;
  title?:    string;
  message:   string;
  onClose?:  () => void;
}

const CONFIG: Record<AlertVariant, {
  bg:     string;
  border: string;
  color:  string;
  icon:   React.ComponentProps<typeof Feather>['name'];
  label:  string;
}> = {
  success: {
    bg:     'rgba(74,222,128,0.12)',
    border: 'rgba(74,222,128,0.40)',
    color:  Colors.success,
    icon:   'check-circle',
    label:  'Success',
  },
  info: {
    bg:     'rgba(77,171,255,0.12)',
    border: 'rgba(77,171,255,0.40)',
    color:  Colors.info,
    icon:   'info',
    label:  'Info',
  },
  warning: {
    bg:     'rgba(255,196,61,0.12)',
    border: 'rgba(255,196,61,0.40)',
    color:  Colors.warning,
    icon:   'alert-triangle',
    label:  'Reminder',
  },
  error: {
    bg:     'rgba(255,77,109,0.12)',
    border: 'rgba(255,77,109,0.40)',
    color:  Colors.error,
    icon:   'x-circle',
    label:  'Error',
  },
};

export default function Alert({ variant, title, message, onClose }: Props) {
  const cfg = CONFIG[variant];

  return (
    <View style={[styles.container, {
      backgroundColor: cfg.bg,
      borderColor:     cfg.border,
    }]}>
      <Feather name={cfg.icon} size={20} color={cfg.color} style={styles.icon} />

      <View style={styles.body}>
        <Text style={[styles.title, { color: cfg.color }]}>
          {title ?? cfg.label}
        </Text>
        <Text style={styles.message}>{message}</Text>
      </View>

      {onClose ? (
        <Pressable onPress={onClose} hitSlop={8} style={styles.close}>
          <Feather
            name="x"
            size={IconSize.sm}
            color={variant === 'error' ? Colors.error : Colors.text.muted}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:     'row',
    alignItems:        'flex-start',
    borderWidth:       1,
    borderRadius:      10,
    paddingVertical:   Space[3],
    paddingHorizontal: Space[4],
    gap:               Space[3],
  },
  icon: {
    marginTop: 1,
  },
  body: {
    flex: 1,
    gap:  2,
  },
  title: {
    ...Typography.caption,
    fontWeight:  '600',
    fontFamily:  'Inter_600SemiBold',
  },
  message: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  close: {
    marginTop: 1,
  },
});
