/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        LexendDeca: "Lexend Deca",
      },
      colors: {
        primary: "#F5F2EA",
        secondary: "#FDC886",
        White: "#fff",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [],
};
