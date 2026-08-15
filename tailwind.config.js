/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        'background-secondary': '#111111',
        card: '#141414',
        border: 'rgba(255,255,255,0.06)',
        glow: '#A855F7',
        accent: '#3B82F6',
        gold: '#F2B93A',
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #F2B93A, #EAB308)',
        'gold-gradient': 'linear-gradient(135deg, #F2B93A, #D97706)',
        'purple-gradient': 'linear-gradient(135deg, #A855F7, #6366F1)',
        'blue-gradient': 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(242,185,58,0.08), transparent)',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(242,185,58,0.35)',
        'purple-glow': '0 0 20px rgba(168,85,247,0.35)',
        'blue-glow': '0 0 20px rgba(59,130,246,0.35)',
        'card-glow': '0 8px 32px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
