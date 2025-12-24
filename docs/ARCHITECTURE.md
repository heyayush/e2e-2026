# E2E Testing Documentation

## Note: data-testid Usage for E2E Testing

- Currently, `data-testid` is passed as a prop to components.
- A global flag (`ENABLE_TEST_IDS`) can be introduced to automatically add `data-testid` in dev environment.
- This ensures consistent and reliable selectors for Playwright tests without manually adding `data-testid` in every testable component.

---

## 1. What is E2E Testing?

End-to-End (E2E) testing validates how the entire system works together — from the user interface (frontend) to the backend and database.

**Objectives:**

- Ensure user actions perform correctly and data is saved or updated as expected.
- Confirm critical features remain intact after code changes.

---

## 2. Goals

- Test the basic workflows of the application: login, navigation, forms, menus, CRUD operations.
- Ensure backend data matches UI actions.
- Catch bugs before production deployment.

**Not in scope:**

- Minor UI styling changes
- Individual functions (covered by unit tests)
- Performance or security testing

---

## 3. Why E2E is Important

| Test Type   | What it tests               | Frequency    |
| ----------- | --------------------------- | ------------ |
| Unit        | Single components/functions | Every commit |
| Integration | API + component             | Every commit |
| E2E         | Full user workflow          | PR / Nightly |

- Unit tests are fast and focused on individual components.
- Integration tests combine multiple parts of the system.
- E2E tests are slower but validate the complete user workflow in a real browser.

---

## 4. Recommended Tools

- **Playwright**: UI automation across multiple browsers, including API checks
- **API requests**: Validate backend responses
- **Database checks**: Verify data persistence
- **Reporting tools**: HTML reports, screenshots, and videos

These tools help make tests stable, readable, and useful for real-world workflows.

---

## 5. How to Write Tests

- Naming convention: `[feature].spec.ts`
- **Given / When / Then format:**
  - **Given:** setup or precondition
  - **When:** user action
  - **Then:** expected result
- **Tag tests:** `@smoke`, `@regression`, `@critical`

````bash
pnpm exec playwright test --grep "@smoke"
pnpm exec playwright test --grep "@regression"
pnpm exec playwright test --grep "@critical"
## 6. Sample E2E Scenarios

| Feature           | Steps                              | Expected Result                   | Notes                        |
|------------------|-----------------------------------|---------------------------------|------------------------------|
| Login             | Enter username & password → Click login | Redirect to dashboard, session created | Invalid login → error message |
| Bottom Navigation | Click bottom nav buttons           | Correct page opens, URL updated  | Restricted pages → access denied |
| Create Entity     | Fill form → Submit                 | Item appears in UI, DB record created | Missing required fields → error |
| Delete Entity     | Select item → Delete               | Item removed from UI & DB        | Button disabled checks       |
| Menu Navigation   | Open menu → Select item            | Correct page opens, URL updated  | Click outside → menu closes  |
| Form Validation   | Enter invalid data                 | Submit button disabled           | Validation errors            |
| Logout            | Click logout                       | Redirect to login, session cleared | -                           |

---

## 7. How to Run E2E Tests

- **CI/CD:**
  - Smoke tests on PR → quick feedback
  - Full regression nightly → full coverage

- **Parallel execution:** Run multiple tests simultaneously to save time

- **Browsers:** Chromium, Firefox, WebKit (desktop + optional mobile)

---

## 8. Reporting & Debugging

### HTML Reports
- After running tests, open the report using:
```bash
pnpm exec playwright show-report reports

```ts
use: {
  screenshot: 'only-on-failure', // options: 'off', 'on', 'only-on-failure'
}
Screenshots are saved in the output folder and accessible from the HTML report

Videos
Playwright can record videos of tests for debugging

Configuration example:

ts
Copy code
use: {
  video: 'retain-on-failure', // options: 'off', 'on', 'retain-on-failure'
}
Videos are saved per test and linked in the HTML report for failed tests

Flaky Tests
Retries are allowed (maximum 2 times) to handle intermittent failures

Summary:
Step-by-step results, screenshots, and videos are all visible in Playwright’s HTML report, providing clear context for debugging failed tests.

9. Done Criteria
An E2E test is considered complete when:

UI actions are verified

Backend/API or database is validated

Test cleans up data it created

Test runs reliably (not flaky)

Steps are clear and documented

10. Summary
E2E tests ensure the app works as users expect

Cover login, navigation, CRUD, menus, forms, and role-based access

Use Playwright along with API/DB validation for reliability

Integrate tests in CI/CD for automated checks

11. E2E Testing Strategy for Micro-Frontends (fi-core + MFs)
11.1 Architecture
fi-core: central shell; owns routing, layout, and composition

MFs: UI modules only; cannot run independently; all linked to fi-core

11.2 PR-Level E2E
Runs only in fi-core PR pipeline

Uses linked MF code to test latest changes

MF PRs themselves run only unit/integration tests

Tests hit the fi-core URL, navigate routes, and validate user flows across MFs

11.3 Optional System-Level E2E
Separate repo for nightly/staging regression tests on deployed apps

11.4 Key Benefits
Fast PR feedback

True E2E in a real browser

Clear ownership: MFs → unit/integration, fi-core → E2E & integration

Summary:
MFs cannot run independently. PR-level E2E runs in fi-core using linked MF code. Separate E2E repo is optional for system-level regression only.

vbnet
Copy code
````
