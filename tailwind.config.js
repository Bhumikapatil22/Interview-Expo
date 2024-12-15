/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // Ensure the root HTML file is included
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
