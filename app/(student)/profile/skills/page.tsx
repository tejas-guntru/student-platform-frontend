"use client";

import {
  LoaderCircle,
} from "lucide-react";

import SkillForm from "@/components/skills/SkillForm";
import SkillsHeader from "@/components/skills/SkillsHeader";
import SkillsList from "@/components/skills/SkillsList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentSkills,
} from "@/hooks/useStudentSkills";

/* =========================================================
   LOADING
========================================================= */

function SkillsLoading() {
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
          Loading your skills...
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SkillsPage() {
  const skills =
    useStudentSkills();

  if (skills.loading) {
    return <SkillsLoading />;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <SkillsHeader
        count={
          skills.skills.length
        }
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ALERTS */}

        <ProfileAlerts
          error={skills.error}
          success={skills.success}
        />

        {/* =================================================
            FORM
        ================================================= */}

        <section className="mt-6">
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
        </section>

        {/* =================================================
            SKILLS
        ================================================= */}

        <section className="mt-10">
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
        </section>
      </div>
    </div>
  );
}