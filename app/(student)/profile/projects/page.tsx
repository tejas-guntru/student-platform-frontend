"use client";

import {
  LoaderCircle,
} from "lucide-react";

import ProjectsHeader from "@/components/projects/ProjectsHeader";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectsList from "@/components/projects/ProjectsList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentProjects,
} from "@/hooks/useStudentProjects";

/* =========================================================
   LOADING
========================================================= */

function ProjectsLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F9FC]">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <LoaderCircle
            size={20}
            className="animate-spin text-[#1256AF]"
          />
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-600">
          Loading your projects...
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ProjectsPage() {
  const projects =
    useStudentProjects();

  if (projects.loading) {
    return <ProjectsLoading />;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* HEADER */}

      <ProjectsHeader
        count={
          projects.projects.length
        }
      />

      {/* CONTENT */}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <ProfileAlerts
          error={
            projects.error
          }
          success={
            projects.success
          }
        />

        {/* PROJECT FORM */}

        <section className="mt-6">
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
        </section>

        {/* PROJECTS */}

        <section className="mt-10">
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
        </section>
      </div>
    </div>
  );
}