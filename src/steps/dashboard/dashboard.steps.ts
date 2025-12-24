import { Page } from "@playwright/test";
import { Given, When, Then } from "../../fixtures/test";
import { createDashboardPage } from "../../pages/DashboardPage";

const dashboardSteps = {
  openDashboard: (page: Page) =>
    Given("I am on the Dashboard page", async () => {
      await createDashboardPage(page).open();
    }),
};

export { dashboardSteps };
