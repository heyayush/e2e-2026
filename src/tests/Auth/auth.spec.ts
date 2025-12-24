import { test } from "@fixtures/test";
import type { Page } from "@playwright/test";
import { given, when, then } from "@steps/auth";
import { sharedGiven } from "@steps/shared/sharedGiven";

test.describe("@smoke Auth - Login and Logout", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await sharedGiven.openDashboard(page);
  });

  test("User can login", async ({ page }: { page: Page }) => {
    await given.ensureLoggedOut(page); // always start from logged out

    await when.clickLoginButton(page);
    await when.enterCredentials(page, "user", "pw");
    await when.submitLogin(page);

    await then.personIconShouldBeVisible(page);
  });

  test("User can logout", async ({ page }: { page: Page }) => {
    await given.ensureLoggedIn(page); // always start from logged in

    await when.clickPersonIcon(page);
    await when.clickLogoutButton(page);

    await then.loginButtonShouldBeVisible(page);
  });
});
