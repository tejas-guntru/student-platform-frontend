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

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleString("en-IN", {
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

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#1256AF]">
          <FileQuestion size={20} />
        </div>

        {completed ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            <CheckCircle2 size={13} />
            Graded
          </span>
        ) : submitted ? (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
            Awaiting grading
          </span>
        ) : inProgress ? (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1256AF]">
            In progress
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            Available
          </span>
        )}
      </div>

      <div className="mt-5 flex-1">
        <h2 className="text-lg font-bold tracking-tight text-slate-950">
          {assessment.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {assessment.description ||
            "Complete this assessment and track your progress."}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Clock3 size={14} />
              Duration
            </div>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {assessment.durationMinutes
                ? `${assessment.durationMinutes} min`
                : "No limit"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Trophy size={14} />
              Marks
            </div>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {assessment.totalMarks}
            </p>
          </div>
        </div>

        {(assessment.startsAt ||
          assessment.endsAt) && (
          <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
            <CalendarClock
              size={14}
              className="mt-0.5 shrink-0"
            />

            <span>
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

      <div className="mt-6 border-t border-slate-100 pt-4">
        {completed && attempt ? (
          <Link
            href={`/profile/assessments/${assessment.id}/attempt/${attempt.id}`}
            className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            View result
            <ArrowRight size={16} />
          </Link>
        ) : submitted && attempt ? (
          <Link
            href={`/profile/assessments/${assessment.id}/attempt/${attempt.id}`}
            className="flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700 transition hover:bg-amber-100"
          >
            View submission
            <ArrowRight size={16} />
          </Link>
        ) : inProgress && attempt ? (
          <Link
            href={`/profile/assessments/${assessment.id}/attempt/${attempt.id}`}
            className="flex items-center justify-between rounded-xl bg-[#1256AF] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0E4895]"
          >
            Resume assessment
            <ArrowRight size={16} />
          </Link>
        ) : (
          <Link
            href={`/profile/assessments/${assessment.id}`}
            className="flex items-center justify-between rounded-xl bg-[#1256AF] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0E4895]"
          >
            View assessment
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </article>
  );
}