"use client";

import {
  LoaderCircle,
} from "lucide-react";

import ExperienceHeader from "@/components/experience/ExperienceHeader";
import ExperienceForm from "@/components/experience/ExperienceForm";
import ExperienceList from "@/components/experience/ExperienceList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentExperience,
} from "@/hooks/useStudentExperience";

/* =========================================================
   LOADING
========================================================= */

function ExperienceLoading() {
  return (
    <div
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        bg-[#F7F9FC]
      "
    >
      <div className="text-center">
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
          />
        </div>

        <p
          className="
            mt-4
            text-sm
            font-semibold
            text-slate-600
          "
        >
          Loading your experience...
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ExperiencePage() {
  const experience =
    useStudentExperience();

  if (experience.loading) {
    return <ExperienceLoading />;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* HEADER */}

      <ExperienceHeader
        count={
          experience.experiences.length
        }
      />

      {/* CONTENT */}

      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-8

          sm:px-6

          lg:px-8
          lg:py-10
        "
      >
        <ProfileAlerts
          error={
            experience.error
          }
          success={
            experience.success
          }
        />

        {/* EXPERIENCE FORM */}

        <section className="mt-6">
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
        </section>

        {/* EXPERIENCE LIST */}

        <section className="mt-10">
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
        </section>
      </div>
    </div>
  );
}