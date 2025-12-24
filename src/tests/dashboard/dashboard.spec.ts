import { test } from "../../fixtures/test";
import type { Page } from "@playwright/test";
import { dashboardSteps } from "../../steps/dashboard/dashboard.steps";

test.describe("@smoke Dashboard", () => {
  test("Dashboard loads correctly", async ({ page }: { page: Page }) => {
    await dashboardSteps.openDashboard(page);
  });
});
