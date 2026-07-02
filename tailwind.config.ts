import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        road: "#f6f5ef",
        sign: "#0b5a3c",
        signdark: "#07452e",
        caution: "#ffc72c",
        ink: "#16211b",
        gravel: "#5c675e",
        rule: "#dedcce",
        card: "#fffefa",
      },
      fontFamily: {
        sign: ["Overpass", "system-ui", "sans-serif"],
        mono: ["'Overpass Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        sign: "0 2px 0 rgba(22,33,27,0.25), 0 10px 24px -10px rgba(11,90,60,0.35)",
        card: "0 1px 2px rgba(30,40,30,0.06), 0 10px 28px -14px rgba(30,40,30,0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
