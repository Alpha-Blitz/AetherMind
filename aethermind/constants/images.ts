import { ImageSourcePropType } from 'react-native';

export type AetherExpression =
  | 'happy' | 'thinking' | 'encouraging' | 'celebrating'
  | 'calm'  | 'curious'  | 'idle'        | 'empathetic'
  | 'speaking' | 'waiting';

export const AetherImages: Record<AetherExpression, ImageSourcePropType> = {
  happy:       require('../assets/images/aether/aether-happy.png'),
  thinking:    require('../assets/images/aether/aether-thinking.png'),
  encouraging: require('../assets/images/aether/aether-curious.png'),
  celebrating: require('../assets/images/aether/aether-happy.png'),
  calm:        require('../assets/images/aether/aether-idle.png'),
  curious:     require('../assets/images/aether/aether-curious.png'),
  idle:        require('../assets/images/aether/aether-idle.png'),
  empathetic:  require('../assets/images/aether/aether-empathetic.png'),
  speaking:    require('../assets/images/aether/aether-empathetic.png'),
  waiting:     require('../assets/images/aether/aether-idle.png'),
};

export const AetherSize = {
  sm:  32,
  md:  80,
  lg: 160,
} as const;
