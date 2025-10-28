# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-28

### Major Refactoring - BDD to Standard Playwright

#### Added

- ✅ Standard Playwright test structure with `tests/` directory
- ✅ E2E tests using spec files (`tests/e2e/`)
- ✅ API testing capabilities:
  - Playwright request-based API tests (`tests/api/rest/`)
  - Axios-based standalone API tests (`tests/api/standalone/`)
- ✅ K6 performance testing framework (`performance/`)
  - Load testing scripts
  - Stress testing scripts
  - Spike testing scenarios
- ✅ Enhanced reporting configuration:
  - HTML reports with custom output folder
  - JSON reports for CI/CD integration
  - JUnit reports for test management tools
- ✅ Comprehensive test fixtures system
- ✅ API helper utilities and validators
- ✅ Test helper functions library
- ✅ GitHub Actions workflows:
  - Playwright tests with matrix strategy
  - API tests as separate job
  - Performance tests (scheduled and manual)
- ✅ Template documentation:
  - Comprehensive README
  - Template customization guide
  - Contributing guidelines
- ✅ Configuration files:
  - `.env.example` for environment setup
  - `.prettierrc` for code formatting
  - `.npmrc` for npm configuration
  - `.gitignore` updates
- ✅ Example data files and structures

#### Changed

- 🔄 Migrated from Yarn to npm package manager
- 🔄 Renamed project from `playwright-project` to `playwright-test-framework`
- 🔄 Restructured source code:
  - `src/common/` → `src/helpers/` and `src/config/`
  - Separated concerns into config, helpers, and types
- 🔄 Updated all import paths to use new structure
- 🔄 Enhanced Playwright configuration:
  - Multiple reporter configuration
  - Better timeout settings
  - Screenshot and video capture on failure
  - Trace capture on retry
- 🔄 Improved CI/CD workflows:
  - Parallel test execution across browsers
  - Better artifact management
  - Enhanced reporting integration

#### Removed

- ❌ BDD/Cucumber dependencies (`playwright-bdd`, `@cucumber/cucumber`)
- ❌ All `.feature` files
- ❌ All `.step.ts` files (BDD step definitions)
- ❌ `yarn.lock` and Yarn configuration
- ❌ Redundant webhook test files
- ❌ Generated BDD files (`.features-gen/`)
- ❌ Old directory structure (`src/common/`)

#### Key Improvements

1. **Modularity**: Clear separation between pages, helpers, config, and types
2. **Scalability**: Parallel test execution with configurable workers
3. **Observability**: Multiple report formats with enhanced debugging capabilities
4. **Maintainability**: Better code organization and documentation
5. **Template-Ready**: Easy to customize for new projects

### Migration Notes

For teams migrating from the BDD version:

- All BDD scenarios have been converted to standard Playwright tests
- Page objects remain the same and are backward compatible
- Update test execution commands from `yarn e2e` to `npm test`
- Update CI/CD configurations to use npm instead of yarn
- Refer to `TEMPLATE_README.md` for customization guidance

### Breaking Changes

- BDD/Gherkin syntax no longer supported
- Test files must use `.spec.ts` extension
- Fixtures import path changed
- npm required instead of Yarn

---

## Future Enhancements

Planned improvements for future releases:

- [ ] Visual regression testing integration
- [ ] Accessibility testing utilities
- [ ] Database testing helpers
- [ ] Mock service worker integration
- [ ] Advanced performance monitoring
- [ ] Test data management improvements
- [ ] Custom reporters for specific use cases
