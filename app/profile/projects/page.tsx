"use client";

import {
  FolderGit2,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import ProjectsHeader from "@/components/projects/ProjectsHeader";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectsList from "@/components/projects/ProjectsList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentProjects,
} from "@/hooks/useStudentProjects";

// =========================================================
// LOADING
// =========================================================

function ProjectsLoading() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#F4F9FF]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#38BDF8]/15
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-10
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#0877E8]/12
          blur-[130px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#0877E8]
            to-[#38BDF8]
            text-white
            shadow-[0_14px_35px_rgba(8,119,232,0.25)]
          "
        >
          <LoaderCircle
            size={25}
            className="animate-spin"
          />
        </div>

        <p
          role="status"
          className="
            mt-5
            font-semibold
            text-[#173B63]
          "
        >
          Loading your projects
        </p>

        <p
          className="
            mt-1
            text-sm
            text-[#8095A8]
          "
        >
          Preparing your portfolio...
        </p>
      </div>
    </main>
  );
}

// =========================================================
// BACKGROUND
// =========================================================

function ProjectsPageBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-52
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-52
          top-[620px]
          h-[580px]
          w-[580px]
          rounded-full
          bg-violet-500/6
          blur-[160px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "56px 56px",
        }}
      />
    </>
  );
}

// =========================================================
// FOOTER
// =========================================================

function ProjectsFooter() {
  return (
    <footer
      className="
        mt-12
        border-t
        border-[#DCEAF5]
        py-6
        text-center
      "
    >
      <div
        className="
          inline-flex
          items-center
          gap-2
          text-xs
          text-[#8298AB]
        "
      >
        <FolderGit2
          size={13}
          className="text-[#0877E8]"
        />

        <span>
          Keep building projects that show what you can do.
        </span>

        <Sparkles
          size={12}
          className="text-[#38A9EE]"
        />
      </div>
    </footer>
  );
}

// =========================================================
// PAGE
// =========================================================

export default function ProjectsPage() {
  const projects =
    useStudentProjects();

  if (projects.loading) {
    return <ProjectsLoading />;
  }

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F4F9FF]
        text-[#173B63]
      "
    >
      <ProjectsPageBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-4
          py-6

          sm:px-6
          sm:py-8

          lg:px-8
          lg:py-10
        "
      >
        {/* HEADER */}

        <ProjectsHeader />

        {/* ALERTS */}

        <div className="mt-6">
          <ProfileAlerts
            error={
              projects.error
            }
            success={
              projects.success
            }
          />
        </div>

        {/* PROJECT FORM */}

        <div className="mt-8">
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
        </div>

        {/* PROJECTS LIST */}

        <div className="mt-8">
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
        </div>

        <ProjectsFooter />
      </div>
    </main>
  );
}