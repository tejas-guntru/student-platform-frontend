"use client";

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

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-blue-700">
            Assessment
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            {assessment.title}
          </h1>

          {assessment.description && (
            <p className="mt-3 max-w-2xl text-slate-600">
              {assessment.description}
            </p>
          )}
        </div>

        <span
          className={`
            w-fit rounded-full px-3 py-1 text-xs font-bold
            ${
              !attempt
                ? "bg-blue-100 text-blue-700"
                : attempt.status ===
                    "IN_PROGRESS"
                  ? "bg-amber-100 text-amber-700"
                  : attempt.status ===
                      "GRADED"
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-700"
            }
          `}
        >
          {!attempt
            ? assessment.status
            : attempt.status}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Questions"
          value={assessment.questions.length}
        />

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
      </div>

      {!attemptStarted && (
        <div className="mt-6 border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-600">
            Start the assessment when you
            are ready.
          </p>

          <button
            type="button"
            disabled={starting}
            onClick={onStart}
            className="
              mt-4
              rounded-lg
              bg-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              disabled:opacity-50
            "
          >
            {starting
              ? "Starting..."
              : "Start Assessment"}
          </button>
        </div>
      )}

      {attemptEditable && (
        <div className="mt-6 rounded-lg bg-amber-50 p-4">
          <p className="font-semibold text-amber-900">
            Assessment in progress
          </p>

          <p className="mt-1 text-sm text-amber-800">
            {savedCount} of{" "}
            {assessment.questions.length}{" "}
            answers saved.
          </p>
        </div>
      )}

      {attemptSubmitted && attempt && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-800">
            Assessment submitted
          </p>

          <p className="mt-1 text-sm text-green-700">
            Status: {attempt.status}
          </p>

          {attempt.score !== null && (
            <p className="mt-2 text-sm font-semibold text-green-800">
              Current score:{" "}
              {attempt.score} /{" "}
              {assessment.totalMarks}
            </p>
          )}

          {attempt.status ===
            "SUBMITTED" && (
            <p className="mt-2 text-sm text-green-700">
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
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}