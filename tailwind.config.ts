import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        body: ["'Satoshi'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        obsidian: "#0A0A0F",
        "obsidian-2": "#0F0F17",
        "obsidian-3": "#15151F",
        electric: "#5B6EF5",
        "electric-dim": "#3D4FC0",
        neon: "#00FFB2",
        "neon-dim": "#00CC8E",
        chalk: "#F0EDE8",
        "chalk-dim": "#B8B4AE",
        crimson: "#FF3D5A",
        amber: "#FFB547",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, hsla(240,100%,74%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.05) 0px, transparent 50%)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee2": "marquee2 30s linear infinite",
        "counter-up": "counterUp 0.5s ease-out forwards",
        "scan-line": "scanLine 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(91,110,245,0.4)" },
          "50%": { boxShadow: "0 0 60px rgba(91,110,245,0.8)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        talentflow: {
          primary: "#5B6EF5",
          secondary: "#00FFB2",
          accent: "#FF3D5A",
          neutral: "#0F0F17",
          "base-100": "#0A0A0F",
          "base-200": "#0F0F17",
          "base-300": "#15151F",
          info: "#5B6EF5",
          success: "#00FFB2",
          warning: "#FFB547",
          error: "#FF3D5A",
        },
      },
    ],
  },
};

export default config;
