/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        first: '#007EA7', // Cerulean
        second: '#00A7E1', // Picton blue
        third: '#003459', // Prussian blue
        fourth: '#FFFFFF', // White
        fifth: '#00171F', // Rich black
      },
    },
  },
  plugins: [],
}

