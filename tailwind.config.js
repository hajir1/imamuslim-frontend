import Fp from "flowbite/plugin";
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
        ijo: "#bcf0da",
        biru: "#c3ddfd",
        abang: "#fbd5d5",
        fuchi: "#f5d0fe",
        ungu: "#ddd6fe",
      },
    },
  },
  plugins: [Fp],
};
