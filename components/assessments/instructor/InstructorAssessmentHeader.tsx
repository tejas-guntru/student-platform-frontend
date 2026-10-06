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
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div>
          <p className="text-sm font-semibold text-blue-700">
            Instructor Assessment
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
          className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
            assessment.status ===
            "PUBLISHED"
              ? "bg-green-100 text-green-700"
              : assessment.status ===
                  "CLOSED"
                ? "bg-slate-200 text-slate-700"
                : "bg-amber-100 text-amber-700"
          }`}
        >
          {assessment.status}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
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

      {isDraft && (
        <div className="mt-6 border-t border-slate-100 pt-6">
          <button
            type="button"
            disabled={publishing}
            onClick={onPublish}
            className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
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

      <p className="mt-2 text-lg font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}