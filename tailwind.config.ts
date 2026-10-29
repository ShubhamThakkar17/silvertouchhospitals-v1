import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        primary: { DEFAULT: v("primary"), dark: v("primary-dark"), tint: v("primary-tint") },
        emergency: { DEFAULT: v("emergency"), dark: v("emergency-dark"), brand: v("emergency-brand") },
        ink: v("ink"),
        body: v("body"),
        surface: v("surface"),
        line: v("line"),
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        // Hospic scale: 80px hero, ~52px section titles; body never below 16px.
        "display": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" }],
        "h2": ["clamp(2rem, 4.2vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "h3": ["clamp(1.375rem, 2.4vw, 1.875rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }],
        "lead": ["1.1875rem", { lineHeight: "1.7" }],
      },
      borderRadius: { card: "10px" },
      maxWidth: { prose: "72ch" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "hero-zoom": { from: { transform: "scale(1.05)" }, to: { transform: "scale(1)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "hero-zoom": "hero-zoom 1.6s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
