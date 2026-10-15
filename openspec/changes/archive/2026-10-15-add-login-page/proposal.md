# Proposal

## Why

The app has no way for a user to sign in; it only shows the create-next-app starter page. A simple login page is the first building block for any user-facing feature, and starting with a mock credential check lets us build and test the full form flow before choosing a real authentication provider.

## What Changes

- Add a `/login` page with an email field, a password field and a Login button.
- Validate input before checking credentials: both fields required, email must be a valid address.
- Check the submitted credentials on the server against a single hard-coded demo account (mock authentication).
- On failure, keep the user on the login page with a clear error message and keep the email they typed.
- On success, send the user to a simple `/welcome` page.
- Show a pending state on the Login button while the check runs, so it can't be double-submitted.

Out of scope for this change: sessions or cookies, logout, protecting `/welcome` from direct access, sign-up, password reset, rate limiting, and real user storage. These come with real authentication later.

## Capabilities

### New Capabilities
- `user-auth`: How users sign in to the app: the login form, input validation, credential checking, and what happens on success or failure.

### Modified Capabilities
<!-- None: no existing specs. -->

## Impact

- New routes: `src/app/login/` and `src/app/welcome/`.
- New server-only module holding the demo credentials and the credential check, so a real auth provider can replace it later without touching the form.
- No new dependencies; uses React 19 `useActionState` and a Next.js Server Action.
- Existing home page (`src/app/page.tsx`) is unchanged.
