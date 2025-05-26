import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        imfell: ['"IM Fell English SC"', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
