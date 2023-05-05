/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'redOld': '#D61C4E',
      'greenLow': '#B3FFAE',
      'greenHigh': '#379237',
      'yellowMain': '#FFC700',
      'brownMain': '#433434'
    },
  },
  plugins:
    [require("daisyui")]
}

