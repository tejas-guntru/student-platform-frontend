import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";

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
    <header
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5

        sm:p-6

        lg:p-7
      "
    >
      <div
        className="
          flex
          flex-col
          gap-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#1256AF]/[0.07]
              text-[#1256AF]
            "
          >
            <BriefcaseBusiness
              size={19}
            />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#1256AF]
              "
            >
              Career Opportunities
            </p>

            <h1
              className="
                mt-2
                text-3xl
                font-bold
                tracking-[-0.04em]
                text-slate-950

                sm:text-4xl
              "
            >
              Jobs & Internships
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              Discover active opportunities, check your
              eligibility and apply directly through your
              Trailbliz profile.
            </p>
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:items-center
          "
        >
          <MembershipBadge
            membership={membership}
          />

          <Link
            href="/applications"
            className="
              group
              inline-flex
              min-h-[42px]
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              transition

              hover:border-slate-300
              hover:bg-slate-50
              hover:text-slate-950
            "
          >
            <FileText size={15} />

            My Applications

            <ArrowRight
              size={14}
              className="
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>
    </header>
  );
}