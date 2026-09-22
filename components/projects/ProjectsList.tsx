"use client";

import {
  FolderGit2,
  Plus,
  Sparkles,
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
  return (
    <section>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-violet-600
              "
            >
              Portfolio
            </p>

            <Sparkles
              size={12}
              className="text-[#38A9EE]"
            />
          </div>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
            "
          >
            My Projects
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            Keep your strongest projects here so employers
            can understand what you have built and the
            technologies you have worked with.
          </p>
        </div>

        {projects.length > 0 && (
          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#D6E7F3]
              bg-[#F8FCFF]
              px-3
              py-1.5
            "
          >
            <FolderGit2
              size={12}
              className="text-violet-600"
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-[#68849A]
              "
            >
              {projects.length}{" "}
              {projects.length === 1
                ? "project"
                : "projects"}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {projects.length === 0 ? (
        <div
          className="
            relative
            mt-5
            overflow-hidden
            rounded-[24px]
            border
            border-dashed
            border-[#C8DEED]
            bg-white/80
            px-6
            py-12
            text-center
            shadow-[0_10px_30px_rgba(8,119,232,0.035)]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-40
              w-40
              -translate-x-1/2
              rounded-full
              bg-violet-500/10
              blur-[65px]
            "
          />

          <div className="relative">
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-violet-50
                text-violet-600
              "
            >
              <Plus size={22} />
            </div>

            <h3
              className="
                mt-4
                text-lg
                font-bold
                tracking-[-0.02em]
                text-[#173B63]
              "
            >
              No projects added yet
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-[#71899D]
              "
            >
              Add your first project using the form above
              to start building your Trailbliz portfolio.
            </p>
          </div>
        </div>
      ) : (
        /* ===================================================
            PROJECTS
        =================================================== */

        <div
          className="
            mt-5
            grid
            gap-5
          "
        >
          {projects.map(
            (project) => (
              <ProjectCard
                key={
                  project.projectId
                }
                project={project}
                deleting={
                  deletingId ===
                  project.projectId
                }
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}