/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "greental":'#00AD00',
      }
    },
  },
  plugins: [require('daisyui'),],
}

