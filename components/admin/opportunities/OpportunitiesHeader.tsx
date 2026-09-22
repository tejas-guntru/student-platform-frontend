import Link from "next/link";

interface OpportunitiesHeaderProps {
  onCreate: () => void;
}

export default function OpportunitiesHeader({
  onCreate,
}: OpportunitiesHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
          ADMIN
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Opportunities
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Create, edit and close jobs and internships.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onCreate}
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          + Create Opportunity
        </button>

        <Link
          href="/admin/dashboard"
          className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
        >
          ← Dashboard
        </Link>
      </div>
    </header>
  );
}