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
        card: "0 0 0 1px rgba(23,32,26,0.04), 0 2px 8px rgba(22,53,39,0.07), 0 1px 3px rgba(22,53,39,0.05)",
        soft: "0 0 0 1px rgba(23,32,26,0.03), 0 10px 28px rgba(22,53,39,0.12), 0 3px 8px rgba(22,53,39,0.07)",
        elevated: "0 0 0 1px rgba(23,32,26,0.03), 0 20px 48px -12px rgba(22,53,39,0.22), 0 6px 16px rgba(22,53,39,0.10)",
        nav: "0 -4px 20px rgba(22,53,39,0.08)",
        glow: "0 8px 24px rgba(198,150,60,0.28)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      keyframes: {
        "page-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wave: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "page-in": "page-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        wave: "wave 3.5s linear infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pop-in": "pop-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
