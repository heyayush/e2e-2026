import { test } from "../../fixtures/test";
import type { Page } from "@playwright/test";
import { given } from "../../steps/auth/given/given";
import { when } from "../../steps/auth/when/when";
import { then } from "../../steps/auth/then/then";

test.describe("@smoke Auth - Login", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await given.openDashboard(page);
    await given.ensureLoggedOut(page); // always start from logged out
  });

  test("User can login", async ({ page }: { page: Page }) => {
    await when.clickLoginButton(page);
    await when.enterCredentials(page, "user", "pw");
    await when.submitLogin(page);

    await then.personIconShouldBeVisible(page);
  });
});
