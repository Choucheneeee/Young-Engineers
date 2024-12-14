/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Covers React files
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0083cb",
        primaryRed: "#ed174c",
      },
    },
  },
  plugins: [],
};
