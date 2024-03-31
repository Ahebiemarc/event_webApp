/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT( {
  content: [
    "./src/**/*.{html,js,jsx}",
],
  theme: {
    extend: {
      colors:{
        blue: '#1e1e2f',
        green: '#97c680',
        orange: "#f38359",
        paleOrange: "hsl(25, 100%, 94%)",
      },
      fontFamily:{
        police: ['Poppins', 'sans-serif'],
        sans: ["Roboto", "sans-serif"],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      gridTemplateColumns: {
        // Simple 12 column grid
        '2': 'repeat(12, 1fr)',
        'profile': "40% 60%"
      },
      boxShadow: {
        'sm': '3px 6px 6px 2px rgb(0 0 0 / 20%)',
      },
      transitionProperty: {
        'width': 'width',
        'opacity': 'opacity',
      },
      backgroundPosition: {       
        'center-top': 'center top',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(200%)' },
          '100%': { transform: 'translateY(0)' },
        },
        blink: {
          'from, to': { opacity: 1 },
          '50%': { opacity: 0, },
        },
      },
      animation: {
        wiggle: 'wiggle 1500ms ease forwards',
        wiggle2: 'wiggle 500ms ease forwards',
        wiggle3: 'wiggle 1000ms ease forwards',
        blink1: 'blink 1s step-end infinite',
      }
    },  
  },
  plugins: [],
});
