import { expect, Page } from "@playwright/test";
import { When } from "@fixtures/test";
import { recipesPage } from "../../pages/RecipesPage";

const when = {
    deleteFirstRecipe: (page: Page) =>
        When("I delete the first recipe", async () => {
            const grid = recipesPage(page).getGrid();
            const firstRow = grid.getByRole("row").first();
            const menuButton = firstRow.getByTestId("MoreHorizIcon");

            await menuButton.click();

            const deleteOption = page.getByRole("menuitem", { name: /delete/i });
            await deleteOption.click();
        }),

    clickNewRecipe: (page: Page) =>
        When("I click the New Recipe button", async () => {
            const newButton = page.getByRole("button", { name: /new recipe/i });
            await newButton.click();
        }),

    enterRecipeName: (page: Page, name: string) =>
        When(`I enter recipe name "${name}"`, async () => {
            const dialog = page.locator('p', { hasText: 'New Recipe' });
            // or whatever element contains the dialog title
            await expect(dialog).toBeVisible();
            // Fill the name input inside dialog
            const nameInput = page.getByLabel("Name");
            await nameInput.fill(name);
        }),

    saveRecipe: (page: Page) =>
        When("I click Save", async () => {
            const dialog = page.locator('p', { hasText: 'New Recipe' });
            await expect(dialog).toBeVisible();
            const nextButton = page.getByRole("button", { name: /next/i });
            await nextButton.click();
            await expect(page).toHaveURL(/\/recipes\/new/);
            const saveButton = page.getByRole("button", { name: /save/i });
            await saveButton.click();
        }),

    deleteRecipe: (page: Page, name: string) =>
        When(`I delete the recipe "${name}"`, async () => {
            const targetRow = await recipesPage(page).getRowByName(name); // find row by recipe name
            if (!targetRow) throw new Error(`Recipe "${name}" not found`);
            const menuButton = targetRow.getByTestId("MoreHorizIcon");
            await expect(menuButton).toBeVisible({ timeout: 5000 });
            await menuButton.click();
        })
};

export { when };
