import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#163527",
          light: "#25503B",
        },
        gold: {
          DEFAULT: "#C6963C",
          light: "#DCB262",
        },
        background: "#F7F3EA",
        card: "#FFFFFF",
        ink: "#17201A",
        muted: "#6C7568",
      },
      fontFamily: {
        tajawal: ["var(--font-tajawal)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(23, 32, 26, 0.06), 0 1px 2px rgba(23, 32, 26, 0.04)",
        soft: "0 4px 16px rgba(22, 53, 39, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
