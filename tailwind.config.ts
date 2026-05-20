import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2.5rem" },
    },
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-soft": "rgb(var(--paper-soft) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        espresso: "rgb(var(--espresso) / <alpha-value>)",
        coffee: "rgb(var(--coffee) / <alpha-value>)",
        bean: "rgb(var(--bean) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          mute: "rgb(var(--ink-mute) / <alpha-value>)",
        },
        cream: {
          DEFAULT: "rgb(var(--cream) / <alpha-value>)",
          soft: "rgb(var(--cream-soft) / <alpha-value>)",
        },
        olive: "rgb(var(--olive) / <alpha-value>)",
        "warm-gray": "rgb(var(--warm-gray) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        jp: ["'Shippori Mincho'", "'Noto Serif JP'", "ui-serif", "serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        "tight-display": "-0.035em",
        wider2: "0.22em",
        widest2: "0.34em",
      },
      fontSize: {
        "display-2xl": [
          "clamp(3.4rem, 11vw, 11rem)",
          { lineHeight: "0.9", letterSpacing: "-0.04em" },
        ],
        "display-xl": [
          "clamp(2.7rem, 7.4vw, 6.75rem)",
          { lineHeight: "0.96", letterSpacing: "-0.035em" },
        ],
        "display-lg": [
          "clamp(2.15rem, 5vw, 4.35rem)",
          { lineHeight: "1.0", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "clamp(1.7rem, 3.1vw, 2.8rem)",
          { lineHeight: "1.1", letterSpacing: "-0.022em" },
        ],
      },
      maxWidth: {
        shell: "1440px",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
        soft: "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      keyframes: {
        "steam-a": {
          "0%": { transform: "translateY(8px) scaleX(0.8)", opacity: "0" },
          "22%": { opacity: "0.55" },
          "75%": { opacity: "0.28" },
          "100%": { transform: "translateY(-150px) scaleX(2.1)", opacity: "0" },
        },
        "steam-b": {
          "0%": { transform: "translateY(8px) scaleX(0.7)", opacity: "0" },
          "30%": { opacity: "0.4" },
          "80%": { opacity: "0.2" },
          "100%": { transform: "translateY(-180px) scaleX(2.4)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(2.5%, -3%) scale(1.06)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.8" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(-40%)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(150%)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "steam-a": "steam-a 7s ease-out infinite",
        "steam-b": "steam-b 9s ease-out infinite",
        drift: "drift 28s ease-in-out infinite",
        breathe: "breathe 8s ease-in-out infinite",
        "scroll-cue": "scroll-cue 2.6s cubic-bezier(0.65,0,0.35,1) infinite",
        marquee: "marquee 48s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
