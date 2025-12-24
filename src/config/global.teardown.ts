import type { FullConfig } from "@playwright/test";

async function globalTeardown(_config: FullConfig) {
  console.log("\n🧹 Starting global teardown...");

  // Perform any global cleanup operations here
  // For example: cleanup database, stop services, etc.

  console.log("✅ Global teardown completed successfully");
}

export default globalTeardown;
