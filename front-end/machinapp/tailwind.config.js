/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#39A900",
        "custom-blue": "#00324D",
      },
    },
  },
  plugins: [require("daisyui")],
};
