import type { Page } from "@playwright/test";
import { Then } from "@fixtures/test";
import { navigationPage } from "@pages/NavigationPage";

const then = {
  menuItemsShouldBeVisible: (page: Page, items: string[]) =>
    Then(`I should see menu items: ${items.join(", ")}`, async () => {
      for (const item of items) {
        await (await navigationPage(page).getMenuItem(item)).waitFor();
      }
    }),

  urlShouldBe: (page: Page, url: string) =>
    Then(`URL should be ${url}`, async () => {
      await page.waitForURL(url);
    }),
};

export { then };
