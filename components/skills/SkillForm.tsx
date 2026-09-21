"use client";

import type {
  FormEvent,
} from "react";

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
  return (
    <form
      id="skill-form"
      onSubmit={onSubmit}
      className="mt-8 rounded-[24px] border border-[#D8D5CC] bg-white p-6 shadow-[0_16px_45px_rgba(20,33,61,0.06)] sm:p-8"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              {editingId
                ? "Editing Skill"
                : "New Skill"}
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
            {editingId
              ? "Edit Skill"
              : "Add Skill"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#6B707B]">
            Example: Java, Spring Boot,
            PostgreSQL, React or AWS.
          </p>
        </div>

        {editingId && (
          <button
            type="button"
            onClick={
              onCancelEdit
            }
            className="
              rounded-xl
              border
              border-[#D8D5CC]
              bg-[#F8F7F3]
              px-4
              py-2.5
              text-sm
              font-bold
              text-[#14213D]
              transition-all
              hover:border-[#C9A227]
              hover:bg-white
              hover:text-[#A98616]
            "
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-[1fr_220px_auto] md:items-end">
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
            placeholder="Java"
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
            className={
              profileInputClass
            }
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

        {/* SAVE */}
        <button
          type="submit"
          disabled={saving}
          className="
            inline-flex
            min-h-[50px]
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#C9A227]
            px-6
            py-3
            text-sm
            font-bold
            text-[#14213D]
            transition-all
            duration-200
            hover:bg-[#E0C766]
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {saving
            ? "Saving..."
            : editingId
              ? "Save Changes"
              : "Add Skill"}

          {!saving && (
            <span>→</span>
          )}
        </button>
      </div>
    </form>
  );
}