import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import {
  formatCandidateDate,
} from "@/utils/adminCandidateUtils";

import SectionHeader from "./shared/SectionHeader";
import EmptyCard from "./shared/EmptyCard";

interface CandidateProjectsSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateProjectsSection({
  candidate,
}: CandidateProjectsSectionProps) {
  return (
    <section className="mt-10">
      <SectionHeader
        title="Projects"
        subtitle={`${candidate.projects.length} projects`}
      />

      {candidate.projects.length === 0 ? (
        <EmptyCard>
          Candidate has not added projects.
        </EmptyCard>
      ) : (
        <div className="mt-4 space-y-5">
          {candidate.projects.map(
            (project) => (
              <article
                key={project.projectId}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                {project.techStack && (
                  <p className="mt-2 text-sm font-medium text-zinc-400">
                    {project.techStack}
                  </p>
                )}

                {project.description && (
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-400">
                    {project.description}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  {project.githubUrl && (
                    <a
                      href={
                        project.githubUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-zinc-200 underline"
                    >
                      GitHub
                    </a>
                  )}

                  {project.projectUrl && (
                    <a
                      href={
                        project.projectUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-zinc-200 underline"
                    >
                      Live Project
                    </a>
                  )}
                </div>

                {(project.startDate ||
                  project.endDate) && (
                  <p className="mt-5 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
                    {project.startDate
                      ? formatCandidateDate(
                          project.startDate
                        )
                      : "-"}

                    {" → "}

                    {project.endDate
                      ? formatCandidateDate(
                          project.endDate
                        )
                      : "Present"}
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