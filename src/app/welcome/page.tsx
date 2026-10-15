import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome",
};

export default function WelcomePage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-black/[.08] bg-white p-8 text-black dark:border-white/[.145] dark:bg-zinc-950 dark:text-zinc-50">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          You&apos;re signed in.
        </p>
        <Link
          href="/login"
          className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          Back to login
        </Link>
      </main>
    </div>
  );
}
