import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        imfell: ['"IM Fell English SC"', 'serif'],
      },
    },
  },
  plugins: [
    lineClamp,
  ],
};

export default config;
