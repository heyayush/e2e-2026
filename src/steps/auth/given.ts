import { Page } from "@playwright/test";
import { Given } from "@fixtures/test";
import { authPage } from "@pages/AuthPage";

const given = {
  openDashboard: (page: Page) =>
    Given("I am on the Dashboard page", async () => {
      await authPage(page).openDashboard();
    }),

  ensureLoggedOut: (page: Page) =>
    Given("User is logged out", async () => {
      await authPage(page).logout();
    }),

  ensureLoggedIn: (page: Page) =>
    Given("User is logged in", async () => {
      await authPage(page).login("user", "pw");
    }),
};

export { given };
