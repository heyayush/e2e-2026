import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ["html", { outputFolder: "reports/html", open: "never" }],
    ["allure-playwright"],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: !!process.env.CI || process.env.HEADLESS !== "false",
    screenshot: "on",
    // screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium", viewport: { width: 1080, height: 1920 } },
    },
  ],
  outputDir: "test-results",
  globalSetup: path.resolve(
    import.meta.dirname,
    "./src/config/global.setup.ts"
  ),
  globalTeardown: path.resolve(
    import.meta.dirname,
    "./src/config/global.teardown.ts"
  ),
});
