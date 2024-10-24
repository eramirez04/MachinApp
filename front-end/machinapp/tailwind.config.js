/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-green": "#39A914",
        "custom-blue": "#00324D",
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"], // Agregas "Work Sans" aquí
      },
    },
  },
  plugins: [nextui()],
};
