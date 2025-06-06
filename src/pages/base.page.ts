import { expect, FrameLocator, Page } from "@playwright/test"
import pkg from "lodash"

import { ENV_KEYS } from "../common/enum"
import { ENV } from "../common/constant"
import { appendSubdomain, extractKeys } from "../common/utils"

export class BasePage {
  protected subDomain?: string | null = null
  private baseUrl = ENV[ENV_KEYS.BASE_URL]
  private portalUrl = ENV[ENV_KEYS.PORTAL_URL]
  private isLocal: boolean = ENV[ENV_KEYS.LOCAL] === "true"
  private localUrl = ENV[ENV_KEYS.LOCAL_URL]
  private path: string

  constructor(
    protected page: Page,
    path: string
  ) {
    this.path = path
  }

  /**
   * Get Playwright page of the current page.
   *
   * This method should be used for page assertion only.
   * @returns {Page} Playwright page
   */
  getPage(): Page {
    return this.page
  }

  public getUrl(): string {
    if (this.subDomain) {
      // Replace localUrl with subDomain.portalUrl if isLocal === 'true'
      if (this.isLocal) {
        return new URL(this.path, this.localUrl).toString()
      } else {
        return new URL(this.path, appendSubdomain(this.subDomain, this.portalUrl)).toString()
      }
    }
    return new URL(this.path, this.baseUrl).toString()
  }

  /**
   * Open current page.
   */
  public async goto() {
    await this.page.goto(this.getUrl())
  }

  /**
   * Go back to previous page
   */
  async goBack() {
    await this.page.goBack()
  }

  /**
   * Go forward to next page
   */
  async goForward() {
    await this.page.goForward()
  }

  /**
   * Close current tab
   */
  async close() {
    await this.page.close()
  }

  /**
   * Close tab by index
   * @param index index of the tab
   */
  async closeByIndex(index: number) {
    await this.page.context().pages()[index].close()
  }

  /**
   * Get element by locator
   * @param locator Locator of the element
   */
  getByLocator(locator: string) {
    this.page.locator(locator)
  }

  /**
   * Wait for a timeout. Should be used for debugging only.
   * @param timeout timeout in milliseconds
   */
  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout)
  }

  /**
   * Wait for a response. Should be used for debugging only.
   * @param url url of the response
   * @param code 200 success
   */
  async waitForResponse(url: string, code = 200) {
    await this.page.waitForResponse((response) => response.url().includes(url) && response.status() === code)
  }

  /**
   * Hover on an element by its label
   * @param label Label of the element
   */
  async hoverByLabel(label: string) {
    await this.page.getByLabel(label).hover()
  }

  /**
   * Hover on an element by its role and name
   * @param role Role of the element
   * @param name Accessible name of the element
   */
  async hoverByRole(role: Parameters<Page["getByRole"]>[0], name: string) {
    await this.page.getByRole(role, { name, exact: true }).hover()
  }

  /**
   * Hover on an element by its locator
   * @param locator Locator of the element
   */
  async hoverByLocator(locator: string) {
    await this.page.locator(locator).hover()
  }

  /**
   * Copy text from an element by its label to clipboard
   * @param label Label of the element
   */
  async copyByLabel(label: string) {
    const textContent = await this.page.getByLabel(label).textContent()

    await this.page.evaluate((textContent) => navigator.clipboard.writeText(textContent ?? ""), textContent)
  }

  /**
   * Copy text from an element by its locator to clipboard
   * @param locator Locator of the element
   */
  async copyByLocator(locator: string) {
    const textContent = await this.page.locator(locator).textContent()

    await this.page.evaluate((textContent) => navigator.clipboard.writeText(textContent ?? ""), textContent)
  }

  /**
   * Paste text from clipboard to an input element by its label
   * @param label Label of the element
   */
  async pasteByLabel(label: string) {
    await this.page
      .evaluate(() => navigator.clipboard.readText())
      .then(async (textContent) => {
        await this.page.getByLabel(label).fill(textContent)
      })
  }

  /**
   * Paste text from clipboard to an input element by its role and name
   * @param name Name of the textbox
   */
  async pasteByRoleTextbox(name: string) {
    await this.page
      .evaluate(() => navigator.clipboard.readText())
      .then(async (textContent) => {
        await this.page.getByRole("textbox", { name }).fill(textContent)
      })
  }

  /**
   * Paste text from clipboard to an input element by its placeholder
   * @param placeholder Placeholder of the element
   */
  async pasteByPlaceholder(placeholder: string) {
    await this.page
      .evaluate(() => navigator.clipboard.readText())
      .then(async (textContent) => {
        await this.page.getByPlaceholder(placeholder, { exact: true }).fill(textContent)
      })
  }

  /**
   * Paste text from clipboard to an input element by its locator
   * @param locator Locator of the element
   * @param index index of locator
   */
  async pasteByLocator(locator: string, index = 0) {
    await this.page
      .evaluate(() => navigator.clipboard.readText())
      .then(async (textContent) => {
        await this.page.locator(locator).nth(index).fill(textContent)
      })
  }

  /**
   * Click on an element by its text
   * @param text Text of the element
   * @param index index of locator
   */
  async clickByText(text: string, index?: number) {
    await this.page
      .getByText(text, { exact: true })
      .nth(index ?? 0)
      .click()
  }

  async clickByTextInFrame(frame: FrameLocator, text: string, index?: number) {
    await frame
      .getByText(text, { exact: true })
      .nth(index ?? 0)
      .click()
  }

  /**
   * Clicks on an element based on its role and accessible name.
   * @param role - Role of the element (e.g., 'button', 'link').
   * @param name - Accessible name or text of the element.
   * @param exact - Whether the name match should be exact (default is true). If an index is provided, exact is set to false.
   * @param index - Index of the element if multiple elements match. Defaults to 0.
   */
  async clickByRole(role: Parameters<Page["getByRole"]>[0], name: string, exact: boolean = true, index?: number) {
    const selectedIndex = index ?? 0
    await this.page.getByRole(role, { name, exact }).nth(selectedIndex).click()
  }

  async clickByRoleInFrame(frame: FrameLocator, role: Parameters<Page["getByRole"]>[0], name: string, index?: number) {
    const selectedIndex = index ?? 0
    await frame.getByRole(role, { name }).nth(selectedIndex).click()
  }

  async waitForRoleVisible(role: Parameters<Page["getByRole"]>[0], name?: string, exact = true) {
    await this.page.getByRole(role, { name, exact }).waitFor()
  }

  async waitForLocatorVisible(locator: string) {
    await this.page.locator(locator).waitFor({ state: "visible" })
  }

  async waitForRoleWithIndexVisible(role: Parameters<Page["getByRole"]>[0], name?: string, index?: number) {
    await this.page
      .getByRole(role, { name, exact: true })
      .nth(index ?? 0)
      .waitFor()
  }

  /**
   * Click on an element by locator.
   * @param locator Locator of the element
   * @param index position of index-th locator
   * @param options - options for the click() method
   */
  async clickByLocator(locator: string, index?: number, options?: Parameters<typeof this.page.click>[1]) {
    const selectedIndex = index ?? 0
    await this.page.locator(locator).nth(selectedIndex).click(options)
  }

  /**
   * Clicks an element within a frame using the specified locator
   * @param frame - The frame locator object returned by Page.frameLocator()
   * @param locator - The selector string to find the element within the frame
   * @param index - Optional zero-based index of the element to click if multiple elements match the locator (defaults to 0)
   * @returns Promise that resolves when the click action is complete
   */
  async clickByLocatorInFrame(frame: ReturnType<Page["frameLocator"]>, locator: string, index?: number) {
    await frame
      .locator(locator)
      .nth(index ?? 0)
      .click()
  }

  /**
   * Click element with label
   * @param label label of the element
   * @param force - Whether to force the click (default is false)
   */
  async clickByLabel(label: string, force: boolean = false): Promise<void> {
    await this.page.getByLabel(label, { exact: true }).click({ force })
  }
  /**
   * Fill an element by its role and name.
   * @param role Role of the element
   * @param name Accessible name of the element
   * @param value Value to fill
   * @param index index of selector
   */
  async fillByRole(role: Parameters<Page["getByRole"]>[0], name: string, value: string, index?: number) {
    const selectedIndex = index ?? 0
    await this.page.getByRole(role, { name, exact: true }).nth(selectedIndex).fill(value)
  }

  /**
   * Fill a text box by role 'textbox' and its name.
   * @param name name of the element to search by role 'textbox'
   * @param value value to be filled
   */
  async fillByRoleTextbox(name: string, value: string) {
    await this.page.getByRole("textbox", { name }).fill(value)
  }

  /**
   * Fill a text box by exact placeholder.
   */
  async fillByPlaceholder(placeholder: string, value: string) {
    await this.page.getByPlaceholder(placeholder, { exact: true }).fill(value)
  }

  /**
   * Fill a text box by exact placeholder.
   */
  async fillByExactPlaceholder(placeholder: string, value: string, exact = true) {
    await this.page.getByPlaceholder(placeholder, { exact: exact }).fill(value)
  }

  /**
   * Fill a text box by locator
   * @param locator name of the element to search by locator
   * @param value value to be filled
   * @param index index of locator (optional)
   */
  async fillByLocator(locator: string, value: string, index?: number) {
    if (value !== undefined) {
      await this.page
        .locator(locator)
        .nth(index ?? 0)
        .fill(value)
    }
  }

  async fillByLocatorInFrame(frame: FrameLocator, locator: string, value: string, index?: number) {
    await frame
      .locator(locator)
      .nth(index ?? 0)
      .fill(value)
  }

  /**
   * Select element with label
   * @param label label of the element
   * @param option option to be selected
   */
  async selectOptionByLabel(label: string, option: string) {
    await this.page.getByLabel(label, { exact: true }).selectOption(option)
  }

  /**
   * Select element with text
   * @param text label of the element
   * @param option option to be selected
   */
  async selectOptionByText(text: string, option: string) {
    await this.page.getByText(text, { exact: true }).selectOption(option)
  }

  /**
   * Selects an option from a dropdown or select element identified by the given locator
   * @param locator - The selector string used to locate the dropdown or select element
   * @param option - The option to be selected. This can be a string, an array of strings, or an object that matches the parameters of the `selectOption` method from the `Page` class
   */
  async selectOptionByLocator(locator: string, value: Parameters<Page["selectOption"]>[0], index?: number) {
    await this.page.locator(locator).selectOption(value)
  }

  async selectOption(locator: string, option: string, index?: number) {
    const selectedIndex = index ?? 0
    await this.clickByLocator(locator, selectedIndex)
    await this.clickByLabel(option)
  }

  /**
   * Count element with text
   * @param text label of the element
   */
  async countByText(text: string): Promise<number> {
    const allElement = await this.page.getByText(text, { exact: true }).all()

    return allElement.length
  }

  /**
   * Checks the status of a feature flag by intercepting API responses.
   * @param endpoint The API endpoint to listen for.
   * @param key The key of the feature flag to check.
   * @returns A promise that resolves to the status of the feature flag as a boolean, or null if the key is not found.
   */
  async checkFeatureFlagIsEnabled(endpoint: string, key: string): Promise<boolean | null> {
    const { get } = pkg
    return new Promise((resolve, reject) => {
      this.page.on("response", async (response) => {
        if (response.url().includes(endpoint)) {
          try {
            const responseBody = await response.json()
            const featureFlags = responseBody.data || responseBody
            const featureFlag = featureFlags.find((flag: { key: string }) => flag.key === key)

            if (featureFlag) {
              const isEnabled = Boolean(featureFlag.enabled)

              console.log(`${key} - "enabled": ${isEnabled}`)
              resolve(featureFlag.enabled)
            } else {
              console.error(`${key} not found`)
              resolve(null)
            }
          } catch (error) {
            console.error("Failed to parse response body:", error)
            reject(new Error(get(error, "message")))
          }
        }
      })
      // Wait for the API response
      this.page.waitForResponse((response) => response.url().includes(endpoint))
    })
  }

  /**
   * Selects multiple options from comboboxes on the page.
   *
   * Iterates through the `options` array, clicks each combobox by index,
   * and selects the corresponding option by its label.
   *
   * @param {string[]} options - Labels of the options to select.
   * @returns {Promise<void>} - Resolves when all selections are made.
   */
  async selectComboboxOptions(options: string[]): Promise<void> {
    for (let i = 0; i < options.length; i++) {
      await this.clickByRole("combobox", "", false, i)
      await this.clickByRole("option", options[i])
    }
  }

  /**
   * Asserts that an element has a specific input value.
   * @param selector Selector to find the element
   * @param value Expected value of the element
   * @param index Optional index if multiple elements match the selector (defaults to 0)
   */
  async toHaveValue(selector: string, value: string, index?: number) {
    await expect(this.page.locator(selector).nth(index ?? 0)).toHaveValue(value)
  }

  /**
   * Asserts that an element has a specific attribute value.
   * @param selector Selector to find the element
   * @param attributeName Name of the attribute to check
   * @param value Expected value of the attribute
   */
  async toHaveAttribute(selector: string, attributeName: string, value: string) {
    await expect(this.page.locator(selector)).toHaveAttribute(attributeName, value)
  }

  /**
   * Asserts that an element's text content exactly matches the expected text.
   * @param selector Selector to find the element
   * @param text Expected text content
   * @param index Optional index if multiple elements match the selector (defaults to 0)
   */
  async toHaveTextFromSelection(selector: string, text: string, index?: number) {
    const elementIndex = index ?? 0
    await expect(this.page.locator(selector).nth(elementIndex)).toHaveText(text)
  }

  /**
   * Asserts that an element's text content contains the expected substring.
   * @param selector Selector to find the element
   * @param text Expected substring within the element's text
   * @param index Optional index if multiple elements match the selector (defaults to 0)
   */
  async toContainText(selector: string, text: string, index?: number) {
    const elementIndex = index ?? 0
    await expect(this.page.locator(selector).nth(elementIndex)).toContainText(text)
  }

  // Change `assertFormSelectedOptions()` to avoid "for statement not loop" error
  /**
   * Check each question to ensure its associated combobox contains the expected option.
   * @param {string} selector - Locating the form elements containing the questions and options.
   * @param {string[]} questions - Representing the questions to locate within the form.
   * @param {string[]} options - Representing the expected selected options for the respective questions.
   * @returns {Promise<void>} A promise that resolves when all assertions are complete.
   */
  async assertFormSelectedOptions(selector: string, questions: string[], options: string[]): Promise<void> {
    await Promise.all(
      questions.map((question, i) =>
        expect(this.page.locator(selector).filter({ hasText: question }).getByRole("combobox")).toContainText(
          options[i]
        )
      )
    )
  }

  /**
   * Retrieve specific keys from an API response.
   * @param {string} endpoint - The API endpoint to match for the response.
   * @param {string[]} keys - An array of strings representing the keys to extract from the response body.
   * @returns {Promise<Record<string, any>>} A promise that resolves to an object containing the extracted key-value pairs.
   */
  async getKeysFromApiResponse(
    endpoint: string,
    keys: string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      this.page.on("response", async (response) => {
        if (!response.url().includes(endpoint)) return
        try {
          const responseBody = await response.json()
          const extractedData = extractKeys(responseBody, keys)

          if (Object.keys(extractedData).length === 0) {
            return reject(new Error("No specified keys found in the response"))
          }
          resolve(extractedData)
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error}`))
        }
      })

      // Wait for the specific response
      this.page
        .waitForResponse((response) => response.url().includes(endpoint))
        .catch(() => reject(new Error("Something went wrong, prefer base.page.ts:590")))
    })
  }

  /**
   * Helper method to retrieve iframe locator by index
   * @param locator - The selector for iframe container
   * @param index - The index of iframe within the container
   * @param attribute - The attribute to retrieve (Default to "name")
   * @return The frame locator for the specified iframe
   */
  async getFrameByIndex(locator: string, index: number = 0, attribute: string = "name") {
    // Locate iframe by index
    const iframeLocator = this.page.locator(locator).nth(index)
    // Retrieve the specified attribute from iframe
    const attributeValue = await iframeLocator.getAttribute(attribute)
    // Return iframe locator
    return this.page.frameLocator(`iframe[${attribute}="${attributeValue}"]`)
  }

  setPath(path: string) {
    this.path = path
  }
}
