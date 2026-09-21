"use client";

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
    <article className="rounded-[18px] border border-[#D8D5CC] bg-white p-5 shadow-[0_10px_30px_rgba(20,33,61,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9A227] hover:shadow-[0_16px_40px_rgba(20,33,61,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#14213D]">
            {skill.skillName}
          </h3>

          <div className="mt-3">
            <ProficiencyBadge
              proficiency={
                skill.proficiency
              }
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              onEdit(skill)
            }
            className="
              rounded-lg
              border
              border-[#D8D5CC]
              bg-[#F8F7F3]
              px-3
              py-2
              text-xs
              font-bold
              text-[#14213D]
              transition-all
              hover:border-[#C9A227]
              hover:bg-white
              hover:text-[#A98616]
            "
          >
            Edit
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={() =>
              onDelete(skill)
            }
            className="
              rounded-lg
              border
              border-[#E4C7C7]
              bg-[#FBF1F1]
              px-3
              py-2
              text-xs
              font-bold
              text-[#A43F3F]
              transition-all
              hover:bg-[#F7E7E7]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {deleting
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}