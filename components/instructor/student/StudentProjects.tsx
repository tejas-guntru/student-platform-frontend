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
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        sm:p-6
      "
    >
      <SectionHeading
        count={projects.length}
      />

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-5 space-y-4">
          {projects.map((project) => (
            <article
              key={project.projectId}
              className="
                rounded-xl
                border
                border-slate-200
                p-4
                sm:p-5
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                "
              >
                <div className="min-w-0">
                  <h3
                    className="
                      text-base
                      font-bold
                      text-slate-950
                    "
                  >
                    {project.title}
                  </h3>

                  {project.techStack && (
                    <p
                      className="
                        mt-1.5
                        text-sm
                        font-semibold
                        text-[#1256AF]
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
                      text-slate-400
                    "
                  >
                    {formatDate(
                      project.startDate
                    )}{" "}
                    →{" "}
                    {project.endDate
                      ? formatDate(
                          project.endDate
                        )
                      : "Present"}
                  </p>
                )}
              </div>

              {project.description && (
                <p
                  className="
                    mt-4
                    whitespace-pre-wrap
                    text-sm
                    leading-6
                    text-slate-600
                  "
                >
                  {project.description}
                </p>
              )}

              {(project.githubUrl ||
                project.projectUrl) && (
                <div
                  className="
                    mt-4
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
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-slate-200
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-slate-700
                        hover:bg-slate-50
                      "
                    >
                      <ExternalLink  size={14} />
                      GitHub
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
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-blue-200
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-[#1256AF]
                        hover:bg-blue-50
                      "
                    >
                      <ExternalLink
                        size={14}
                      />
                      View Project
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
        items-start
        justify-between
        gap-4
      "
    >
      <div className="flex items-start gap-3">
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
          <FolderKanban size={18} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Projects
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Work built and documented by the
            student.
          </p>
        </div>
      </div>

      <span
        className="
          rounded-full
          bg-blue-50
          px-2.5
          py-1
          text-xs
          font-bold
          text-[#1256AF]
        "
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
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-6
        text-center
        text-sm
        text-slate-500
      "
    >
      No projects added by this student.
    </div>
  );
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "—";
  }

  return new Date(
    value
  ).toLocaleDateString();
}