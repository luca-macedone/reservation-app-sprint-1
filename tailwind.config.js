/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        special: ["'Pacifico'", "cursive"],
        base: ["'Comfortaa'", "sans-serif"],
      },
      colors: {
        primary: "#FF4C31",
        secondary: "#B30C20",
        tertiary: "#FDF5D9",
        accent: "#F27001",
        light: "#FFFBED",
        dark: "#001E2A",
      },
      backgroundImage: {
        "logo-gradient": [
          "radial-gradient(circle, theme('colors.primary') 0%, theme('colors.light') 100%);",
        ],
      },
    },
  },
  plugins: [],
};
