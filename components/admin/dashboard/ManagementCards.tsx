import Link from "next/link";

interface ManagementCardsProps {
  activeOpportunities: number;
  totalApplications: number;
}

export default function ManagementCards({
  activeOpportunities,
  totalApplications,
}: ManagementCardsProps) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-3">
      {/* OPPORTUNITIES */}

      <Link
        href="/admin/opportunities"
        className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition hover:border-zinc-700 hover:bg-zinc-900/80"
      >
        <p className="text-sm text-zinc-500">
          Opportunity Management
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Jobs & Internships
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Create new opportunities, edit listings and close
          applications when required.
        </p>

        <div className="mt-7 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">
              Active listings
            </p>

            <p className="mt-1 text-2xl font-bold">
              {activeOpportunities}
            </p>
          </div>

          <span className="text-sm font-semibold transition group-hover:translate-x-1">
            Manage →
          </span>
        </div>
      </Link>

      {/* APPLICATIONS */}

      <Link
        href="/admin/applications"
        className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition hover:border-zinc-700 hover:bg-zinc-900/80"
      >
        <p className="text-sm text-zinc-500">
          Candidate Management
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Applications
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Review candidates, shortlist students, request resumes and
          update final decisions.
        </p>

        <div className="mt-7 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">
              Total applications
            </p>

            <p className="mt-1 text-2xl font-bold">
              {totalApplications}
            </p>
          </div>

          <span className="text-sm font-semibold transition group-hover:translate-x-1">
            Review →
          </span>
        </div>
      </Link>

      {/* CODING VERIFICATION */}

      <Link
        href="/admin/coding-verification"
        className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition hover:border-zinc-700 hover:bg-zinc-900/80"
      >
        <p className="text-sm text-zinc-500">
          Coding Profiles
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Verification
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Verify student Codeforces, LeetCode and CodeChef accounts
          before including them in rankings.
        </p>

        <div className="mt-7 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">
              Rankings
            </p>

            <p className="mt-1 text-sm font-semibold text-zinc-300">
              Verify & rebuild
            </p>
          </div>

          <span className="text-sm font-semibold transition group-hover:translate-x-1">
            Verify Profiles →
          </span>
        </div>
      </Link>
    </section>
  );
}