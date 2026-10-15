import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-sm rounded-2xl border border-black/[.08] bg-white p-8 text-black dark:border-white/[.145] dark:bg-zinc-950 dark:text-zinc-50">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Log in</h1>
        <LoginForm />
      </main>
    </div>
  );
}
