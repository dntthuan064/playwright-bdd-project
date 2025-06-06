import { expect } from "@playwright/test"

import { getDataByKey, getPageFromFixtures } from "../common/utils"
import { Given, When, Then } from "../common/fixtures"
import type { PageObjectFixtures } from "../common/fixtures"
import { defineParameterType } from "playwright-bdd"

defineParameterType({
  name: "listOfString",
  regexp: /\[([^\]]*)\]/,
  transformer: (str: string) => str.split(",").map((item) => item.trim())
})

Given("I am on the page {string}", async ({ pages }, pageName: keyof PageObjectFixtures) => {
  const pageObject = getPageFromFixtures(pages, pageName)
  await pageObject.goto()
})

// TODO: Change approach to use getPageFromFixtures
Given("I navigate to {string}", async ({ pages }, pageName: keyof PageObjectFixtures) => {
  const pageObject = getPageFromFixtures(pages, pageName)
  await pageObject.goto()
})

Then("I should be in page {string}", async (context: PageObjectFixtures, fixtureKey: keyof PageObjectFixtures) => {
  const pageObject = context[fixtureKey]
  if (!pageObject) {
    const available = Object.keys(context).join(", ")
    throw new Error(`No page object found for fixture key: ${fixtureKey}.\nAvailable: ${available}`)
  }
  await expect(pageObject.getPage()).toHaveURL(pageObject.getUrl())
})

Given("I go to home page", async ({ basePage }) => {
  await basePage.goto()
})

/**
 * Other Given actions
 */

/**
 * Action: Go
 */
When("I go back", async ({ basePage }) => {
  await basePage.goBack()
})

When("I go forward", async ({ basePage }) => {
  await basePage.goForward()
})

/**
 * Action: Close tab
 */
When("I close current tab", async ({ basePage }) => {
  await basePage.close()
})

When("I close tab at index {int}", async ({ basePage }, index) => {
  await basePage.closeByIndex(index)
})

/**
 * Action: Wait
 */
When("I wait for {int} seconds", async ({ basePage }, seconds) => {
  await basePage.waitForTimeout(seconds * 1000)
})

When("I wait for response of API with key {string}", async ({ commonDataProvider, basePage }, dataKey) => {
  const apiUrl = getDataByKey(commonDataProvider.commonData, dataKey)

  await basePage.waitForResponse(apiUrl)
})

When("I wait for element with role {string} and name {string} to be visible", async ({ basePage }, role, name) => {
  await basePage.waitForRoleVisible(role, name, true)
})

When("I wait for element with locator {string} to be visible", async ({ basePage }, locator) => {
  await basePage.waitForLocatorVisible(locator)
})

/**
 * Action: Type
 */
When(
  "I type data with key {string} to input with role {string}",
  async ({ commonDataProvider, basePage }, dataKey, inputName) => {
    const dataContent = getDataByKey(commonDataProvider.commonData, dataKey)

    await basePage.fillByRoleTextbox(inputName, dataContent)
  }
)

When(
  "I type data with key {string} to input with locator {string}",
  async ({ commonDataProvider, basePage }, dataKey, locator) => {
    const dataContent = getDataByKey(commonDataProvider.commonData, dataKey) ?? dataKey

    await basePage.fillByLocator(locator, dataContent)
  }
)

When("I type {string} to input with locator {string}", async ({ basePage }, dataContent, locator) => {
  await basePage.fillByLocator(locator, dataContent)
})

When("I type {string} to input with role {string}", async ({ basePage }, text, inputName) => {
  await basePage.fillByRoleTextbox(inputName, text)
})

When("I type {string} to input with placeholder {string}", async ({ basePage }, text, placeholder) => {
  await basePage.fillByPlaceholder(placeholder, text)
})

When("I type {string} to input with role {string} at index {int}", async ({ basePage }, text, name, index) => {
  await basePage.getPage().getByRole("textbox", { name }).nth(index).fill(text)
})

When("I type {string} to input with locator {string} at index {int}", async ({ basePage }, text, locator, index) => {
  await basePage.getPage().locator(locator).nth(index).fill(text)
})

When(
  "I type {string} to input with placeholder {string} at index {int}",
  async ({ basePage }, text, placeholder, index) => {
    await basePage.getPage().getByPlaceholder(placeholder, { exact: true }).nth(index).fill(text)
  }
)

/**
 * Action: Fill all
 */
When(
  "I fill all the inputs with placeholder {string} with values: {listOfString}",
  async ({ basePage }, placeholder, values) => {
    for (let index = 0; index < values.length; index++) {
      const value = values[index]

      await basePage.getPage().getByPlaceholder(placeholder, { exact: true }).nth(index).fill(value)
    }
  }
)

/**
 * Action: Hover
 */
When("I hover on element with label {string}", async ({ basePage }, label) => {
  await basePage.hoverByLabel(label)
})

When("I hover on element with locator {string}", async ({ basePage }, locator) => {
  await basePage.hoverByLocator(locator)
})

When("I hover on element with role {string} and name {string}", async ({ basePage }, role, name) => {
  await basePage.hoverByRole(role, name)
})

/**
 * Action: Click
 */
When("I click element with locator {string}", async ({ basePage }, locator) => {
  await basePage.clickByLocator(locator)
})

When("I click element with label {string}", async ({ basePage }, label) => {
  await basePage.clickByLabel(label)
})

When("I click element with role {string} and name {string}", async ({ basePage }, role, name) => {
  await basePage.clickByRole(role, name)
})

When("I click element with role {string} and name {string} at index {int}", async ({ basePage }, role, name, index) => {
  await basePage.clickByRole(role, name, index)
})

When("I click element with text {string} at index {int}", async ({ basePage }, text, index) => {
  await basePage.clickByText(text, index)
})

When("I click link {string}", async ({ basePage }, name) => {
  await basePage.clickByRole("link", name)
})

When("I click button {string}", async ({ basePage }, name) => {
  await basePage.clickByRole("button", name)
})

When("I click button {string} at index {int}", async ({ basePage }, name, index) => {
  await basePage.clickByRole("button", name, index)
})

When("I click button with locator {string}", async ({ basePage }, locator) => {
  await basePage.clickByLocator(locator)
})

When("I click button with locator {string} at index {int}", async ({ basePage }, locator, index) => {
  await basePage.clickByLocator(locator, index)
})

When("I click menuitem {string}", async ({ basePage }, name) => {
  await basePage.clickByRole("menuitem", name)
})

/**
 * Action: Copy
 */
When("I copy element with label {string} to clipboard", async ({ basePage }, label) => {
  await basePage.copyByLabel(label)
})

When("I copy element with locator {string} to clipboard", async ({ basePage }, locator) => {
  await basePage.copyByLocator(locator)
})

/**
 * Action: Paste
 */
When("I paste from clipboard to input with label {string}", async ({ basePage }, label) => {
  await basePage.pasteByLabel(label)
})

When("I paste from clipboard to input with role {string}", async ({ basePage }, name) => {
  await basePage.pasteByRoleTextbox(name)
})

When("I paste from clipboard to input with placeholder {string}", async ({ basePage }, placeholder) => {
  await basePage.pasteByPlaceholder(placeholder)
})

When("I paste from clipboard to input with locator {string}", async ({ basePage }, locator) => {
  await basePage.pasteByLocator(locator, 0)
})

When("I paste from clipboard to input with locator {string} at index {int}", async ({ basePage }, locator, index) => {
  await basePage.pasteByLocator(locator, index)
})

/**
 * Other When actions
 */

/**
 * Assertion
 */
Then("I should be in page {string}", async (context: PageObjectFixtures, fixtureKey: keyof PageObjectFixtures) => {
  const pageObject = context[fixtureKey]
  if (!pageObject) {
    const available = Object.keys(context).join(", ")
    throw new Error(`No page object found for fixture key: ${fixtureKey}.\nAvailable: ${available}`)
  }
  await expect(pageObject.getPage()).toHaveURL(pageObject.getUrl())
})

Then("I expect that the title contains {string}", async ({ basePage }, keyword) => {
  await expect(basePage.getPage()).toHaveTitle(new RegExp(keyword))
})

Then("I expect that the text contains {string} is visible", async ({ basePage }, text) => {
  await expect(basePage.getPage().getByText(text).first()).toBeVisible()
})

Then("I expect that the text contains {string} is invisible", async ({ basePage }, text) => {
  await expect(basePage.getPage().getByText(text).first()).toBeHidden()
})

Then("I expect that the text {string} is visible", async ({ basePage }, text) => {
  await expect(basePage.getPage().getByText(text, { exact: true }).first()).toBeVisible()
})

Then("I expect that the text {string} is invisible", async ({ basePage }, text) => {
  await expect(basePage.getPage().getByText(text, { exact: true }).first()).toBeHidden()
})

Then(
  "I expect that the text of data with key {string} is visible",
  async ({ commonDataProvider, basePage }, dataKey) => {
    const dataContent = getDataByKey(commonDataProvider.commonData, dataKey) ?? dataKey

    await expect(basePage.getPage().getByText(dataContent, { exact: true }).first()).toBeVisible()
  }
)

Then(
  "I expect that the text of data with key {string} is invisible",
  async ({ commonDataProvider, basePage }, dataKey) => {
    const dataContent = getDataByKey(commonDataProvider.commonData, dataKey) ?? dataKey

    await expect(basePage.getPage().getByText(dataContent, { exact: true }).first()).toBeHidden()
  }
)

Then("I expect that element with locator {string} is invisible", async ({ basePage }, locator) => {
  await expect(basePage.getPage().locator(locator).first()).toBeHidden()
})

Then("I expect that element with locator {string} is visible", async ({ basePage }, locator) => {
  await expect(basePage.getPage().locator(locator).first()).toBeVisible()
})

Then("I expect that {string} with text {string} is visible", async ({ basePage }, role, text) => {
  await expect(basePage.getPage().getByRole(role, { name: text, exact: true }).first()).toBeVisible()
})

Then("I expect that button with text {string} is visible", async ({ basePage }, text) => {
  await expect(basePage.getPage().getByRole("button", { name: text, exact: true }).first()).toBeVisible()
})

Then("I expect that the element with text {string} is invisible", async ({ basePage }, text) => {
  // order is 0-based
  await expect(basePage.getPage().getByText(text, { exact: true })).toBeHidden()
})

Then("I expect that the element with role {string} and order {int} is visible", async ({ basePage }, text, order) => {
  // order is 0-based
  await expect(basePage.getPage().getByRole(text, { exact: true }).nth(order)).toBeVisible()
})

Then("I expect that the element with role {string} and text {string} is visible", async ({ basePage }, role, text) => {
  await expect(basePage.getPage().getByRole(role, { name: text, exact: true }).first()).toBeVisible()
})

Then(
  "I expect that row number {int} in table contains these values: {listOfString}",
  async ({ basePage }, index, values) => {
    await basePage.getPage().waitForSelector("table") // wait to load data table
    // 1-based index
    const firstRow = basePage.getPage().locator("table tr").nth(index)

    for (const value of values) {
      await expect(firstRow).toContainText(value)
    }
  }
)

Then(
  "I expect that all rows at column {int} in table contains the same value: {string}",
  async ({ basePage }, _, text) => {
    const rowCount = await basePage.getPage().locator("table tbody tr").count()
    const rowSameTextCount = await basePage.getPage().locator(`table tbody tr td:has-text('${text}')`).count()

    const isRowEmpty = await basePage.getPage().locator('table tbody tr td:has-text("No results.")').count()

    if (!isRowEmpty) {
      expect(rowCount).toEqual(rowSameTextCount)
    } else {
      expect(true).toEqual(true)
    }
  }
)

Then("I expect that the table contains {int} record", async ({ basePage }, total) => {
  await basePage.getPage().waitForSelector("table") // wait for the data table to load
  const size = await basePage.getPage().locator("table tr").count()

  expect(size).toBe(total + 1)
})

Then(
  "I expect that all text in a list with role {string} equal to: {listOfString}",
  async ({ basePage }, role, list) => {
    await expect(basePage.getPage().getByRole(role)).toHaveText(list)
  }
)

// Expect that element is displayed with {index} times
Then(
  "I expect that element with role {string} and name {string} is displayed {int} times",
  async ({ basePage }, role, name, index) => {
    for (let i = 0; i < index; i++) {
      await basePage.waitForRoleWithIndexVisible(role, name, i)
    }
  }
)

/**
 * Other Then actions
 */
