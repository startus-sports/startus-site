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
        // トップページ（2026-10 リデザイン）の配色。星のマスコットの2色に合わせている。
        // 白文字を載せる小さなボタンは orange ではなく deep を使う（orange だとコントラスト不足）
        star: {
          orange: '#eb6600',
          deep: '#c24e00',
          ink: '#b84a00',
          navy: '#17324a',
          night: '#0f2336',
          sub: '#4a5a6a',
          cream: '#fff4e6',
          peach: '#fff0e0',
          sand: '#ffe2c4',
          apricot: '#ffd2a8',
          yellow: '#ffd257',
          mint: '#eaf6e6',
          green: '#2f7a3e',
          line: '#06c755',
          'line-text': '#047a3a',
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
