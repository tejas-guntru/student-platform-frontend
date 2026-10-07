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
    <div
      className="
        flex
        min-h-[70vh]
        min-w-0
        items-center
        justify-center
        bg-[#F7F9FC]
        px-4
      "
      role="status"
      aria-live="polite"
    >
      <div
        className="
          min-w-0
          text-center
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
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <LoaderCircle
            size={20}
            className="
              animate-spin
              text-[#1256AF]
            "
            aria-hidden="true"
          />
        </div>

        <p
          className="
            mt-4
            break-words
            text-sm
            font-semibold
            text-slate-600
          "
        >
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
    <div
      className="
        min-h-screen
        min-w-0
        bg-[#F7F9FC]
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <ProjectsHeader
        count={
          projects.projects.length
        }
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <main
        className="
          mx-auto
          w-full
          max-w-6xl
          min-w-0
          px-4
          py-6

          sm:px-6
          sm:py-8

          lg:px-8
          lg:py-10
        "
      >
        {/* ALERTS */}

        <ProfileAlerts
          error={
            projects.error
          }
          success={
            projects.success
          }
        />

        {/* =================================================
            PROJECT FORM
        ================================================= */}

        <section
          className="
            mt-5
            min-w-0

            sm:mt-6
          "
          aria-label={
            projects.editingId
              ? "Edit project"
              : "Add project"
          }
        >
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

        {/* =================================================
            PROJECTS
        ================================================= */}

        <section
          className="
            mt-8
            min-w-0

            sm:mt-10
          "
          aria-label="Your projects"
        >
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
      </main>
    </div>
  );
}