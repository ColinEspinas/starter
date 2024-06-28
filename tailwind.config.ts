import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontFamily: {
      sans: ['"Hanken Grotesk", sans-serif;'],
    },
    extend: {
      colors: {
        base: {
          50: '#F8F6F5',
          100: '#E8E4DF',
          200: '#D0C9BF',
          300: '#B0A898',
          400: '#8F8672',
          500: '#746C58',
          600: '#5C5645',
          700: '#4B473A',
          800: '#3E3B31',
          900: '#2A2822',
          950: '#1D1C16',
        },
        accent: {
          50: '#f3f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bea6ff',
          400: '#9f75ff',
          500: '#843dff',
          600: '#7916ff',
          700: '#6b04fd',
          800: '#5a03d5',
          900: '#4b05ad',
          950: '#2c0076',
        },
      },
    },
  },
  plugins: [
    daisyui,
  ],
  darkMode: 'class',
} satisfies Config
