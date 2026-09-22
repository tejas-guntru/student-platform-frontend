"use client";

import {
  BriefcaseBusiness,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import ExperienceHeader from "@/components/experience/ExperienceHeader";
import ExperienceForm from "@/components/experience/ExperienceForm";
import ExperienceList from "@/components/experience/ExperienceList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentExperience,
} from "@/hooks/useStudentExperience";

// =========================================================
// LOADING
// =========================================================

function ExperienceLoading() {
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
          bg-emerald-500/10
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
          Loading your experience
        </p>

        <p
          className="
            mt-1
            text-sm
            text-[#8095A8]
          "
        >
          Preparing your professional profile...
        </p>
      </div>
    </main>
  );
}

// =========================================================
// BACKGROUND
// =========================================================

function ExperiencePageBackground() {
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
          bg-emerald-500/6
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

function ExperienceFooter() {
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
        <BriefcaseBusiness
          size={13}
          className="text-emerald-600"
        />

        <span>
          Keep your experience updated as your career grows.
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

export default function ExperiencePage() {
  const experience =
    useStudentExperience();

  if (experience.loading) {
    return <ExperienceLoading />;
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
      <ExperiencePageBackground />

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

        <ExperienceHeader />

        {/* ALERTS */}

        <div className="mt-6">
          <ProfileAlerts
            error={
              experience.error
            }
            success={
              experience.success
            }
          />
        </div>

        {/* EXPERIENCE FORM */}

        <div className="mt-8">
          <ExperienceForm
            companyName={
              experience.companyName
            }

            roleTitle={
              experience.roleTitle
            }

            employmentType={
              experience.employmentType
            }

            location={
              experience.location
            }

            description={
              experience.description
            }

            startDate={
              experience.startDate
            }

            endDate={
              experience.endDate
            }

            currentlyWorking={
              experience.currentlyWorking
            }

            editingId={
              experience.editingId
            }

            saving={
              experience.saving
            }

            setCompanyName={
              experience.setCompanyName
            }

            setRoleTitle={
              experience.setRoleTitle
            }

            setEmploymentType={
              experience.setEmploymentType
            }

            setLocation={
              experience.setLocation
            }

            setDescription={
              experience.setDescription
            }

            setStartDate={
              experience.setStartDate
            }

            setEndDate={
              experience.setEndDate
            }

            onCurrentChange={
              experience.handleCurrentChange
            }

            onSubmit={
              experience.handleSubmit
            }

            onCancelEdit={
              experience.resetForm
            }
          />
        </div>

        {/* EXPERIENCE LIST */}

        <div className="mt-8">
          <ExperienceList
            experiences={
              experience.experiences
            }

            deletingId={
              experience.deletingId
            }

            onEdit={
              experience.startEdit
            }

            onDelete={
              experience.handleDelete
            }
          />
        </div>

        <ExperienceFooter />
      </div>
    </main>
  );
}