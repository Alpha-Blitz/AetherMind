/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // AetherMind design tokens — keep in sync with constants/theme.ts
        aether: {
          bg:        '#1a1228',
          card:      '#231640',
          elevated:  '#2d1e4a',
          primary:   '#7F77DD',
          strong:    '#6b55cc',
          soft:      '#c8bff8',
          'text-1':  '#e8e0ff',
          'text-2':  '#9988bb',
          'text-3':  '#5a4a78',
          success:   '#1D9E75',
          border:    '#2e2040',
        },
      },
      fontFamily: {
        sans: ['SpaceMono', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
