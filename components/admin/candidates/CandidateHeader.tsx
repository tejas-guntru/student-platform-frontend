import Link from "next/link";

import type {
  AdminCandidate,
} from "@/types/adminCandidate";

interface CandidateHeaderProps {
  candidate: AdminCandidate;
}

export default function CandidateHeader({
  candidate,
}: CandidateHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
          ADMIN • CANDIDATE
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {candidate.fullName}
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          {candidate.email}
        </p>

        {candidate.preferredRole && (
          <p className="mt-3 text-sm font-medium text-zinc-300">
            {candidate.preferredRole}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/applications"
          className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm hover:bg-zinc-900"
        >
          ← Applications
        </Link>

        <Link
          href="/admin"
          className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm hover:bg-zinc-900"
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
}