/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px", // Extra small devices (small phones)
        sm: "640px", // Small devices (landscape phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (desktops)
        xl: "1280px", // Extra-large devices (large desktops)
        "2xl": "1536px", // 2X-Large devices (larger desktops)
        "3xl": "1920px", // 3X-Large devices (ultra-wide screens)
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
