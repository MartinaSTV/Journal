/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/Pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Green: "#0FBD7E",
        Teal: "#2EC3B1",
        Blue: "#14A0DC",
        DarkBlue: "#0F69BD",
        Purple: "#4D2CD2",
        Violet: "#A43DF4",
        Pink: "#F73B95",
        Orange: "#F77313",
        RedOrange: "#DA582F",
        Red: "#E70B0B",
      },
      opacity: {
        15: "0.15",
      },
    },
  },
  plugins: [],
};
