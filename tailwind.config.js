const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        "ping-custom": {
          "75%, 100%": {
            transform: "scale(1.2)",
            opacity: "0",
          },
        },
      },
      colors: {
        primary: "#1cb6c7",
        secondary: "#48d6db",
      },
      animation: {
        "ping-custom": "ping-custom 1s cubic-bezier(0, 0, 0.1, 0.6) infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
