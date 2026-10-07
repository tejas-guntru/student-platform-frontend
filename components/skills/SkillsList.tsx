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
  const skillCount =
    skills.length;

  return (
    <section
      className="min-w-0"
      aria-labelledby="skills-list-title"
    >
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div
          className="
            min-w-0
            max-w-2xl
          "
        >
          <div
            className="
              flex
              min-w-0
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
              className="
                shrink-0
                text-[#38A9EE]
              "
              aria-hidden="true"
            />
          </div>

          <h2
            id="skills-list-title"
            className="
              mt-2
              break-words
              text-xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]

              [overflow-wrap:anywhere]

              sm:text-2xl
            "
          >
            My Skills
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              break-words
              text-sm
              leading-6
              text-[#71899D]

              [overflow-wrap:anywhere]
            "
          >
            Keep your technical strengths current and
            relevant as you learn new technologies.
          </p>
        </div>

        {skillCount > 0 && (
          <div
            className="
              inline-flex
              w-fit
              max-w-full
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-[#D6E7F3]
              bg-[#F8FCFF]
              px-3
              py-1.5
            "
            aria-label={`${skillCount} ${
              skillCount === 1
                ? "skill"
                : "skills"
            }`}
          >
            <Code2
              size={12}
              className="
                shrink-0
                text-[#0877E8]
              "
              aria-hidden="true"
            />

            <span
              className="
                break-words
                text-[10px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-[#68849A]
              "
            >
              {skillCount}{" "}
              {skillCount === 1
                ? "skill"
                : "skills"}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {skillCount === 0 ? (
        <div
          className="
            relative
            mt-5
            min-w-0
            overflow-hidden
            rounded-2xl
            border
            border-dashed
            border-[#C8DEED]
            bg-white/80
            px-4
            py-10
            text-center
            shadow-[0_10px_30px_rgba(8,119,232,0.035)]

            sm:rounded-[24px]
            sm:px-6
            sm:py-12
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-32
              w-32
              -translate-x-1/2
              rounded-full
              bg-[#38BDF8]/10
              blur-[60px]

              sm:h-36
              sm:w-36
            "
            aria-hidden="true"
          />

          <div
            className="
              relative
              min-w-0
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-[#EAF6FF]
                text-[#0877E8]

                sm:h-14
                sm:w-14
              "
            >
              <Plus
                size={22}
                aria-hidden="true"
              />
            </div>

            <h3
              className="
                mt-4
                break-words
                text-lg
                font-bold
                tracking-[-0.02em]
                text-[#173B63]

                [overflow-wrap:anywhere]
              "
            >
              No skills added yet
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                break-words
                text-sm
                leading-6
                text-[#71899D]

                [overflow-wrap:anywhere]
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
            min-w-0
            grid-cols-1
            gap-4

            sm:grid-cols-2
          "
        >
          {skills.map(
            (skill) => (
              <div
                key={
                  skill.skillId
                }
                className="min-w-0"
              >
                <SkillCard
                  skill={skill}
                  deleting={
                    deletingId ===
                    skill.skillId
                  }
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}