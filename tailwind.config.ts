import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/resolveConfig")(
  require("tailwindcss/defaultConfig")
).theme;
const sansFontFamily = ["Noto Sans Display", ...defaultTheme.fontFamily.sans];
const headerFontFamily = ["Squada One", ...defaultTheme.fontFamily.sans];

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: sansFontFamily,
      header: headerFontFamily,
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        danger: "var(--color-danger)",
        muted: "var(--color-muted)",
        highlight: "var(--color-highlight)",
        body: "var(--color-body)",
        fg: "var(--color-fg)",
        inverse: "var(--color-inverse)",
        bg: "var(--color-bg)",
      },
      animation: {
        "fade-in-down": "fadeInDown 250ms linear",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translate3d(0, -100%, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
