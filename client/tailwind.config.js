/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "jersey-10": ['"Jersey 10"', "sans-serif"],
        "dancing-script": ['"Dancing Script"', "cursive"],
      },
      colors: {
        customWhite: "#F6F4F3",
        customBlack: "#425664",
        customBlue: "#124E66",
        customBlue2: "#124E66",
        customTemp: "#494B68",
        customPink: "#E7717D",
        customGreen: "#AFD275",
        customBlue3: "#C6AD85",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
