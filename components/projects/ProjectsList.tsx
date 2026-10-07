"use client";

import {
  FolderGit2,
  Plus,
} from "lucide-react";

import type {
  StudentProject,
} from "@/types/studentProject";

import ProjectCard from "@/components/projects/ProjectCard";

interface ProjectsListProps {
  projects: StudentProject[];

  deletingId:
    string | null;

  onEdit:
    (project: StudentProject) => void;

  onDelete:
    (project: StudentProject) => void;
}

export default function ProjectsList({
  projects,
  deletingId,
  onEdit,
  onDelete,
}: ProjectsListProps) {
  const projectCount =
    projects.length;

  return (
    <section
      className="min-w-0"
      aria-labelledby="projects-list-title"
    >
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div
        className="
          min-w-0
          max-w-2xl
        "
      >
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-[#1256AF]
          "
        >
          Portfolio
        </p>

        <h2
          id="projects-list-title"
          className="
            mt-2
            break-words
            text-xl
            font-bold
            tracking-[-0.035em]
            text-slate-950

            [overflow-wrap:anywhere]

            sm:text-2xl
          "
        >
          My Projects
        </h2>

        <p
          className="
            mt-2
            max-w-xl
            break-words
            text-sm
            leading-6
            text-slate-500

            [overflow-wrap:anywhere]
          "
        >
          Keep your strongest work here so
          your profile clearly shows what
          you have built.
        </p>
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {projectCount === 0 ? (
        <div
          className="
            relative
            mt-5
            min-w-0
            overflow-hidden
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-4
            py-10
            text-center

            sm:mt-6
            sm:rounded-[22px]
            sm:px-6
            sm:py-12
          "
        >
          {/* DECORATIVE GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-32
              w-32
              -translate-x-1/2
              rounded-full
              bg-[#38BDF8]/10
              blur-[60px]
            "
            aria-hidden="true"
          />

          <div
            className="
              relative
              min-w-0
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-[#1256AF]/[0.07]
                text-[#1256AF]
              "
            >
              <Plus
                size={20}
                aria-hidden="true"
              />
            </div>

            <h3
              className="
                mt-4
                break-words
                text-base
                font-bold
                text-slate-900

                [overflow-wrap:anywhere]
              "
            >
              No projects added yet
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                break-words
                text-sm
                leading-6
                text-slate-500

                [overflow-wrap:anywhere]
              "
            >
              Add your first project above to
              start building your portfolio.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* =================================================
              PROJECT COUNT
          ================================================= */}

          <div
            className="
              mt-5
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-500
            "
            aria-label={`${projectCount} ${
              projectCount === 1
                ? "project"
                : "projects"
            } added`}
          >
            <FolderGit2
              size={14}
              className="
                shrink-0
                text-[#1256AF]
              "
              aria-hidden="true"
            />

            <span className="break-words">
              {projectCount}{" "}
              {projectCount === 1
                ? "project"
                : "projects"}{" "}
              added
            </span>
          </div>

          {/* =================================================
              PROJECT LIST
          ================================================= */}

          <div
            className="
              mt-4
              grid
              min-w-0
              grid-cols-1
              gap-4

              sm:gap-5
            "
          >
            {projects.map(
              (project) => (
                <div
                  key={
                    project.projectId
                  }
                  className="min-w-0"
                >
                  <ProjectCard
                    project={project}
                    deleting={
                      deletingId ===
                      project.projectId
                    }
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              )
            )}
          </div>
        </>
      )}
    </section>
  );
}