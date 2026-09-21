"use client";

import type {
  StudentSkill,
} from "@/types/studentSkill";

import SkillCard from "@/components/skills/SkillCard";

interface SkillsListProps {
  skills: StudentSkill[];

  deletingId:
    string | null;

  onEdit:
    (skill: StudentSkill) => void;

  onDelete:
    (skill: StudentSkill) => void;
}

export default function SkillsList({
  skills,
  deletingId,
  onEdit,
  onDelete,
}: SkillsListProps) {
  return (
    <section className="mt-8">
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A227]" />

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
            Skills
          </p>
        </div>

        <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
          My Skills
        </h2>

        <p className="mt-2 text-sm text-[#6B707B]">
          Keep your technical strengths
          current and relevant.
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-[#D8D5CC] bg-white/70 p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F0CF] text-xl font-bold text-[#A98616]">
            +
          </div>

          <h3 className="mt-4 font-bold text-[#14213D]">
            No skills added yet
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#6B707B]">
            Add your first technical
            skill using the form above.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map(
            (skill) => (
              <SkillCard
                key={
                  skill.skillId
                }
                skill={skill}
                deleting={
                  deletingId ===
                  skill.skillId
                }
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}