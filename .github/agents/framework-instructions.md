
# Playwright Framework Instructions

## Technology Stack
- Playwright
- TypeScript
- Page Object Model

## Architecture Rules
- Follow the existing POM architecture.
- Reuse BasePage for common page functionality.
- Store page classes inside src/pages.
- Store test cases inside tests.
- Use custom fixtures from src/fixtures/baseFixture.ts.
- Do not instantiate page objects directly in test files when fixtures exist.

## Locator Strategy
- Prefer getByRole()
- Prefer getByLabel()
- Prefer getByPlaceholder()
- Use getByTestId() where appropriate.
- Avoid XPath unless necessary.

## Test Data
- Store reusable test data in JSON files.
- Use existing TestDataProvider.
- Do not hardcode credentials in test scripts.

## Logging
- Use the existing Winston logger.
- Log important business actions.
- Never log passwords or sensitive credentials.

## Assertions
- Use Playwright expect assertions.
- Validate both positive and negative scenarios.
- Avoid unnecessary assertions.

## Coding Standards
- Use async/await.
- Use meaningful method names.
- Avoid duplicate methods.
- Do not use page.waitForTimeout().
- Reuse existing utility methods.

## Reporting
- Maintain compatibility with Playwright HTML reporting.
- Maintain compatibility with Allure reporting.
