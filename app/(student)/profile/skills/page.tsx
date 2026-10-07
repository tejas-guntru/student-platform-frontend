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
    <div
      className="
        min-h-screen
        min-w-0
        bg-[#F7F9FC]
      "
    >
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
          error={skills.error}
          success={skills.success}
        />

        {/* =================================================
            FORM
        ================================================= */}

        <section
          className="
            mt-5
            min-w-0

            sm:mt-6
          "
          aria-label={
            skills.editingId
              ? "Edit skill"
              : "Add skill"
          }
        >
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

        <section
          className="
            mt-8
            min-w-0

            sm:mt-10
          "
          aria-label="Your skills"
        >
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
      </main>
    </div>
  );
}