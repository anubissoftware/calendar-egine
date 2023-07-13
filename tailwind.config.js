/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1/7': '14.28%',
        '1/10': '10%',
        '8/10': '80%'
      }
    }
  },
  plugins: [],
}

