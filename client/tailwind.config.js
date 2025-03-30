/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003b87',
        secondary: '#e83435',
        'primary-dark': '#034094',
        'primary-light': '#056ae7',
      },
    },
  },
  plugins: [],
} 