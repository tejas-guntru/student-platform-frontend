"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
          Student Career Platform
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          Build your coding profile.
          <span className="block text-zinc-400">
            Discover opportunities.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Track your coding performance, compete on leaderboards,
          discover internships and jobs, and manage your applications
          from one platform.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:bg-zinc-900"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}