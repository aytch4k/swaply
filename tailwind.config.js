/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        'search': '10',
        'dropdown': '999',
        'modal': '1000',
        'tooltip': '1100',
      }
    },
  },
  plugins: [],
};