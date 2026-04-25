export const Colors = {
  bg: '#1a1228',
  card: '#231640',
  elevated: '#2d1e4a',

  primary: '#7F77DD',
  strong: '#6b55cc',
  soft: '#c8bff8',

  text1: '#e8e0ff',
  text2: '#9988bb',
  text3: '#5a4a78',

  success: '#1D9E75',
  border: '#2e2040',
} as const;

export const Typography = {
  heading: { fontSize: 22, fontWeight: '500' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 9999,
} as const;
