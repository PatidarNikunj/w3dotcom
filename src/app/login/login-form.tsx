"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

const inputClass =
  "h-11 rounded-lg border border-black/[.12] bg-white px-3 text-base text-black outline-none transition-colors focus:border-black dark:border-white/[.18] dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-white aria-[invalid=true]:border-red-600 dark:aria-[invalid=true]:border-red-400";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={inputClass}
        />
        {state.errors?.email && (
          <p id="email-error" className="text-sm text-red-600 dark:text-red-400">
            {state.errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.errors?.password ? true : undefined}
          aria-describedby={
            state.errors?.password ? "password-error" : undefined
          }
          className={inputClass}
        />
        {state.errors?.password && (
          <p
            id="password-error"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {state.errors.password}
          </p>
        )}
      </div>

      <p
        aria-live="polite"
        className="min-h-5 text-sm text-red-600 dark:text-red-400"
      >
        {state.message}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "Logging in…" : "Login"}
      </button>
    </form>
  );
}
