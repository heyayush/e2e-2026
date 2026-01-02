import { Page, expect } from "@playwright/test";
import { Then } from "@fixtures/test";
import { recipesPage } from "../../pages/RecipesPage";

const then = {
    firstRecipeShouldBeDeleted: (page: Page) =>
        Then("The first recipe should be deleted", async () => {
            const grid = recipesPage(page).getGrid();
            const firstRow = grid.getByRole("row").first();
            await expect(firstRow).toHaveCount(0); // First row should no longer exist
        }),

    recipeShouldExist: (page: Page, name: string) =>
        Then(`I should see the recipe "${name}" in the list`, async () => {
            const row = await recipesPage(page).getRowByName(name);
            expect(row).not.toBeNull();
        }),

    recipeShouldNotExist: (page: Page, name: string) =>
        Then(`I should NOT see the recipe "${name}" in the list`, async () => {
            const row = await recipesPage(page).getRowByName(name);
            await expect(row).toBeNull;
        }),
};

export { then };
