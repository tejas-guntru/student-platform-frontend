import Link from "next/link";

import type {
  ElementType,
} from "react";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Globe2,
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
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.14em]
          text-[#1256AF]
        "
      >
        My Ranking
      </p>

      <h2
        className="
          mt-1.5
          text-xl
          font-bold
          tracking-[-0.025em]
          text-slate-900
        "
      >
        Your Position
      </h2>

      <p
        className="
          mt-1.5
          max-w-xl
          text-sm
          leading-6
          text-slate-600
        "
      >
        Track how your verified coding performance
        ranks across Trailbliz.
      </p>

      {!myRank ? (
        <div
          className="
            mt-5
            flex
            flex-col
            gap-5
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm

            sm:flex-row
            sm:items-center
            sm:justify-between

            sm:p-6
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
                bg-slate-100
                text-slate-600
              "
            >
              <Trophy size={18} />
            </div>

            <div>
              <h3
                className="
                  text-base
                  font-bold
                  text-slate-900
                "
              >
                You are not ranked yet
              </h3>

              <p
                className="
                  mt-1.5
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-600
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
              rounded-lg
              bg-[#1256AF]
              px-4
              py-2.5
              text-sm
              font-bold
              text-white
              transition

              hover:bg-[#0E4C9D]
            "
          >
            Coding Profiles

            <ArrowRight
              size={14}
              className="
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      ) : (
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
          />

          <RankCard
            icon={Building2}
            label="College Rank"
            value={
              myRank.collegeRank
            }
            rank
          />

          <RankCard
            icon={CalendarDays}
            label="Year Rank"
            value={
              myRank.graduationYearRank
            }
            rank
          />

          <RankCard
            icon={Trophy}
            label="Overall Score"
            value={
              myRank.overallScore
            }
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
}: {
  icon: ElementType;
  label: string;
  value:
    | number
    | null;
  rank?: boolean;
}) {
  return (
    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
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
              tracking-[0.1em]
              text-slate-500
            "
          >
            {label}
          </p>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              tracking-[-0.04em]
              text-slate-900
            "
          >
            {rank
              ? formatRank(value)
              : formatScore(value)}
          </p>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-blue-50
            text-[#1256AF]
          "
        >
          <Icon size={16} />
        </div>
      </div>
    </article>
  );
}