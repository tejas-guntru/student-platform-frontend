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
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5

        sm:p-6
      "
    >
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
            <Sparkles size={18} />
          </div>

          <div>
            <h2
              className="
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
                text-sm
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
            rounded-full
            bg-violet-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-violet-700
          "
        >
          {skills.length}
        </span>
      </div>

      {skills.length === 0 ? (
        <EmptySkills />
      ) : (
        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-2
          "
        >
          {skills.map((skill) => (
            <div
              key={skill.skillId}
              className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3.5
                py-2.5
              "
            >
              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-800
                "
              >
                {skill.skillName}
              </p>

              <p
                className="
                  mt-0.5
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
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-6
        text-center
      "
    >
      <p
        className="
          text-sm
          font-medium
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