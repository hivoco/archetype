/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "swipe-left": {
          "0%": {
            transform: "rotate(0deg) translateX(0) scale(1)",
            opacity: "1",
          },
          "100%": {
            // rotate slightly for a more natural swipe,
            // move left and reduce scale a bit
            transform: "rotate(-15deg) translateX(-200%) scale(0.9)",
            opacity: "0",
          },
        },
      },
      animation: {
        "swipe-left": "swipe-left 0.6s ease-out forwards",
      },
      fontFamily: {
        Inter: ['"Inter"', "sans-serif"],
        Edo: ["Edo", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "off-white": "#FFFBF9",
        "dark-brown": "#5D4037",
        "black-coffee": "#20160E",
        "milk-white": "#FFFBF8",
        "green-shamrock": "#00A55C33",
      },

      backgroundColor: {
        "dark-brown": "#5D4037",
        cream: "#FFF3E1",
      },
    },
  },
  plugins: [],
};
