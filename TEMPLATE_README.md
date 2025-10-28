# Using This Template

This document explains how to customize this Playwright test framework template for your project.

## Quick Start

1. **Clone/Use this repository**

   ```bash
   git clone <your-repo-url>
   cd playwright-test-framework
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Run tests**

   ```bash
   npm test
   ```

## Customization Guide

### 1. Project Configuration

#### Update package.json

- Change `name` to your project name
- Update `description`
- Modify `version`
- Add custom scripts as needed

#### Update playwright.config.ts

- Set your `baseURL` for E2E tests
- Configure browser projects (remove unwanted browsers)
- Adjust timeouts based on your application
- Configure test output directories
- Set up webServer if testing local application

### 2. Page Objects

#### Create New Page Objects

1. Create a new file in `src/pages/[feature]/[feature].page.ts`
2. Extend `BasePage` class
3. Define locators and methods

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

#### Add to Fixtures

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

### 3. Writing Tests

#### E2E Tests

Create tests in `tests/e2e/[feature].spec.ts`:

```typescript
import { test, expect } from "../fixtures/test.fixtures";

test.describe("Login Feature", () => {
  test("should login successfully", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("user@example.com", "password123");
    await expect(loginPage.getPage()).toHaveURL(/dashboard/);
  });
});
```

#### API Tests

Create tests in `tests/api/rest/[feature].api.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

test.describe("User API", () => {
  test("should create user", async ({ request }) => {
    const response = await request.post("/users", {
      data: { name: "John", email: "john@example.com" }
    });
    expect(response.status()).toBe(201);
  });
});
```

### 4. Configuration Files

#### Add Page Paths

Update `src/config/constants.ts`:

```typescript
export const PAGE_PATH = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  // Add your paths
} as const;
```

#### Add Environment Variables

1. Add to `src/config/enums.ts`:

```typescript
export enum ENV_KEYS {
  BASE_URL = "E2E_BASE_URL",
  YOUR_CUSTOM_VAR = "YOUR_CUSTOM_VAR",
}
```

2. Add to `.env.example` and your `.env` file

### 5. CI/CD Setup

#### GitHub Actions

The template includes `.github/workflows/playwright.yml`. Customize:

- Trigger branches
- Environment variables (in GitHub Secrets/Variables)
- Test execution strategy
- Artifact retention

#### Environment Variables in CI

Set in GitHub repository settings → Secrets and variables → Actions:

- `E2E_BASE_URL`
- `API_BASE_URL`
- Any other secrets

### 6. Performance Testing

#### K6 Tests

Create new scenarios in `performance/scenarios/`:

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },
  ],
};

export default function () {
  const res = http.get('https://your-api.com/endpoint');
  check(res, { 'status is 200': (r) => r.status === 200 });
}
```

Run with:

```bash
k6 run performance/scenarios/your-test.js
```

### 7. Test Data Management

#### Using Data Providers

```typescript
test("should use test data", async ({ commonDataProvider }) => {
  const testEmail = commonDataProvider.commonData.testUser?.email;
  // Use in your test
});
```

#### External Data Files

Store in `src/features/[feature]/[feature].data.ts`

### 8. Reporting

#### Custom Reports

The template generates:

- HTML reports → `reports/html/`
- JSON reports → `reports/json/`
- JUnit reports → `reports/junit/`

View HTML report:

```bash
npm run test:report
```

### 9. Best Practices

#### Test Organization

```md
tests/
├── e2e/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── signup.spec.ts
│   └── dashboard/
│       └── dashboard.spec.ts
├── api/
│   └── rest/
│       ├── users.api.spec.ts
│       └── posts.api.spec.ts
└── fixtures/
    └── test.fixtures.ts
```

#### Naming Conventions

- Test files: `*.spec.ts` (E2E) or `*.api.spec.ts` (API)
- Page objects: `*.page.ts`
- Helpers: `*.helpers.ts`
- Types: `*.types.ts`

#### Assertions

- Use Playwright's built-in assertions
- Prefer web-first assertions (`toBeVisible()`, `toHaveText()`)
- Add custom assertions in `src/helpers/` if needed

### 10. Cleanup

After customization:

1. Delete `TEMPLATE_README.md`
2. Update main `README.md` with project-specific info
3. Remove example tests if not needed
4. Update LICENSE if necessary

## Support

For Playwright documentation: <https://playwright.dev>
For K6 documentation: <https://k6.io/docs>

## Contribution

When extending the framework:

1. Follow existing patterns
2. Update documentation
3. Add tests for new helpers/utilities
4. Maintain backward compatibility
