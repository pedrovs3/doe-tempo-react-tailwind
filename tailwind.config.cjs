/** @type {import('tailwindcss').Config} */
const {colors} = require("tailwindcss/colors");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors},
    colors: {
      'blueberry': '#4F79FE',
      'tufts-blue': '#4797E6',
      'branco': '#D9D9D9',
      'turquoise-700': '#4FFEC7',
      'turquoise-500': '#47E6E0',
      'maya_blue': '#5BD7FC',
      'little-white': '#FBFBFD',
      'card-campanha': '#F2F2F7',
      'texto-campanha': '#888888',
      'gray-apagado': '#777777',
      'gray-500': '#4f4f52'
    },
  },
  plugins: [require("daisyui")],
}
