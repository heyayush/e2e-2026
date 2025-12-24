import { Page } from "@playwright/test";
import { Given } from "@fixtures/test";
import { dashboardPage } from "@pages/DashboardPage";

const sharedGiven = {
  openDashboard: (page: Page) =>
    Given("I am on the Dashboard page", async () => {
      await dashboardPage(page).open();
    }),
};

export { sharedGiven };
