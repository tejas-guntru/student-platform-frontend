"use client";

import type {
  FormEvent,
} from "react";

import {
  Code2,
  LoaderCircle,
  Plus,
  Save,
  X,
} from "lucide-react";

import type {
  SkillProficiency,
} from "@/types/studentSkill";

import ProfileField from "@/components/profile/ProfileField";

import {
  profileInputClass,
} from "@/components/profile/profileStyles";

interface SkillFormProps {
  skillName: string;

  proficiency:
    SkillProficiency;

  editingId:
    string | null;

  saving: boolean;

  setSkillName:
    (value: string) => void;

  setProficiency:
    (
      value:
        SkillProficiency
    ) => void;

  onSubmit:
    (
      event:
        FormEvent<HTMLFormElement>
    ) => void;

  onCancelEdit:
    () => void;
}

export default function SkillForm({
  skillName,
  proficiency,

  editingId,
  saving,

  setSkillName,
  setProficiency,

  onSubmit,
  onCancelEdit,
}: SkillFormProps) {
  const isEditing =
    editingId !== null;

  return (
    <form
      id="skill-form"
      onSubmit={onSubmit}
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_14px_42px_rgba(8,119,232,0.055)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r

          ${
            isEditing
              ? "from-violet-500 via-[#0877E8] to-[#38BDF8]"
              : "from-[#0877E8] via-[#1294F2] to-[#38BDF8]"
          }
        `}
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-[#38BDF8]/8
          blur-[90px]
        "
      />

      <div
        className="
          relative
          p-5

          sm:p-7
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl

                ${
                  isEditing
                    ? "bg-violet-50 text-violet-600"
                    : "bg-[#EAF6FF] text-[#0877E8]"
                }
              `}
            >
              <Code2 size={19} />
            </div>

            <div>
              <div
                className={`
                  inline-flex
                  items-center
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]

                  ${
                    isEditing
                      ? `
                        border-violet-200
                        bg-violet-50
                        text-violet-600
                      `
                      : `
                        border-[#CBE5F8]
                        bg-[#EFF8FF]
                        text-[#0877E8]
                      `
                  }
                `}
              >
                {isEditing
                  ? "Editing Skill"
                  : "New Skill"}
              </div>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]
                "
              >
                {isEditing
                  ? "Edit Skill"
                  : "Add a Technical Skill"}
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-[#71899D]
                "
              >
                Add technologies you are comfortable
                working with, such as Java, Spring Boot,
                PostgreSQL, React or AWS.
              </p>
            </div>
          </div>

          {/* CANCEL EDIT */}

          {isEditing && (
            <button
              type="button"
              onClick={
                onCancelEdit
              }
              disabled={saving}
              className="
                inline-flex
                w-fit
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#D7E7F2]
                bg-[#F8FCFF]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#607D92]
                transition-all
                duration-200

                hover:border-[#BBDCED]
                hover:bg-white
                hover:text-[#0877E8]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={14} />

              Cancel Edit
            </button>
          )}
        </div>

        {/* ===================================================
            FORM FIELDS
        =================================================== */}

        <div
          className="
            mt-7
            grid
            gap-5

            md:grid-cols-[minmax(0,1fr)_220px]
          "
        >
          {/* SKILL */}

          <ProfileField label="Skill">
            <input
              type="text"
              value={skillName}
              onChange={(event) =>
                setSkillName(
                  event.target.value
                )
              }
              maxLength={100}
              placeholder="e.g. Java"
              className={
                profileInputClass
              }
            />
          </ProfileField>

          {/* PROFICIENCY */}

          <ProfileField label="Proficiency">
            <select
              value={proficiency}
              onChange={(event) =>
                setProficiency(
                  event.target
                    .value as SkillProficiency
                )
              }
              className={`${profileInputClass} cursor-pointer`}
            >
              <option value="BEGINNER">
                Beginner
              </option>

              <option value="INTERMEDIATE">
                Intermediate
              </option>

              <option value="ADVANCED">
                Advanced
              </option>
            </select>
          </ProfileField>
        </div>

        {/* ===================================================
            FOOTER / ACTION
        =================================================== */}

        <div
          className="
            mt-7
            flex
            flex-col
            gap-4
            border-t
            border-[#E7F0F7]
            pt-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                text-[#688399]
              "
            >
              {isEditing
                ? "Update this skill"
                : "Build your technical profile"}
            </p>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-[#94A6B5]
              "
            >
              Choose the proficiency level that best
              reflects your current experience.
            </p>
          </div>

          <div
            className="
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:items-center
            "
          >
            {saving && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-[#71899D]
                "
              >
                <LoaderCircle
                  size={15}
                  className="
                    animate-spin
                    text-[#0877E8]
                  "
                />

                Saving...
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="
                group
                inline-flex
                min-h-[46px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#0877E8]
                to-[#1294F2]
                px-6
                py-3
                text-sm
                font-bold
                text-white
                shadow-[0_10px_24px_rgba(8,119,232,0.22)]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:shadow-[0_14px_30px_rgba(8,119,232,0.28)]

                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
              "
            >
              {saving ? (
                <>
                  <LoaderCircle
                    size={15}
                    className="animate-spin"
                  />

                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <Save size={15} />

                  Save Changes
                </>
              ) : (
                <>
                  <Plus size={16} />

                  Add Skill
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}