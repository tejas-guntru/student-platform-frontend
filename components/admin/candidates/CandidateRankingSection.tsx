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
    <section className="mt-10">
      <SectionHeader
        title="Coding Ranking"
        subtitle="Leaderboard performance from verified profiles"
      />

      {!candidate.ranking ? (
        <EmptyCard>
          Candidate is not currently ranked.
        </EmptyCard>
      ) : (
        <>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
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
        </>
      )}
    </section>
  );
}