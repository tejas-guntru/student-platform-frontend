import Link from "next/link";

import {
  ArrowLeft,
  BriefcaseBusiness,
  LayoutDashboard,
  Mail,
  UserRound,
} from "lucide-react";

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
    <header
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_12px_38px_rgba(8,119,232,0.055)]

        sm:p-7
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-[#38BDF8]/8
          blur-[70px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-6

          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >
        {/* ===================================================
            CANDIDATE IDENTITY
        =================================================== */}

        <div
          className="
            flex
            min-w-0
            items-start
            gap-4

            sm:gap-5
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-[20px]
              bg-gradient-to-br
              from-[#E3F4FF]
              to-[#C8E9FF]
              text-[#0877E8]
              shadow-[0_8px_20px_rgba(8,119,232,0.09)]

              sm:h-16
              sm:w-16
            "
          >
            <UserRound
              size={25}
              strokeWidth={2}
            />
          </div>

          <div className="min-w-0">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2.5
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-[#CBE5F8]
                  bg-[#EFF8FF]
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#0877E8]
                "
              >
                Candidate
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-[#E0EAF2]
                  bg-[#F8FBFD]
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-[#8196A8]
                "
              >
                Admin View
              </span>
            </div>

            <h2
              className="
                mt-3
                break-words
                text-2xl
                font-bold
                tracking-[-0.04em]
                text-[#173B63]

                sm:text-3xl
              "
            >
              {candidate.fullName ||
                "Candidate"}
            </h2>

            <div
              className="
                mt-2
                flex
                items-center
                gap-2
                text-sm
                text-[#71899D]
              "
            >
              <Mail
                size={14}
                className="
                  shrink-0
                  text-[#8AB9D7]
                "
              />

              <span className="break-all">
                {candidate.email || "-"}
              </span>
            </div>

            {candidate.preferredRole && (
              <div
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#DCEAF5]
                  bg-[#F8FCFF]
                  px-3.5
                  py-2
                  text-sm
                  font-semibold
                  text-[#52718A]
                "
              >
                <BriefcaseBusiness
                  size={15}
                  className="text-[#0877E8]"
                />

                {candidate.preferredRole}
              </div>
            )}
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <div
          className="
            flex
            flex-wrap
            gap-3

            lg:justify-end
          "
        >
          <Link
            href="/admin/applications"
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D5E7F3]
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-[#5A758C]
              transition-all
              duration-200

              hover:border-[#B8DDF4]
              hover:bg-[#F5FBFF]
              hover:text-[#0877E8]
            "
          >
            <ArrowLeft
              size={15}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-0.5
              "
            />

            Applications
          </Link>

          <Link
            href="/admin/dashboard"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#0877E8]
              to-[#1294F2]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_24px_rgba(8,119,232,0.18)]
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:shadow-[0_14px_30px_rgba(8,119,232,0.24)]
            "
          >
            <LayoutDashboard size={15} />

            Dashboard
          </Link>
        </div>
      </div>

      {/* =====================================================
          BOTTOM STATUS STRIP
      ===================================================== */}

      <div
        className="
          relative
          mt-6
          flex
          flex-col
          gap-2
          border-t
          border-[#E6EFF6]
          pt-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
              shadow-[0_0_0_4px_rgba(16,185,129,0.10)]
            "
          />

          <span
            className="
              text-xs
              font-semibold
              text-[#5F7A91]
            "
          >
            Candidate profile loaded
          </span>
        </div>

        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.13em]
            text-[#95A7B5]
          "
        >
          Trailbliz Candidate Review
        </span>
      </div>
    </header>
  );
}