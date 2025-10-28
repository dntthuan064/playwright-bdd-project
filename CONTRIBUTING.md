# Contributing to Playwright Test Framework

Thank you for considering contributing to this project! Here are some guidelines to help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for public methods
- Run `npm run format` before committing
- Ensure type safety with `npm run lint`

### Testing

- Write tests for new features
- Ensure all tests pass before submitting: `npm test`
- Follow the AAA pattern (Arrange, Act, Assert)
- Use descriptive test names

### Commit Messages

Follow conventional commits:

- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `test: add tests`
- `refactor: improve code structure`
- `chore: update dependencies`

### Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Update the README if necessary
5. Request review from maintainers

## Project Structure

- `src/pages/` - Page Object Models
- `src/helpers/` - Utility functions
- `src/config/` - Configuration files
- `src/types/` - TypeScript types
- `tests/e2e/` - E2E tests
- `tests/api/` - API tests
- `performance/` - K6 performance tests

## Adding New Features

### New Page Object

1. Create file in `src/pages/[feature]/[feature].page.ts`
2. Extend `BasePage` class
3. Define locators and methods
4. Add to fixtures in `tests/fixtures/test.fixtures.ts`
5. Write tests in `tests/e2e/[feature].spec.ts`

### New Helper Function

1. Add to appropriate file in `src/helpers/`
2. Add JSDoc documentation
3. Export from the module
4. Write unit tests if applicable

### New Test

1. Create test file following naming convention
2. Import necessary fixtures
3. Write clear, focused tests
4. Add meaningful assertions

## Code Review

All submissions require review. We use GitHub pull requests for this purpose.

- Be responsive to feedback
- Make requested changes promptly
- Ask questions if unclear

## Testing Checklist

Before submitting:

- [ ] All tests pass locally
- [ ] Code is formatted (`npm run format`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Commit messages follow convention

## Questions?

Feel free to open an issue for:

- Bug reports
- Feature requests
- Questions about usage
- Documentation improvements

Thank you for contributing! 🎉
