import Link from "next/link";

export default function ApplicationsHeader() {
  return (
    <header className="flex flex-col gap-5 border-b border-[#DDD9CE] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A227]" />

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            Applications
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#14213D]">
          My Applications
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B707B]">
          Track your applications,
          shortlist updates and resume
          requests.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/opportunities"
          className="rounded-xl border border-[#D8D5CC] bg-white px-4 py-2.5 text-sm font-bold text-[#14213D] transition-all hover:border-[#C9A227] hover:text-[#A98616]"
        >
          Opportunities
        </Link>

        <Link
          href="/dashboard"
          className="rounded-xl border border-[#D8D5CC] bg-white px-4 py-2.5 text-sm font-bold text-[#14213D] transition-all hover:border-[#C9A227] hover:text-[#A98616]"
        >
          ← Dashboard
        </Link>
      </div>
    </header>
  );
}