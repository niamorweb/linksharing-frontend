/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#fff",
        bluePurple: "#3F41A6",
        bluePurpleWeakOpacity: "#3F41A620",
        darkPurple: "#1A093C",
        darkGray: "#2E323B",
        gray: "#61646B",
      },
    },
  },
  plugins: [],
};
