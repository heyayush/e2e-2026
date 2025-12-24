import dotenv from "dotenv";

dotenv.config();

const ENV = {
  BASE_URL: process.env.BASE_URL ?? "http://localhost:3000",
  API_BASE_URL: process.env.API_BASE_URL ?? "http://localhost:3000/api",

  // Test Users
  TEST_USER: {
    EMAIL: process.env.TEST_USER_EMAIL ?? "test@example.com",
    PASSWORD: process.env.TEST_USER_PASSWORD ?? "Test123!@#",
  },

  // Test Configuration
  HEADLESS: process.env.HEADLESS === "true",
  SLOW_MO: parseInt(process.env.SLOW_MO ?? "0", 10),
  TIMEOUT: parseInt(process.env.TIMEOUT ?? "30000", 10),
  RETRIES: parseInt(process.env.RETRIES ?? "0", 10),

  // CI Configuration
  IS_CI: process.env.CI === "true",
  CI_RETRIES: parseInt(process.env.CI_RETRIES ?? "2", 10),
  CI_WORKERS: parseInt(process.env.CI_WORKERS ?? "4", 10),

  // Reporting
  ENABLE_VIDEO: process.env.ENABLE_VIDEO !== "false",
  ENABLE_SCREENSHOTS: process.env.ENABLE_SCREENSHOTS !== "false",
  ENABLE_TRACE: process.env.ENABLE_TRACE !== "false",
} as const;

export { ENV };
export type Environment = typeof ENV;
