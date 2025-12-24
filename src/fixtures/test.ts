import { test as base } from "@playwright/test";

const test = base.extend({});
const Given = test.step;
const When = test.step;
const Then = test.step;

export { test, Given, When, Then };
