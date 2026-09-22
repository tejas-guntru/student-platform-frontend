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
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.04)]
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-[#B8DCF3]
        hover:shadow-[0_16px_38px_rgba(8,119,232,0.08)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          to-[#38BDF8]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-14
          -top-14
          h-32
          w-32
          rounded-full
          bg-[#38BDF8]/0
          blur-3xl
          transition-all
          duration-300

          group-hover:bg-[#38BDF8]/8
        "
      />

      <div className="relative">
        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
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
                bg-[#EAF6FF]
                text-[#0877E8]
              "
            >
              <Code2 size={17} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#8AA0B2]
                "
              >
                Technical Skill
              </p>

              <h3
                className="
                  mt-1
                  break-words
                  text-lg
                  font-bold
                  tracking-[-0.025em]
                  text-[#173B63]
                "
              >
                {skill.skillName}
              </h3>
            </div>
          </div>

          <ProficiencyBadge
            proficiency={
              skill.proficiency
            }
          />
        </div>

        {/* ACTIONS */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-end
            gap-2
            border-t
            border-[#E7F0F7]
            pt-4
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
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-[#D5E7F3]
              bg-[#F8FCFF]
              px-3
              py-2
              text-xs
              font-bold
              text-[#58748B]
              transition-all
              duration-200

              hover:border-[#B9DCF2]
              hover:bg-white
              hover:text-[#0877E8]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Pencil size={13} />

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
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-3
              py-2
              text-xs
              font-bold
              text-red-600
              transition-all
              duration-200

              hover:border-red-300
              hover:bg-red-100

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {deleting ? (
              <>
                <LoaderCircle
                  size={13}
                  className="animate-spin"
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={13} />

                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}