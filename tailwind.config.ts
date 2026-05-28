import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:      ["var(--font-sans)"],
        display:   ["var(--font-display)"],
        serif:     ["var(--font-serif)"],
        cinematic: ["var(--font-cinematic)"],
        signika:   ["var(--font-signika)"],
        "dm-sans": ["var(--font-dm-sans)"],
      },
      colors: {
        primary:   "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent:    "var(--color-accent)",
        "color-text":       "var(--color-text)",
        "color-text-muted": "var(--color-text-muted)",
        "color-border":     "var(--color-border)",
        "color-overlay":    "var(--color-overlay)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        slow:   "400ms",
        medium: "300ms",
        fast:   "200ms",
      },
    },
  },
  plugins: [],
};
export default config;
