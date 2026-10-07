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
    <article
      className="
        group
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        transition-all
        duration-300

        hover:border-[#1256AF]/20
        hover:shadow-[0_16px_45px_rgba(15,23,42,0.06)]

        sm:rounded-[22px]
        sm:p-6
      "
      aria-busy={deleting}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-4

          sm:flex-row
          sm:items-start
          sm:justify-between
          sm:gap-5
        "
      >
        {/* PROJECT IDENTITY */}

        <div
          className="
            flex
            min-w-0
            items-start
            gap-3

            sm:gap-4
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
              bg-[#1256AF]/[0.07]
              text-[#1256AF]

              sm:h-11
              sm:w-11
            "
          >
            <FolderGit2
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
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-slate-400
              "
            >
              Portfolio project
            </p>

            <h3
              className="
                mt-1.5
                break-words
                text-lg
                font-bold
                tracking-[-0.03em]
                text-slate-900

                [overflow-wrap:anywhere]

                sm:text-xl
              "
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* ACTIONS */}

        <div
          className="
            flex
            w-full
            shrink-0
            flex-col
            gap-2

            sm:w-auto
            sm:flex-row
            sm:items-center
          "
        >
          <button
            type="button"
            onClick={() =>
              onEdit(project)
            }
            disabled={deleting}
            className="
              inline-flex
              min-h-10
              w-full
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2
              text-xs
              font-semibold
              text-slate-600
              transition-colors

              hover:border-[#1256AF]/20
              hover:bg-[#1256AF]/[0.03]
              hover:text-[#1256AF]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1256AF]/25
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:w-auto
            "
            aria-label={`Edit ${project.title}`}
          >
            <Pencil
              size={12}
              className="shrink-0"
              aria-hidden="true"
            />

            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(project)
            }
            disabled={deleting}
            className="
              inline-flex
              min-h-10
              w-full
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-red-100
              bg-white
              px-3
              py-2
              text-xs
              font-semibold
              text-red-600
              transition-colors

              hover:border-red-200
              hover:bg-red-50

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500/20
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:w-auto
            "
            aria-label={
              deleting
                ? `Deleting ${project.title}`
                : `Delete ${project.title}`
            }
            aria-busy={deleting}
          >
            {deleting ? (
              <>
                <LoaderCircle
                  size={12}
                  className="
                    shrink-0
                    animate-spin
                  "
                  aria-hidden="true"
                />

                <span>
                  Deleting...
                </span>
              </>
            ) : (
              <>
                <Trash2
                  size={12}
                  className="shrink-0"
                  aria-hidden="true"
                />

                Delete
              </>
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          TECH STACK
      ===================================================== */}

      {technologies.length > 0 && (
        <div
          className="
            mt-5
            flex
            min-w-0
            flex-wrap
            gap-2
          "
          aria-label="Technologies used"
        >
          {technologies.map(
            (technology, index) => (
              <span
                key={`${technology}-${index}`}
                className="
                  inline-flex
                  min-w-0
                  max-w-full
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-slate-600
                "
              >
                <Code2
                  size={10}
                  className="
                    shrink-0
                    text-[#1256AF]
                  "
                  aria-hidden="true"
                />

                <span
                  className="
                    min-w-0
                    break-words
                    [overflow-wrap:anywhere]
                  "
                >
                  {technology}
                </span>
              </span>
            )
          )}
        </div>
      )}

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      {project.description && (
        <p
          className="
            mt-5
            min-w-0
            whitespace-pre-line
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

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          mt-6
          flex
          min-w-0
          flex-col
          gap-4
          border-t
          border-slate-100
          pt-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* LINKS */}

        <div
          className="
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
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group/link
                inline-flex
                min-h-10
                w-full
                min-w-0
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-xs
                font-semibold
                text-slate-600
                transition-colors

                hover:border-[#1256AF]/20
                hover:text-[#1256AF]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/25
                focus-visible:ring-offset-2

                sm:w-auto
              "
              aria-label={`Open source code for ${project.title} in a new tab`}
            >
              <Code2
                size={12}
                className="shrink-0"
                aria-hidden="true"
              />

              <span>
                Source code
              </span>

              <ExternalLink
                size={10}
                className="
                  shrink-0
                  transition-transform

                  group-hover/link:-translate-y-0.5
                  group-hover/link:translate-x-0.5
                "
                aria-hidden="true"
              />
            </a>
          )}

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group/link
                inline-flex
                min-h-10
                w-full
                min-w-0
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#1256AF]
                px-3
                py-2
                text-xs
                font-semibold
                text-white
                transition-colors

                hover:bg-[#0F4994]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/30
                focus-visible:ring-offset-2

                sm:w-auto
              "
              aria-label={`Open ${project.title} live project in a new tab`}
            >
              <ExternalLink
                size={12}
                className="shrink-0"
                aria-hidden="true"
              />

              <span>
                Live project
              </span>
            </a>
          )}

          {!project.githubUrl &&
            !project.projectUrl && (
              <span
                className="
                  break-words
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                No project links added
              </span>
            )}
        </div>

        {/* TIMELINE */}

        {(project.startDate ||
          project.endDate) && (
          <div
            className="
              flex
              min-w-0
              items-start
              gap-2
              text-xs
              font-medium
              text-slate-500

              sm:shrink-0
              sm:items-center
            "
            aria-label="Project timeline"
          >
            <CalendarDays
              size={13}
              className="
                mt-0.5
                shrink-0
                text-[#1256AF]

                sm:mt-0
              "
              aria-hidden="true"
            />

            <span
              className="
                min-w-0
                break-words
                [overflow-wrap:anywhere]
              "
            >
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