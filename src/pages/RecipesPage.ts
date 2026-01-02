import { Locator, Page } from "@playwright/test";

const recipesPage = (page: Page) => ({
    open: async () => {
        await page.goto("/production/recipes");
        await page.locator('[role="grid"]').waitFor();
    },

    getGrid: () => {
        return page.getByRole("rowgroup");
    },

    getRowByName: async (name: string): Promise<Locator | null> => {
      await page.locator('[role="grid"]').waitFor();
        const rows = page.locator('[role="row"]');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const cell = row.locator('[role="gridcell"]', { hasText: name });
            if ((await cell.count()) > 0) {
                return row;
            }
        }

        return null;
    },
});

export { recipesPage };
