import { Page } from "@playwright/test";
import { Given } from "@fixtures/test";
import { recipesPage } from "../../pages/RecipesPage";

const given = {
  openRecipesPage: (page: Page) =>
    Given("I am on the Recipes page", async () => {
      await recipesPage(page).open();
    }),
};

export { given };
