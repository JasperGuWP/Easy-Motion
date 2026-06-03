/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/renderer/index.html", "./src/renderer/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        em: {
          bg: "#0F0F23",
          surface: "#1A1A2E",
          elevated: "#252542",
          border: "#2D2D4A",
          text: "#F8FAFC",
          muted: "#94A3B8",
          accent: "#E11D48",
          "accent-hover": "#BE123C",
          teal: "#0D9488",
          warning: "#F97316",
          error: "#DC2626",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "Consolas", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
      },
    },
  },
  plugins: [],
};
