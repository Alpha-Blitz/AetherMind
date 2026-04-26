export const Colors = {
  bg: {
    base:     '#0d0a1a',
    surface:  '#1a1228',
    elevated: '#231640',
    overlay:  '#2d1e4a',
  },
  purple: {
    soft:    '#c8bff8',
    mid:     '#9b8be0',
    primary: '#7F77DD',
    strong:  '#6b55cc',
    deep:    '#534AB7',
    darkest: '#3C3489',
  },
  text: {
    primary:   '#e8e0ff',
    secondary: '#9988bb',
    tertiary:  '#5a4a78',
    disabled:  '#3d2e5c',
  },
  success:  '#1D9E75',
  warning:  '#BA7517',
  error:    '#E24B4A',
  gold:     '#F5C518',
  warmGlow: '#FFB347',
  border: {
    subtle:  '#1e1830',
    default: '#2e2040',
    active:  '#4a3680',
  },
  glow: {
    soft:   'rgba(127, 119, 221, 0.15)',
    medium: 'rgba(127, 119, 221, 0.30)',
    strong: 'rgba(200, 191, 248, 0.20)',
    orb:    'rgba(255, 179, 71, 0.35)',
  },
} as const;

export const Typography = {
  display: {
    fontSize: 28, fontWeight: '600' as const,
    lineHeight: 36, letterSpacing: -0.5,
  },
  heading: {
    fontSize: 22, fontWeight: '500' as const,
    lineHeight: 28, letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 16, fontWeight: '500' as const, lineHeight: 22,
  },
  body: {
    fontSize: 15, fontWeight: '400' as const, lineHeight: 22,
  },
  aetherSpeech: {
    fontSize: 15, fontWeight: '400' as const,
    lineHeight: 24, fontStyle: 'italic' as const,
  },
  caption: {
    fontSize: 12, fontWeight: '400' as const, lineHeight: 16,
  },
  label: {
    fontSize: 11, fontWeight: '500' as const,
    lineHeight: 14, letterSpacing: 0.3,
  },
  cta: {
    fontSize: 15, fontWeight: '600' as const,
    lineHeight: 20, letterSpacing: 0.2,
  },
} as const;

export const Space = {
  xs:   4,
  sm:   8,
  md:  12,
  lg:  16,
  xl:  24,
  xxl: 32,
  xxxl: 48,
} as const;

export const Radius = {
  sm:   6,
  md:  10,
  lg:  14,
  xl:  20,
  full: 999,
} as const;

export const Shadows = {
  card: {
    shadowColor: '#7F77DD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  aetherGlow: {
    shadowColor: '#c8bff8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  button: {
    shadowColor: '#6b55cc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
} as const;
