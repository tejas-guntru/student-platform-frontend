"use client";

import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Trophy,
} from "lucide-react";
import Link from "next/link";

import type {
  AssessmentAttemptResponse,
  StudentAssessmentSummaryResponse,
} from "@/types/assessment";

interface AssessmentCardProps {
  assessment: StudentAssessmentSummaryResponse;
  attempt?: AssessmentAttemptResponse;
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return null;
  }

  return new Date(
    value
  ).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AssessmentCard({
  assessment,
  attempt,
}: AssessmentCardProps) {
  const completed =
    attempt?.status === "GRADED";

  const submitted =
    attempt?.status === "SUBMITTED";

  const inProgress =
    attempt?.status === "IN_PROGRESS";

  const assessmentHref =
    `/student/assessments/${assessment.id}`;

  const attemptHref = attempt
    ? `/student/assessments/${assessment.id}/attempt/${attempt.id}`
    : null;

  return (
    <article
      className="
        group
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition

        hover:-translate-y-0.5
        hover:shadow-md

        sm:rounded-3xl
        sm:p-6
      "
    >
      {/* STATUS HEADER */}

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
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-[#1256AF]

            sm:h-11
            sm:w-11
            sm:rounded-2xl
          "
        >
          <FileQuestion
            size={20}
            aria-hidden="true"
          />
        </div>

        {completed ? (
          <span
            className="
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              bg-emerald-50
              px-3
              py-1
              text-xs
              font-bold
              text-emerald-700
            "
          >
            <CheckCircle2
              size={13}
              aria-hidden="true"
            />

            Graded
          </span>
        ) : submitted ? (
          <span
            className="
              shrink-0
              rounded-full
              bg-amber-50
              px-3
              py-1
              text-xs
              font-bold
              text-amber-700
            "
          >
            Awaiting grading
          </span>
        ) : inProgress ? (
          <span
            className="
              shrink-0
              rounded-full
              bg-blue-50
              px-3
              py-1
              text-xs
              font-bold
              text-[#1256AF]
            "
          >
            In progress
          </span>
        ) : (
          <span
            className="
              shrink-0
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              font-bold
              text-slate-600
            "
          >
            Available
          </span>
        )}
      </div>

      {/* CONTENT */}

      <div
        className="
          mt-5
          min-w-0
          flex-1
        "
      >
        <h2
          className="
            break-words
            text-lg
            font-bold
            tracking-tight
            text-slate-950
          "
        >
          {assessment.title}
        </h2>

        <p
          className="
            mt-2
            line-clamp-2
            break-words
            text-sm
            leading-6
            text-slate-500
          "
        >
          {assessment.description ||
            "Complete this assessment and track your progress."}
        </p>

        {/* STATS */}

        <div
          className="
            mt-5
            grid
            min-w-0
            grid-cols-1
            gap-3

            sm:grid-cols-2
          "
        >
          <AssessmentStat
            icon={
              <Clock3
                size={14}
                aria-hidden="true"
              />
            }
            label="Duration"
            value={
              assessment.durationMinutes
                ? `${assessment.durationMinutes} min`
                : "No limit"
            }
          />

          <AssessmentStat
            icon={
              <Trophy
                size={14}
                aria-hidden="true"
              />
            }
            label="Marks"
            value={assessment.totalMarks}
          />
        </div>

        {/* SCHEDULE */}

        {(assessment.startsAt ||
          assessment.endsAt) && (
          <div
            className="
              mt-4
              flex
              min-w-0
              items-start
              gap-2
              text-xs
              leading-5
              text-slate-500
            "
          >
            <CalendarClock
              size={14}
              className="
                mt-0.5
                shrink-0
              "
              aria-hidden="true"
            />

            <span
              className="
                min-w-0
                break-words
              "
            >
              {assessment.startsAt &&
                `Starts ${formatDate(
                  assessment.startsAt
                )}`}

              {assessment.startsAt &&
                assessment.endsAt &&
                " · "}

              {assessment.endsAt &&
                `Ends ${formatDate(
                  assessment.endsAt
                )}`}
            </span>
          </div>
        )}
      </div>

      {/* ACTION */}

      <div
        className="
          mt-6
          border-t
          border-slate-100
          pt-4
        "
      >
        {completed &&
        attemptHref ? (
          <AssessmentLink
            href={attemptHref}
            variant="dark"
          >
            View result
          </AssessmentLink>
        ) : submitted &&
          attemptHref ? (
          <AssessmentLink
            href={attemptHref}
            variant="amber"
          >
            View submission
          </AssessmentLink>
        ) : inProgress &&
          attemptHref ? (
          <AssessmentLink
            href={attemptHref}
            variant="blue"
          >
            Resume assessment
          </AssessmentLink>
        ) : (
          <AssessmentLink
            href={assessmentHref}
            variant="blue"
          >
            View assessment
          </AssessmentLink>
        )}
      </div>
    </article>
  );
}

function AssessmentStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-2xl
        bg-slate-50
        p-3
      "
    >
      <div
        className="
          flex
          min-w-0
          items-center
          gap-2
          text-xs
          font-semibold
          text-slate-500
        "
      >
        <span className="shrink-0">
          {icon}
        </span>

        <span className="break-words">
          {label}
        </span>
      </div>

      <p
        className="
          mt-1
          break-words
          text-sm
          font-bold
          text-slate-900
        "
      >
        {value}
      </p>
    </div>
  );
}

function AssessmentLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant:
    | "blue"
    | "dark"
    | "amber";
  children: React.ReactNode;
}) {
  const styles =
    variant === "dark"
      ? "bg-slate-950 text-white hover:bg-slate-800"
      : variant === "amber"
        ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
        : "bg-[#1256AF] text-white hover:bg-[#0E4895]";

  return (
    <Link
      href={href}
      className={`
        flex
        min-h-11
        w-full
        min-w-0
        items-center
        justify-between
        gap-3
        rounded-xl
        px-4
        py-3
        text-sm
        font-bold
        transition

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1256AF]/30
        focus-visible:ring-offset-2

        ${styles}
      `}
    >
      <span
        className="
          min-w-0
          break-words
        "
      >
        {children}
      </span>

      <ArrowRight
        size={16}
        className="
          shrink-0
          transition-transform
          group-hover:translate-x-0.5
        "
        aria-hidden="true"
      />
    </Link>
  );
}