import { BrowserContext } from "@playwright/test"
import { createBdd, test as base } from "playwright-bdd"

import { TodoPage } from "../pages/todo/todo.page"
import { BasePage } from "../pages/base.page"
import { CommonDataProvider, SecretsDataProvider } from "./types/data"

export interface DataFixtures {
  secretDataProvider: SecretsDataProvider
  commonDataProvider: CommonDataProvider
}

export interface PageObjectFixtures {
  basePage: BasePage
  todoPage: TodoPage
}

export interface BrowserContextFixtures {
  context: BrowserContext
}

export const test = base.extend<
  DataFixtures & PageObjectFixtures & BrowserContextFixtures & { pages: PageObjectFixtures }
>({
  secretDataProvider: [
    async ({}, use) => {
      await use(new SecretsDataProvider())
    },
    { scope: "test", auto: false }
  ],
  commonDataProvider: [
    async ({}, use) => {
      await use(new CommonDataProvider())
    },
    { scope: "test", auto: false }
  ],
  // Add other fixtures here if any

  // Page fixtures
  basePage: ({ page }, use) => use(new BasePage(page, "")),
  todoPage: ({ page }, use) => use(new TodoPage(page)),

  // Reuse existing page objects to create the 'pages' wrapper
  pages: ({ basePage, todoPage }, use) =>
    use({
      basePage,
      todoPage
    } as PageObjectFixtures)
})

export const expect = test.expect

export const {
  Given,
  When,
  Then,
  Step,
  BeforeAll,
  AfterAll,
  Before,
  After,
  BeforeWorker,
  AfterWorker,
  BeforeScenario,
  AfterScenario,
  BeforeStep,
  AfterStep
} = createBdd(test)
