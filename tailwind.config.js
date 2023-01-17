/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#E7ECEC",
        "main-200": "#DDE4E4",
        "main-300": "#CED9D9",
        "main-400": "#C0D8D8",
        "main-500": "#0E8080",
      },
      colors: {
        "main-100": "#E7ECEC",
        "main-200": "#DDE4E4",
        "main-300": "#CED9D9",
        "main-400": "#C0D8D8",
        "main-500": "#0E8080",
        "main-600" : "#0f7070",
      },
      flex: {
        4: "4 4 0%",
      },
      spacing: {
        15: "60px",
      },
      objectPosition : {
        "custom" : "50% 20%"
      },
      animation: {
        "rotatespin": "rotatespin 8s infinite linear",
      },
      keyframes: {
        rotatespin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  screens: {
    1600: "1600px",
  },
  plugins: [],
};
