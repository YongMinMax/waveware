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
        primary: '#9BBB59',
      },
      fontFamily: {
        pistara: ['Pistara', ...defaultTheme.fontFamily.sans],
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
