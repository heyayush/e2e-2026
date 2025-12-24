import { test } from "../../fixtures/test";
import type { Page } from "@playwright/test";
import { given } from "../../steps/dashboard/given/given";
import { when } from "../../steps/dashboard/when/when";
import { then } from "../../steps/dashboard/then/then";

test.describe("@smoke Dashboard", () => {
  test("User should be able to logout", async ({ page }: { page: Page }) => {
    await given.openDashboard(page);
    await when.clickPersonIcon(page);
    await when.clickLogoutButton(page);
    await then.loginButtonShouldBeVisible(page);
  });
});
