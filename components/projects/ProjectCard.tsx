"use client";

import type {
  StudentProject,
} from "@/types/studentProject";

interface ProjectCardProps {
  project: StudentProject;

  deleting: boolean;

  onEdit:
    (project: StudentProject) => void;

  onDelete:
    (project: StudentProject) => void;
}

export default function ProjectCard({
  project,
  deleting,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <article className="rounded-[20px] border border-[#D8D5CC] bg-white p-6 shadow-[0_12px_35px_rgba(20,33,61,0.04)] transition-all duration-200 hover:border-[#C9A227] hover:shadow-[0_18px_45px_rgba(20,33,61,0.07)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
        <div className="min-w-0 flex-1">
          {/* TITLE */}
          <h3 className="text-xl font-bold tracking-[-0.02em] text-[#14213D]">
            {project.title}
          </h3>

          {/* TECH STACK */}
          {project.techStack && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack
                .split(",")
                .map((tech) => {
                  const value =
                    tech.trim();

                  if (!value) {
                    return null;
                  }

                  return (
                    <span
                      key={value}
                      className="rounded-full bg-[#F8F0CF] px-3 py-1 text-xs font-semibold text-[#806E30]"
                    >
                      {value}
                    </span>
                  );
                })}
            </div>
          )}

          {/* DESCRIPTION */}
          {project.description && (
            <p className="mt-4 whitespace-pre-line text-sm leading-6 text-[#6B707B]">
              {project.description}
            </p>
          )}

          {/* LINKS */}
          {(project.githubUrl ||
            project.projectUrl) && (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={
                    project.githubUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-[#14213D] transition-colors hover:text-[#C9A227]"
                >
                  GitHub ↗
                </a>
              )}

              {project.projectUrl && (
                <a
                  href={
                    project.projectUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-[#14213D] transition-colors hover:text-[#C9A227]"
                >
                  Live Project ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() =>
              onEdit(project)
            }
            className="
              rounded-xl
              border
              border-[#D8D5CC]
              bg-[#F8F7F3]
              px-4
              py-2
              text-sm
              font-bold
              text-[#14213D]
              transition-all
              hover:border-[#C9A227]
              hover:bg-white
              hover:text-[#A98616]
            "
          >
            Edit
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={() =>
              onDelete(project)
            }
            className="
              rounded-xl
              border
              border-[#E4C7C7]
              bg-[#FBF1F1]
              px-4
              py-2
              text-sm
              font-bold
              text-[#A43F3F]
              transition-all
              hover:border-[#D9AFAF]
              hover:bg-[#F7E7E7]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {deleting
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>

      {/* DATES */}
      {(project.startDate ||
        project.endDate) && (
        <div className="mt-5 border-t border-[#EEECE6] pt-4">
          <p className="text-xs font-semibold text-[#858994]">
            {project.startDate ||
              "Unknown"}

            {" → "}

            {project.endDate ||
              "Present"}
          </p>
        </div>
      )}
    </article>
  );
}