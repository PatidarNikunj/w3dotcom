# Tasks

The project has no test runner yet, so verification uses `pnpm lint`, `pnpm build` (which also type-checks) and manual checks in the browser against the scenarios in `specs/user-auth/spec.md`.

## 1. Credential check

- [x] 1.1 Create `src/lib/auth.ts` with `import 'server-only'`, the demo account (`demo@example.com` / `password123`) and `verifyCredentials(email, password)` that trims and lowercases the email and compares the password exactly; verify `pnpm build` resolves the `server-only` import (if it doesn't, add the `server-only` package with `pnpm add server-only` and rebuild)

## 2. Server Action

- [x] 2.1 Create `src/app/login/actions.ts` (`'use server'`) exporting the `LoginState` type and a `login(prevState, formData)` action that returns field errors for an empty email, an invalid email or an empty password without calling `verifyCredentials`; verify `pnpm lint` and `pnpm build` pass
- [x] 2.2 In the same action, call `verifyCredentials` for valid input, return `{ message: "Invalid email or password", email }` on mismatch and call `redirect('/welcome')` on success; verify `pnpm build` passes

## 3. Login page UI

- [x] 3.1 Create `src/app/login/login-form.tsx` (`'use client'`) using `useActionState(login, {})`: labeled `type="email"` and `type="password"` inputs with `name`, `required` and `autoComplete` attributes, email `defaultValue` from state, per-field error text linked with `aria-describedby`, an `aria-live="polite"` region for the form message, and a Login button disabled with "Logging in…" text while `pending`; verify `pnpm lint` passes
- [x] 3.2 Create `src/app/login/page.tsx` rendering a centered card with a "Log in" heading and the form, page `metadata` title "Log in", styled with Tailwind to match the starter page in light and dark mode; verify `/login` shows the labeled email field, masked password field and Login button
- [x] 3.3 Create `src/app/welcome/page.tsx` with a welcome heading and a link back to `/login`; verify `/welcome` renders

## 4. Integration checks

- [x] 4.1 Run `pnpm lint` and `pnpm build`; verify both pass and the build lists `/login` and `/welcome` as static routes
- [x] 4.2 With `pnpm dev`, walk through every scenario in `specs/user-auth/spec.md` in the browser: empty submit, invalid email, wrong password (generic message, email kept, password cleared), unknown email, demo login with mixed-case email and surrounding spaces redirects to `/welcome`, wrong-case password fails, Enter submits, button disables while pending
- [x] 4.3 Verify server-side validation by disabling JavaScript (or removing `required` in devtools) and submitting empty fields; the field errors still appear and no redirect happens

## Workflow follow-up

- Archive the change with `/opsx:archive` once the checks pass, which creates `openspec/specs/user-auth/spec.md`.
