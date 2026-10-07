"use client";

import type {
  AssessmentResponse,
} from "@/types/assessment";

interface InstructorAssessmentHeaderProps {
  assessment: AssessmentResponse;
  publishing: boolean;
  onPublish: () => void;
}

export default function InstructorAssessmentHeader({
  assessment,
  publishing,
  onPublish,
}: InstructorAssessmentHeaderProps) {
  const isDraft =
    assessment.status === "DRAFT";

  return (
    <section
      className="
        min-w-0
        overflow-hidden
        rounded-xl
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
          flex-col
          gap-4

          md:flex-row
          md:items-start
          md:justify-between
          md:gap-5
        "
      >
        <div
          className="
            min-w-0
            flex-1
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-blue-700
            "
          >
            Instructor Assessment
          </p>

          <h1
            className="
              mt-2
              break-words
              text-2xl
              font-bold
              leading-tight
              text-slate-950

              sm:text-3xl
            "
          >
            {assessment.title}
          </h1>

          {assessment.description && (
            <p
              className="
                mt-3
                max-w-2xl
                break-words
                text-sm
                leading-6
                text-slate-600

                sm:text-base
                sm:leading-7
              "
            >
              {assessment.description}
            </p>
          )}
        </div>

        <AssessmentStatus
          status={assessment.status}
        />
      </div>

      {/* STATS */}

      <div
        className="
          mt-6
          grid
          min-w-0
          grid-cols-1
          gap-3

          sm:grid-cols-3
          sm:gap-4
        "
      >
        <Stat
          label="Total Marks"
          value={assessment.totalMarks}
        />

        <Stat
          label="Duration"
          value={
            assessment.durationMinutes
              ? `${assessment.durationMinutes} min`
              : "No limit"
          }
        />

        <Stat
          label="Status"
          value={assessment.status}
        />
      </div>

      {/* PUBLISH */}

      {isDraft && (
        <div
          className="
            mt-6
            border-t
            border-slate-100
            pt-5

            sm:pt-6
          "
        >
          <button
            type="button"
            disabled={publishing}
            onClick={onPublish}
            className="
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              rounded-lg
              bg-green-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-colors

              hover:bg-green-700

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-green-300
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:w-auto
            "
          >
            {publishing
              ? "Publishing..."
              : "Publish Assessment"}
          </button>
        </div>
      )}
    </section>
  );
}

function AssessmentStatus({
  status,
}: {
  status: AssessmentResponse["status"];
}) {
  const styles =
    status === "PUBLISHED"
      ? "bg-green-100 text-green-700"
      : status === "CLOSED"
        ? "bg-slate-200 text-slate-700"
        : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`
        w-fit
        shrink-0
        rounded-full
        px-3
        py-1.5
        text-xs
        font-bold
        uppercase
        tracking-wide
        ${styles}
      `}
    >
      {status}
    </span>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-lg
        bg-slate-50
        p-3.5

        sm:p-4
      "
    >
      <p
        className="
          break-words
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          break-words
          text-base
          font-bold
          text-slate-950

          sm:text-lg
        "
      >
        {value}
      </p>
    </div>
  );
}