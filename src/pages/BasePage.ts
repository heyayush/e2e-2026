import { Page } from "@playwright/test";

export type PageFactory<T> = (page: Page) => T;
