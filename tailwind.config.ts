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
        silver: "#DBDBDB",
        maroon: "#6E2F35",
        gold: "#C7A45D",
        textMuted: "#E0E0E0"
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-cormorant)", "serif"],
        devanagari: ["var(--font-tiro-devanagari)", "serif"]
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "var(--leading-display)" }],
        headline: ["var(--text-headline)", { lineHeight: "var(--leading-headline)" }],
        subhead: ["var(--text-subhead)", { lineHeight: "var(--leading-subhead)" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }],
        "body-sm": ["var(--text-body-sm)", { lineHeight: "var(--leading-body)" }],
        label: ["var(--text-label)", { lineHeight: "var(--leading-label)" }],
        detail: ["var(--text-detail)", { lineHeight: "var(--leading-label)" }],
        button: ["var(--text-button)", { lineHeight: "var(--leading-label)" }],
        micro: ["var(--text-micro)", { lineHeight: "var(--leading-label)" }]
      },
      letterSpacing: {
        display: "var(--tracking-display)",
        heading: "var(--tracking-heading)",
        label: "var(--tracking-label)",
        micro: "var(--tracking-micro)"
      },
      spacing: {
        "scene-y": "var(--space-scene-y)",
        "scene-x": "var(--space-scene-x)",
        "stack-lg": "var(--space-stack-lg)",
        "stack-md": "var(--space-stack-md)",
        "stack-sm": "var(--space-stack-sm)",
        "stack-xs": "var(--space-stack-xs)",
        divider: "var(--space-divider)",
        "explore-gap": "var(--space-explore-gap)",
        "scene-break": "var(--space-scene-break)"
      },
      maxWidth: {
        measure: "var(--measure)",
        "measure-lg": "var(--measure-lg)"
      },
      keyframes: {
        "modal-in": {
          "0%": { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
          "100%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" }
        },
        "modal-out": {
          "0%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          "100%": { opacity: "0", transform: "translate(-50%, -48%) scale(0.98)" }
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
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.72" },
          "50%": { transform: "translateY(4px)", opacity: "1" }
        },
        "ad-sway": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(2.2deg)" }
        },
        "ad-sway-r": {
          "0%, 100%": { transform: "scaleX(-1) rotate(0deg)" },
          "50%": { transform: "scaleX(-1) rotate(2.2deg)" }
        },
        "ad-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(7px)" }
        },
        "invite-rise": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "modal-in": "modal-in 260ms ease-out",
        "modal-out": "modal-out 180ms ease-in",
        grain: "grain 8s steps(6) infinite",
        glow: "glow 6s ease-in-out infinite",
        "scroll-hint": "scroll-hint 1.8s ease-in-out infinite",
        "ad-sway": "ad-sway 11s ease-in-out infinite",
        "ad-sway-r": "ad-sway-r 12s ease-in-out infinite",
        "ad-bob": "ad-bob 2.4s ease-in-out infinite",
        "invite-rise": "invite-rise 900ms cubic-bezier(0.22,1,0.36,1) both"
      }
    }
  },
  plugins: []
};

export default config;
