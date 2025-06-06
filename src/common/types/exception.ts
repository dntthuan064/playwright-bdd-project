export class TestDataNameUnknownError extends Error {
  constructor(name: string) {
    super(`Unknown test data name: ${name}`)
    this.name = "TestDataNameUnknownError"
  }
}
