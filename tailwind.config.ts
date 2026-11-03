import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // REVISED ARCHITECTURE v2.0 COLOR PALETTE
        crimson: '#7A1418',
        'deep-crimson': '#4E0C0F',
        gold: '#B8933A',
        'gold-light': '#D4AE60',
        'forest-green': '#1A3328',
        slate: '#2B3A4A',
        ivory: '#F7F3EC',
        charcoal: '#1E1E1E',

        // Hero & Studiro aesthetic tokens
        'brand-red': '#b52619',
        'brand-red-dark': '#8b0000',
        tertiary: '#d4af37',
        'tertiary-container': '#cca730',
        'on-surface': '#1a1918',
        'on-surface-variant': '#55524e',
        outline: '#8a857e',
        'outline-variant': '#e2ded8',

        // Semantic & compatibility mappings
        primary: '#7A1418',
        'primary-dark': '#4E0C0F',
        accent: '#B8933A',
        'accent-light': '#D4AE60',
        surface: '#F7F3EC',
        'surface-dark': '#1E1E1E',
        'surface-slate': '#2B3A4A',
        'surface-green': '#1A3328',
        'text-primary': '#1E1E1E',
        'text-secondary': '#555555',
        'text-ivory': '#F7F3EC',
        'text-gold': '#B8933A',
        'text-gold-light': '#D4AE60',
        border: '#E2DED8',
        'border-gold': '#B8933A',
        'border-crimson': '#7A1418',
        'link-hover': '#333333',
        focus: '#0057FF',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        headline: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        body: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        display: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        ui: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
        content: '960px',
        container: '1340px',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
