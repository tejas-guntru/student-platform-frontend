import type {
  SkillProficiency,
} from "@/types/studentSkill";

export function formatProficiency(
  value: SkillProficiency
) {
  return (
    value.charAt(0) +
    value
      .slice(1)
      .toLowerCase()
  );
}