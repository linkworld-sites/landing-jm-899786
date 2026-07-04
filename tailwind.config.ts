import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0A0A0A",
        acid: "#EFFF1A",
        navy: "#0B1F63",
        pink: "#FF2E93",
        paper: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        label: ["var(--font-label)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
