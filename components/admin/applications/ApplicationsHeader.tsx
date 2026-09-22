import Link from "next/link";

export default function ApplicationsHeader() {
  return (
    <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
          ADMIN
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Applications
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Review candidates and manage the complete hiring pipeline.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/admin/opportunities"
          className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
        >
          Opportunities
        </Link>

        <Link
          href="/admin"
          className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
        >
          ← Dashboard
        </Link>
      </div>
    </header>
  );
}