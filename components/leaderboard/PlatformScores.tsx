import type {
  LeaderboardEntry,
} from "@/types/leaderboard";

import {
  formatScore,
} from "@/utils/leaderboardFormatters";

interface PlatformScoresProps {
  myRank:
    LeaderboardEntry | null;
}

export default function PlatformScores({
  myRank,
}: PlatformScoresProps) {
  if (!myRank) {
    return null;
  }

  return (
    <section className="mt-5 grid gap-4 sm:grid-cols-3">
      <ScoreCard
        label="Codeforces"
        score={
          myRank.codeforcesScore
        }
      />

      <ScoreCard
        label="LeetCode"
        score={
          myRank.leetcodeScore
        }
      />

      <ScoreCard
        label="CodeChef"
        score={
          myRank.codechefScore
        }
      />
    </section>
  );
}

function ScoreCard({
  label,
  score,
}: {
  label: string;
  score:
    | number
    | null;
}) {
  return (
    <div className="rounded-[18px] border border-[#D8D5CC] bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#858994]">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-[#14213D]">
        {formatScore(score)}
      </p>
    </div>
  );
}