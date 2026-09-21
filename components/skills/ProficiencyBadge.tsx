import type {
  SkillProficiency,
} from "@/types/studentSkill";

import {
  formatProficiency,
} from "@/utils/skillFormatters";

interface ProficiencyBadgeProps {
  proficiency:
    SkillProficiency;
}

export default function ProficiencyBadge({
  proficiency,
}: ProficiencyBadgeProps) {
  let style =
    "border-[#E8DCA9] bg-[#FBF7E8] text-[#806E30]";

  if (
    proficiency === "ADVANCED"
  ) {
    style =
      "border-[#BFD7C3] bg-[#F1F8F2] text-[#347A3A]";
  } else if (
    proficiency ===
    "INTERMEDIATE"
  ) {
    style =
      "border-[#C9D5E8] bg-[#F2F6FB] text-[#476486]";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {formatProficiency(
        proficiency
      )}
    </span>
  );
}