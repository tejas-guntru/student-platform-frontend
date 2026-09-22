import Link from "next/link";

import type {
  ElementType,
} from "react";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Globe2,
  Sparkles,
  Trophy,
} from "lucide-react";

import type {
  LeaderboardEntry,
} from "@/types/leaderboard";

import {
  formatRank,
  formatScore,
} from "@/utils/leaderboardFormatters";

interface MyRankingSectionProps {
  myRank:
    LeaderboardEntry | null;
}

export default function MyRankingSection({
  myRank,
}: MyRankingSectionProps) {
  return (
    <section>
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-violet-600
          "
        >
          My Ranking
        </p>

        <Sparkles
          size={12}
          className="text-[#38A9EE]"
        />
      </div>

      <h2
        className="
          mt-2
          text-2xl
          font-bold
          tracking-[-0.035em]
          text-[#173B63]
        "
      >
        Your Position
      </h2>

      <p
        className="
          mt-2
          max-w-xl
          text-sm
          leading-6
          text-[#71899D]
        "
      >
        Track how your verified coding performance ranks
        across Trailbliz.
      </p>

      {/* NOT RANKED */}

      {!myRank ? (
        <div
          className="
            relative
            mt-5
            overflow-hidden
            rounded-[24px]
            border
            border-[#DCEAF5]
            bg-white
            p-5
            shadow-[0_12px_34px_rgba(8,119,232,0.045)]

            sm:p-6
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-52
              w-52
              rounded-full
              bg-violet-500/10
              blur-[80px]
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-center
              sm:justify-between
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
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-violet-50
                  text-violet-600
                "
              >
                <Trophy size={20} />
              </div>

              <div>
                <h3
                  className="
                    text-lg
                    font-bold
                    tracking-[-0.025em]
                    text-[#173B63]
                  "
                >
                  You are not ranked yet
                </h3>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-6
                    text-[#71899D]
                  "
                >
                  Connect your coding profiles and complete
                  verification before your score appears on
                  the leaderboard.
                </p>
              </div>
            </div>

            <Link
              href="/coding-profiles"
              className="
                group
                inline-flex
                w-fit
                shrink-0
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
                font-bold
                text-white
                shadow-[0_8px_20px_rgba(8,119,232,0.18)]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:shadow-[0_12px_26px_rgba(8,119,232,0.24)]
              "
            >
              Coding Profiles

              <ArrowRight
                size={14}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      ) : (
        /* RANK CARDS */

        <div
          className="
            mt-5
            grid
            gap-4

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <RankCard
            icon={Globe2}
            label="Global Rank"
            value={
              myRank.globalRank
            }
            rank
            accent="from-[#0877E8] to-[#38BDF8]"
            iconClass="bg-[#EAF6FF] text-[#0877E8]"
          />

          <RankCard
            icon={Building2}
            label="College Rank"
            value={
              myRank.collegeRank
            }
            rank
            accent="from-emerald-500 to-cyan-400"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <RankCard
            icon={CalendarDays}
            label="Year Rank"
            value={
              myRank.graduationYearRank
            }
            rank
            accent="from-cyan-500 to-[#38BDF8]"
            iconClass="bg-cyan-50 text-cyan-600"
          />

          <RankCard
            icon={Trophy}
            label="Overall Score"
            value={
              myRank.overallScore
            }
            accent="from-violet-500 to-[#0877E8]"
            iconClass="bg-violet-50 text-violet-600"
          />
        </div>
      )}
    </section>
  );
}

function RankCard({
  icon: Icon,
  label,
  value,
  rank = false,
  accent,
  iconClass,
}: {
  icon: ElementType;
  label: string;
  value:
    | number
    | null;
  rank?: boolean;
  accent: string;
  iconClass: string;
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.04)]
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-[#B8DCF3]
        hover:shadow-[0_16px_38px_rgba(8,119,232,0.08)]
      "
    >
      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          ${accent}
        `}
      />

      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#879CAD]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              tracking-[-0.045em]
              text-[#173B63]
            "
          >
            {rank
              ? formatRank(value)
              : formatScore(value)}
          </p>
        </div>

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconClass}
          `}
        >
          <Icon size={17} />
        </div>
      </div>
    </article>
  );
}