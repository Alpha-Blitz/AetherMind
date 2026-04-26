export const Colors = {
  bg: {
    primary:  '#070A14',
    surface:  '#131A30',
    elevated: '#1A2140',
  },
  purple: {
    primary: '#7C6CFF',
    soft:    '#B6A8FF',
    deep:    '#5A4BFF',
  },
  orange: {
    primary: '#FF9F43',
    light:   '#FFD6A0',
    deep:    '#FF7A00',
  },
  success: '#4ADE80',
  info:    '#4DABFF',
  warning: '#FFC43D',
  error:   '#FF4D6D',
  text: {
    primary:   '#E8ECFF',
    secondary: '#AAB0D6',
    muted:     '#6B7199',
  },
} as const;

export const Shadows = {
  sm: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius:  8,
    elevation:     2,
  },
  md: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0,
    shadowRadius:  16,
    elevation:     4,
  },
  lg: {
    shadowColor:   '#20104C',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.46,
    shadowRadius:  30,
    elevation:     8,
  },
  purpleGlow: {
    shadowColor:   '#7C6CFF',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius:  30,
    elevation:     10,
  },
  orangeGlow: {
    shadowColor:   '#FF9F43',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius:  30,
    elevation:     10,
  },
} as const;

export const Typography = {
  h1: {
    fontSize:   32,
    fontWeight: '600' as const,
    lineHeight: 38,
    fontFamily: 'Inter_600SemiBold',
    color:      '#E8ECFF',
  },
  h2: {
    fontSize:   24,
    fontWeight: '600' as const,
    lineHeight: 29,
    fontFamily: 'Inter_600SemiBold',
    color:      '#E8ECFF',
  },
  h3: {
    fontSize:   20,
    fontWeight: '500' as const,
    lineHeight: 24,
    fontFamily: 'Inter_500Medium',
    color:      '#E8ECFF',
  },
  h4: {
    fontSize:   18,
    fontWeight: '500' as const,
    lineHeight: 23,
    fontFamily: 'Inter_500Medium',
    color:      '#E8ECFF',
  },
  bodyLarge: {
    fontSize:   16,
    fontWeight: '400' as const,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
    color:      '#AAB0D6',
  },
  body: {
    fontSize:   14,
    fontWeight: '400' as const,
    lineHeight: 21,
    fontFamily: 'Inter_400Regular',
    color:      '#AAB0D6',
  },
  caption: {
    fontSize:   12,
    fontWeight: '500' as const,
    lineHeight: 18,
    fontFamily: 'Inter_500Medium',
    color:      '#6B7199',
  },
  aetherSpeech: {
    fontSize:   16,
    fontWeight: '400' as const,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
    fontStyle:  'italic' as const,
    color:      '#E8ECFF',
  },
  cta: {
    fontSize:   14,
    fontWeight: '600' as const,
    lineHeight: 20,
    fontFamily: 'Inter_600SemiBold',
    color:      '#FFFFFF',
  },
} as const;

export const Space = {
  1:    4,
  2:    8,
  3:   12,
  4:   16,
  5:   24,
  6:   40,
  7:   48,
  8:   64,
  9:   80,
  10:  96,
  11: 128,
} as const;

export const Layout = {
  screenPaddingH: 20,
  screenPaddingT: 16,
  screenPaddingB: 20,
  sectionGap:     24,
  cardPadding:    16,
  componentGap:    8,
} as const;

export const Radius = {
  xs:   4,
  sm:   8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 32,
  full: 9999,
} as const;

export const AetherSize = {
  sm:  32,
  md:  80,
  lg: 160,
} as const;

export const Timing = {
  tap:        150,
  quick:      280,
  standard:   350,
  deliberate: 500,
  breathing: 2000,
} as const;

export const IconSize = {
  sm: 16,
  md: 22,
  lg: 28,
} as const;

export const Spring_Aether = { damping: 14, stiffness: 120 } as const;
