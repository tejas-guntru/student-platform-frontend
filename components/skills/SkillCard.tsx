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
    <article className="group rounded-[20px] border border-slate-200 bg-white p-5 transition duration-300 hover:border-[#1256AF]/20 hover:shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1256AF]/[0.07] text-[#1256AF]">
            <Code2 size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Technical skill
            </p>

            <h3 className="mt-1 break-words text-base font-bold tracking-[-0.02em] text-slate-900">
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

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() =>
            onEdit(skill)
          }
          disabled={deleting}
          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-[#1256AF]/20 hover:bg-[#1256AF]/[0.03] hover:text-[#1256AF] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Pencil size={12} />

          Edit
        </button>

        <button
          type="button"
          disabled={deleting}
          onClick={() =>
            onDelete(skill)
          }
          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? (
            <>
              <LoaderCircle
                size={12}
                className="animate-spin"
              />

              Deleting...
            </>
          ) : (
            <>
              <Trash2 size={12} />

              Delete
            </>
          )}
        </button>
      </div>
    </article>
  );
}