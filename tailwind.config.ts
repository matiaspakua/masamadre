import type { Config } from 'tailwindcss';

// "The Living Archive" — light edition. A warm-white museum/lab daylight,
// printed-page surfaces, ink text, with amber & ember carrying warmth and a
// single deep teal (phosphor) reserved exclusively for laboratory data so
// colour itself still encodes meaning.
//
// Token legend (names kept stable across the codebase):
//   paper   page background (warm white)
//   surface raised cards / panels (near-white)
//   sink    deeper bands for section contrast
//   ink     primary text (warm near-black)
//   ash     muted secondary text
//   line    hairlines, borders, dividers
//   levain  living-starter amber  (history & craft)
//   ember   oven heat / crust     (used sparingly)
//   phosphor instrument teal      (LAB DATA ONLY)
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F1E7',
        surface: '#FFFDF8',
        sink: '#EDE5D6',
        ink: '#2A2018',
        ash: '#8A7C68',
        line: '#E1D6C2',
        levain: '#C0741A',
        ember: '#A8431E',
        phosphor: '#0E7A6B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.32em',
      },
      maxWidth: {
        reading: '38rem',
      },
      transitionTimingFunction: {
        archive: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        rise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '15%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-180px) scale(0.4)', opacity: '0' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        flicker: 'flicker 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
