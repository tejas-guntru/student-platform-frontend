"use client";

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
    <section className="mt-8">
      {/* HEADER */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              Portfolio
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
            My Projects
          </h2>
        </div>

        <span className="rounded-full border border-[#D8D5CC] bg-white px-3 py-1.5 text-xs font-bold text-[#6B707B]">
          {projects.length}{" "}
          {projects.length === 1
            ? "project"
            : "projects"}
        </span>
      </div>

      {/* EMPTY */}
      {projects.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-[#D8D5CC] bg-white/70 p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F0CF] text-[#A98616]">
            +
          </div>

          <h3 className="mt-4 font-bold text-[#14213D]">
            No projects added yet
          </h3>

          <p className="mt-2 text-sm text-[#6B707B]">
            Add your first project to
            start building your portfolio.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
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