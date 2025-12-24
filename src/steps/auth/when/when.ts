import { Page } from "@playwright/test";
import { When } from "../../../fixtures/test";
import { authPage } from "../../../pages/AuthPage";

const when = {
  clickLoginButton: (page: Page) =>
    When("I click the Login button", async () => {
      await authPage(page).getLoginButton().click();
    }),

  enterCredentials: (page: Page, username: string, password: string) =>
    When("I enter username and password", async () => {
      await page.fill('input[name="username"]', username);
      await page.fill('input[type="password"]', password);
    }),

  submitLogin: (page: Page) =>
    When("I click Sign In", async () => {
      await authPage(page).getSignInButton().click();
    }),

  clickPersonIcon: (page: Page) =>
    When("I click the Person Icon", async () => {
      await authPage(page).getPersonIcon().click();
    }),

  clickLogoutButton: (page: Page) =>
    When("I click the Logout button", async () => {
      await authPage(page).getLogoutButton().click();
    }),
};

export { when };
