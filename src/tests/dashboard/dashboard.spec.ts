import { test } from "../../fixtures/test";
import type { Page } from "@playwright/test";
import { given, when, then } from "../../steps/dashboard";

test.describe("@smoke Dashboard", () => {
  test("User should be able to logout", async ({ page }: { page: Page }) => {
    await given.openDashboard(page);
    await when.clickPersonIcon(page);
    await when.clickLogoutButton(page);
    await then.loginButtonShouldBeVisible(page);
  });
});
