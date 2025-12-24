import { Page } from "@playwright/test";

const createDashboardPage = (page: Page) => ({
  open: async () => {
    await page.goto("/dashboard");
  },
});

export { createDashboardPage };
