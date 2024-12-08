import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    browser: {
      provider: "playwright",
      enabled: true,
      name: "chromium",
    },
    setupFiles: ["./tests/setup-tests.ts"],
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {
    global: {},
    process: {
      env: {},
    },
  },
});
