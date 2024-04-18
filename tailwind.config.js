/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "week-background": "#CFF4D2",
        "activities-background": "#7BE495",
        "statistics-background": "#56C596",
        "planner-background": "#329D9C",
        "settings-background": "#3C6C8E",
        "grey-background": "#ECECEC",
      },
    },
  },
  plugins: [],
};
