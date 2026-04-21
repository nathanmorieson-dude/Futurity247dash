import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0a0e14",
        card: "rgba(18, 24, 33, 0.6)",
        "card-solid": "#121821",
        border: "rgba(255, 255, 255, 0.06)",
        "border-strong": "rgba(255, 255, 255, 0.12)",
        "text-primary": "#f1f5f9",
        "text-muted": "#cbd5e1",
        "text-dim": "#94a3b8",
        accent: {
          cyan: "#22d3ee",
          lime: "#a3e635",
          warn: "#fb923c",
          good: "#34d399",
          danger: "#f87171",
        },
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.18em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-1": "fade-in 0.4s ease-out 0.05s both",
        "fade-in-2": "fade-in 0.4s ease-out 0.15s both",
        "fade-in-3": "fade-in 0.4s ease-out 0.25s both",
        "fade-in-4": "fade-in 0.4s ease-out 0.35s both",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
      },
    },
  },
  plugins: [],
};

export default config;
