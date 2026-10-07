"use client";

interface AssessmentSubmitCardProps {
  savedCount: number;
  totalQuestions: number;
  submitting: boolean;
  onSubmit: () => void;
}

export default function AssessmentSubmitCard({
  savedCount,
  totalQuestions,
  submitting,
  onSubmit,
}: AssessmentSubmitCardProps) {
  const complete =
    savedCount === totalQuestions;

  const progress =
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
        mt-6
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4

        sm:mt-8
        sm:p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-2

          sm:flex-row
          sm:items-start
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
          <h2
            className="
              break-words
              text-lg
              font-semibold
              text-slate-950
            "
          >
            Submit Assessment
          </h2>

          <p
            className="
              mt-2
              break-words
              text-sm
              leading-6
              text-slate-600
            "
          >
            {savedCount} of{" "}
            {totalQuestions} answers have
            been saved.
          </p>
        </div>

        <span
          className={`
            w-fit
            shrink-0
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold

            ${
              complete
                ? "bg-green-50 text-green-700"
                : "bg-slate-100 text-slate-600"
            }
          `}
        >
          {complete
            ? "Ready to submit"
            : `${savedCount}/${totalQuestions} saved`}
        </span>
      </div>

      {/* PROGRESS */}

      <div className="mt-4 min-w-0">
        <div
          className="
            h-2
            w-full
            overflow-hidden
            rounded-full
            bg-slate-100
          "
          role="progressbar"
          aria-label="Saved answers"
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
              bg-[#1256AF]
              transition-[width]
              duration-300
            "
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* INCOMPLETE WARNING */}

      {!complete && (
        <div
          className="
            mt-4
            min-w-0
            rounded-lg
            border
            border-amber-100
            bg-amber-50
            p-3.5
            text-sm
            leading-6
            text-amber-800

            sm:p-4
          "
          role="note"
        >
          Save every answer before
          submitting the assessment.
        </div>
      )}

      {/* COMPLETE MESSAGE */}

      {complete && (
        <div
          className="
            mt-4
            min-w-0
            rounded-lg
            border
            border-green-100
            bg-green-50
            p-3.5
            text-sm
            leading-6
            text-green-800

            sm:p-4
          "
        >
          All answers are saved. You can
          now submit your assessment.
        </div>
      )}

      {/* SUBMIT */}

      <button
        type="button"
        disabled={
          submitting || !complete
        }
        onClick={onSubmit}
        className="
          mt-5
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
          focus-visible:ring-green-600/30
          focus-visible:ring-offset-2

          disabled:cursor-not-allowed
          disabled:opacity-50

          sm:w-auto
        "
      >
        {submitting
          ? "Submitting..."
          : "Submit Assessment"}
      </button>
    </section>
  );
}