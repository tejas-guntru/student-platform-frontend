import Link from "next/link";

import {
  ArrowLeft,
  Code2,
} from "lucide-react";

interface SkillsHeaderProps {
  count: number;
}

export default function SkillsHeader({
  count,
}: SkillsHeaderProps) {
  const safeCount =
    Number.isFinite(count) && count >= 0
      ? count
      : 0;

  return (
    <header
      className="
        min-w-0
        border-b
        border-slate-200
        bg-white
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          min-w-0
          px-4
          py-6

          sm:px-6
          sm:py-10

          lg:px-8
          lg:py-12
        "
      >
        {/* BACK */}

        <Link
          href="/profile"
          className="
            group
            inline-flex
            min-h-10
            items-center
            gap-2
            rounded-lg
            text-sm
            font-semibold
            text-slate-500
            transition-colors

            hover:text-[#1256AF]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#1256AF]/25
            focus-visible:ring-offset-2
          "
        >
          <ArrowLeft
            size={15}
            className="
              shrink-0
              transition-transform

              group-hover:-translate-x-1
            "
            aria-hidden="true"
          />

          <span>Back to profile</span>
        </Link>

        {/* HEADER CONTENT */}

        <div
          className="
            mt-5
            flex
            min-w-0
            flex-col
            gap-5

            sm:mt-7
            sm:gap-6

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          {/* TITLE */}

          <div
            className="
              min-w-0
              max-w-2xl
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#1256AF]/[0.07]
                text-[#1256AF]

                sm:h-11
                sm:w-11
              "
            >
              <Code2
                size={19}
                aria-hidden="true"
              />
            </div>

            <p
              className="
                mt-4
                break-words
                text-[10px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#1256AF]

                sm:mt-5
              "
            >
              Profile · Skills
            </p>

            <h1
              className="
                mt-2
                break-words
                text-3xl
                font-bold
                tracking-[-0.04em]
                text-slate-950

                [overflow-wrap:anywhere]

                sm:text-4xl
              "
            >
              Skills
            </h1>

            <p
              className="
                mt-3
                max-w-xl
                break-words
                text-sm
                leading-6
                text-slate-500

                [overflow-wrap:anywhere]
              "
            >
              Add the technical skills that represent
              what you can work with and keep your
              proficiency current as you grow.
            </p>
          </div>

          {/* SKILL COUNT */}

          <div
            className="
              w-full
              min-w-0
              rounded-2xl
              border
              border-slate-200
              bg-[#F8FAFC]
              px-4
              py-4

              sm:px-5

              md:w-auto
              md:min-w-44
            "
            aria-label={`${safeCount} ${
              safeCount === 1
                ? "technical skill"
                : "technical skills"
            }`}
          >
            <p
              className="
                break-words
                text-[10px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-slate-400
              "
            >
              Technical skills
            </p>

            <div
              className="
                mt-1
                flex
                min-w-0
                items-end
                gap-2
              "
            >
              <span
                className="
                  break-words
                  text-3xl
                  font-bold
                  tracking-[-0.05em]
                  text-[#1256AF]
                "
              >
                {safeCount}
              </span>

              <span
                className="
                  pb-1
                  text-xs
                  font-semibold
                  text-slate-500
                "
              >
                {safeCount === 1
                  ? "skill"
                  : "skills"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}