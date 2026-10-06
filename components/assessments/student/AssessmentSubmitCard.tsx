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

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-950">
        Submit Assessment
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        {savedCount} of{" "}
        {totalQuestions} answers have been
        saved.
      </p>

      {!complete && (
        <div className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          Save every answer before
          submitting the assessment.
        </div>
      )}

      <button
        type="button"
        disabled={
          submitting || !complete
        }
        onClick={onSubmit}
        className="
          mt-5
          rounded-lg
          bg-green-600
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {submitting
          ? "Submitting..."
          : "Submit Assessment"}
      </button>
    </section>
  );
}