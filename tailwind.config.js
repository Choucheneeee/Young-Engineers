/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Ensure this is included
    "./src/**/*.{js,ts,jsx,tsx}", // Includes all React files
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#0083cb',
        primaryRed: '#ed174c',
        secondaryGreen: '#8dc63f',
        secondaryYellow: '#fff200',
      },
      fontFamily: {
        signika: ['Signika', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
