import type { Config } from 'tailwindcss';

// "The Living Archive" — a dark, art-directed fermentation observatory.
// Warm tokens carry history & craft; the single cool token (phosphor) is
// reserved exclusively for laboratory data so colour itself encodes meaning.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        char: '#16110D', // near-black charred crust — primary canvas
        pumpernickel: '#211913', // raised surfaces, cards, the lab table
        soot: '#0E0A07', // deepest wells
        linen: '#EDE4D3', // warm paper — primary text
        ash: '#9A8E7B', // muted captions, secondary text
        levain: '#E8A33D', // amber glow of a living starter
        ember: '#B5562A', // oven heat / crust — used sparingly
        phosphor: '#7FD6C7', // instrument cyan — LAB DATA ONLY
        crumb: '#3A2C20', // hairlines, dividers, borders
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
          '50%': { opacity: '0.82' },
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
