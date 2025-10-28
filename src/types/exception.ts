/**
 * Custom exception types for test framework
 */

export class TestDataNameUnknownError extends Error {
  constructor(name: string) {
    super(`Unknown test data name: ${name}`);
    this.name = "TestDataNameUnknownError";
  }
}

export class PageNotFoundError extends Error {
  constructor(pageName: string) {
    super(`Page object not found: ${pageName}`);
    this.name = "PageNotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(`Validation failed: ${message}`);
    this.name = "ValidationError";
  }
}
