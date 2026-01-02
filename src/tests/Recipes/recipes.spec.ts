import { test } from "@fixtures/test";
import type { Page } from "@playwright/test";
import { given } from "@steps/recipes/given";
import { then } from "@steps/recipes/then";
import { when } from "@steps/recipes/when";

test.describe("@smoke Recipes", () => {
    const recipeName = "My Test Recipe";
    test.beforeEach(async ({ page }: { page: Page }) => {
        await given.openRecipesPage(page);
    });

    test("Should delete the newly created recipe recipe", async ({ page }: { page: Page }) => {
        // WHEN the first row is deleted
        await when.deleteFirstRecipe(page);

        // THEN the first row should no longer exist
        await then.firstRecipeShouldBeDeleted(page);
    });
    test("User can create a new recipe", async ({ page }: { page: Page }) => {
        await when.clickNewRecipe(page);
        await when.enterRecipeName(page, recipeName);
        await when.saveRecipe(page);
        await then.recipeShouldExist(page, recipeName);
        await when.deleteRecipe(page, recipeName);
        await then.recipeShouldNotExist(page, recipeName);
    });
});
