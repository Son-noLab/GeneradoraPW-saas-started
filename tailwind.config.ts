import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#081640',
          900: '#0D2158',
          800: '#142D70',
          700: '#0E1E50',
          600: '#1454A8',
        },
        sky: {
          brand: '#1BA8E0',
        },
        muted: '#4A618C',
        'border-brand': '#C0CEE8',
        'bg-light': '#EDF1F8',
        'bg-alt': '#E2E8F4',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
