import { Page } from "@playwright/test";
import { Then } from "../../../fixtures/test";
import { authPage } from "../../../pages/AuthPage";

const then = {
  loginButtonShouldBeVisible: (page: Page) =>
    Then("Login button should be visible", async () => {
      await authPage(page).getLoginButton().waitFor();
    }),

  personIconShouldBeVisible: (page: Page) =>
    Then("Person Icon should be visible", async () => {
      await authPage(page).getPersonIcon().waitFor();
    }),
};

export { then };
