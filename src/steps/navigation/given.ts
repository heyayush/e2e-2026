import type { Page } from "@playwright/test";
import { Given } from "@fixtures/test";
import { navigationPage } from "@pages/NavigationPage";

const given = {
  openDashboard: (page: Page) =>
    Given("I am on the Dashboard page", async () => {
      await navigationPage(page).openDashboard();
    }),
};

export { given };
