"use client";

import ProjectsHeader from "@/components/projects/ProjectsHeader";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectsList from "@/components/projects/ProjectsList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentProjects,
} from "@/hooks/useStudentProjects";

export default function ProjectsPage() {
  const projects =
    useStudentProjects();

  if (projects.loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-4 text-sm font-medium text-[#6B707B]">
            Loading projects...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute -left-48 top-40 h-[420px] w-[420px] rounded-full bg-[#C9A227]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-48 top-[650px] h-[500px] w-[500px] rounded-full bg-[#14213D]/5 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:py-10 lg:py-12">
        <ProjectsHeader />

        <ProfileAlerts
          error={projects.error}
          success={
            projects.success
          }
        />

        <ProjectForm
          title={
            projects.title
          }
          description={
            projects.description
          }
          techStack={
            projects.techStack
          }
          githubUrl={
            projects.githubUrl
          }
          projectUrl={
            projects.projectUrl
          }
          startDate={
            projects.startDate
          }
          endDate={
            projects.endDate
          }

          editingId={
            projects.editingId
          }

          saving={
            projects.saving
          }

          setTitle={
            projects.setTitle
          }

          setDescription={
            projects.setDescription
          }

          setTechStack={
            projects.setTechStack
          }

          setGithubUrl={
            projects.setGithubUrl
          }

          setProjectUrl={
            projects.setProjectUrl
          }

          setStartDate={
            projects.setStartDate
          }

          setEndDate={
            projects.setEndDate
          }

          onSubmit={
            projects.handleSubmit
          }

          onCancelEdit={
            projects.resetForm
          }
        />

        <ProjectsList
          projects={
            projects.projects
          }

          deletingId={
            projects.deletingId
          }

          onEdit={
            projects.startEdit
          }

          onDelete={
            projects.handleDelete
          }
        />

        {/* FOOTER */}
        <div className="mt-12 flex items-center justify-center gap-3 pb-4">
          <span className="h-px w-12 bg-[#D8D5CC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#858994]">
            Build your portfolio
          </span>

          <span className="h-px w-12 bg-[#D8D5CC]" />
        </div>
      </div>
    </main>
  );
}