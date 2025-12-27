/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F67B1",
        secondary: "#3FA2F6",
        background: "#F2F9FF",
      },
    },
  },
  plugins: [],
}