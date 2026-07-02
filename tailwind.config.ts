import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4efe4",
        cream: "#fdfaf2",
        ink: "#211f1a",
        soot: "#57503f",
        rule: "#d8cfba",
        seal: "#a8271b",
        sealdark: "#7e1d13",
        moss: "#3e5c43",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Newsreader", "Georgia", "serif"],
        mono: ["'Courier Prime'", "'Courier New'", "monospace"],
        ui: ["system-ui", "-apple-system", "'Segoe UI'", "sans-serif"],
      },
      boxShadow: {
        lift: "6px 6px 0 0 #211f1a",
        liftsm: "3px 3px 0 0 #211f1a",
        paper: "0 1px 2px rgba(46,38,20,0.08), 0 12px 32px -12px rgba(46,38,20,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
