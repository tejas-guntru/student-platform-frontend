import {
  ArrowUpRight,
  BadgeCheck,
  Code2,
  ShieldAlert,
} from "lucide-react";

import type {
  AdminCandidateCodingProfile,
} from "@/types/adminCandidate";

import {
  formatCandidateText,
} from "@/utils/adminCandidateUtils";

import MiniStat from "./shared/MiniStat";

interface CandidateCodingProfileCardProps {
  profile:
    AdminCandidateCodingProfile;
}

export default function CandidateCodingProfileCard({
  profile,
}: CandidateCodingProfileCardProps) {
  const verified =
    profile.verificationStatus ===
    "VERIFIED";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#DCEAF5]
        bg-[#FBFDFF]
        p-5
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#B9DDF3]
        hover:bg-white
        hover:shadow-[0_16px_38px_rgba(8,119,232,0.08)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r

          ${
            verified
              ? "from-emerald-500 via-teal-400 to-cyan-400"
              : "from-[#0877E8] via-[#1294F2] to-[#38BDF8]"
          }
        `}
      />

      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Code2 size={18} />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[#8398AA]
              "
            >
              {formatCandidateText(
                profile.platform
              )}
            </p>

            <h3
              className="
                mt-1
                truncate
                text-lg
                font-bold
                tracking-[-0.025em]
                text-[#274E70]
              "
            >
              {profile.username}
            </h3>
          </div>
        </div>

        {verified ? (
          <span
            className="
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              border
              border-emerald-200
              bg-emerald-50
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-emerald-700
            "
          >
            <BadgeCheck size={12} />

            Verified
          </span>
        ) : (
          <span
            className="
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              border
              border-amber-200
              bg-amber-50
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-amber-700
            "
          >
            <ShieldAlert size={12} />

            Unverified
          </span>
        )}
      </div>

      {/* STATS */}

      <div
        className="
          mt-5
          grid
          grid-cols-2
          gap-3
        "
      >
        <MiniStat
          label="Rating"
          value={profile.currentRating}
        />

        <MiniStat
          label="Max Rating"
          value={profile.maxRating}
        />

        <MiniStat
          label="Problems"
          value={profile.problemsSolved}
        />

        <MiniStat
          label="Contests"
          value={profile.contestCount}
        />
      </div>

      {/* PROFILE LINK */}

      {profile.profileUrl && (
        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="
            group/link
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-[#D4E6F2]
            bg-white
            px-3.5
            py-2.5
            text-sm
            font-semibold
            text-[#0877E8]
            transition-all
            duration-200

            hover:border-[#B4D9F0]
            hover:bg-[#EFF8FF]
          "
        >
          Open Profile

          <ArrowUpRight
            size={14}
            className="
              transition-transform
              duration-200
              group-hover/link:-translate-y-0.5
              group-hover/link:translate-x-0.5
            "
          />
        </a>
      )}

      {/* VERIFIED FOOTER */}

      {verified && (
        <div
          className="
            mt-5
            border-t
            border-emerald-100
            pt-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              text-emerald-700
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-500
              "
            />

            Included in verified ranking data
          </div>
        </div>
      )}
    </article>
  );
}