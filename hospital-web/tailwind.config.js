/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F67B1", // Professional Hospital Blue
        secondary: "#3FA2F6",
        accent: "#96C9F4",
        background: "#F2F9FF",
      }
    },
  },
  plugins: [],
}