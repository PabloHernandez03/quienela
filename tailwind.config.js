/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        first: '#007EA7', // Rojo
        second: '#00A7E1', // Piel
        third: '#003459', // Verde bajo
        fourth: '#FFFFFF', // Verde
        fifth: '#00171F', // Verde fuerte
      },
    },
  },
  plugins: [],
}

