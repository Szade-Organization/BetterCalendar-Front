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
        "vivid-green": "#12F55D",
        "sea-green": "#079BA5",
        "war-blue": "#1320AC",
        "light-yellow": "#D2EE4A",
        "lime-green": "#D2EE7D",
        "light-purple": "#9071A8",
        "light-orange": "#DD8459",
        "light-red": "#AB616E"
      },
    },
  },
  plugins: [],
};
