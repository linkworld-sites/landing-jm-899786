import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        linen: "#E8E0D0",
        ink: "#4A3728",
        sienna: "#C94A2B",
        navy: "#1B3A5C",
        gold: "#F2C94C",
        surface: "#EDE8DC",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
