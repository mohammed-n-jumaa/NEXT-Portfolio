/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#9b5de5',
          600: '#7c3aed',
        },
        secondary: {
          500: '#3a0ca3',
        },
      },
    },
  },
  plugins: [],
}