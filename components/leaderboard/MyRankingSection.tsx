import Link from "next/link";

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
    <section className="mt-8">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A227]" />

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
          My Ranking
        </p>
      </div>

      {!myRank ? (
        <div className="mt-5 rounded-[20px] border border-[#E8DCA9] bg-[#FBF7E8] p-6">
          <h2 className="font-bold text-[#14213D]">
            You are not ranked yet
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B707B]">
            Connect your coding profiles
            and get them verified before
            your score appears.
          </p>

          <Link
            href="/coding-profiles"
            className="mt-4 inline-flex rounded-xl bg-[#C9A227] px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:bg-[#E0C766]"
          >
            Coding Profiles →
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RankCard
            label="Global Rank"
            value={
              myRank.globalRank
            }
            rank
          />

          <RankCard
            label="College Rank"
            value={
              myRank.collegeRank
            }
            rank
          />

          <RankCard
            label="Year Rank"
            value={
              myRank.graduationYearRank
            }
            rank
          />

          <RankCard
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
  label,
  value,
  rank = false,
}: {
  label: string;
  value:
    | number
    | null;
  rank?: boolean;
}) {
  return (
    <div className="rounded-[18px] border border-[#D8D5CC] bg-white p-5 shadow-[0_10px_30px_rgba(20,33,61,0.04)]">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#858994]">
        {label}
      </p>

      <p className="mt-3 text-2xl font-bold text-[#14213D]">
        {rank
          ? formatRank(value)
          : formatScore(value)}
      </p>
    </div>
  );
}