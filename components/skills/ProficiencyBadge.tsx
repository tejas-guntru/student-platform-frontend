import {
  Circle,
  CircleDot,
  Sparkles,
} from "lucide-react";

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
  const config = {
    BEGINNER: {
      className:
        "border-[#D8E7F2] bg-[#F5FAFE] text-[#68849A]",
      icon: Circle,
    },

    INTERMEDIATE: {
      className:
        "border-[#BFE0F5] bg-[#EAF6FF] text-[#0877E8]",
      icon: CircleDot,
    },

    ADVANCED: {
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
      icon: Sparkles,
    },
  }[proficiency];

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        shrink-0
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1.5
        text-[10px]
        font-bold
        uppercase
        tracking-[0.08em]

        ${config.className}
      `}
    >
      <Icon
        size={11}
        strokeWidth={2.2}
      />

      {formatProficiency(
        proficiency
      )}
    </span>
  );
}