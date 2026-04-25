/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#dbe4ff',
          300: '#becdff',
          400: '#91a5ff',
          500: '#6378ff', // Classic Royal Blue/Indigo
          600: '#4a56e2',
          700: '#3a44b3',
          800: '#2d348a',
          900: '#1e235e',
        },
        accent: {
          400: '#fbbf24', // Amber
          500: '#f59e0b', // Gold
          600: '#d97706',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'], // Premium display font
      },
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.2)',
        'glow-lg': '0 0-40px rgba(99, 102, 241, 0.3)',
        'classic': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
