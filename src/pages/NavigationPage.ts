import type { Page } from "@playwright/test";

const navigationPage = (page: Page) => ({
  openDashboard: async () => {
    await page.goto("/dashboard");
  },

  getMenuButton: async (testId: string) => {
    return page.getByTestId(testId);
  },

  getMenuItem: async (name: string) => {
    return page.getByRole("menuitem", { name });
  },
});

export { navigationPage };
