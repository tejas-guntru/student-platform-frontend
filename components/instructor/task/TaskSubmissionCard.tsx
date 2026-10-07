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
        min-w-0
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
          min-w-0
          flex-col
          gap-4
          border-b
          border-slate-100
          p-4

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-6
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            items-start
            gap-3

            sm:items-center
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
            "
          >
            <UserRound
              size={18}
              aria-hidden="true"
            />
          </div>

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <h3
              className="
                break-words
                font-bold
                leading-6
                text-slate-950

                [overflow-wrap:anywhere]
              "
            >
              {submission.studentName}
            </h3>

            <p
              className="
                mt-1
                break-words
                text-xs
                leading-5
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

      <div
        className="
          min-w-0
          p-4

          sm:p-6
        "
      >
        {/* SUBMISSION CONTENT */}

        <div className="min-w-0">
          <SectionLabel
            icon={
              <FileText
                size={13}
                aria-hidden="true"
              />
            }
          >
            Submission
          </SectionLabel>

          {submission.content ? (
            <div
              className="
                mt-3
                min-w-0
                rounded-xl
                bg-slate-50
                p-3

                sm:p-4
              "
            >
              <p
                className="
                  max-w-full
                  whitespace-pre-wrap
                  break-words
                  text-sm
                  leading-7
                  text-slate-700

                  [overflow-wrap:anywhere]
                "
              >
                {submission.content}
              </p>
            </div>
          ) : (
            <p
              className="
                mt-3
                break-words
                text-sm
                leading-6
                text-slate-400
              "
            >
              No written submission.
            </p>
          )}
        </div>

        {/* RESOURCE */}

        {submission.resourceUrl && (
          <div
            className="
              mt-5
              min-w-0
            "
          >
            <SectionLabel
              icon={
                <ExternalLink
                  size={13}
                  aria-hidden="true"
                />
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
                flex
                min-h-11
                w-full
                min-w-0
                items-center
                gap-2
                rounded-lg
                border
                border-blue-200
                bg-blue-50
                px-3
                py-2.5
                text-sm
                font-semibold
                text-[#1256AF]
                transition

                hover:bg-blue-100

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/25
                focus-visible:ring-offset-2

                sm:w-fit
                sm:max-w-full
              "
            >
              <ExternalLink
                className="shrink-0"
                size={14}
                aria-hidden="true"
              />

              <span
                className="
                  min-w-0
                  break-all
                "
              >
                {submission.resourceUrl}
              </span>

              <span className="sr-only">
                (opens in a new tab)
              </span>
            </a>
          </div>
        )}

        {/* REVIEW */}

        <div
          className="
            mt-6
            min-w-0
            border-t
            border-slate-100
            pt-5
          "
        >
          <SectionLabel
            icon={
              <MessageSquareText
                size={13}
                aria-hidden="true"
              />
            }
          >
            Instructor Feedback
          </SectionLabel>

          <label
            htmlFor={`feedback-${submission.id}`}
            className="sr-only"
          >
            Feedback for{" "}
            {submission.studentName}
          </label>

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
            disabled={reviewing}
            placeholder="Give the student feedback on their work."
            className="
              mt-3
              min-h-28
              w-full
              min-w-0
              resize-y
              rounded-xl
              border
              border-slate-300
              bg-white
              px-3
              py-3
              text-sm
              leading-6
              text-slate-950
              outline-none
              transition
              placeholder:text-slate-400

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50

              disabled:cursor-not-allowed
              disabled:bg-slate-50
              disabled:text-slate-500

              sm:px-4
            "
          />

          <div
            className="
              mt-3
              flex
              min-w-0
              flex-col
              gap-3

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-4
            "
          >
            <div
              className="
                min-w-0
                flex-1
              "
            >
              {submission.reviewedAt && (
                <p
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-1.5
                    text-xs
                    leading-5
                    text-slate-400
                  "
                >
                  <CheckCircle2
                    size={13}
                    className="
                      mt-1
                      shrink-0
                    "
                    aria-hidden="true"
                  />

                  <span className="break-words">
                    Last reviewed{" "}
                    {formatDateTime(
                      submission.reviewedAt
                    )}
                  </span>
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
                min-h-11
                w-full
                shrink-0
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

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/30
                focus-visible:ring-offset-2

                disabled:cursor-not-allowed
                disabled:opacity-50

                sm:w-auto
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
        max-w-full
        shrink-0
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
        <CheckCircle2
          size={13}
          className="shrink-0"
          aria-hidden="true"
        />
      )}

      <span className="break-words">
        {reviewed
          ? "Reviewed"
          : "Submitted"}
      </span>
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
        min-w-0
        items-center
        gap-1.5
        text-[11px]
        font-bold
        uppercase
        leading-4
        tracking-[0.1em]
        text-slate-400
      "
    >
      <span className="shrink-0">
        {icon}
      </span>

      <span className="break-words">
        {children}
      </span>
    </p>
  );
}

function formatDateTime(
  value: string
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
}