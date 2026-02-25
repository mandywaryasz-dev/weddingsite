import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1F3A2E",
        ivory: "#F5EFE4",
        maroon: "#6E2F35",
        gold: "#C7A45D",
        textMuted: "#E0E0E0"
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-cormorant)", "serif"],
        devanagari: ["var(--font-tiro-devanagari)", "serif"]
      },
      keyframes: {
        "modal-in": {
          "0%": { opacity: "0", transform: "translate(-50%, -47%) scale(0.94)" },
          "100%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" }
        },
        "modal-out": {
          "0%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          "100%": { opacity: "0", transform: "translate(-50%, -47%) scale(0.97)" }
        },
        grain: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-1%, 1%)" },
          "50%": { transform: "translate(1%, -1%)" },
          "75%": { transform: "translate(1%, 1%)" },
          "100%": { transform: "translate(0, 0)" }
        },
        glow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.5" }
        }
      },
      animation: {
        "modal-in": "modal-in 340ms cubic-bezier(0.22, 1, 0.36, 1)",
        "modal-out": "modal-out 220ms cubic-bezier(0.4, 0, 1, 1)",
        grain: "grain 8s steps(6) infinite",
        glow: "glow 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
