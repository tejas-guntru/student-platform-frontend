import {
  CheckCircle2,
  ClipboardCheck,
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
        min-w-0
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-6
      "
    >
      <Header count={assessments.length} />

      {assessments.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="
            mt-5
            min-w-0
            space-y-3
          "
        >
          {assessments.map(
            (assessment) => (
              <article
                key={
                  assessment.attemptId
                }
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-slate-200
                  p-4

                  sm:p-5
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    flex-col
                    gap-4

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:gap-6
                  "
                >
                  {/* ASSESSMENT */}

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <h3
                      className="
                        break-words
                        font-semibold
                        leading-6
                        text-slate-950

                        [overflow-wrap:anywhere]
                      "
                    >
                      {assessment.title}
                    </h3>

                    <span
                      className="
                        mt-2
                        inline-flex
                        max-w-full
                        items-center
                        rounded-full
                        bg-slate-100
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        uppercase
                        leading-4
                        tracking-wide
                        text-slate-600
                      "
                    >
                      <span
                        className="
                          break-words

                          [overflow-wrap:anywhere]
                        "
                      >
                        {formatEnum(
                          assessment.attemptStatus
                        )}
                      </span>
                    </span>
                  </div>

                  {/* SCORE */}

                  <div
                    className="
                      min-w-0
                      border-t
                      border-slate-100
                      pt-3

                      sm:shrink-0
                      sm:border-t-0
                      sm:pt-0
                      sm:text-right
                    "
                  >
                    <p
                      className="
                        break-words
                        text-lg
                        font-bold
                        leading-6
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
                          flex
                          min-w-0
                          items-start
                          gap-1.5
                          text-xs
                          leading-5
                          text-slate-400

                          sm:justify-end
                        "
                      >
                        <CheckCircle2
                          size={12}
                          className="
                            mt-1
                            shrink-0
                          "
                          aria-hidden="true"
                        />

                        <span className="break-words">
                          Graded{" "}
                          {formatDateTime(
                            assessment.gradedAt
                          )}
                        </span>
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
        min-w-0
        items-start
        justify-between
        gap-3

        sm:gap-4
      "
    >
      <div
        className="
          flex
          min-w-0
          flex-1
          items-start
          gap-3
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
            bg-violet-50
            text-violet-700
          "
        >
          <ClipboardCheck
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
          <h2
            className="
              break-words
              text-lg
              font-bold
              text-slate-950
            "
          >
            Assessments
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
            Assessment attempts and grading
            performance.
          </p>
        </div>
      </div>

      <span
        className="
          inline-flex
          min-w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-violet-50
          px-2.5
          py-1
          text-xs
          font-bold
          text-violet-700
        "
        aria-label={`${count} assessment attempts`}
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
        min-w-0
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        px-4
        py-6
        text-center

        sm:px-6
      "
    >
      <p
        className="
          break-words
          text-sm
          font-medium
          leading-6
          text-slate-500
        "
      >
        No assessment attempts in this batch.
      </p>
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

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
}