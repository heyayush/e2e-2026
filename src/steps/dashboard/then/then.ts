import { Page } from "@playwright/test";
import { Then } from "../../../fixtures/test";
import { dashboardPage } from "../../../pages/DashboardPage";

const then = {
  loginButtonShouldBeVisible: (page: Page) =>
    Then("I should see the Login button", async () => {
      const loginButton = await dashboardPage(page).getLoginButton();
      await loginButton.waitFor();
    }),
};

export { then };
