"use client";

import {
  Code2,
  Plus,
  Sparkles,
} from "lucide-react";

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
    <section>
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0877E8]
              "
            >
              Skills
            </p>

            <Sparkles
              size={12}
              className="text-[#38A9EE]"
            />
          </div>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
            "
          >
            My Skills
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            Keep your technical strengths current and
            relevant as you learn new technologies.
          </p>
        </div>

        {skills.length > 0 && (
          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#D6E7F3]
              bg-[#F8FCFF]
              px-3
              py-1.5
            "
          >
            <Code2
              size={12}
              className="text-[#0877E8]"
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-[#68849A]
              "
            >
              {skills.length}{" "}
              {skills.length === 1
                ? "skill"
                : "skills"}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {skills.length === 0 ? (
        <div
          className="
            relative
            mt-5
            overflow-hidden
            rounded-[24px]
            border
            border-dashed
            border-[#C8DEED]
            bg-white/80
            px-6
            py-12
            text-center
            shadow-[0_10px_30px_rgba(8,119,232,0.035)]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-36
              w-36
              -translate-x-1/2
              rounded-full
              bg-[#38BDF8]/10
              blur-[60px]
            "
          />

          <div className="relative">
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#EAF6FF]
                text-[#0877E8]
              "
            >
              <Plus size={22} />
            </div>

            <h3
              className="
                mt-4
                text-lg
                font-bold
                tracking-[-0.02em]
                text-[#173B63]
              "
            >
              No skills added yet
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-[#71899D]
              "
            >
              Add your first technical skill using the
              form above to start building your candidate
              profile.
            </p>
          </div>
        </div>
      ) : (
        /* ===================================================
            SKILLS GRID
        =================================================== */

        <div
          className="
            mt-5
            grid
            gap-4

            sm:grid-cols-2
          "
        >
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