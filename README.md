# Playwright TypeScript Automation Framework

A scalable, maintainable and enterprise-oriented test automation framework built using **Playwright, TypeScript and Page Object Model (POM)**.

The framework supports UI automation,  JSON-based test data management, reusable business workflows,logging, CI/CD using GitHub Actions.

---

## 1. Project Overview

This framework is designed to provide a reusable and scalable automation solution for modern web applications.

### Key Features

- **Page Object Model (POM):** Maintainable page classes with reusable locators and actions.
- **Custom Fixtures:** Dependency injection for page objects and business workflows.
- **Test Data Management:** JSON-based test data handling and dynamic test data generation.
- **Business Workflows:** Reusable end-to-end business operations.
- **Logging:** Centralized logging using Winston.
- **Error Handling:** Centralized error handling and execution diagnostics.
- **Screenshots and Traces:** Automatic failure evidence collection.
- **Reporting:** Playwright HTML and Allure reports.
- **Cross-Browser Testing:** Chromium, Firefox and WebKit.
- **Parallel Execution:** Configurable Playwright workers.
- **Docker Integration:** Consistent execution in containerized environments.
- **CI/CD Integration:** Automated test execution using GitHub Actions.




## 2. Installation and Setup

### Prerequisites

Install the following:

- Node.js (20 or compatible supported version)
- npm
- Git
- Docker Desktop (for Docker execution)
- Java (required for Allure 2 command-line reporting)




## 3. Test Data Management

The framework supports static and dynamic test data management.

### JSON-Based Test Data

Example:

```json
{
  "loginScenarios": [
    {
      "testCaseId": "TC_001",
      "scenario": "Valid login",
      "username": "standard_user",
      "password": "secret_sauce",
      "expectedResult": "success"
    },
    {
      "testCaseId": "TC_002",
      "scenario": "Invalid password",
      "username": "standard_user",
      "password": "wrong_password",
      "expectedResult": "failure"
    }
  ]
}
```

## 4. Logging and Error Handling

Winston is used for centralized logging.

Log levels:

- Error
- Warn
- Info
- Debug

Logs are generated under:

```text
logs/
├── execution.log
└── error.log
```

The framework captures execution information and failure diagnostics to support debugging and root cause analysis.

---

## 5. Reporting

### Playwright HTML Report

Generate:

```bash
npx playwright test
```

Open:

```bash
npx playwright show-report
```

### Allure Report

Generate:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open:

```bash
npx allure open allure-report
```


## 6. Author

**Tejas Dhumal**

QA Automation Engineer | Playwright | TypeScript | Selenium | UFT | API Testing | CI/CD

-
