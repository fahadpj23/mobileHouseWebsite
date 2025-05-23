module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // For React and TypeScript
  ],
  theme: {
    extend: {
      colors: {
        grayBackground: "#f8f9fa",
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
