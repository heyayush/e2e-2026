import { test } from "../../fixtures/test";
import type { Page } from "@playwright/test";
import { given } from "../../steps/auth/given/given";
import { when } from "../../steps/auth/when/when";
import { then } from "../../steps/auth/then/then";

test.describe("@smoke Auth - Logout", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await given.openDashboard(page);
    await given.ensureLoggedIn(page); // always start from logged in
  });

  test("User can logout", async ({ page }: { page: Page }) => {
    await when.clickPersonIcon(page);
    await when.clickLogoutButton(page);

    await then.loginButtonShouldBeVisible(page);
  });
});
