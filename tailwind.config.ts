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
    },
  },
  plugins: [],
};
export default config;
