import { Page } from "@playwright/test";
import { When } from "../../../fixtures/test";
import { dashboardPage } from "../../../pages/DashboardPage";

const when = {
  clickPersonIcon: (page: Page) =>
    When("I get the Person Icon on the Dashboard page", async () => {
      const personIcon = await dashboardPage(page).getPersonIcon();
      await personIcon.click();
    }),

  clickLogoutButton: (page: Page) =>
    When("I click the Logout button", async () => {
      const logoutButton = await dashboardPage(page).getLogoutButton();
      await logoutButton.click();
    }),
};

export { when };
