/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0c',
        'ink-soft': '#121216',
        'ink-card': '#16161c',
        line: 'rgba(255,255,255,0.08)',
        cloud: '#ededec',
        muted: '#8b8b85',
        accent: '#c8f560',
        'accent-2': '#7c5cff',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
      keyframes: {
        'scroll-hint': {
          '0%,100%': {transform: 'translateY(0)', opacity: '0.4'},
          '50%': {transform: 'translateY(8px)', opacity: '1'},
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
