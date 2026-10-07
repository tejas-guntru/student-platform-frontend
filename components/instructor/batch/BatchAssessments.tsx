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
      {/* HEADER */}

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
            <ClipboardCheck size={18} />
          </div>

          <div className="min-w-0">
            <h2
              className="
                break-words
                text-base
                font-bold
                text-slate-950

                sm:text-lg
              "
            >
              Assessments
            </h2>

            <p
              className="
                mt-1
                break-words
                text-sm
                leading-5
                text-slate-500
              "
            >
              Create tests and evaluate student
              understanding.
            </p>
          </div>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            bg-violet-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-violet-700
          "
          aria-label={`${assessments.length} assessments`}
        >
          {assessments.length}
        </span>
      </div>

      {/* CONTENT */}

      <div
        className="
          mt-6
          grid
          min-w-0
          gap-6

          xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]
        "
      >
        {/* ASSESSMENT LIST */}

        <div className="min-w-0">
          {assessments.length === 0 ? (
            <EmptyAssessments />
          ) : (
            <div
              className="
                min-w-0
                space-y-3
              "
            >
              {assessments.map(
                (assessment) => (
                  <Link
                    key={assessment.id}
                    href={`/instructor/batches/${batchId}/assessments/${assessment.id}`}
                    className="
                      group
                      block
                      min-w-0
                      overflow-hidden
                      rounded-xl
                      border
                      border-slate-200
                      p-3.5
                      transition-all

                      hover:border-blue-200
                      hover:bg-slate-50

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#1256AF]/30
                      focus-visible:ring-offset-2

                      sm:p-4
                    "
                  >
                    {/* TITLE + STATUS */}

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
                          min-w-0
                          flex-1
                        "
                      >
                        <h3
                          className="
                            break-words
                            font-semibold
                            leading-5
                            text-slate-950
                          "
                        >
                          {assessment.title}
                        </h3>

                        {assessment.description && (
                          <p
                            className="
                              mt-1.5
                              line-clamp-2
                              break-words
                              text-sm
                              leading-6
                              text-slate-500
                            "
                          >
                            {assessment.description}
                          </p>
                        )}
                      </div>

                      <AssessmentStatus
                        status={assessment.status}
                      />
                    </div>

                    {/* META */}

                    <div
                      className="
                        mt-4
                        flex
                        min-w-0
                        flex-wrap
                        items-center
                        gap-x-4
                        gap-y-2
                        text-xs
                        text-slate-500
                      "
                    >
                      <span
                        className="
                          inline-flex
                          min-w-0
                          items-center
                          gap-1.5
                        "
                      >
                        <Clock3
                          size={13}
                          className="shrink-0"
                        />

                        <span className="break-words">
                          {assessment.durationMinutes
                            ? `${assessment.durationMinutes} min`
                            : "No duration"}
                        </span>
                      </span>

                      <span
                        className="
                          inline-flex
                          min-w-0
                          items-center
                          gap-1.5
                        "
                      >
                        <Trophy
                          size={13}
                          className="shrink-0"
                        />

                        <span className="break-words">
                          {assessment.totalMarks}{" "}
                          marks
                        </span>
                      </span>

                      <span
                        className="
                          ml-auto
                          inline-flex
                          shrink-0
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-blue-50
                          px-2.5
                          py-1.5
                          font-semibold
                          text-[#1256AF]
                          transition-colors

                          group-hover:bg-blue-100
                        "
                      >
                        Manage

                        <ArrowRight
                          size={14}
                          className="
                            shrink-0
                            transition-transform

                            group-hover:translate-x-0.5
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

        {/* CREATE ASSESSMENT */}

        <div className="min-w-0">
          {children}
        </div>
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
        min-h-[210px]
        min-w-0
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-5
        text-center

        sm:min-h-[230px]
        sm:p-6
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
        <ClipboardCheck size={18} />
      </div>

      <p
        className="
          mt-3
          text-sm
          font-semibold
          text-slate-700
        "
      >
        No assessments yet
      </p>

      <p
        className="
          mt-1
          max-w-xs
          break-words
          text-xs
          leading-5
          text-slate-400
        "
      >
        Create a draft assessment and then
        add questions before publishing it.
      </p>
    </div>
  );
}