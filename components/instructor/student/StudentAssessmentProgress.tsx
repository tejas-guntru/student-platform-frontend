import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentAssessmentProgressProps {
  assessments:
    InstructorStudentOverviewResponse["assessments"];
}

export default function StudentAssessmentProgress({
  assessments,
}: StudentAssessmentProgressProps) {
  return (
    <section
      id="assessments"
      className="
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        sm:p-6
      "
    >
      <Header count={assessments.length} />

      {assessments.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-5 space-y-3">
          {assessments.map(
            (assessment) => (
              <article
                key={
                  assessment.attemptId
                }
                className="
                  rounded-xl
                  border
                  border-slate-200
                  p-4
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div>
                    <h3
                      className="
                        font-semibold
                        text-slate-950
                      "
                    >
                      {assessment.title}
                    </h3>

                    <span
                      className="
                        mt-2
                        inline-flex
                        rounded-full
                        bg-slate-100
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-600
                      "
                    >
                      {formatEnum(
                        assessment.attemptStatus
                      )}
                    </span>
                  </div>

                  <div
                    className="
                      sm:text-right
                    "
                  >
                    <p
                      className="
                        text-lg
                        font-bold
                        text-slate-950
                      "
                    >
                      {assessment.score !==
                      null
                        ? `${assessment.score} / ${assessment.totalMarks}`
                        : `— / ${assessment.totalMarks}`}
                    </p>

                    {assessment.gradedAt && (
                      <p
                        className="
                          mt-1
                          inline-flex
                          items-center
                          gap-1
                          text-xs
                          text-slate-400
                        "
                      >
                        <CheckCircle2
                          size={12}
                        />

                        Graded{" "}
                        {formatDateTime(
                          assessment.gradedAt
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
}

function Header({
  count,
}: {
  count: number;
}) {
  return (
    <div
      className="
        flex
        items-start
        justify-between
        gap-4
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-violet-50
            text-violet-700
          "
        >
          <ClipboardCheck
            size={18}
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Assessments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Assessment attempts and grading
            performance.
          </p>
        </div>
      </div>

      <span
        className="
          rounded-full
          bg-violet-50
          px-2.5
          py-1
          text-xs
          font-bold
          text-violet-700
        "
      >
        {count}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="
        mt-5
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-6
        text-center
        text-sm
        text-slate-500
      "
    >
      No assessment attempts in this batch.
    </div>
  );
}

function formatEnum(
  value: string
) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function formatDateTime(
  value: string | null
) {
  if (!value) {
    return "—";
  }

  return new Date(
    value
  ).toLocaleString();
}