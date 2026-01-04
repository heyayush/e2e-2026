# End-to-End (E2E) Test Concept

## 1. Strategy & Scope

### 1.1 Goals

- **User-Centric Validation:** Verify critical user journeys across the entire application stack (Frontend + Backend) as a real user would experience them.
- **Integration Assurance:** Ensure frontend UI, backend APIs, auth, and data persistence work together as expected.
- **Catch Bugs:** Catch integration issues that unit/integration tests cannot detect.
- **Release Confidence:** Provide a safety net for deployments, preventing critical regressions in production.

### 1.2 Non Goals

- **Exhaustive Permutations:** E2E tests will not cover every possible input combination.
- **Component Testing"** Exhaustive UI testing of all components (covered by unit/component tests).
- **Component Styling:** Pixel-perfect visual regression is a secondary goal, distinct from functional E2E flow verification.
- **Business Logic Isolation:** Deep backend business logic validation (covered by unit/integration/API tests).
- **Performance Testing:** Performance/load testing (to be handled separately).

### 1.3. Test Pyramid Fit

E2E tests sit at the top of the pyramid:

- **Unit Tests:** High volume, fast, isolated (Component/Function level).
- **Integration Tests:** Medium volume, MFE-boundary or Feature-level.
- **E2E Tests:** Low volume, slower, full-stack. They verify "The system works together."

### 1.4. Test Data Strategy

- **Hybrid Approach:**
  - **Read-Only Data:** Use stable, pre-seeded reference data where possible to speed up tests.
  - **Transactional Data:** Create unique data per test run (e.g., specific User IDs) to ensure test isolation and allow parallel execution.
  - **Cleanup:** Tests should attempt to clean up data, but the system must be resilient to "dirty" data left by failed tests (e.g., via periodic resets or unique identifiers).

### 1.5. Ownership

- **Shared Responsibility:** The Core VisualX team owns the E2E framework assisted by DevOps team to handle infrastructure.

## 2. Technology Stack & Tooling

### 2.1 Recommended Framework: Playwright

- Maximum cross-browser coverage => Not that important
- Strong parallelism on CI => Very very important
- Native multi-tab => Not important
- Native multi-origin => Might be useful with microfrontends
- Hybrid E2E with API testing is also possible => useful
- Better debugging (trace viewer) => helpful
- Playwright has a useful vscode extension as well => good to have
- Cypress is better if too much user interaction events happens => good for long complex flow

## 3. Test Results Reporting

- **HTML Reports:** Generate a static HTML report for every run.
- **Tracing:** Enable full trace recording (DOM snapshots, network logs, console) for _failed_ tests only, to save storage while maximizing debuggability.
- **Video/Screenshots:** Capture screenshots on failure. Video recording for debugging specific CI failures.
- **Flake Handling:**
  - **Retries:** Configure 1-2 retries for CI environments to handle transient network blips.
  - **Quarantine:** Flaky tests are moved to a separate "quarantine" suite to avoid blocking the pipeline until fixed.

### Allure Reporting

- Test history
- Trends and statistics
- Detailed timeline
- Categorized failures

## 4. Testing Guide

### 4.1 General Rules

- Write every test as an independent flow, so that they can run in parallel.
- Make sure to reset all the changes so that the action of one test should not impact others.
- Graceful error handling that gives a helpful error log entry while debugging.
- Use data-testid attributes for stable selectors.
- Keep steps atomic - one action per step.

### 4.2 Three Layered Test Composition

Think and implement in three layered architecture:

1. **Page Objects:** All the locators such as buttons, labels, checkboxes, input fields etc are captured in Page Objects.

2. **Step Definitions:** Single step of interaction with the page objects are written here in Given/When/Then format

3. **Test Scenario:** This is the top layer that creates complete test flow by using the step definitions.

### 4.3 Coding Standards

- **Naming convention:** `[feature].spec.ts`
- **BDD (Behavior-Driven Development)** steps provide a human-readable interface for writing tests. They follow the **Gherkin** syntax pattern: **Given-When-Then**.
- **Given / When / Then format:**
  - **Given:** setup or precondition
  - **When:** user action/event
  - **Then:** expected result
- **Tag tests:** `@smoke`, `@regression`

### 4.4 Tagging

- Tests can be easily tagged by adding the tag in the test description for example. `test.describe("@smoke Dashboard", () => {`
- Running tests of a specific tag can be done using the script for that tag for example `"test:smoke": "playwright test --grep @smoke",`

#### Coverage design

- **Smoke:** 80% confidence with 20% tests (critical journeys).
- **Regression:** All the business-critical workflows.

### 4.5 Globals

- Global Setup that runs at the start of all the tests and and Teardown that runs at the end of all tests is placed in `global.setup.ts` and `global.teardown.ts` respectively.
- Test data can be seeded and cleared using API calls in these steps.
- Different setup and teardown can also be defined for different test suites in playwright config file.

### 4.6 Definition of Done (for E2E Tests)

A test is considered "Done" when:

1.  **Assertions:** It verifies the end state (UI) _and_ side effects (API/Data) where critical.
2.  **Stability:** It passes consistently (no flakiness) 5 times locally and in the CI pipeline.
3.  **Independence:** It does not rely on the state left by a previous test.
4.  **Cleanup:** It cleans up its own data (best effort) or uses a fresh data scope.

### 4.7 Alternate Architecture

There is one alternate approach of using playwright-bdd library and then write tests in feature files. This also looks a good setup but not considering it becacuse of few drawbacks:

1. Dependency on a third party library instead of pure core playwright only setup.
2. Adds another overhead of converting feature files to javascript that playwright understands.
3. More suited for teams where QA is writing these tests. If experienced developers are writing the tests then the current architecture achives the best of both worlds by writing the tests in BDD style without using the third party playwright-bdd library.

## 5. Execution Strategy

### 5.1 Local Runs

- Local runs can be in headless or non-headless mode with Screenshots and Video turned on or off as per the developer's preference for debugging.

### 5.2 CI/CD Runs

- Run in headless mode on CI.
- Smoke tests on every PR → quick feedback.
- Full regression scheduled nightly → full coverage.
- Screenshot and Video only on failure so that infra expenses are low.

### 5.3 Parallelization

- **Sharding:** Tests will be sharded across multiple CI workers (e.g., 5-10 shards) to reduce total execution time.
- **Isolation:** Because tests use unique data (transactional data strategy), they can run concurrently without race conditions.
- **Configurable** worker count.

## 6. TODO

- Azure DevOps integration with different reporters needs to be researched.
- Need to adopt a strategy for explicitly setting `data-testid`, maybe some glabal flag to turn it on and off so that consistent and reliable selectors are used.

## 7. References

- AI tools
- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright BDD Library](https://vitalets.github.io/playwright-bdd/#/)
- [BDD Introduction](https://cucumber.io/docs/bdd/)
- https://www.browserstack.com/guide/playwright-vs-cypress
