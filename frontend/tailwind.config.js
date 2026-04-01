/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#da251d',
        'primary-dark': '#b71c1c',
        accent: '#ffde00',
        navy: '#0f172a',
      },
    },
  },
  plugins: [],
}