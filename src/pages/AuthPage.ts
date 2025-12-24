import { Page, Locator } from "@playwright/test";

const authPage = (page: Page) => ({
  openDashboard: async () => {
    await page.goto("/dashboard");
  },

  getLoginButton: (): Locator => page.getByRole("button", { name: /login/i }),
  getSignInButton: (): Locator =>
    page.getByRole("button", { name: /Sign In/i }),
  getUsernameInput: (): Locator => page.locator('input[name="username"]'),
  getPasswordInput: (): Locator => page.locator('input[type="password"]'),
  getPersonIcon: (): Locator => page.getByTestId("PersonIcon"),
  getLogoutButton: (): Locator => page.getByText("Logout"),

  login: async (username: string, password: string) => {
    const loginButton = authPage(page).getLoginButton();
    if (await loginButton.isVisible()) {
      await loginButton.click();
      await page.fill('input[name="username"]', username);
      await page.fill('input[type="password"]', password);
      await authPage(page).getSignInButton().click();
    }
  },

  logout: async () => {
    const loginButton = authPage(page).getLoginButton();
    if (await loginButton.isHidden()) {
      await authPage(page).getPersonIcon().click();
      await authPage(page).getLogoutButton().click();
    }
  },
});

export { authPage };
