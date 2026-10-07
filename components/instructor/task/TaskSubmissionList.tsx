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
    <section
      className="
        mt-8
        min-w-0

        sm:mt-10
      "
    >
      {/* SECTION HEADER */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
          sm:gap-6
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
              break-words
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
              break-words
              text-xl
              font-bold
              tracking-tight
              text-slate-950

              sm:text-2xl
            "
          >
            Student Submissions
          </h2>

          <p
            className="
              mt-1
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-slate-500
            "
          >
            Review submitted work and provide
            feedback to students.
          </p>
        </div>

        {/* SUMMARY */}

        {submissions.length > 0 && (
          <div
            className="
              grid
              min-w-0
              grid-cols-3
              gap-2

              sm:flex
              sm:shrink-0
              sm:flex-wrap
              sm:justify-end
            "
            aria-label="Submission summary"
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

      {/* EMPTY STATE */}

      {submissions.length === 0 ? (
        <div
          className="
            mt-5
            flex
            min-w-0
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-4
            py-10
            text-center

            sm:px-6
            sm:py-12
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
              text-slate-400
            "
          >
            <Inbox
              size={21}
              aria-hidden="true"
            />
          </div>

          <h3
            className="
              mt-4
              break-words
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
              break-words
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
        /* SUBMISSION LIST */

        <div
          className="
            mt-5
            min-w-0
            space-y-4

            sm:space-y-5
          "
        >
          {submissions.map(
            (submission) => (
              <div
                key={submission.id}
                className="min-w-0"
              >
                <TaskSubmissionCard
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
              </div>
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
        min-w-0
        rounded-xl
        border
        border-slate-200
        bg-white
        px-2.5
        py-2
        text-center

        sm:px-3
        sm:text-left
      "
      aria-label={`${label}: ${value}`}
    >
      <span
        className="
          block
          break-words
          text-[10px]
          leading-4
          text-slate-400

          sm:inline
          sm:text-xs
        "
      >
        {label}
      </span>

      <span
        className="
          mt-0.5
          block
          break-words
          text-sm
          font-bold
          text-slate-900

          sm:ml-2
          sm:mt-0
          sm:inline
        "
      >
        {value}
      </span>
    </div>
  );
}