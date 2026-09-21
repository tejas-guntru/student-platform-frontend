import Link from "next/link";

import type {
  MembershipResponse,
} from "@/types/membership";

import MembershipBadge from "@/components/opportunities/MembershipBadge";

interface OpportunitiesHeaderProps {
  membership:
    MembershipResponse | null;
}

export default function OpportunitiesHeader({
  membership,
}: OpportunitiesHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-[#DDD9CE] pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A227]" />

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            Opportunities
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#14213D]">
          Jobs & Internships
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B707B]">
          Discover opportunities and
          check your eligibility before
          applying.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <MembershipBadge
          membership={
            membership
          }
        />

        <Link
          href="/applications"
          className="rounded-xl border border-[#D8D5CC] bg-white px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:border-[#C9A227] hover:text-[#A98616]"
        >
          My Applications
        </Link>

        <Link
          href="/dashboard"
          className="rounded-xl border border-[#D8D5CC] bg-white px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:border-[#C9A227] hover:text-[#A98616]"
        >
          ← Dashboard
        </Link>
      </div>
    </header>
  );
}