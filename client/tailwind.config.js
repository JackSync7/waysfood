/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'yellowMain': '#FFC700',
      'brownMain': '#433434'
    },
  },
  plugins:
    [require("daisyui")]
}

