# user-auth Specification

## Purpose

Lets a user sign in to the app with an email address and password, and defines how the app responds to valid, invalid and incorrect sign-in attempts.

## Requirements

### Requirement: Login page
The system SHALL provide a login page at `/login` containing an email field, a password field and a Login button. Each field SHALL have a visible label, and the password field SHALL mask its input.

#### Scenario: Visiting the login page
- **WHEN** a user opens `/login`
- **THEN** the page shows a labeled email field, a labeled password field and a button labeled "Login"

#### Scenario: Password is masked
- **WHEN** a user types into the password field
- **THEN** the typed characters are not shown in plain text

#### Scenario: Keyboard submission
- **WHEN** a user fills in both fields and presses Enter
- **THEN** the form is submitted as if the Login button was clicked

### Requirement: Input validation
The system SHALL reject a submission whose email is empty or not a valid email address, or whose password is empty, and SHALL show an error next to each invalid field without checking credentials. Validation SHALL also be enforced on the server.

#### Scenario: Empty fields
- **WHEN** a user submits the form with both fields empty
- **THEN** the page shows that an email is required and that a password is required, and no credential check is made

#### Scenario: Invalid email format
- **WHEN** a user submits "not-an-email" as the email with any password
- **THEN** the page shows that the email address is invalid, and no credential check is made

#### Scenario: Server-side validation
- **WHEN** a submission bypasses browser validation and reaches the server with an empty or invalid field
- **THEN** the server rejects it with the same field errors and does not check credentials

### Requirement: Credential check
The system SHALL check a valid submission against the configured demo account on the server. The email comparison SHALL ignore letter case and surrounding whitespace; the password comparison SHALL be exact.

#### Scenario: Matching credentials
- **WHEN** a user submits the demo account's email and password
- **THEN** the sign-in succeeds

#### Scenario: Email case and whitespace ignored
- **WHEN** a user submits the demo email in different letter case or with leading or trailing spaces, along with the correct password
- **THEN** the sign-in succeeds

#### Scenario: Password case matters
- **WHEN** a user submits the demo email with the correct password in different letter case
- **THEN** the sign-in fails

### Requirement: Failed sign-in feedback
When credentials do not match, the system SHALL keep the user on the login page, show one generic error message that does not reveal which field was wrong, keep the entered email, and clear the password.

#### Scenario: Wrong password
- **WHEN** a user submits the demo email with an incorrect password
- **THEN** the page shows "Invalid email or password", the email field still contains the entered email, and the password field is empty

#### Scenario: Unknown email
- **WHEN** a user submits an email that is not the demo account
- **THEN** the page shows the same "Invalid email or password" message

#### Scenario: Error is announced
- **WHEN** a sign-in error is shown
- **THEN** it is exposed to assistive technology as a live announcement

### Requirement: Successful sign-in redirect
When credentials match, the system SHALL navigate the user to a welcome page at `/welcome`.

#### Scenario: Redirect after sign-in
- **WHEN** a user signs in successfully
- **THEN** the browser navigates to `/welcome`, which shows a welcome message

### Requirement: Pending state
While a submission is being processed, the system SHALL indicate that sign-in is in progress and SHALL prevent the form from being submitted again.

#### Scenario: Double submission prevented
- **WHEN** a user clicks Login and the check has not finished
- **THEN** the Login button is disabled and shows that sign-in is in progress
