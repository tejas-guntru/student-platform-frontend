import {
  ArrowUpRight,
  CalendarDays,
  Code2,
  FolderGit2,
  Layers3,
} from "lucide-react";

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
          flex-col
          gap-4
          border-b
          border-[#E5EFF7]
          bg-[#FBFDFF]
          px-5
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
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
            <FolderGit2 size={18} />
          </div>

          <SectionHeader
            title="Projects"
            subtitle={`${candidate.projects.length} ${
              candidate.projects.length === 1
                ? "project"
                : "projects"
            }`}
          />
        </div>

        {candidate.projects.length > 0 && (
          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#D7E8F4]
              bg-white
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#67839A]
            "
          >
            <Layers3
              size={13}
              className="text-[#0877E8]"
            />

            {candidate.projects.length} total
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div
        className="
          p-5

          sm:p-6
        "
      >
        {candidate.projects.length === 0 ? (
          <EmptyCard>
            Candidate has not added projects.
          </EmptyCard>
        ) : (
          <div className="space-y-5">
            {candidate.projects.map(
              (project) => (
                <article
                  key={project.projectId}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-[#DCEAF5]
                    bg-[#FBFDFF]
                    p-5
                    transition-all
                    duration-300

                    hover:border-[#B9DDF3]
                    hover:bg-white
                    hover:shadow-[0_16px_38px_rgba(8,119,232,0.07)]

                    sm:p-6
                  "
                >
                  {/* ACCENT */}

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[3px]
                      bg-gradient-to-b
                      from-[#0877E8]
                      to-[#38BDF8]
                      opacity-0
                      transition-opacity
                      duration-200

                      group-hover:opacity-100
                    "
                  />

                  {/* TITLE */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >
                    <div className="min-w-0">
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
                          <FolderGit2 size={17} />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.14em]
                              text-[#8BA0B1]
                            "
                          >
                            Candidate Project
                          </p>

                          <h3
                            className="
                              mt-1
                              text-xl
                              font-bold
                              tracking-[-0.025em]
                              text-[#274E70]
                            "
                          >
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {project.techStack && (
                        <div
                          className="
                            mt-4
                            inline-flex
                            rounded-full
                            border
                            border-[#D6E8F4]
                            bg-white
                            px-3
                            py-1.5
                            text-[10px]
                            font-semibold
                            text-[#66839A]
                          "
                        >
                          {project.techStack}
                        </div>
                      )}
                    </div>

                    {/* LINKS */}

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {project.githubUrl && (
                        <a
                          href={
                            project.githubUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-[#D4E6F2]
                            bg-white
                            px-3.5
                            py-2.5
                            text-sm
                            font-semibold
                            text-[#52718A]
                            transition-all
                            duration-200

                            hover:border-[#BCDDF2]
                            hover:bg-[#F3FAFF]
                            hover:text-[#0877E8]
                          "
                        >
                          <Code2 size={15} />

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
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-[#0877E8]
                            to-[#1294F2]
                            px-3.5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-[0_8px_20px_rgba(8,119,232,0.16)]
                            transition-all
                            duration-200

                            hover:-translate-y-0.5
                            hover:shadow-[0_12px_26px_rgba(8,119,232,0.22)]
                          "
                        >
                          Live Project

                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  {project.description && (
                    <div
                      className="
                        mt-5
                        rounded-[18px]
                        border
                        border-[#E1ECF5]
                        bg-white
                        px-4
                        py-4
                      "
                    >
                      <p
                        className="
                          whitespace-pre-line
                          text-sm
                          leading-7
                          text-[#607A90]
                        "
                      >
                        {project.description}
                      </p>
                    </div>
                  )}

                  {/* DATES */}

                  {(project.startDate ||
                    project.endDate) && (
                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        gap-2
                        border-t
                        border-[#E6EFF6]
                        pt-4
                        text-xs
                        font-medium
                        text-[#7C92A4]
                      "
                    >
                      <CalendarDays
                        size={14}
                        className="text-[#8CB8D4]"
                      />

                      <span>
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
                      </span>
                    </div>
                  )}
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}