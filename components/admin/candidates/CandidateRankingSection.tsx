import {
  BarChart3,
  Trophy,
} from "lucide-react";

import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import {
  formatCandidateRank,
  formatCandidateScore,
} from "@/utils/adminCandidateUtils";

import SectionHeader from "./shared/SectionHeader";
import EmptyCard from "./shared/EmptyCard";
import RankCard from "./shared/RankCard";
import InfoCard from "./shared/InfoCard";

interface CandidateRankingSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateRankingSection({
  candidate,
}: CandidateRankingSectionProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_34px_rgba(8,119,232,0.045)]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-start
          gap-3
          border-b
          border-[#E5EFF7]
          bg-[#FBFDFF]
          px-5
          py-5

          sm:px-6
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
          <Trophy size={18} />
        </div>

        <SectionHeader
          title="Coding Ranking"
          subtitle="Leaderboard performance from verified profiles"
        />
      </div>

      {/* CONTENT */}

      <div
        className="
          p-5

          sm:p-6
        "
      >
        {!candidate.ranking ? (
          <EmptyCard>
            Candidate is not currently ranked.
          </EmptyCard>
        ) : (
          <>
            {/* PRIMARY RANKING */}

            <div
              className="
                grid
                gap-4

                sm:grid-cols-2

                lg:grid-cols-4
              "
            >
              <RankCard
                label="Global Rank"
                value={formatCandidateRank(
                  candidate.ranking.globalRank
                )}
              />

              <RankCard
                label="College Rank"
                value={formatCandidateRank(
                  candidate.ranking.collegeRank
                )}
              />

              <RankCard
                label="Batch Rank"
                value={formatCandidateRank(
                  candidate.ranking
                    .graduationYearRank
                )}
              />

              <RankCard
                label="Overall Score"
                value={formatCandidateScore(
                  candidate.ranking
                    .overallScore
                )}
              />
            </div>

            {/* PLATFORM BREAKDOWN */}

            <div
              className="
                mt-6
                rounded-[22px]
                border
                border-[#DFEBF4]
                bg-[#F8FCFF]
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-[#0877E8]
                    shadow-[0_5px_16px_rgba(8,119,232,0.07)]
                  "
                >
                  <BarChart3 size={16} />
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      font-bold
                      text-[#274E70]
                    "
                  >
                    Platform Scores
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-[#8297A8]
                    "
                  >
                    Score contribution from verified coding platforms
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-4
                  grid
                  gap-4

                  sm:grid-cols-3
                "
              >
                <InfoCard
                  label="Codeforces Score"
                  value={formatCandidateScore(
                    candidate.ranking
                      .codeforcesScore
                  )}
                />

                <InfoCard
                  label="LeetCode Score"
                  value={formatCandidateScore(
                    candidate.ranking
                      .leetcodeScore
                  )}
                />

                <InfoCard
                  label="CodeChef Score"
                  value={formatCandidateScore(
                    candidate.ranking
                      .codechefScore
                  )}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}