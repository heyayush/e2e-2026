import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

export default tseslint.config(
  // Base JS rules
  eslint.configs.recommended,

  // TypeScript recommended (type-aware)
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Playwright rules
  {
    files: ["src/tests/**/*.ts"],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs["flat/recommended"].rules,

      // Opinionated project rules
      "playwright/no-wait-for-timeout": "error",
      "playwright/no-force-option": "warn",
      "playwright/expect-expect": "error",
    },
  }
);
