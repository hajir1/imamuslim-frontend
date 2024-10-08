const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1cb6c7",
        secondary: "#48d6db",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      fontFamily: {
        arabic: ["isep", "sans-serif"],
      },
    },
  },
  plugins: [],
};
