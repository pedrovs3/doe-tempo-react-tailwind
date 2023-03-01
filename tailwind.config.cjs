/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'blueberry': '#4F79FE',
      'tufts-blue': '#4797E6',
      'branco-bem-claro': '#D9D9D9'
    },
  },
  plugins: [require("daisyui")],
}
