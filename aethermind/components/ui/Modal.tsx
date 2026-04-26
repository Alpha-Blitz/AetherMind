import { ReactNode } from 'react';
import {
  Modal as RNModal,
  View, Text, StyleSheet, Pressable,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useEffect,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, Space, Timing } from '../../constants/theme';
import Button from './Button';

interface Props {
  visible:     boolean;
  title:       string;
  onClose:     () => void;
  onConfirm?:  () => void;
  confirmLabel?: string;
  cancelLabel?:  string;
  children?:   ReactNode;
  hideFooter?: boolean;
}

export default function Modal({
  visible,
  title,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  children,
  hideFooter   = false,
}: Props) {
  const { width } = useWindowDimensions();
  const opacity   = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    if (visible) {
      opacity.value    = withTiming(1,  { duration: Timing.standard });
      translateY.value = withTiming(0,  { duration: Timing.standard });
    } else {
      opacity.value    = withTiming(0,  { duration: Timing.quick });
      translateY.value = withTiming(40, { duration: Timing.quick });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const sheetStyle    = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity:   opacity.value,
  }));

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <Animated.View style={[styles.overlay, backdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <View style={styles.centerer}>
          <Animated.View style={[
            styles.container,
            { width: width - Space[5] * 2 },
            sheetStyle,
          ]}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
                <Feather name="x" size={20} color={Colors.text.muted} />
              </Pressable>
            </View>

            {children ? (
              <View style={styles.body}>{children}</View>
            ) : null}

            {!hideFooter && (
              <View style={styles.footer}>
                <View style={styles.footerBtn}>
                  <Button
                    label={cancelLabel}
                    variant="secondary"
                    onPress={onClose}
                  />
                </View>
                {onConfirm && (
                  <View style={styles.footerBtn}>
                    <Button
                      label={confirmLabel}
                      variant="primary"
                      onPress={onConfirm}
                    />
                  </View>
                )}
              </View>
            )}
          </Animated.View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7,10,20,0.80)',
  },
  centerer: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    padding:        Space[5],
  },
  container: {
    backgroundColor: Colors.bg.surface,
    borderWidth:     0.5,
    borderColor:     'rgba(124,108,255,0.20)',
    borderRadius:    20,
    padding:         Space[5],
  },
  header: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  title: {
    ...Typography.h3,
    flex: 1,
  },
  closeBtn: {
    width:          44,
    height:         44,
    alignItems:     'center',
    justifyContent: 'center',
    marginRight:    -Space[2],
  },
  body: {
    marginTop: Space[3],
  },
  footer: {
    flexDirection: 'row',
    gap:           Space[3],
    marginTop:     Space[5],
  },
  footerBtn: {
    flex: 1,
  },
});
