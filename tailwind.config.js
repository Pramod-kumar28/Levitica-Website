/** @type {import('tailwindcss').Config} */

const { extendedConfig } = require("./src/styles/extendedConfig");

module.exports = {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      ...extendedConfig,

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },

  plugins: [],
};