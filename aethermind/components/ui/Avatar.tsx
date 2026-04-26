import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Colors, Typography, Radius } from '../../constants/theme';
import { AetherImages } from '../../constants/images';

export type AvatarSize = 32 | 48 | 64;
export type AvatarVariant = 'user' | 'aether';

interface Props {
  variant?:   AvatarVariant;
  size?:      AvatarSize;
  source?:    ImageSourcePropType;
  initials?:  string;
  expression?: keyof typeof AetherImages;
}

export default function Avatar({
  variant    = 'user',
  size       = 48,
  source,
  initials,
  expression = 'idle',
}: Props) {
  if (variant === 'aether') {
    return (
      <View style={[
        styles.base,
        styles.aetherBase,
        { width: size, height: size, borderRadius: size / 2 },
      ]}>
        <Image
          source={AetherImages[expression]}
          style={{ width: size * 0.85, height: size * 0.85 }}
          resizeMode="contain"
        />
      </View>
    );
  }

  if (source) {
    return (
      <Image
        source={source}
        style={[
          styles.base,
          styles.userBase,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={[
      styles.base,
      styles.userBase,
      styles.initialsBase,
      { width: size, height: size, borderRadius: size / 2 },
    ]}>
      <Text style={[styles.initials, { fontSize: size * 0.35 }]}>
        {(initials ?? '?').slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow:       'hidden',
    alignItems:     'center',
    justifyContent: 'center',
  },
  userBase: {
    borderWidth:  1.5,
    borderColor:  'rgba(124,108,255,0.30)',
    borderRadius: Radius.full,
  },
  aetherBase: {
    backgroundColor: Colors.bg.elevated,
    borderWidth:     1.5,
    borderColor:     'rgba(124,108,255,0.40)',
  },
  initialsBase: {
    backgroundColor: Colors.bg.elevated,
  },
  initials: {
    ...Typography.caption,
    color:      Colors.text.secondary,
    fontFamily: 'Inter_500Medium',
  },
});
