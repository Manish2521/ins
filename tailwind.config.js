/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        igBlue: "#0095f6",
        igBlueHover: "#1877F2",
        igBorder: "#dbdbdb",
        igText: "#262626",
        igMuted: "#737373",
        igBg: "#fafafa",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Arial"],
        insta: ["'Grand Hotel'", "cursive"]
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06)"
      }
    },
  },
  plugins: [],
}
