/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#09090b",
        secondary: "#d8d8d8",
        accent: "#18181b",
        text: "#a1a1aa",
      },
    },
  },
  plugins: [],
};
