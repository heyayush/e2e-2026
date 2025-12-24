import type { Page } from "@playwright/test";
import { When } from "@fixtures/test";
import { navigationPage } from "@pages/NavigationPage";

const when = {
  openMenu: (page: Page, testId: string) =>
    When(`I open the menu ${testId}`, async () => {
      const menuButton = await navigationPage(page).getMenuButton(testId);
      await menuButton.click();
    }),

  navigateMenu: (page: Page, testId: string, itemName: string) =>
    When(`I select menu item ${itemName} from ${testId}`, async () => {
      await when.openMenu(page, testId);
      const menuItem = await navigationPage(page).getMenuItem(itemName);
      await menuItem.click();
    }),

  clickButton: (page: Page, testId: string) =>
    When(`I click the button ${testId}`, async () => {
      const button = await navigationPage(page).getMenuButton(testId);
      await button.click();
    }),
};

export { when };
