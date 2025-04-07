const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9BBB59",
      },
      fontFamily: {
        pistara: ["Pistara", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "section-up-1": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "section-up-2": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "section-up-3": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "section-up-4": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "section-up-5": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "text-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
          "100%": { transform: "translateY(0)" },
        },
        "char-appear": {
          "0%": {
            transform: "translateY(50px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-up": {
          "0%": {
            transform: "translateY(200px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "section-up-1": "section-up-1 1s ease-out forwards",
        "section-up-2": "section-up-2 1s ease-out 0.2s forwards",
        "section-up-3": "section-up-3 1s ease-out 0.4s forwards",
        "section-up-4": "section-up-4 1s ease-out 0.6s forwards",
        "section-up-5": "section-up-5 1s ease-out 0.8s forwards",
        "text-up": "text-up 0.8s ease-out forwards",
        "line-grow": "line-grow 0.8s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scroll-down": "scroll-down 1.5s ease-in-out infinite",
        "char-appear": "char-appear 0.5s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
