"use client";

import {
  CalendarDays,
  Code2,
  ExternalLink,
  FolderGit2,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-react";

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
  const technologies =
    project.techStack
      ?.split(",")
      .map((tech) => tech.trim())
      .filter(Boolean) ?? [];

  return (
    <article className="group rounded-[22px] border border-slate-200 bg-white p-5 transition duration-300 hover:border-[#1256AF]/20 hover:shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-6">
      {/* HEADER */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1256AF]/[0.07] text-[#1256AF]">
            <FolderGit2 size={18} />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400">
              Portfolio project
            </p>

            <h3 className="mt-1.5 break-words text-xl font-bold tracking-[-0.03em] text-slate-900">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onEdit(project)
            }
            disabled={deleting}
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-[#1256AF]/20 hover:bg-[#1256AF]/[0.03] hover:text-[#1256AF] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pencil size={12} />

            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(project)
            }
            disabled={deleting}
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <>
                <LoaderCircle
                  size={12}
                  className="animate-spin"
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={12} />

                Delete
              </>
            )}
          </button>
        </div>
      </div>

      {/* TECH STACK */}

      {technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map(
            (technology, index) => (
              <span
                key={`${technology}-${index}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600"
              >
                <Code2
                  size={10}
                  className="text-[#1256AF]"
                />

                {technology}
              </span>
            )
          )}
        </div>
      )}

      {/* DESCRIPTION */}

      {project.description && (
        <p className="mt-5 whitespace-pre-line text-sm leading-6 text-slate-600">
          {project.description}
        </p>
      )}

      {/* FOOTER */}

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {/* LINKS */}

        <div className="flex flex-wrap gap-2">
          {project.githubUrl && (
            <a
              href={
                project.githubUrl
              }
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-[#1256AF]/20 hover:text-[#1256AF]"
            >
              <Code2 size={12} />

              Source code

              <ExternalLink
                size={10}
                className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}

          {project.projectUrl && (
            <a
              href={
                project.projectUrl
              }
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#1256AF] px-3 text-xs font-semibold text-white transition hover:bg-[#0F4994]"
            >
              <ExternalLink
                size={12}
              />

              Live project
            </a>
          )}

          {!project.githubUrl &&
            !project.projectUrl && (
              <span className="text-xs font-medium text-slate-400">
                No project links added
              </span>
            )}
        </div>

        {/* TIMELINE */}

        {(project.startDate ||
          project.endDate) && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CalendarDays
              size={13}
              className="shrink-0 text-[#1256AF]"
            />

            <span>
              {project.startDate ||
                "Unknown"}

              {" → "}

              {project.endDate ||
                "Present"}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}