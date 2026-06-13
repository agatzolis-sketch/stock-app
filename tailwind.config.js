/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand-bg': '#0A0E1A',
        'card-bg': '#111827',
        'card-border': '#1F2937',
        'teal-accent': '#00D4AA',
        'crimson-accent': '#FF4D6A',
        'amber-accent': '#F0B429',
        'muted-text': '#8892A4',
        'body-text': '#E2E8F0',
        'heading-text': '#F8FAFC',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
