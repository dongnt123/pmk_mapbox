/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1B1B1B",
        light: "#FFFFFF",
        primary: "#bf653a",
        primaryDark: "#58E6D9",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}