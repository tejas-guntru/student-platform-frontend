import Link from "next/link";

import {
  ArrowLeft,
  Trophy,
} from "lucide-react";

import type {
  LeaderboardEntry,
} from "@/types/leaderboard";

import {
  formatRank,
} from "@/utils/leaderboardFormatters";

interface LeaderboardHeaderProps {
  myRank:
    LeaderboardEntry | null;
}

export default function LeaderboardHeader({
  myRank,
}: LeaderboardHeaderProps) {
  return (
    <header
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        sm:p-6
      "
    >
      <Link
        href="/student"
        className="
          inline-flex
          items-center
          gap-2
          text-xs
          font-semibold
          text-slate-500
          transition

          hover:text-[#1256AF]
        "
      >
        <ArrowLeft size={14} />

        Back to home
      </Link>

      <div
        className="
          mt-5
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
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-[#1256AF]
            "
          >
            <Trophy size={19} />
          </div>

          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#1256AF]
              "
            >
              Career · Rankings
            </p>

            <h1
              className="
                mt-1.5
                text-2xl
                font-bold
                tracking-[-0.035em]
                text-slate-900

                sm:text-3xl
              "
            >
              Leaderboard
            </h1>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-600
              "
            >
              Compare verified coding performance across
              Trailbliz, your college and your graduation
              batch.
            </p>
          </div>
        </div>

        <div
          className="
            w-fit
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
          "
        >
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-slate-500
            "
          >
            Global rank
          </p>

          <p
            className="
              mt-1
              text-lg
              font-bold
              text-slate-900
            "
          >
            {myRank
              ? formatRank(
                  myRank.globalRank
                )
              : "Not ranked"}
          </p>
        </div>
      </div>
    </header>
  );
}