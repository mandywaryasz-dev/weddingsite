import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  esbuild: {
    jsx: "automatic"
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    include: ["tests/unit/**/*.test.ts", "tests/components/**/*.test.tsx"],
    exclude: ["tests/e2e/**"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname)
    }
  }
});
