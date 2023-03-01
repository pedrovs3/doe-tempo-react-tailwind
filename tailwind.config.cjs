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
      'branco': '#D9D9D9',
      'turquoise-700': '#4FFEC7'
    },
  },
  plugins: [require("daisyui")],
}
