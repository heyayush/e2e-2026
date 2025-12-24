import { Page } from "@playwright/test";

const dashboardPage = (page: Page) => ({
  open: async () => {
    await page.goto("/dashboard");
  },

  getPersonIcon: async () => {
    return page.getByTestId("PersonIcon");
  },

  getLogoutButton: async () => {
    return page.getByText("Logout");
  },

  getLoginButton: async () => {
    return page.getByText("Login");
  },
});

export { dashboardPage };
