const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      fontFamily: {
         'title': ['Josefin', 'sans-serif'],
         'logo': ['Vacaciones', 'sans-serif'],
      },

      extend: {
         fontFamily: {
            'sans': ['Quicksand', ...defaultTheme.fontFamily.sans],
         },
         colors: {
            ...colors,
            'text': '#4c5665',
            'darkerText': '#2f2e38',
            'custom-blue': '#1d3557',
            'custom-lightBlue': '#a8dae3',
            'custom-yellow': '#fbb13c',
            'custom-lightYellow': '#fdd48a',
            'custom-orange': '#f28705',
            'custom-wine': '#951f52',
            'custom-lightWine': '#b42263',
         },
         container: {
            center: true,
            padding: {
               DEFAULT: '1rem',
               md: '2rem',
               lg: '3rem',
            },
         },
      },
   },
   plugins: [],
};
