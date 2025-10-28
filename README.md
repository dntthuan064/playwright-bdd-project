# Playwright Test Framework

A comprehensive, scalable test automation framework built with Playwright, supporting E2E testing, API testing, and K6 performance testing. Designed following best practices with modular architecture, parallel execution capabilities, and enhanced reporting.

## 🚀 Features

- ✅ **E2E UI Testing** - Cross-browser testing with Playwright
- ✅ **API Testing** - Integrated and standalone API test capabilities
- ✅ **Performance Testing** - K6 load, stress, and spike testing
- ✅ **Page Object Model** - Maintainable and reusable test code
- ✅ **Enhanced Reporting** - HTML, JSON, and JUnit reports with screenshots and traces
- ✅ **CI/CD Ready** - GitHub Actions workflow with parallel execution
- ✅ **TypeScript** - Full type safety and IntelliSense support
- ✅ **Parallel Execution** - Fast test execution with configurable workers
- ✅ **Environment Configuration** - Flexible configuration for different environments

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Performance Testing](#performance-testing)
- [CI/CD](#cicd)
- [Reporting](#reporting)
- [Customization Guide](#customization-guide)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 📦 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **K6** (optional, for performance testing) - [Installation Guide](https://k6.io/docs/get-started/installation/)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd playwright-test-framework
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Install Playwright browsers** (if not auto-installed)

   ```bash
   npx playwright install
   ```

## 📁 Project Structure

```md
playwright-test-framework/
├── .github/
│   └── workflows/
│       ├── playwright.yml          # Main CI/CD workflow
│       └── performance.yml         # Performance testing workflow
├── tests/
│   ├── e2e/                        # E2E UI tests
│   │   └── todo.spec.ts
│   ├── api/                        # API tests
│   │   ├── rest/                   # Playwright request-based API tests
│   │   │   └── users.api.spec.ts
│   │   └── standalone/             # Axios-based standalone API tests
│   │       └── users.test.ts
│   └── fixtures/                   # Test fixtures
│       └── test.fixtures.ts
├── src/
│   ├── pages/                      # Page Object Models
│   │   ├── base.page.ts
│   │   └── todo/
│   │       └── todo.page.ts
│   ├── helpers/                    # Utility functions
│   │   ├── utils.ts
│   │   ├── api.helpers.ts
│   │   └── test.helpers.ts
│   ├── config/                     # Configuration files
│   │   ├── constants.ts
│   │   └── enums.ts
│   ├── types/                      # TypeScript type definitions
│   │   ├── common.ts
│   │   ├── secrets.ts
│   │   ├── data.ts
│   │   └── exception.ts
│   └── features/                   # Test data
│       └── todo/
│           └── todo.data.ts
├── performance/                    # K6 performance tests
│   ├── scripts/
│   │   ├── load-test.js
│   │   └── stress-test.js
│   ├── scenarios/
│   │   └── spike-test.js
│   └── k6.config.js
├── reports/                        # Test reports output
│   ├── html/
│   ├── json/
│   └── junit/
├── docs/
│   └── ARCHITECTURE.md             # Detailed architecture documentation
├── playwright.config.ts            # Playwright configuration
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── LICENSE
├── CHANGELOG.md                    # Version history
├── CONTRIBUTING.md                 # Contribution guidelines
├── TEMPLATE_README.md              # Template customization guide
└── README.md                       # This file
```

## 🏗️ Architecture

### Core Principles

This framework is built on 5 key principles:

1. **Clear Requirements** - Each test has a clear purpose and acceptance criteria
2. **Modular Design** - Separated layers (tests, fixtures, pages, helpers, config)
3. **Scalable Execution** - Parallel test execution with configurable workers
4. **Observability** - Enhanced reporting with screenshots, videos, and traces
5. **Long-term Maintainability** - TypeScript, clear organization, comprehensive documentation

### Layered Architecture

```md
┌─────────────────────────────────────┐
│         Test Layer                  │
│  (E2E, API, Performance Tests)      │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│      Fixtures Layer                 │
│  (Test Setup & Dependencies)        │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     Page Object Layer               │
│  (UI Interaction Abstractions)      │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│      Helper Layer                   │
│  (Utilities & Common Functions)     │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│    Configuration Layer              │
│  (Constants, Enums, Types)          │
└─────────────────────────────────────┘
```

### Component Responsibilities

#### Test Layer (`tests/`)

- Define test scenarios and assertions
- Describe user journeys and API interactions
- Use fixtures to access dependencies

**Example:**

```typescript
test("should login successfully", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("user@example.com", "password");
  await expect(loginPage.getPage()).toHaveURL(/dashboard/);
});
```

#### Fixtures Layer (`tests/fixtures/`)

- Initialize page objects
- Set up test data providers
- Configure browser contexts
- Manage test lifecycle

#### Page Object Layer (`src/pages/`)

- Encapsulate element selectors
- Provide high-level action methods
- Hide implementation details
- Ensure reusability

#### Helper Layer (`src/helpers/`)

- Common utility functions
- API client and validators
- Test data generators
- Retry and polling mechanisms

#### Configuration Layer (`src/config/`)

- Environment variables
- Constants and enums
- Type definitions
- Application-specific settings

### Data Flow

```md
Test Execution
     ↓
Fixture Initialization
     ↓
Page Object Creation
     ↓
User Actions (via Page Objects)
     ↓
Browser/API Interactions
     ↓
Assertions
     ↓
Report Generation
```

## ⚙️ Configuration

### Environment Variables

Configure your test environment in `.env`:

```bash
# E2E Testing
E2E_BASE_URL=https://demo.playwright.dev
E2E_PORTAL_URL=
E2E_SUBDOMAIN=
E2E_LOCAL=false
E2E_LOCAL_URL=http://localhost:3000

# API Testing
API_BASE_URL=https://reqres.in/api

# Browser Configuration
HEADLESS_MODE=true

# CI/CD
CI=false

# Performance Testing (K6)
K6_VUS=10
K6_DURATION=30s
K6_ITERATIONS=100
```

### Playwright Configuration

Edit `playwright.config.ts` to customize:

- Test directory and patterns
- Browser projects
- Timeouts and retries
- Reporter configuration
- Base URL and other options

### Configuration Hierarchy

1. Default values (in code)
2. Environment variables (`.env` file)
3. CLI arguments
4. CI/CD variables (GitHub Secrets/Variables)

## 🧪 Running Tests

### E2E Tests

```bash
# Run all tests
npm test

# Run E2E tests only
npm run test:e2e

# Run in headed mode (see browser)
npm run test:headed

# Run in UI mode (interactive)
npm run test:ui

# Run in debug mode
npm run test:debug

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### API Tests

```bash
# Run all API tests
npm run test:api

# Run specific API test file
npx playwright test tests/api/rest/users.api.spec.ts
```

### View Reports

```bash
# Open HTML report
npm run test:report
```

## ✍️ Writing Tests

### E2E Test Example

```typescript
import { test, expect } from "../fixtures/test.fixtures";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.goto();
  });

  test("should perform an action", async ({ todoPage }) => {
    // Arrange
    const item = "Test Item";

    // Act
    await todoPage.addTodo(item);

    // Assert
    const todos = await todoPage.getTodos();
    expect(todos).toContain(item);
  });
});
```

### API Test Example

```typescript
import { test, expect } from "@playwright/test";

test.describe("API Feature", () => {
  test("should retrieve data", async ({ request }) => {
    const response = await request.get("/users");
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });
});
```

### Page Object Example

```typescript
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";
import { PAGE_PATH } from "../../config/constants";

export class MyPage extends BasePage {
  readonly element: Locator;

  constructor(page: Page) {
    super(page, PAGE_PATH.MY_PAGE);
    this.element = page.getByRole("button", { name: "Submit" });
  }

  async performAction() {
    await this.element.click();
  }
}
```

### Test Data Management

Store test data in `src/features/[feature]/[feature].data.ts`:

```typescript
export const TestData = {
  validItems: ["Item 1", "Item 2", "Item 3"],
  invalidItem: "",
} as const;
```

Use data providers in tests:

```typescript
test("should use test data", async ({ commonDataProvider }) => {
  const testEmail = commonDataProvider.commonData.testUser?.email;
  // Use in your test
});
```

## 🔥 Performance Testing

### Prerequisites

Install K6:

   ```bash
# macOS
brew install k6

# Windows
choco install k6

# Linux (Debian/Ubuntu)
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 \
  --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | \
  sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Running Performance Tests

   ```bash
# Load test
npm run perf:load

# Stress test
npm run perf:stress

# Custom K6 test
k6 run performance/scenarios/spike-test.js

# With environment variables
API_BASE_URL=https://api.example.com k6 run performance/scripts/load-test.js
```

### Creating Custom Performance Tests

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://test.example.com/api/endpoint');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

## 🔄 CI/CD

### GitHub Actions

The framework includes comprehensive GitHub Actions workflows:

**Main Workflow** (`.github/workflows/playwright.yml`):

- Runs tests in parallel across multiple browsers
- Executes API tests separately
- Uploads test results and reports
- Publishes test results summary

**Performance Workflow** (`.github/workflows/performance.yml`):

- Scheduled weekly performance tests
- Manual trigger with test type selection
- Uploads performance results

### Setting Up CI/CD

1. **Add repository secrets/variables:**
   - Go to Settings → Secrets and variables → Actions
   - Add: `E2E_BASE_URL`, `API_BASE_URL`, and any other required secrets

2. **Workflow triggers:**
   - Automatically runs on push to `main`/`master`
   - Runs on pull requests
   - Performance tests run weekly or manually

3. **View results:**
   - Check the Actions tab in your GitHub repository
   - Download artifacts for detailed reports

## 📊 Reporting

### Report Types

1. **HTML Report** - Interactive visual report
   - Location: `reports/html/`
   - View: `npm run test:report`
   - Features: Screenshots, videos, traces, timeline

2. **JSON Report** - Machine-readable for CI/CD
   - Location: `reports/json/test-results.json`
   - Use for custom analysis and dashboards

3. **JUnit Report** - For test management tools
   - Location: `reports/junit/test-results.xml`
   - Compatible with Jenkins, Azure DevOps, etc.

### Report Features

- **Screenshots on failure** - Automatic capture
- **Video recordings** - Retained on failure
- **Trace files** - Step-by-step debugging
- **Test execution timeline** - Visual representation
- **Detailed error messages** - Stack traces and logs
- **Network activity** - Request/response logs
- **Console logs** - Browser console output

### Error Handling & Debugging

**Retry Strategy:**

- Automatic retries on failure (configurable)
- Exponential backoff for API calls
- Screenshot and trace on retry

**Failure Capture:**

- Screenshot on failure
- Video recording on failure
- Trace files for debugging
- Console logs and network activity

## 🎨 Customization Guide

### Creating New Page Objects

1. Create file in `src/pages/[feature]/[feature].page.ts`
2. Extend `BasePage` class
3. Define locators and methods
4. Add to fixtures

Example:

```typescript
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";
import { PAGE_PATH } from "../../config/constants";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page, PAGE_PATH.LOGIN);
    
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Adding to Fixtures

Update `tests/fixtures/test.fixtures.ts`:

```typescript
export interface PageObjectFixtures {
  loginPage: LoginPage;
  // ... other pages
}

export const test = base.extend<PageObjectFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  // ... other fixtures
});
```

### Adding Configuration

**Page Paths** (`src/config/constants.ts`):

```typescript
export const PAGE_PATH = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
} as const;
```

**Environment Variables** (`src/config/enums.ts`):

```typescript
export enum ENV_KEYS {
  BASE_URL = "E2E_BASE_URL",
  YOUR_CUSTOM_VAR = "YOUR_CUSTOM_VAR",
}
```

### Customizing Playwright Config

Key areas to customize in `playwright.config.ts`:

- **Test directory:** `testDir: "./tests"`
- **Workers:** `workers: process.env.CI ? 4 : undefined`
- **Retries:** `retries: process.env.CI ? 2 : 0`
- **Timeout:** `timeout: 300 * 1000`
- **Base URL:** `baseURL: process.env.E2E_BASE_URL`
- **Browsers:** Add/remove browser projects

## 🎯 Best Practices

### Test Organization

- Group related tests using `test.describe()`
- Use descriptive test names (should, when, then)
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests independent and isolated
- Use `beforeEach` for common setup

### Page Objects

- Keep page objects focused and single-purpose
- Use meaningful method names
- Return promises for async operations
- Encapsulate locators within page objects
- Avoid business logic in page objects

### Test Data

- Use data providers for reusable test data
- Store sensitive data in environment variables
- Use fixtures for test setup
- Keep test data separate from test logic
- Use constants for static values

### Assertions

- Use Playwright's web-first assertions
- Prefer specific assertions (`toBeVisible()`, `toHaveText()`)
- Add meaningful assertion messages
- Avoid generic assertions
- Test one thing per test

### Performance

- Run tests in parallel when possible
- Use `beforeAll`/`afterAll` for expensive setup
- Avoid hard waits, use built-in waiting mechanisms
- Optimize selectors for speed
- Minimize test duration

### Maintainability

- Keep tests independent
- Avoid test interdependencies
- Regular refactoring and cleanup
- Update dependencies regularly
- Document complex logic
- Use TypeScript for type safety

### Naming Conventions

- Test files: `*.spec.ts` (E2E) or `*.api.spec.ts` (API)
- Page objects: `*.page.ts`
- Helpers: `*.helpers.ts`
- Types: `*.types.ts`
- Clear, descriptive variable names

### Security Best Practices

**Secrets Management:**

- Never commit secrets to repository
- Use environment variables for sensitive data
- Encrypt sensitive data in CI/CD
- Rotate credentials regularly
- Use `.gitignore` to exclude secret files

**Access Control:**

- Limit CI/CD permissions
- Use dedicated test accounts
- Audit test executions
- Secure test data access

## 🔍 Troubleshooting

### Common Issues

**Tests not discovered:**

- Check `testDir` in `playwright.config.ts`
- Ensure test files match pattern `*.spec.ts`
- Run `npm test -- --list` to see discovered tests

**Page objects not found:**

- Verify import paths are correct
- Check fixtures are properly configured
- Ensure page objects extend `BasePage`

**Environment variables not working:**

- Verify `.env` file exists
- Check variable names match `ENV_KEYS`
- Restart development server after changes

**CI/CD failures:**

- Check GitHub Actions logs
- Verify secrets are configured
- Ensure dependencies are installed
- Check browser compatibility

**Performance test failures:**

- Verify K6 is installed
- Check API endpoints are accessible
- Review performance thresholds
- Check network connectivity

### Debug Mode

Run tests in debug mode to step through execution:

```bash
npm run test:debug
```

### Trace Viewer

Open trace files for detailed debugging:

   ```bash
npx playwright show-trace reports/html/trace.zip
```

### Verbose Logging

Enable verbose logging:

```bash
DEBUG=pw:api npm test
```

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [K6 Documentation](https://k6.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on:

- Code style guidelines
- Development workflow
- Pull request process
- Testing requirements

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting: `npm test && npm run lint`
5. Commit your changes: `git commit -m 'feat: add new feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## 📝 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:e2e` | Run E2E tests only |
| `npm run test:api` | Run API tests only |
| `npm run test:headed` | Run tests in headed mode |
| `npm run test:ui` | Run tests in UI mode |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:report` | Open HTML report |
| `npm run test:chromium` | Run tests in Chromium |
| `npm run test:firefox` | Run tests in Firefox |
| `npm run test:webkit` | Run tests in WebKit |
| `npm run perf:load` | Run K6 load test |
| `npm run perf:stress` | Run K6 stress test |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run lint` | Run TypeScript type checking |

## 📈 Monitoring & Metrics

### Key Metrics to Track

- **Test execution time** - Monitor for performance regression
- **Pass/fail rates** - Track test reliability
- **Flakiness indicators** - Identify unstable tests
- **Coverage reports** - Ensure adequate test coverage
- **Performance benchmarks** - Monitor application performance

### Dashboards

Consider setting up dashboards for:

- CI/CD pipeline status
- Historical test trends
- Performance benchmarks
- Error patterns and analysis

## 🗺️ Roadmap

### Current Version: 1.0.0

Completed features:

- ✅ Standard Playwright test structure
- ✅ E2E and API testing capabilities
- ✅ K6 performance testing
- ✅ Enhanced reporting
- ✅ CI/CD workflows
- ✅ Comprehensive documentation

### Future Enhancements

Planned improvements:

- [ ] Visual regression testing integration
- [ ] Accessibility testing utilities
- [ ] Database testing helpers
- [ ] Mock service worker integration
- [ ] Advanced performance monitoring
- [ ] Test data management improvements
- [ ] Custom reporters for specific use cases
- [ ] Contract testing support
- [ ] Chaos engineering capabilities
- [ ] AI-powered test generation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Built with:

- [Playwright](https://playwright.dev) - End-to-end testing framework
- [K6](https://k6.io) - Performance testing tool
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Axios](https://axios-http.com) - HTTP client for API testing

---

**Need help?**

- Check [TEMPLATE_README.md](./TEMPLATE_README.md) for customization guidance
- Review [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- See [CHANGELOG.md](./CHANGELOG.md) for version history
- Read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed architecture

**Ready to start?** Run `npm test` and begin your testing journey! 🚀
