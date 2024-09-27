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
        primary: "#485277",
        accent: "#d60b8b",
      },
    },
  },
  plugins: [],
};
export default config;
