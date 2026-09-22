import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import {
  formatCandidateText,
} from "@/utils/adminCandidateUtils";

import SectionHeader from "./shared/SectionHeader";
import EmptyCard from "./shared/EmptyCard";

interface CandidateSkillsSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateSkillsSection({
  candidate,
}: CandidateSkillsSectionProps) {
  return (
    <section className="mt-10">
      <SectionHeader
        title="Skills"
        subtitle={`${candidate.skills.length} skills added`}
      />

      {candidate.skills.length === 0 ? (
        <EmptyCard>
          Candidate has not added skills.
        </EmptyCard>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {candidate.skills.map(
            (skill) => (
              <div
                key={skill.skillId}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
              >
                <p className="font-semibold">
                  {skill.skillName}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {formatCandidateText(
                    skill.proficiency
                  )}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}