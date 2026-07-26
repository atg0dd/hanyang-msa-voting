/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0B1330",
          900: "#111C42",
          800: "#16204D",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 60, 0.06), 0 8px 24px -8px rgba(16, 24, 60, 0.12)",
      },
    },
  },
  plugins: [],
}

