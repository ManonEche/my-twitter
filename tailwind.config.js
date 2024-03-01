/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.35)",
        shadow: "rgba(0, 0, 0, 0.1)",
        button: "rgba(255, 255, 255, 0.85)",
        drk: "#302F2F",
        follow : "#e7e1fa"
      }
    },
  },
  plugins: [],
}

