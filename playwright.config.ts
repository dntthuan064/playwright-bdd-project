import { defineConfig, devices } from "@playwright/test";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Playwright Test Configuration
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 300 * 1000,
  expect: {
    timeout: 45000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  // Enhanced reporting configuration
  reporter: [
    ["html", { outputFolder: "reports/html", open: "never" }],
    ["list"],
  ],

  use: {
    // Base URL for navigation
    baseURL: process.env.E2E_BASE_URL,

    // Capture trace on first retry
    trace: "on-first-retry",

    // Capture screenshot on failure
    screenshot: "only-on-failure",

    // Capture video on retry
    video: "retain-on-failure",

    // Test timeout
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: /.*\.api\.spec\.ts/, // Skip API tests in browser projects
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testIgnore: /.*\.api\.spec\.ts/, // Skip API tests in browser projects
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      testIgnore: /.*\.api\.spec\.ts/, // Skip API tests in browser projects
    },

    // API Testing - runs without browser
    {
      name: "api",
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: process.env.API_BASE_URL,
      },
    },

    /* Test against mobile viewports */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Output directories */
  outputDir: "test-results/",

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
