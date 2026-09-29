/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '2rem', lg: '3rem', xl: '4rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        alt: 'rgb(var(--c-alt) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        champagne: 'rgb(var(--c-champagne) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Fraunces', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        display: ['clamp(2.75rem, 8vw, 7rem)', { lineHeight: '0.94', letterSpacing: '-0.025em' }],
        title: ['clamp(2rem, 4.4vw, 3.6rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        subtitle: ['clamp(1.35rem, 2.2vw, 1.9rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      letterSpacing: { mega: '0.32em', wider2: '0.18em' },
      maxWidth: { measure: '62ch', 'measure-sm': '46ch' },
      borderRadius: { xs: '3px' },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'scroll-hint': {
          '0%': { transform: 'translateY(-60%)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(140%)', opacity: '0' },
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 2.4s cubic-bezier(0.65,0,0.35,1) infinite',
      },
    },
  },
  plugins: [],
}
