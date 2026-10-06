import {
  Inbox,
} from "lucide-react";

import TaskSubmissionCard from "./TaskSubmissionCard";

import type {
  InstructorTaskSubmissionResponse,
} from "@/types/task";

interface TaskSubmissionListProps {
  submissions:
    InstructorTaskSubmissionResponse[];

  feedback: Record<string, string>;

  reviewingId: string | null;

  onFeedbackChange: (
    submissionId: string,
    value: string
  ) => void;

  onReview: (
    submissionId: string
  ) => void;
}

export default function TaskSubmissionList({
  submissions,
  feedback,
  reviewingId,
  onFeedbackChange,
  onReview,
}: TaskSubmissionListProps) {
  const reviewedCount =
    submissions.filter(
      (submission) =>
        submission.status === "REVIEWED"
    ).length;

  const pendingCount =
    submissions.length - reviewedCount;

  return (
    <section className="mt-10">
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#1256AF]
            "
          >
            Student Work
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-tight
              text-slate-950
            "
          >
            Student Submissions
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Review submitted work and provide
            feedback to students.
          </p>
        </div>

        {submissions.length > 0 && (
          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            <SummaryBadge
              label="Total"
              value={submissions.length}
            />

            <SummaryBadge
              label="Pending"
              value={pendingCount}
            />

            <SummaryBadge
              label="Reviewed"
              value={reviewedCount}
            />
          </div>
        )}
      </div>

      {submissions.length === 0 ? (
        <div
          className="
            mt-5
            flex
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-6
            py-12
            text-center
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
              text-slate-400
            "
          >
            <Inbox size={21} />
          </div>

          <h3
            className="
              mt-4
              font-semibold
              text-slate-900
            "
          >
            No submissions yet
          </h3>

          <p
            className="
              mt-1
              max-w-sm
              text-sm
              leading-6
              text-slate-500
            "
          >
            Student submissions for this task
            will appear here when they are
            submitted.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {submissions.map(
            (submission) => (
              <TaskSubmissionCard
                key={submission.id}
                submission={submission}
                feedback={
                  feedback[
                    submission.id
                  ] ?? ""
                }
                reviewing={
                  reviewingId ===
                  submission.id
                }
                onFeedbackChange={
                  onFeedbackChange
                }
                onReview={onReview}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

function SummaryBadge({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3
        py-2
      "
    >
      <span
        className="
          text-xs
          text-slate-400
        "
      >
        {label}
      </span>

      <span
        className="
          ml-2
          text-sm
          font-bold
          text-slate-900
        "
      >
        {value}
      </span>
    </div>
  );
}