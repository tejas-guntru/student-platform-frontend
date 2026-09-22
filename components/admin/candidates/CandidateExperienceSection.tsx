import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import {
  formatCandidateDate,
  formatCandidateText,
} from "@/utils/adminCandidateUtils";

import SectionHeader from "./shared/SectionHeader";
import EmptyCard from "./shared/EmptyCard";
import Tag from "./shared/Tag";

interface CandidateExperienceSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateExperienceSection({
  candidate,
}: CandidateExperienceSectionProps) {
  return (
    <section className="mt-10 pb-12">
      <SectionHeader
        title="Experience"
        subtitle={`${candidate.experiences.length} entries`}
      />

      {candidate.experiences.length ===
      0 ? (
        <EmptyCard>
          Candidate has not added experience.
        </EmptyCard>
      ) : (
        <div className="mt-4 space-y-5">
          {candidate.experiences.map(
            (experience) => (
              <article
                key={
                  experience.experienceId
                }
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {
                        experience.roleTitle
                      }
                    </h3>

                    <p className="mt-1 font-medium text-zinc-300">
                      {
                        experience.companyName
                      }
                    </p>
                  </div>

                  {experience.currentlyWorking && (
                    <span className="w-fit rounded-full border border-emerald-900 bg-emerald-950/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                      Current
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Tag>
                    {formatCandidateText(
                      experience.employmentType
                    )}
                  </Tag>

                  {experience.location && (
                    <Tag>
                      {
                        experience.location
                      }
                    </Tag>
                  )}
                </div>

                <p className="mt-4 text-sm text-zinc-500">
                  {formatCandidateDate(
                    experience.startDate
                  )}

                  {" → "}

                  {experience.currentlyWorking
                    ? "Present"
                    : experience.endDate
                      ? formatCandidateDate(
                          experience.endDate
                        )
                      : "-"}
                </p>

                {experience.description && (
                  <p className="mt-5 whitespace-pre-line text-sm leading-7 text-zinc-400">
                    {
                      experience.description
                    }
                  </p>
                )}
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
}