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

  const rawPercentage =
    completion.percentage;

  const percentage =
    Number.isFinite(rawPercentage)
      ? Math.min(
          100,
          Math.max(
            0,
            rawPercentage
          )
        )
      : 0;

  const roundedPercentage =
    Math.round(percentage);

  const missingCount =
    completion.missingItems.length;

  const isComplete =
    missingCount === 0;

  const nextStep =
    getNextStep(completion);

  return (
    <section
      className="
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-6
      "
      aria-labelledby="profile-progress-title"
    >
      {/* TOP */}

      <div
        className="
          flex
          min-w-0
          items-start
          justify-between
          gap-3

          sm:items-center
          sm:gap-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-start
            gap-3

            sm:items-center
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
                aria-hidden="true"
              />
            ) : (
              <CircleUserRound
                size={16}
                aria-hidden="true"
              />
            )}
          </div>

          <div className="min-w-0">
            <h2
              id="profile-progress-title"
              className="
                break-words
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
                break-words
                text-xs
                leading-5
                text-slate-500
              "
            >
              {isComplete
                ? "You're all set."
                : `${missingCount} ${
                    missingCount === 1
                      ? "thing"
                      : "things"
                  } left`}
            </p>
          </div>
        </div>

        {/* PERCENTAGE */}

        <p
          className={`
            shrink-0
            text-lg
            font-bold
            tracking-[-0.03em]

            sm:text-xl

            ${
              isComplete
                ? "text-emerald-600"
                : "text-[#1256AF]"
            }
          `}
        >
          {roundedPercentage}%
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
        role="progressbar"
        aria-label="Profile completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={
          roundedPercentage
        }
        aria-valuetext={`${roundedPercentage}% complete`}
      >
        <div
          className={`
            h-full
            rounded-full
            transition-[width]
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
              min-w-0
              flex-col
              gap-3
              border-t
              border-slate-100
              pt-4

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-4
            "
          >
            <p
              className="
                min-w-0
                break-words
                text-xs
                leading-5
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
              href={nextStep.href}
              className="
                group
                inline-flex
                min-h-10
                w-full
                shrink-0
                items-center
                justify-center
                gap-1.5
                rounded-lg
                text-xs
                font-bold
                text-[#1256AF]
                transition-colors

                hover:bg-[#1256AF]/[0.05]
                hover:text-[#0F4B99]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/25
                focus-visible:ring-offset-2

                sm:w-auto
                sm:px-3
              "
            >
              Continue

              <ArrowRight
                size={13}
                className="
                  shrink-0
                  transition-transform

                  group-hover:translate-x-0.5
                "
                aria-hidden="true"
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