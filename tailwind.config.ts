import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070b14",
          900: "#0b1120",
          800: "#131c31",
          700: "#1d2a45",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(52, 211, 153, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
