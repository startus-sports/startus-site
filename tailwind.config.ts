import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E8740C',
          'orange-light': '#FFF3E6',
          'orange-hover': '#D06A0B',
          navy: '#1B2A4A',
          'navy-light': '#2A3F6A',
          'navy-dark': '#0F1A2E',
        },
        warm: {
          50: '#FFF8F0',
          100: '#F8F6F3',
          200: '#F0EDE8',
        },
      },
      fontFamily: {
        display: ['"M PLUS Rounded 1c"', 'sans-serif'],
        body: ['"Noto Sans JP"', '"M PLUS Rounded 1c"', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
export default config
