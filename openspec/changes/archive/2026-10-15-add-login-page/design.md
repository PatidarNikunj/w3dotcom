# Design

## Context

The app is a fresh Next.js 16.4 App Router project (`src/app/`) with React 19.3, Tailwind CSS 4 and TypeScript. `next.config.ts` enables `cacheComponents`, so any route that reads request data (cookies, headers) must do so behind a `<Suspense>` boundary; this change avoids request reads entirely. There is no auth library, database or existing spec. See proposal.md for motivation and specs/user-auth/spec.md for required behavior.

## Goals / Non-Goals

**Goals:**
- Keep the credential check on the server so the demo password never ships to the browser.
- Isolate the credential check behind one function so a real auth provider can replace it without changing the form.
- Work without JavaScript for the basic submit path (progressive enhancement), with richer feedback when JavaScript is loaded.

**Non-Goals:**
- Creating a session, cookie or any persisted sign-in state.
- Guarding `/welcome`; it is a plain static page anyone can open.

## Decisions

**1. Server Action + `useActionState` for the form.**
The login form is a small Client Component that calls a Server Action through React's `useActionState`, which returns the action's result (field errors, form error, last email) and a `pending` flag.
*Alternatives:* a Route Handler (`app/api/login/route.ts`) with `fetch`, which adds a manual API layer and loses no-JS submission; a client-only check, which would expose the credentials.

**2. File layout.**
- `src/app/login/page.tsx`: Server Component; page heading and layout, renders the form.
- `src/app/login/login-form.tsx`: `'use client'`; inputs, labels, error display, pending button.
- `src/app/login/actions.ts`: `'use server'`; validates `FormData`, calls the credential check, returns state or calls `redirect('/welcome')`.
- `src/lib/auth.ts`: `import 'server-only'`; demo account constants and `verifyCredentials(email, password): boolean`. This is the swap point for real auth.
- `src/app/welcome/page.tsx`: static welcome message with a link back to `/login`.

Both new pages are static, so they prerender into the static shell under Cache Components with no Suspense boundaries needed.

**3. Hand-written validation, no new dependency.**
Required checks plus a simple email pattern (`something@something.something`) in the Server Action, mirrored by native `required` and `type="email"` attributes on the inputs for instant browser feedback. *Alternative:* Zod, which is the Next.js docs' choice but adds a dependency for two fields. Revisit when forms grow.

**4. Action state shape.**
`{ errors?: { email?: string; password?: string }; message?: string; email?: string }`. Field errors render under each input; `message` holds "Invalid email or password" in an `aria-live="polite"` region. The email input uses `defaultValue={state.email}` so it survives React's automatic form reset after the action, while the password input has no default and is therefore cleared, as the spec requires.

**5. Demo account.**
Hard-coded in `src/lib/auth.ts`: `demo@example.com` / `password123`. The email is normalized with `trim().toLowerCase()` before comparison; the password is compared exactly. Not read from env vars, since it is a demo value, not a secret, and env setup would add friction for no security benefit.

**6. Styling.**
Tailwind utility classes in the same visual style as the existing starter page (zinc palette, `dark:` variants, rounded controls), centered card layout, full-width on small screens.

## Risks / Trade-offs

- [Anyone can open `/welcome` directly] → Accepted for this mock; noted as a non-goal. Real auth will add a session and a guard.
- [Hard-coded demo credentials in the repo] → Server-only module, so never sent to the client; acceptable because they guard nothing. Must be removed when real auth lands.
- [No rate limiting or lockout] → Acceptable with no real accounts; required before real auth ships.
- [Simple email pattern accepts some technically invalid addresses] → Fine for a demo; the credential check rejects anything that isn't the demo email anyway.

## Open Questions

- Where should a successful sign-in land once there is real content (dashboard vs. home)? `/welcome` is a placeholder and can change without affecting this design.
