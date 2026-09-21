"use client";

import SkillsHeader from "@/components/skills/SkillsHeader";
import SkillForm from "@/components/skills/SkillForm";
import SkillsSummary from "@/components/skills/SkillsSummary";
import SkillsList from "@/components/skills/SkillsList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentSkills,
} from "@/hooks/useStudentSkills";

export default function SkillsPage() {
  const skills =
    useStudentSkills();

  if (skills.loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] text-[#14213D]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-4 text-sm font-medium text-[#6B707B]">
            Loading skills...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 sm:py-10 lg:py-12">
        <SkillsHeader />

        <ProfileAlerts
          error={skills.error}
          success={
            skills.success
          }
        />

        <SkillForm
          skillName={
            skills.skillName
          }

          proficiency={
            skills.proficiency
          }

          editingId={
            skills.editingId
          }

          saving={
            skills.saving
          }

          setSkillName={
            skills.setSkillName
          }

          setProficiency={
            skills.setProficiency
          }

          onSubmit={
            skills.handleSubmit
          }

          onCancelEdit={
            skills.resetForm
          }
        />

        <SkillsSummary
          count={
            skills.skills.length
          }
        />

        <SkillsList
          skills={
            skills.skills
          }

          deletingId={
            skills.deletingId
          }

          onEdit={
            skills.startEdit
          }

          onDelete={
            skills.handleDelete
          }
        />

      </div>
    </main>
  );
}