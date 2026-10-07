"use client";

import {
  LoaderCircle,
} from "lucide-react";

import type {
  AssessmentAttemptResponse,
  StudentAssessmentDetailResponse,
} from "@/types/assessment";

interface StudentAssessmentHeaderProps {
  assessment: StudentAssessmentDetailResponse;
  attempt: AssessmentAttemptResponse | null;
  savedCount: number;
  starting: boolean;
  onStart: () => void;
}

export default function StudentAssessmentHeader({
  assessment,
  attempt,
  savedCount,
  starting,
  onStart,
}: StudentAssessmentHeaderProps) {
  const attemptStarted =
    attempt !== null;

  const attemptEditable =
    attempt?.status === "IN_PROGRESS";

  const attemptSubmitted =
    attempt?.status === "SUBMITTED" ||
    attempt?.status === "GRADED";

  const totalQuestions =
    assessment.questions.length;

  const savedProgress =
    totalQuestions > 0
      ? Math.min(
          100,
          Math.round(
            (savedCount /
              totalQuestions) *
              100
          )
        )
      : 0;

  return (
    <section
      className="
        mt-5
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4

        sm:mt-6
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

          sm:flex-row
          sm:items-start
          sm:justify-between
          sm:gap-5
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
              text-[#1256AF]
            "
          >
            Assessment
          </p>

          <h1
            className="
              mt-2
              break-words
              text-2xl
              font-bold
              tracking-tight
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

        <AssessmentStatusBadge
          status={
            attempt
              ? attempt.status
              : assessment.status
          }
          hasAttempt={attempt !== null}
        />
      </div>

      {/* ASSESSMENT STATS */}

      <div
        className="
          mt-5
          grid
          min-w-0
          grid-cols-1
          gap-3

          sm:mt-6
          sm:grid-cols-3
          sm:gap-4
        "
      >
        <Stat
          label="Questions"
          value={totalQuestions}
        />

        <Stat
          label="Total Marks"
          value={
            assessment.totalMarks
          }
        />

        <Stat
          label="Duration"
          value={
            assessment.durationMinutes
              ? `${assessment.durationMinutes} min`
              : "No limit"
          }
        />
      </div>

      {/* NOT STARTED */}

      {!attemptStarted && (
        <div
          className="
            mt-6
            min-w-0
            border-t
            border-slate-100
            pt-5

            sm:pt-6
          "
        >
          <p
            className="
              break-words
              text-sm
              leading-6
              text-slate-600
            "
          >
            Start the assessment when you
            are ready.
          </p>

          <button
            type="button"
            disabled={starting}
            onClick={onStart}
            className="
              mt-4
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#1256AF]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition

              hover:bg-[#0E4895]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1256AF]/30
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:w-auto
            "
          >
            {starting && (
              <LoaderCircle
                size={16}
                className="animate-spin"
                aria-hidden="true"
              />
            )}

            {starting
              ? "Starting..."
              : "Start Assessment"}
          </button>
        </div>
      )}

      {/* IN PROGRESS */}

      {attemptEditable && (
        <div
          className="
            mt-6
            min-w-0
            overflow-hidden
            rounded-xl
            border
            border-amber-100
            bg-amber-50
            p-3.5

            sm:p-4
          "
        >
          <div
            className="
              flex
              min-w-0
              flex-col
              gap-1

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-4
            "
          >
            <div className="min-w-0">
              <p
                className="
                  font-semibold
                  text-amber-900
                "
              >
                Assessment in progress
              </p>

              <p
                className="
                  mt-1
                  break-words
                  text-sm
                  leading-6
                  text-amber-800
                "
              >
                {savedCount} of{" "}
                {totalQuestions} answers
                saved.
              </p>
            </div>

            <span
              className="
                w-fit
                shrink-0
                text-xs
                font-bold
                text-amber-800
              "
            >
              {savedProgress}% saved
            </span>
          </div>

          <div
            className="
              mt-3
              h-2
              w-full
              overflow-hidden
              rounded-full
              bg-amber-100
            "
            role="progressbar"
            aria-label="Assessment answers saved"
            aria-valuemin={0}
            aria-valuemax={
              totalQuestions
            }
            aria-valuenow={
              savedCount
            }
            aria-valuetext={`${savedCount} of ${totalQuestions} answers saved`}
          >
            <div
              className="
                h-full
                rounded-full
                bg-amber-500
                transition-[width]
                duration-300
              "
              style={{
                width: `${savedProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* SUBMITTED / GRADED */}

      {attemptSubmitted &&
        attempt && (
          <div
            className="
              mt-6
              min-w-0
              overflow-hidden
              rounded-xl
              border
              border-green-200
              bg-green-50
              p-3.5

              sm:p-4
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-col
                gap-1

                sm:flex-row
                sm:items-start
                sm:justify-between
                sm:gap-4
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    font-semibold
                    text-green-800
                  "
                >
                  {attempt.status ===
                  "GRADED"
                    ? "Assessment graded"
                    : "Assessment submitted"}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-green-700
                  "
                >
                  Status:{" "}
                  {formatStatus(
                    attempt.status
                  )}
                </p>
              </div>

              {attempt.score !==
                null && (
                <div
                  className="
                    mt-2
                    w-fit
                    shrink-0
                    rounded-lg
                    bg-white/70
                    px-3
                    py-2

                    sm:mt-0
                    sm:text-right
                  "
                >
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-green-700
                    "
                  >
                    Score
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      font-bold
                      text-green-900
                    "
                  >
                    {attempt.score} /{" "}
                    {
                      assessment.totalMarks
                    }
                  </p>
                </div>
              )}
            </div>

            {attempt.status ===
              "SUBMITTED" && (
              <p
                className="
                  mt-3
                  break-words
                  text-sm
                  leading-6
                  text-green-700
                "
              >
                Short-answer questions may
                still require instructor
                grading.
              </p>
            )}
          </div>
        )}
    </section>
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
        rounded-xl
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
          text-lg
          font-bold
          text-slate-950

          sm:text-xl
        "
      >
        {value}
      </p>
    </div>
  );
}

function AssessmentStatusBadge({
  status,
  hasAttempt,
}: {
  status: string;
  hasAttempt: boolean;
}) {
  const styles =
    !hasAttempt
      ? "bg-blue-100 text-blue-700"
      : status === "IN_PROGRESS"
        ? "bg-amber-100 text-amber-700"
        : status === "GRADED"
          ? "bg-green-100 text-green-700"
          : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`
        inline-flex
        w-fit
        shrink-0
        rounded-full
        px-3
        py-1
        text-xs
        font-bold

        ${styles}
      `}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(
  value: string
) {
  return value
    .split("_")
    .map(
      (part) =>
        part.charAt(0) +
        part
          .slice(1)
          .toLowerCase()
    )
    .join(" ");
}