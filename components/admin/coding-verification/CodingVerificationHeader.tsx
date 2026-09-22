import Link from "next/link";

interface CodingVerificationHeaderProps {
  rebuilding: boolean;
  onRebuild: () => void;
}

export default function CodingVerificationHeader({
  rebuilding,
  onRebuild,
}: CodingVerificationHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
          ADMIN
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Coding Verification
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Verify student coding accounts before including them in rankings.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={rebuilding}
          onClick={onRebuild}
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          {rebuilding
            ? "Rebuilding..."
            : "Rebuild Leaderboard"}
        </button>

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