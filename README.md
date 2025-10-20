# Playwright Project

This project is an end-to-end (E2E) testing framework using Playwright and BDD (via playwright-bdd). It is structured for scalability, maintainability, and clarity, supporting feature-based test development.

## Project Structure

```md
playwright-project/
│
├── .github/                # GitHub workflows and CI/CD configuration
├── playwright-report/      # Playwright HTML reports (auto-generated)
├── test-results/           # Test result outputs (auto-generated)
├── node_modules/           # Node.js dependencies
│
├── src/                    # Main source directory
│   ├── common/             # Shared utilities, types, and constants
│   │   ├── types/          # TypeScript type definitions
│   │   ├── constant.ts
│   │   ├── enum.ts
│   │   ├── env.ts
│   │   ├── fixtures.ts
│   │   └── utils.ts
│   ├── features/           # Gherkin feature files and step definitions
│   │   ├── common.step.ts
│   │   └── todo/
│   │       ├── todo.data.ts
│   │       ├── todo.feature
│   │       └── todo.step.ts
│   ├── pages/              # Page Object Models (POM)
│   │   ├── base.page.ts
│   │   └── todo/
│   │       └── todo.page.ts
│   └── common.json         # Common configuration or data
│
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Project metadata and dependencies
├── playwright.config.ts    # Playwright configuration
├── browserstack.yml        # BrowserStack configuration
├── browserstack.config.js  # BrowserStack specific configuration
├── tsconfig.json           # TypeScript configuration
├── yarn.lock               # Yarn lock file
```

## Key Concepts

- **Feature Files (`.feature`)**: Written in Gherkin syntax, describing user scenarios in plain language.
- **Step Definitions (`.step.ts`)**: Map Gherkin steps to executable code using playwright-bdd.
- **Page Objects (`pages/`)**: Encapsulate UI interactions for maintainable and reusable test code.
- **Common Utilities (`common/`)**: Shared constants, enums, environment configs, and TypeScript types.

## Getting Started

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Run all E2E tests:**

   ```bash
   yarn e2e
   ```

3. **Run E2E tests with tags:**

   **On Linux/macOS:**

   ```bash
   E2E_TAGS='@dev' yarn e2e:ui
   ```

   **On Windows PowerShell:**

   ```powershell
   $env:E2E_TAGS='@dev'; yarn e2e:ui
   ```

4. **View reports:**
   - After running tests, open `playwright-report/index.html` in your browser.

## BrowserStack Integration

This project includes BrowserStack integration for cross-browser testing on real devices and browsers. See [BROWSERSTACK_SETUP.md](./BROWSERSTACK_SETUP.md) for detailed setup instructions.

### Quick BrowserStack Setup

1. **Set up environment variables:**

   ```bash
   BROWSERSTACK_USERNAME=your_username
   BROWSERSTACK_ACCESS_KEY=your_access_key
   ```

2. **Run tests on BrowserStack:**

   ```bash
   yarn e2e:browserstack
   ```

3. **Run tests on all BrowserStack browsers:**

   ```bash
   yarn e2e:browserstack-all
   ```

## Common Scripts

| Script                          | Description                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| `yarn e2e`                      | Generate specs & run all E2E tests                                                           |
| `yarn e2e:tag`                  | Generate specs & run tests for specific tags                                                 |
| `yarn e2e:ui`                   | Generate specs & run Playwright in UI mode for specific tags                                 |
| `yarn e2e:debug`                | Generate specs & run Playwright in debug mode for specific tags                              |
| `yarn e2e:local`                | Use `.env.local` & run all E2E tests                                                         |
| `yarn e2e:tag-gen`              | Only generate specs for specific tags (no test run)                                          |
| `yarn e2e:report`               | Show Playwright HTML report                                                                  |
| `yarn e2e:browserstack`         | Run tests on BrowserStack Chrome                                                             |
| `yarn e2e:browserstack-mobile`  | Run tests on all BrowserStack mobile device                                                  |
| `yarn e2e:browserstack-desktop` | Run tests on all BrowserStack browsers (Chrome, Firefox, Safari)                             |
| `yarn e2e:browserstack-iphone`  | Run tests on all BrowserStack browsers (Chrome, Firefox, Safari)                             |
| `yarn e2e:browserstack-android` | Run tests on all BrowserStack browsers (Chrome, Firefox, Safari)                             |
| `yarn fix`                      | Format code                                                                                  |
| `yarn typecheck`                | Type-check code                                                                              |
| `yarn e2e_weekly`               | Generate specs & run the weekly E2E suite (skips `@REQUIRED_QA_ALLOWED` & any `${SKIP_TAG}`) |
| `yarn e2e:tag-local`            | Generate specs & run tests for specific tags using `.env.local`                              |
| `yarn pre-commit`               | Run `lint-staged` before every commit                                                        |
| `yarn pre-push`                 | Run formatter & type-checker before every push                                               |

## Customization

- Add new features in `src/features/`.
- Implement new page objects in `src/pages/`.
- Extend utilities and types in `src/common/`.
- Configure BrowserStack settings in `browserstack.yml` and `browserstack.config.js`.

---

**Note:**

- Use only Yarn for dependency management (`yarn.lock`).
- Set environment variables using the correct syntax for your shell (see above).
- This project uses Playwright and playwright-bdd for BDD-style E2E testing. No direct cucumber-js usage is required.
- BrowserStack integration provides access to 100+ real browser-OS combinations for comprehensive testing.
