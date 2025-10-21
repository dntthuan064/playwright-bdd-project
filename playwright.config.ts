import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "./src/features/**/*.feature",
  steps: [
    "./src/features/**/*.step.ts",
    "./src/common/fixtures.ts",
  ]
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  fullyParallel: true,
  timeout: 300 * 1000,
  expect: {
    timeout: 45000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* BrowserStack configurations */
    ...(process.env.BROWSERSTACK_WS_ENDPOINT ? [
      {
        name: "browserstack-iphone",
        use: {
          ...devices["iPhone 15 Pro"],
          connectOptions: {
            wsEndpoint: process.env.BROWSERSTACK_WS_ENDPOINT,
          },
        },
      },

      {
        name: "browserstack-android",
        use: {
          ...devices["Pixel 7"],
          connectOptions: {
            wsEndpoint: process.env.BROWSERSTACK_WS_ENDPOINT,
          },
        },
      },
    ] : []),

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
