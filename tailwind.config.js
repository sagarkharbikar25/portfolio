/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#08080C',
        surface: '#0F101A',
        'surface-card': '#13131A',
        obsidian: '#070709',
        charcoal: '#0D0E15',
        nature: {
          mint: '#A7F3D0',
          'mint-dark': '#064E3B',
          lime: '#84CC16',
          'lime-light': '#BEF264',
          emerald: '#10B981',
          sky: '#38BDF8',
          'sky-deep': '#0284C7',
          lavender: '#E0E7FF',
          honey: '#F59E0B',
          sponge: '#26532B',
        },
        hud: {
          text: '#F3F4F6',
          muted: '#9CA3AF',
          dim: '#6B7280',
          gold: '#FBBF24',
          emerald: '#10B981',
          hairline: 'rgba(255, 255, 255, 0.08)',
          hairlineHot: 'rgba(255, 255, 255, 0.22)',
        },
      },
      fontFamily: {
        condensed: ['"Anton"', '"Bebas Neue"', 'Impact', 'sans-serif'],
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widestx: '0.2em',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
