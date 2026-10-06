import {
  CheckCircle2,
  ExternalLink,
  FileText,
  MessageSquareText,
  UserRound,
} from "lucide-react";

import type {
  InstructorTaskSubmissionResponse,
} from "@/types/task";

interface TaskSubmissionCardProps {
  submission: InstructorTaskSubmissionResponse;
  feedback: string;
  reviewing: boolean;
  onFeedbackChange: (
    submissionId: string,
    value: string
  ) => void;
  onReview: (
    submissionId: string
  ) => void;
}

export default function TaskSubmissionCard({
  submission,
  feedback,
  reviewing,
  onFeedbackChange,
  onReview,
}: TaskSubmissionCardProps) {
  const reviewed =
    submission.status === "REVIEWED";

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      {/* STUDENT */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-100
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-6
        "
      >
        <div className="flex items-center gap-3">
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
            "
          >
            <UserRound size={18} />
          </div>

          <div>
            <h3
              className="
                font-bold
                text-slate-950
              "
            >
              {submission.studentName}
            </h3>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              Submitted{" "}
              {formatDateTime(
                submission.submittedAt
              )}
            </p>
          </div>
        </div>

        <StatusBadge reviewed={reviewed} />
      </div>

      <div className="p-5 sm:p-6">
        {/* SUBMISSION CONTENT */}

        <div>
          <SectionLabel
            icon={<FileText size={13} />}
          >
            Submission
          </SectionLabel>

          {submission.content ? (
            <div
              className="
                mt-3
                rounded-xl
                bg-slate-50
                p-4
              "
            >
              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-7
                  text-slate-700
                "
              >
                {submission.content}
              </p>
            </div>
          ) : (
            <p
              className="
                mt-3
                text-sm
                text-slate-400
              "
            >
              No written submission.
            </p>
          )}
        </div>

        {/* RESOURCE */}

        {submission.resourceUrl && (
          <div className="mt-5">
            <SectionLabel
              icon={
                <ExternalLink size={13} />
              }
            >
              Resource
            </SectionLabel>

            <a
              href={submission.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-3
                inline-flex
                max-w-full
                items-center
                gap-2
                break-all
                rounded-lg
                border
                border-blue-200
                bg-blue-50
                px-3
                py-2
                text-sm
                font-semibold
                text-[#1256AF]
                transition
                hover:bg-blue-100
              "
            >
              <ExternalLink
                className="shrink-0"
                size={14}
              />

              {submission.resourceUrl}
            </a>
          </div>
        )}

        {/* REVIEW */}

        <div
          className="
            mt-6
            border-t
            border-slate-100
            pt-5
          "
        >
          <SectionLabel
            icon={
              <MessageSquareText
                size={13}
              />
            }
          >
            Instructor Feedback
          </SectionLabel>

          <textarea
            id={`feedback-${submission.id}`}
            value={feedback}
            onChange={(event) =>
              onFeedbackChange(
                submission.id,
                event.target.value
              )
            }
            rows={4}
            placeholder="Give the student feedback on their work."
            className="
              mt-3
              w-full
              resize-none
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              text-slate-950
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50
            "
          />

          <div
            className="
              mt-3
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              {submission.reviewedAt && (
                <p
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-xs
                    text-slate-400
                  "
                >
                  <CheckCircle2 size={13} />

                  Last reviewed{" "}
                  {formatDateTime(
                    submission.reviewedAt
                  )}
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={reviewing}
              onClick={() =>
                onReview(submission.id)
              }
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-[#1256AF]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#0E478F]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {reviewing
                ? "Saving..."
                : reviewed
                  ? "Update Feedback"
                  : "Review Submission"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({
  reviewed,
}: {
  reviewed: boolean;
}) {
  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1.5
        text-xs
        font-bold

        ${
          reviewed
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }
      `}
    >
      {reviewed && (
        <CheckCircle2 size={13} />
      )}

      {reviewed
        ? "Reviewed"
        : "Submitted"}
    </span>
  );
}

function SectionLabel({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <p
      className="
        flex
        items-center
        gap-1.5
        text-[11px]
        font-bold
        uppercase
        tracking-[0.1em]
        text-slate-400
      "
    >
      {icon}
      {children}
    </p>
  );
}

function formatDateTime(
  value: string
) {
  return new Date(value).toLocaleString();
}