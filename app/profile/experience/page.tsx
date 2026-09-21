"use client";

import ExperienceHeader from "@/components/experience/ExperienceHeader";
import ExperienceForm from "@/components/experience/ExperienceForm";
import ExperienceList from "@/components/experience/ExperienceList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentExperience,
} from "@/hooks/useStudentExperience";

export default function ExperiencePage() {
  const experience =
    useStudentExperience();

  if (experience.loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] text-[#14213D]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-4 text-sm font-medium text-[#6B707B]">
            Loading experience...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:py-10 lg:py-12">
        <ExperienceHeader />

        <ProfileAlerts
          error={
            experience.error
          }
          success={
            experience.success
          }
        />

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
    </main>
  );
}