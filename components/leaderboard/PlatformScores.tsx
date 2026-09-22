import type {
  ElementType,
} from "react";

import {
  Code2,
  Sparkles,
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
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
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
                text-[#0877E8]
              "
            >
              Platform Performance
            </p>

            <Sparkles
              size={12}
              className="text-violet-500"
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
            Coding Scores
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
            See how each connected coding platform
            contributes to your overall Trailbliz score.
          </p>
        </div>

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-[#D6E7F3]
            bg-white
            px-3
            py-1.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-[#68849A]
          "
        >
          <Trophy
            size={12}
            className="text-violet-600"
          />

          Verified scores
        </div>
      </div>

      {/* SCORE CARDS */}

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
          accent="from-[#0877E8] to-[#38BDF8]"
          iconClass="bg-[#EAF6FF] text-[#0877E8]"
        />

        <ScoreCard
          icon={Code2}
          label="LeetCode"
          score={
            myRank.leetcodeScore
          }
          accent="from-violet-500 to-[#0877E8]"
          iconClass="bg-violet-50 text-violet-600"
        />

        <ScoreCard
          icon={Trophy}
          label="CodeChef"
          score={
            myRank.codechefScore
          }
          accent="from-emerald-500 to-cyan-400"
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>
    </section>
  );
}

function ScoreCard({
  icon: Icon,
  label,
  score,
  accent,
  iconClass,
}: {
  icon: ElementType;
  label: string;
  score:
    | number
    | null;
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
      {/* ACCENT */}

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
          gap-4
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
              text-2xl
              font-bold
              tracking-[-0.04em]
              text-[#173B63]
            "
          >
            {formatScore(score)}
          </p>

          <p
            className="
              mt-1
              text-xs
              font-medium
              text-[#8AA0B2]
            "
          >
            Platform score
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