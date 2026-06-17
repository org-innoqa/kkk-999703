/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#f59e0b',
        secondary: '#1f2937'
      }
    },
  },
  plugins: [],
}