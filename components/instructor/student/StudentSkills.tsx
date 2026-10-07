import {
  Sparkles,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentSkillsProps {
  skills:
    InstructorStudentOverviewResponse["skills"];
}

export default function StudentSkills({
  skills,
}: StudentSkillsProps) {
  return (
    <section
      id="skills"
      className="
        min-w-0
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          min-w-0
          items-start
          justify-between
          gap-3

          sm:gap-4
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
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
              bg-violet-50
              text-violet-700
            "
          >
            <Sparkles
              size={18}
              aria-hidden="true"
            />
          </div>

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <h2
              className="
                break-words
                text-lg
                font-bold
                text-slate-950
              "
            >
              Skills
            </h2>

            <p
              className="
                mt-1
                max-w-2xl
                break-words
                text-sm
                leading-6
                text-slate-500
              "
            >
              Technical and professional
              capabilities added by the
              student.
            </p>
          </div>
        </div>

        <span
          className="
            inline-flex
            min-w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-violet-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-violet-700
          "
          aria-label={`${skills.length} skills`}
        >
          {skills.length}
        </span>
      </div>

      {/* SKILLS */}

      {skills.length === 0 ? (
        <EmptySkills />
      ) : (
        <div
          className="
            mt-5
            flex
            min-w-0
            flex-wrap
            gap-2
          "
        >
          {skills.map((skill) => (
            <div
              key={skill.skillId}
              className="
                min-w-0
                max-w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                py-2.5

                sm:px-3.5
              "
            >
              <p
                className="
                  max-w-full
                  break-words
                  text-sm
                  font-semibold
                  leading-5
                  text-slate-800

                  [overflow-wrap:anywhere]
                "
              >
                {skill.skillName}
              </p>

              <p
                className="
                  mt-0.5
                  max-w-full
                  break-words
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                {formatEnum(
                  skill.proficiency
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function EmptySkills() {
  return (
    <div
      className="
        mt-5
        min-w-0
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        px-4
        py-6
        text-center

        sm:px-6
      "
    >
      <p
        className="
          break-words
          text-sm
          font-medium
          leading-6
          text-slate-500
        "
      >
        No skills added by this student.
      </p>
    </div>
  );
}

function formatEnum(
  value: string
) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word
          .charAt(0)
          .toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}