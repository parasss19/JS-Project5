/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      //custom font
      fontFamily: {
        "custom-font" : ["Poppins"]
      }
    },
  },
  plugins: [],
}

