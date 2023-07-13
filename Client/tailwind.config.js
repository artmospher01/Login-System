/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "100": "28rem",
        "90": "22rem",
      },
      fontFamily: {
        "satisfy": ["satisfy", "sans"],
        "poppins": ["poppins", "sans"]
      }
    },
  },
  plugins: [],
}

