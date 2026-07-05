import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F3EC",
        ink: "#171310",
        stone: "#3A322C",
        taupe: "#8C8478",
        rust: "#B23A2E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        label: ["var(--font-label)", "sans-serif"],
        mono: ["var(--font-label)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
