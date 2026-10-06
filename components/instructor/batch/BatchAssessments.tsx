import Link from "next/link";

import {
  ArrowRight,
  ClipboardCheck,
  Clock3,
  Trophy,
} from "lucide-react";

import type {
  AssessmentResponse,
} from "@/types/assessment";

interface BatchAssessmentsProps {
  batchId: string;
  assessments: AssessmentResponse[];
  children: React.ReactNode;
}

export default function BatchAssessments({
  batchId,
  assessments,
  children,
}: BatchAssessmentsProps) {
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
      <div className="flex items-start justify-between gap-4">
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
              Create tests and evaluate student
              understanding.
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
          {assessments.length}
        </span>
      </div>

      <div
        className="
          mt-6
          grid
          gap-6

          xl:grid-cols-[1.15fr_0.85fr]
        "
      >
        <div>
          {assessments.length === 0 ? (
            <EmptyAssessments />
          ) : (
            <div className="space-y-3">
              {assessments.map(
                (assessment) => (
                  <Link
                    key={
                      assessment.id
                    }
                    href={`/instructor/batches/${batchId}/assessments/${assessment.id}`}
                    className="
                      group
                      block
                      rounded-xl
                      border
                      border-slate-200
                      p-4
                      transition-all

                      hover:border-blue-200
                      hover:bg-slate-50
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div className="min-w-0">
                        <h3
                          className="
                            font-semibold
                            text-slate-950
                          "
                        >
                          {
                            assessment.title
                          }
                        </h3>

                        {assessment.description && (
                          <p
                            className="
                              mt-1.5
                              line-clamp-2
                              text-sm
                              leading-6
                              text-slate-500
                            "
                          >
                            {
                              assessment.description
                            }
                          </p>
                        )}
                      </div>

                      <AssessmentStatus
                        status={
                          assessment.status
                        }
                      />
                    </div>

                    <div
                      className="
                        mt-4
                        flex
                        flex-wrap
                        items-center
                        gap-4
                        text-xs
                        text-slate-500
                      "
                    >
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                        "
                      >
                        <Clock3
                          size={13}
                        />

                        {assessment.durationMinutes
                          ? `${assessment.durationMinutes} min`
                          : "No duration"}
                      </span>

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                        "
                      >
                        <Trophy
                          size={13}
                        />

                        {
                          assessment.totalMarks
                        }{" "}
                        marks
                      </span>

                      <span
                        className="
                          ml-auto
                          inline-flex
                          items-center
                          gap-1
                          font-semibold
                          text-[#1256AF]
                        "
                      >
                        Manage

                        <ArrowRight
                          size={14}
                          className="
                            transition-transform

                            group-hover:translate-x-1
                          "
                        />
                      </span>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
}

function AssessmentStatus({
  status,
}: {
  status: AssessmentResponse["status"];
}) {
  const styles =
    status === "PUBLISHED"
      ? "bg-green-50 text-green-700"
      : status === "DRAFT"
        ? "bg-slate-100 text-slate-600"
        : "bg-red-50 text-red-700";

  return (
    <span
      className={`
        shrink-0
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-bold
        uppercase
        tracking-wide
        ${styles}
      `}
    >
      {status}
    </span>
  );
}

function EmptyAssessments() {
  return (
    <div
      className="
        flex
        min-h-[230px]
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-6
        text-center
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-white
          text-slate-400
        "
      >
        <ClipboardCheck
          size={18}
        />
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-700">
        No assessments yet
      </p>

      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
        Create a draft assessment and then
        add questions before publishing it.
      </p>
    </div>
  );
}