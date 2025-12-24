import { test } from "@fixtures/test";
import type { Page } from "@playwright/test";
import { given, when, then } from "@steps/navigation";

test.describe("@smoke Dashboard Navigation", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await given.openDashboard(page);
  });

  test("Dashboard loads correctly", async ({ page }: { page: Page }) => {
    await then.urlShouldBe(page, "/dashboard");
  });

  test("Machine menu displays correct items", async ({
    page,
  }: {
    page: Page;
  }) => {
    await when.openMenu(page, "NavigationAction_machine");
    await then.menuItemsShouldBeVisible(page, [
      "Tablet Tester",
      "Tablet Press",
      "Test Functioning",
    ]);
  });

  test("Machine menu navigates to correct pages", async ({
    page,
  }: {
    page: Page;
  }) => {
    await when.navigateMenu(page, "NavigationAction_machine", "Tablet Tester");
    await then.urlShouldBe(page, "/machine/tablet-tester");

    await when.navigateMenu(page, "NavigationAction_machine", "Tablet Press");
    await then.urlShouldBe(page, "/machine/tablet-press");

    await when.navigateMenu(
      page,
      "NavigationAction_machine",
      "Test Functioning"
    );
    await then.urlShouldBe(page, "/machine/test-functioning");
  });

  test("Production menu displays correct items", async ({
    page,
  }: {
    page: Page;
  }) => {
    await when.openMenu(page, "NavigationAction_production");
    await then.menuItemsShouldBeVisible(page, [
      "Event Report",
      "Batch Management",
      "Recipes",
    ]);
  });

  test("Production menu navigates to correct pages", async ({
    page,
  }: {
    page: Page;
  }) => {
    await when.navigateMenu(
      page,
      "NavigationAction_production",
      "Event Report"
    );
    await then.urlShouldBe(page, "/production/event-report");

    await when.navigateMenu(
      page,
      "NavigationAction_production",
      "Batch Management"
    );
    await then.urlShouldBe(page, "/production/batch-management");

    await when.navigateMenu(page, "NavigationAction_production", "Recipes");
    await then.urlShouldBe(page, "/production/recipes");
  });

  test("Analysis navigation works", async ({ page }: { page: Page }) => {
    await when.clickButton(page, "NavigationAction_analysis");
    await then.urlShouldBe(page, "/analysis");
  });

  test("WIP menu displays correct items", async ({ page }: { page: Page }) => {
    await when.openMenu(page, "NavigationAction_washing");
    await then.menuItemsShouldBeVisible(page, [
      "Washing Programs",
      "WIP-Center",
    ]);
  });

  test("WIP menu navigates to correct pages", async ({
    page,
  }: {
    page: Page;
  }) => {
    await when.navigateMenu(
      page,
      "NavigationAction_washing",
      "Washing Programs"
    );
    await then.urlShouldBe(page, "/washing/washing-programs");

    await when.navigateMenu(page, "NavigationAction_washing", "WIP-Center");
    await then.urlShouldBe(page, "/washing/wip-center");
  });
});
