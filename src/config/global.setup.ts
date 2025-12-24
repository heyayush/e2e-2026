import { chromium, type FullConfig } from "@playwright/test";
import { ENV } from "./environment";

async function globalSetup(_config: FullConfig) {
  console.log("🚀 Starting global setup...");
  console.log(`📍 Base URL: ${ENV.BASE_URL}`);
  console.log(`📍 API Base URL: ${ENV.API_BASE_URL}`);
  console.log(`🤖 CI Mode: ${ENV.IS_CI ? "Enabled" : "Disabled"}`);

  // Check if the application is running
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log("🔍 Checking if application is accessible...");
    await page.goto(ENV.BASE_URL, {
      timeout: 15000,
      waitUntil: "domcontentloaded",
    });
    console.log("✅ Application is accessible");
  } catch (error) {
    console.error(
      "❌ Application is not accessible. Please start the application first."
    );
    console.error(error);
    await browser.close();
    process.exit(1);
  }

  await browser.close();
  console.log("✅ Global setup completed successfully\n");
}

export default globalSetup;
