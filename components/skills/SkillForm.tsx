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
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_14px_42px_rgba(8,119,232,0.055)]

        sm:rounded-[28px]
      "
      aria-labelledby="skill-form-title"
    >
      {/* TOP ACCENT */}

      <div
        className={`
          pointer-events-none
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
        aria-hidden="true"
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-[#38BDF8]/8
          blur-[70px]

          sm:-right-24
          sm:-top-24
          sm:h-64
          sm:w-64
          sm:blur-[90px]
        "
        aria-hidden="true"
      />

      <div
        className="
          relative
          min-w-0
          p-4

          sm:p-7
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            min-w-0
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
              min-w-0
              items-start
              gap-3

              sm:gap-4
            "
          >
            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl

                sm:h-11
                sm:w-11
                sm:rounded-2xl

                ${
                  isEditing
                    ? "bg-violet-50 text-violet-600"
                    : "bg-[#EAF6FF] text-[#0877E8]"
                }
              `}
            >
              <Code2
                size={19}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <div
                className={`
                  inline-flex
                  max-w-full
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
                <span className="truncate">
                  {isEditing
                    ? "Editing Skill"
                    : "New Skill"}
                </span>
              </div>

              <h2
                id="skill-form-title"
                className="
                  mt-3
                  break-words
                  text-xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]

                  [overflow-wrap:anywhere]

                  sm:text-2xl
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
                  break-words
                  text-sm
                  leading-6
                  text-[#71899D]

                  [overflow-wrap:anywhere]
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
                min-h-10
                w-full
                shrink-0
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
                transition-colors
                duration-200

                hover:border-[#BBDCED]
                hover:bg-white
                hover:text-[#0877E8]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0877E8]/25
                focus-visible:ring-offset-2

                disabled:cursor-not-allowed
                disabled:opacity-50

                sm:w-fit
              "
            >
              <X
                size={14}
                className="shrink-0"
                aria-hidden="true"
              />

              Cancel Edit
            </button>
          )}
        </div>

        {/* ===================================================
            FORM FIELDS
        =================================================== */}

        <div
          className="
            mt-6
            grid
            min-w-0
            grid-cols-1
            gap-5

            sm:mt-7

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
              autoComplete="off"
              disabled={saving}
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
              disabled={saving}
              className={`
                ${profileInputClass}
                cursor-pointer

                disabled:cursor-not-allowed
              `}
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
            min-w-0
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
          <div className="min-w-0">
            <p
              className="
                break-words
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
                max-w-xl
                break-words
                text-xs
                leading-5
                text-[#94A6B5]

                [overflow-wrap:anywhere]
              "
            >
              Choose the proficiency level that best
              reflects your current experience.
            </p>
          </div>

          <div
            className="
              flex
              min-w-0
              flex-col
              gap-3

              sm:flex-row
              sm:items-center
              sm:justify-end
            "
          >
            {saving && (
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-[#71899D]
                "
                role="status"
                aria-live="polite"
              >
                <LoaderCircle
                  size={15}
                  className="
                    shrink-0
                    animate-spin
                    text-[#0877E8]
                  "
                  aria-hidden="true"
                />

                <span>
                  Saving...
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="
                group
                inline-flex
                min-h-12
                w-full
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

                hover:shadow-[0_14px_30px_rgba(8,119,232,0.28)]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0877E8]/30
                focus-visible:ring-offset-2

                disabled:cursor-not-allowed
                disabled:opacity-60

                sm:w-auto

                lg:hover:-translate-y-0.5
                lg:disabled:hover:translate-y-0
              "
            >
              {saving ? (
                <>
                  <LoaderCircle
                    size={15}
                    className="
                      shrink-0
                      animate-spin
                    "
                    aria-hidden="true"
                  />

                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <Save
                    size={15}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  Save Changes
                </>
              ) : (
                <>
                  <Plus
                    size={16}
                    className="shrink-0"
                    aria-hidden="true"
                  />

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