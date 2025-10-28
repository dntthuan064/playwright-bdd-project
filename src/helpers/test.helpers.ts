import { Page } from "@playwright/test";

/**
 * Wait for network to be idle
 */
export async function waitForNetworkIdle(page: Page, timeout = 10000): Promise<void> {
  await page.waitForLoadState("networkidle", { timeout });
}

/**
 * Wait for DOM content to be loaded
 */
export async function waitForDomContentLoaded(page: Page, timeout = 10000): Promise<void> {
  await page.waitForLoadState("domcontentloaded", { timeout });
}

/**
 * Take a screenshot with a custom name
 */
export async function takeScreenshot(page: Page, name: string): Promise<Buffer> {
  return await page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true });
}

/**
 * Generate a unique test ID
 */
export function generateTestId(prefix = "test"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Retry an async operation with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

/**
 * Execute code with retry on specific error
 */
export async function retryOnError<T>(
  operation: () => Promise<T>,
  errorMatcher: (error: Error) => boolean,
  maxRetries = 3
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1 && errorMatcher(lastError)) {
        continue;
      }
      throw error;
    }
  }

  throw lastError!;
}

/**
 * Poll for a condition to be true
 */
export async function pollUntil(condition: () => Promise<boolean>, timeout = 10000, interval = 500): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error(`Polling timeout after ${timeout}ms`);
}

/**
 * Get current timestamp in ISO format
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Generate random number within range
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random boolean
 */
export function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

/**
 * Pick random element from array
 */
export function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
