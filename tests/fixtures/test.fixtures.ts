import { test as base } from "@playwright/test";
import { TodoPage } from "../../src/pages/todo/todo.page";
import { BasePage } from "../../src/pages/base.page";
import { CommonDataProvider, SecretsDataProvider } from "../../src/types/data";

/**
 * Data provider fixtures for accessing test data
 */
export interface DataFixtures {
  secretDataProvider: SecretsDataProvider;
  commonDataProvider: CommonDataProvider;
}

/**
 * Page Object Model fixtures for accessing page objects
 */
export interface PageObjectFixtures {
  basePage: BasePage;
  todoPage: TodoPage;
}

/**
 * Extended test fixtures combining Playwright base test with custom fixtures
 */
export const test = base.extend<DataFixtures & PageObjectFixtures>({
  // Data provider fixtures
  secretDataProvider: [
    async ({}, use) => {
      await use(new SecretsDataProvider());
    },
    { scope: "test", auto: false },
  ],

  commonDataProvider: [
    async ({}, use) => {
      await use(new CommonDataProvider());
    },
    { scope: "test", auto: false },
  ],

  // Page Object fixtures
  basePage: async ({ page }, use) => {
    await use(new BasePage(page, ""));
  },

  todoPage: async ({ page }, use) => {
    await use(new TodoPage(page));
  },
});

export const expect = test.expect;
