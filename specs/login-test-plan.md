# SauceDemo Login Test Plan

## Application Overview

Scope: explore and test the SauceDemo login experience at https://www.saucedemo.com/, including login controls, authentication success and rejection, validation feedback, and authenticated/unauthenticated navigation. This plan is based on live exploration and the existing framework: Playwright with chromium, firefox, and webkit projects; application tests use src/fixtures/baseFixture.ts and its loginPage fixture, src/test-data/TestDataprovided.ts, and loginTest.json. The existing tests/seed.spec.ts is an empty generator seed; use it for setup. File paths in scenarios are proposed destinations only; this task creates no TypeScript test scripts. Unless a case specifies otherwise, start with a fresh unauthenticated browser context at the login route. The login page uses Username and Password inputs, a Login button, public accepted-account/password guidance, and an inline dismissible error alert. The username input is type text and the password input is type password; neither input has HTML required or maxlength attributes. Explored responses: empty username -> “Epic sadface: Username is required”; missing password -> “Epic sadface: Password is required”; mismatched credentials and whitespace-only credentials -> “Epic sadface: Username and password do not match any user in this service”; locked account -> “Epic sadface: Sorry, this user has been locked out.” Direct unauthenticated access to /inventory.html redirects to / with “Epic sadface: You can only access '/inventory.html' when you are logged in.” The existing loginTest.json has standard and invalid credential examples; any additional reusable account data should be added there before script generation.

### Test Case Catalog
| Test Case ID | Scenario Description | Preconditions | Priority |
| --- | --- | --- | --- |
| LGN-001 | Verify login form, credential guidance, and password masking. | Fresh unauthenticated browser context; no prior app error state. | P1 |
| LGN-002 | Authenticate the standard user using the existing framework test data. | Fresh unauthenticated context; LoginScenario values are available from loginTest.json. | P1 |
| LGN-003 | Submit standard-user credentials with Enter. | Fresh unauthenticated context; LoginScenario values are available from loginTest.json. | P2 |
| LGN-004 | Verify required-field behavior when both fields are empty. | Fresh unauthenticated context with empty fields. | P1 |
| LGN-005 | Verify username-required behavior when only the password is filled. | Fresh unauthenticated context; valid demo password available. | P1 |
| LGN-006 | Verify password-required behavior when only the username is filled. | Fresh unauthenticated context; standard username available. | P1 |
| LGN-007 | Reject an incorrect password for a valid username. | Fresh unauthenticated context; standard username and deliberately incorrect password available. | P1 |
| LGN-008 | Reject an unrecognized username/password combination. | Fresh unauthenticated context; unrecognized credentials available. | P1 |
| LGN-009 | Reject the publicly documented locked-out account. | Fresh unauthenticated context; locked_out_user and displayed common password available. | P1 |
| LGN-010 | Reject a whitespace-only username. | Fresh unauthenticated context; whitespace username and valid demo password available. | P2 |
| LGN-011 | Reject a whitespace-only password. | Fresh unauthenticated context; standard username and whitespace password available. | P2 |
| LGN-012 | Check long and punctuation-containing credential values. | Fresh unauthenticated context; long and special-character test values prepared. | P2 |
| LGN-013 | Dismiss an inline login error. | Fresh unauthenticated context; an error alert has been triggered. | P2 |
| LGN-014 | Verify logout, direct-route protection, and browser-back behavior. | Fresh context with standard-user credentials available; create an authenticated session during the test. | P1 |
| LGN-015 | Authenticate another listed, non-locked account. | Fresh unauthenticated context; problem_user and displayed common password available. Add this account to reusable JSON test data before script generation. | P2 |

## Test Scenarios

### 1. Login functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. LGN-001 | Login form controls and credential guidance | Priority: P1

**File:** `tests/login/LGN-001-login-form-controls.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh unauthenticated browser context.
    - expect: The page title is Swag Labs and the URL is the login route (/).
    - expect: The Login form exposes accessible Username and Password fields and a Login button.
    - expect: The password field masks entered characters (input type password).
    - expect: The page displays the accepted demo usernames and shared password guidance.

#### 1.2. LGN-002 | Successful standard user login | Priority: P1

**File:** `tests/login/LGN-002-standard-user-login.spec.ts`

**Steps:**
  1. Open the login page and load the LoginScenario credentials from src/test-data/loginTest.json using the existing TestDataProvider.
    - expect: The test begins with an unauthenticated login page and no existing error alert.
  2. Fill the Username and Password fields and select Login.
    - expect: Authentication succeeds and the browser navigates to /inventory.html.
    - expect: The authenticated inventory page displays the Products heading and the product list.

#### 1.3. LGN-003 | Submit valid credentials with Enter | Priority: P2

**File:** `tests/login/LGN-003-enter-key-login.spec.ts`

**Steps:**
  1. Open a fresh login page and fill the valid standard-user credentials from loginTest.json.
    - expect: Both credential fields contain the intended values; the password remains masked.
  2. With focus in the password field, press Enter.
    - expect: The form submits successfully and navigates to /inventory.html, as when selecting Login.

#### 1.4. LGN-004 | Submit with both fields empty | Priority: P1

**File:** `tests/login/LGN-004-empty-submit.spec.ts`

**Steps:**
  1. Open the fresh login page and select Login without entering either value.
    - expect: The login page remains at / and displays the alert: “Epic sadface: Username is required”.
    - expect: The error is exposed as an alert and includes a Dismiss error button.

#### 1.5. LGN-005 | Submit with username missing | Priority: P1

**File:** `tests/login/LGN-005-missing-username.spec.ts`

**Steps:**
  1. Open a fresh login page, leave Username empty, enter the displayed valid demo password, and select Login.
    - expect: The login page remains at / and displays “Epic sadface: Username is required”.
    - expect: No authenticated inventory page is shown.

#### 1.6. LGN-006 | Submit with password missing | Priority: P1

**File:** `tests/login/LGN-006-missing-password.spec.ts`

**Steps:**
  1. Open a fresh login page, enter the standard username, leave Password empty, and select Login.
    - expect: The login page remains at / and displays “Epic sadface: Password is required”.
    - expect: No authenticated inventory page is shown.

#### 1.7. LGN-007 | Valid username with incorrect password | Priority: P1

**File:** `tests/login/LGN-007-wrong-password.spec.ts`

**Steps:**
  1. Enter the standard username and an incorrect password, then select Login.
    - expect: Authentication is rejected; the URL remains / and the user is not logged in.
    - expect: The alert displays “Epic sadface: Username and password do not match any user in this service”.

#### 1.8. LGN-008 | Unknown username with an incorrect password | Priority: P1

**File:** `tests/login/LGN-008-unknown-username.spec.ts`

**Steps:**
  1. Enter an unrecognized username and an incorrect password, then select Login.
    - expect: Authentication is rejected; the URL remains / and the user is not logged in.
    - expect: The alert displays “Epic sadface: Username and password do not match any user in this service”.

#### 1.9. LGN-009 | Locked-out user cannot sign in | Priority: P1

**File:** `tests/login/LGN-009-locked-out-user.spec.ts`

**Steps:**
  1. Enter the publicly listed locked_out_user username and the displayed shared password, then select Login.
    - expect: Authentication is rejected; the URL remains / and the user is not logged in.
    - expect: The alert displays “Epic sadface: Sorry, this user has been locked out.”

#### 1.10. LGN-010 | Whitespace-only username is rejected | Priority: P2

**File:** `tests/login/LGN-010-whitespace-username.spec.ts`

**Steps:**
  1. Enter only spaces in Username, enter the valid displayed password, and select Login.
    - expect: Whitespace is not accepted as a valid username; authentication is rejected and the URL remains /.
    - expect: The alert displays “Epic sadface: Username and password do not match any user in this service” rather than the empty-username required message.

#### 1.11. LGN-011 | Whitespace-only password is rejected | Priority: P2

**File:** `tests/login/LGN-011-whitespace-password.spec.ts`

**Steps:**
  1. Enter the standard username, enter only spaces in Password, and select Login.
    - expect: Whitespace is not accepted as a valid password; authentication is rejected and the URL remains /.
    - expect: The alert displays “Epic sadface: Username and password do not match any user in this service” rather than the empty-password required message.

#### 1.12. LGN-012 | Long and special-character credentials | Priority: P2

**File:** `tests/login/LGN-012-boundary-credentials.spec.ts`

**Steps:**
  1. Enter very long values (for example, 256 characters) and values containing punctuation in the credential fields, then select Login.
    - expect: The fields accept input without a client-side maxlength restriction; submission does not crash or navigate to the inventory page.
    - expect: Unrecognized credential values are rejected with the generic credential mismatch alert.

#### 1.13. LGN-013 | Dismiss login error alert | Priority: P2

**File:** `tests/login/LGN-013-dismiss-error.spec.ts`

**Steps:**
  1. Cause a login error, such as by submitting both fields empty.
    - expect: An inline alert and its Dismiss error button are visible.
  2. Select Dismiss error.
    - expect: The alert is removed from view and the login form remains available at /.

#### 1.14. LGN-014 | Logout and unauthenticated route protection | Priority: P1

**File:** `tests/login/LGN-014-logout-and-protected-route.spec.ts`

**Steps:**
  1. Sign in with the standard user, open the navigation menu, and select Logout.
    - expect: The browser returns to / and the login form is shown.
  2. While logged out, navigate directly to https://www.saucedemo.com/inventory.html.
    - expect: The app redirects to / and shows “Epic sadface: You can only access '/inventory.html' when you are logged in.”
  3. Use browser Back after the protected-route redirect.
    - expect: The user remains unauthenticated at /; the inventory page is not restored as an authenticated page.

#### 1.15. LGN-015 | Successful login with another listed account | Priority: P2

**File:** `tests/login/LGN-015-problem-user-login.spec.ts`

**Steps:**
  1. Open the login page, enter the publicly listed problem_user account and the shared displayed password, then select Login.
    - expect: Authentication succeeds and the browser navigates to /inventory.html.
    - expect: The authenticated page displays Products.
