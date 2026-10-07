"use client";

import {
  Code2,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import type {
  StudentSkill,
} from "@/types/studentSkill";

import ProficiencyBadge from "@/components/skills/ProficiencyBadge";

interface SkillCardProps {
  skill: StudentSkill;

  deleting: boolean;

  onEdit:
    (skill: StudentSkill) => void;

  onDelete:
    (skill: StudentSkill) => void;
}

export default function SkillCard({
  skill,
  deleting,
  onEdit,
  onDelete,
}: SkillCardProps) {
  return (
    <article
      className="
        group
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        transition-all
        duration-300

        hover:border-[#1256AF]/20
        hover:shadow-[0_14px_40px_rgba(15,23,42,0.06)]

        sm:rounded-[20px]
        sm:p-5
      "
    >
      {/* =====================================================
          SKILL INFO
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-3

          sm:flex-row
          sm:items-start
          sm:justify-between
          sm:gap-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#1256AF]/[0.07]
              text-[#1256AF]
            "
          >
            <Code2
              size={17}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Technical skill
            </p>

            <h3
              className="
                mt-1
                break-words
                text-base
                font-bold
                tracking-[-0.02em]
                text-slate-900

                [overflow-wrap:anywhere]
              "
            >
              {skill.skillName}
            </h3>
          </div>
        </div>

        <div
          className="
            w-fit
            max-w-full
            shrink-0

            sm:self-start
          "
        >
          <ProficiencyBadge
            proficiency={
              skill.proficiency
            }
          />
        </div>
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div
        className="
          mt-5
          flex
          min-w-0
          flex-col
          gap-2
          border-t
          border-slate-100
          pt-4

          sm:flex-row
          sm:items-center
          sm:justify-end
        "
      >
        <button
          type="button"
          onClick={() =>
            onEdit(skill)
          }
          disabled={deleting}
          className="
            inline-flex
            min-h-10
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-xs
            font-semibold
            text-slate-600
            transition-colors

            hover:border-[#1256AF]/20
            hover:bg-[#1256AF]/[0.03]
            hover:text-[#1256AF]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#1256AF]/25
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:w-auto
          "
          aria-label={`Edit ${skill.skillName}`}
        >
          <Pencil
            size={12}
            className="shrink-0"
            aria-hidden="true"
          />

          Edit
        </button>

        <button
          type="button"
          disabled={deleting}
          onClick={() =>
            onDelete(skill)
          }
          className="
            inline-flex
            min-h-10
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-red-100
            bg-white
            px-3
            py-2
            text-xs
            font-semibold
            text-red-600
            transition-colors

            hover:border-red-200
            hover:bg-red-50

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500/20
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:w-auto
          "
          aria-label={
            deleting
              ? `Deleting ${skill.skillName}`
              : `Delete ${skill.skillName}`
          }
          aria-busy={deleting}
        >
          {deleting ? (
            <>
              <LoaderCircle
                size={12}
                className="
                  shrink-0
                  animate-spin
                "
                aria-hidden="true"
              />

              <span>
                Deleting...
              </span>
            </>
          ) : (
            <>
              <Trash2
                size={12}
                className="shrink-0"
                aria-hidden="true"
              />

              Delete
            </>
          )}
        </button>
      </div>
    </article>
  );
}