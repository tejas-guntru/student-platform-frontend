import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  CircleUserRound,
} from "lucide-react";

import type {
  ProfileCompletion,
} from "@/services/profileCompletionService";

interface ProfileCompletionSectionProps {
  completion:
    | ProfileCompletion
    | null;
}

export default function ProfileCompletionSection({
  completion,
}: ProfileCompletionSectionProps) {
  if (!completion) {
    return null;
  }

  const percentage =
    Math.min(
      100,
      Math.max(
        0,
        completion.percentage
      )
    );

  const isComplete =
    completion.missingItems.length ===
    0;

  const nextStep =
    getNextStep(completion);

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5

        sm:p-6
      "
    >
      {/* TOP */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl

              ${
                isComplete
                  ? `
                    bg-emerald-50
                    text-emerald-600
                  `
                  : `
                    bg-[#1256AF]/[0.07]
                    text-[#1256AF]
                  `
              }
            `}
          >
            {isComplete ? (
              <CheckCircle2
                size={16}
              />
            ) : (
              <CircleUserRound
                size={16}
              />
            )}
          </div>

          <div>
            <h2
              className="
                text-sm
                font-bold
                text-slate-900
              "
            >
              Profile progress
            </h2>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-500
              "
            >
              {isComplete
                ? "You're all set."
                : `${
                    completion
                      .missingItems
                      .length
                  } ${
                    completion
                      .missingItems
                      .length === 1
                      ? "thing"
                      : "things"
                  } left`}
            </p>
          </div>
        </div>

        {/* PERCENTAGE */}

        <p
          className={`
            text-xl
            font-bold
            tracking-[-0.03em]

            ${
              isComplete
                ? "text-emerald-600"
                : "text-[#1256AF]"
            }
          `}
        >
          {percentage}%
        </p>
      </div>

      {/* PROGRESS */}

      <div
        className="
          mt-5
          h-2
          overflow-hidden
          rounded-full
          bg-slate-100
        "
      >
        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-500

            ${
              isComplete
                ? "bg-emerald-500"
                : "bg-[#1256AF]"
            }
          `}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {/* ACTION */}

      {!isComplete &&
        nextStep && (
          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <p
              className="
                truncate
                text-xs
                text-slate-500
              "
            >
              Next:{" "}
              <span
                className="
                  font-semibold
                  text-slate-700
                "
              >
                {nextStep.label}
              </span>
            </p>

            <Link
              href={
                nextStep.href
              }
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-1.5
                text-xs
                font-bold
                text-[#1256AF]
                transition-colors

                hover:text-[#0F4B99]
              "
            >
              Continue

              <ArrowRight
                size={13}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        )}
    </section>
  );
}

/* =========================================================
   NEXT STEP
========================================================= */

function getNextStep(
  completion: ProfileCompletion
) {
  if (
    !completion.fullNameComplete ||
    !completion.contactComplete ||
    !completion.academicsComplete ||
    !completion.collegeComplete ||
    !completion.careerComplete
  ) {
    return {
      label: "Basic information",
      href: "#basic-profile",
    };
  }

  if (!completion.skillsComplete) {
    return {
      label: "Skills",
      href: "/profile/skills",
    };
  }

  if (!completion.projectsComplete) {
    return {
      label: "Projects",
      href: "/profile/projects",
    };
  }

  if (
    !completion
      .codingProfilesComplete
  ) {
    return {
      label: "Coding profile",
      href: "/coding-profiles",
    };
  }

  return null;
}