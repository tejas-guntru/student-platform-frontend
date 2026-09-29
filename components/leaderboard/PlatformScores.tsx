import type {
  ElementType,
} from "react";

import {
  Code2,
  Trophy,
  Zap,
} from "lucide-react";

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
        Platform Performance
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
        Coding Scores
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
        See how each connected coding platform contributes
        to your overall Trailbliz score.
      </p>

      <div
        className="
          mt-5
          grid
          gap-4

          sm:grid-cols-3
        "
      >
        <ScoreCard
          icon={Zap}
          label="Codeforces"
          score={
            myRank.codeforcesScore
          }
        />

        <ScoreCard
          icon={Code2}
          label="LeetCode"
          score={
            myRank.leetcodeScore
          }
        />

        <ScoreCard
          icon={Trophy}
          label="CodeChef"
          score={
            myRank.codechefScore
          }
        />
      </div>
    </section>
  );
}

function ScoreCard({
  icon: Icon,
  label,
  score,
}: {
  icon: ElementType;
  label: string;
  score:
    | number
    | null;
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
          gap-4
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
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-slate-900
            "
          >
            {formatScore(score)}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Platform score
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