"use client";

import {
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import SkillsHeader from "@/components/skills/SkillsHeader";
import SkillForm from "@/components/skills/SkillForm";
import SkillsSummary from "@/components/skills/SkillsSummary";
import SkillsList from "@/components/skills/SkillsList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useStudentSkills,
} from "@/hooks/useStudentSkills";

// =========================================================
// LOADING
// =========================================================

function SkillsLoading() {
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
          Loading your skills
        </p>

        <p
          className="
            mt-1
            text-sm
            text-[#8095A8]
          "
        >
          Preparing your technical profile...
        </p>
      </div>
    </main>
  );
}

// =========================================================
// BACKGROUND
// =========================================================

function SkillsPageBackground() {
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
          top-[520px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#0877E8]/8
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

function SkillsFooter() {
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
        <Sparkles
          size={13}
          className="text-[#38A9EE]"
        />

        <span>
          Keep your skills current as your technical
          experience grows.
        </span>
      </div>
    </footer>
  );
}

// =========================================================
// PAGE
// =========================================================

export default function SkillsPage() {
  const skills =
    useStudentSkills();

  if (skills.loading) {
    return <SkillsLoading />;
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
      <SkillsPageBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-5xl
          px-4
          py-6

          sm:px-6
          sm:py-8

          lg:px-8
          lg:py-10
        "
      >
        {/* HEADER */}

        <SkillsHeader />

        {/* ALERTS */}

        <div className="mt-6">
          <ProfileAlerts
            error={skills.error}
            success={
              skills.success
            }
          />
        </div>

        {/* ADD / EDIT SKILL */}

        <div className="mt-8">
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
        </div>

        {/* SUMMARY */}

        <div className="mt-8">
          <SkillsSummary
            count={
              skills.skills.length
            }
          />
        </div>

        {/* SKILLS LIST */}

        <div className="mt-6">
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

        <SkillsFooter />
      </div>
    </main>
  );
}