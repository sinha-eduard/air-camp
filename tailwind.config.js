/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/views/**/*.ejs",
    "./public/js/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [      {
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        accent: "#639962",
        neutral: "#404f40",
        secondary: "#f6d860"
      },
    },],
  },
}