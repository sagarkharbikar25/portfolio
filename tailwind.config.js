/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#08080C',
        surface: '#0F101A',
        'surface-card': '#13131A',
        indigoGlass: '#1A1A2E',
        ice: '#6FC4F2',
        cyan: {
          neon: '#00F0FF',
          soft: '#38BDF8',
        },
        purple: {
          neon: '#9D4EDD',
          deep: '#3B0764',
        },
        gold: {
          DEFAULT: '#FFD700',
          hot: '#FFAA00',
        },
        hud: {
          text: '#E6F4F5',
          muted: '#B9CACB',
          dim: '#849495',
          gold: '#FFD700',
          emerald: '#34D399',
          hairline: 'rgba(150, 200, 255, 0.15)',
          hairlineHot: 'rgba(150, 200, 255, 0.3)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

