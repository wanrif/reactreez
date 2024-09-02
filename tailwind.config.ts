import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sofia Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#F6B17A',
          100: '#7077A1',
          200: '#424769',
          300: '#2D3250',
        },
      },
    },
  },
  plugins: [],
};
