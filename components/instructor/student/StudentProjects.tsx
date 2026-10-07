import {
  ExternalLink,
  FolderKanban,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentProjectsProps {
  projects:
    InstructorStudentOverviewResponse["projects"];
}

export default function StudentProjects({
  projects,
}: StudentProjectsProps) {
  return (
    <section
      id="projects"
      className="
        min-w-0
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-6
      "
    >
      <SectionHeading
        count={projects.length}
      />

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="
            mt-5
            min-w-0
            space-y-4
          "
        >
          {projects.map((project) => (
            <article
              key={project.projectId}
              className="
                min-w-0
                rounded-xl
                border
                border-slate-200
                p-4

                sm:p-5
              "
            >
              {/* PROJECT HEADER */}

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                  sm:gap-4
                "
              >
                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <h3
                    className="
                      break-words
                      text-base
                      font-bold
                      leading-6
                      text-slate-950

                      [overflow-wrap:anywhere]
                    "
                  >
                    {project.title}
                  </h3>

                  {project.techStack && (
                    <p
                      className="
                        mt-1.5
                        break-words
                        text-sm
                        font-semibold
                        leading-6
                        text-[#1256AF]

                        [overflow-wrap:anywhere]
                      "
                    >
                      {project.techStack}
                    </p>
                  )}
                </div>

                {(project.startDate ||
                  project.endDate) && (
                  <p
                    className="
                      shrink-0
                      text-xs
                      leading-5
                      text-slate-400

                      sm:text-right
                    "
                  >
                    {formatDate(
                      project.startDate
                    )}{" "}
                    <span aria-hidden="true">
                      →
                    </span>{" "}
                    {project.endDate
                      ? formatDate(
                          project.endDate
                        )
                      : "Present"}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}

              {project.description && (
                <p
                  className="
                    mt-4
                    max-w-full
                    whitespace-pre-wrap
                    break-words
                    text-sm
                    leading-6
                    text-slate-600

                    [overflow-wrap:anywhere]
                  "
                >
                  {project.description}
                </p>
              )}

              {/* LINKS */}

              {(project.githubUrl ||
                project.projectUrl) && (
                <div
                  className="
                    mt-4
                    flex
                    min-w-0
                    flex-col
                    gap-2

                    sm:flex-row
                    sm:flex-wrap
                  "
                >
                  {project.githubUrl && (
                    <a
                      href={
                        project.githubUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        min-h-10
                        max-w-full
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        border
                        border-slate-200
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-slate-700
                        transition

                        hover:bg-slate-50

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#1256AF]/25
                        focus-visible:ring-offset-2

                        sm:w-fit
                      "
                    >
                      <ExternalLink
                        size={14}
                        className="shrink-0"
                        aria-hidden="true"
                      />

                      <span>GitHub</span>

                      <span className="sr-only">
                        {" "}
                        for {project.title}
                        {" "}
                        (opens in a new tab)
                      </span>
                    </a>
                  )}

                  {project.projectUrl && (
                    <a
                      href={
                        project.projectUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        min-h-10
                        max-w-full
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        border
                        border-blue-200
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-[#1256AF]
                        transition

                        hover:bg-blue-50

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#1256AF]/25
                        focus-visible:ring-offset-2

                        sm:w-fit
                      "
                    >
                      <ExternalLink
                        size={14}
                        className="shrink-0"
                        aria-hidden="true"
                      />

                      <span>View Project</span>

                      <span className="sr-only">
                        {" "}
                        {project.title}
                        {" "}
                        (opens in a new tab)
                      </span>
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function SectionHeading({
  count,
}: {
  count: number;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-start
        justify-between
        gap-3

        sm:gap-4
      "
    >
      <div
        className="
          flex
          min-w-0
          flex-1
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
            rounded-xl
            bg-blue-50
            text-[#1256AF]
          "
        >
          <FolderKanban
            size={18}
            aria-hidden="true"
          />
        </div>

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <h2
            className="
              break-words
              text-lg
              font-bold
              text-slate-950
            "
          >
            Projects
          </h2>

          <p
            className="
              mt-1
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-slate-500
            "
          >
            Work built and documented by the
            student.
          </p>
        </div>
      </div>

      <span
        className="
          inline-flex
          min-w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-blue-50
          px-2.5
          py-1
          text-xs
          font-bold
          text-[#1256AF]
        "
        aria-label={`${count} projects`}
      >
        {count}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="
        mt-5
        min-w-0
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        px-4
        py-6
        text-center

        sm:px-6
      "
    >
      <p
        className="
          break-words
          text-sm
          font-medium
          leading-6
          text-slate-500
        "
      >
        No projects added by this student.
      </p>
    </div>
  );
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString();
}