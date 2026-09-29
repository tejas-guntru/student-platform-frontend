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
  return (
    <section>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1256AF]">
          Portfolio
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
          My Projects
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Keep your strongest work here so
          your profile clearly shows what
          you have built.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="mt-6 rounded-[22px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1256AF]/[0.07] text-[#1256AF]">
            <Plus size={20} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            No projects added yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Add your first project above to
            start building your portfolio.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <FolderGit2
              size={14}
              className="text-[#1256AF]"
            />

            {projects.length}{" "}
            {projects.length === 1
              ? "project"
              : "projects"}{" "}
            added
          </div>

          <div className="mt-4 grid gap-5">
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
        </>
      )}
    </section>
  );
}