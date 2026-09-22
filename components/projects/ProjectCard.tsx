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
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_12px_34px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_42px_rgba(8,119,232,0.085)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-violet-500
          via-[#0877E8]
          to-[#38BDF8]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-violet-500/0
          blur-[90px]
          transition-all
          duration-300

          group-hover:bg-violet-500/8
        "
      />

      <div
        className="
          relative
          p-5

          sm:p-6
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div
            className="
              flex
              min-w-0
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-violet-50
                text-violet-600
              "
            >
              <FolderGit2 size={19} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-[#8A9FAF]
                "
              >
                Portfolio Project
              </p>

              <h3
                className="
                  mt-1.5
                  break-words
                  text-xl
                  font-bold
                  tracking-[-0.03em]
                  text-[#173B63]

                  sm:text-[22px]
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
              shrink-0
              items-center
              gap-2
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
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                border-[#D5E7F3]
                bg-[#F8FCFF]
                px-3
                py-2
                text-xs
                font-bold
                text-[#58748B]
                transition-all
                duration-200

                hover:border-[#B9DCF2]
                hover:bg-white
                hover:text-[#0877E8]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Pencil size={13} />

              Edit
            </button>

            <button
              type="button"
              disabled={deleting}
              onClick={() =>
                onDelete(project)
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-3
                py-2
                text-xs
                font-bold
                text-red-600
                transition-all
                duration-200

                hover:border-red-300
                hover:bg-red-100

                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {deleting ? (
                <>
                  <LoaderCircle
                    size={13}
                    className="animate-spin"
                  />

                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={13} />

                  Delete
                </>
              )}
            </button>
          </div>
        </div>

        {/* ===================================================
            TECH STACK
        =================================================== */}

        {technologies.length > 0 && (
          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-2
            "
          >
            {technologies.map(
              (technology, index) => (
                <span
                  key={`${technology}-${index}`}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-[#D5E7F3]
                    bg-[#F5FAFE]
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    text-[#52748D]
                  "
                >
                  <Code2
                    size={11}
                    className="text-[#0877E8]"
                  />

                  {technology}
                </span>
              )
            )}
          </div>
        )}

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        {project.description && (
          <div
            className="
              mt-5
              rounded-[18px]
              border
              border-[#E1ECF5]
              bg-[#F8FCFF]
              px-4
              py-4
            "
          >
            <p
              className="
                whitespace-pre-line
                text-sm
                leading-6
                text-[#607C91]
              "
            >
              {project.description}
            </p>
          </div>
        )}

        {/* ===================================================
            LINKS + TIMELINE
        =================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-4
            border-t
            border-[#E7F0F7]
            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* LINKS */}

          {(project.githubUrl ||
            project.projectUrl) ? (
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
                    group/link
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-[#D5E7F3]
                    bg-white
                    px-3
                    py-2
                    text-xs
                    font-bold
                    text-[#527087]
                    transition-all
                    duration-200

                    hover:border-[#B9DCF2]
                    hover:bg-[#F4FAFF]
                    hover:text-[#0877E8]
                  "
                >
                  <Code2 size={13} />

                  Source Code

                  <ExternalLink
                    size={11}
                    className="
                      transition-transform
                      group-hover/link:-translate-y-0.5
                      group-hover/link:translate-x-0.5
                    "
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
                  className="
                    group/link
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-[#0877E8]
                    to-[#1294F2]
                    px-3
                    py-2
                    text-xs
                    font-bold
                    text-white
                    shadow-[0_6px_16px_rgba(8,119,232,0.16)]
                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:shadow-[0_9px_20px_rgba(8,119,232,0.22)]
                  "
                >
                  <ExternalLink size={13} />

                  Live Project
                </a>
              )}
            </div>
          ) : (
            <p
              className="
                text-xs
                font-medium
                text-[#98A9B6]
              "
            >
              No project links added
            </p>
          )}

          {/* DATES */}

          {(project.startDate ||
            project.endDate) && (
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-[#71899D]
              "
            >
              <CalendarDays
                size={13}
                className="
                  shrink-0
                  text-[#8BB9D6]
                "
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
      </div>
    </article>
  );
}