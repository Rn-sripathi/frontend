/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        darkslategray: "rgba(53, 57, 85, 0.73)",
      },rose: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
        950: '#1f0404', // Custom dark rose color
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
        "paytone-one": "'Paytone One'",
      },
      borderRadius: {
        xl: "20px",
      },
    },
    fontSize: {
      xl: "20px",
      base: "16px",
      mini: "15px",
      "11xl": "30px",
      lg: "18px",
      "5xl": "24px",
      inherit: "inherit",
    },
    screens: {
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
});
