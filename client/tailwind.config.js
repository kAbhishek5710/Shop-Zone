/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customWhite: "#F6F4F3",
        customBlack: "#425664",
        customBlue: "#124E66",
        customBlue2: "#124E66",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
