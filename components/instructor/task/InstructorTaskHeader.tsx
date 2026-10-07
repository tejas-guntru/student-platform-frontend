import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Clock3,
} from "lucide-react";

import type {
  TaskResponse,
} from "@/types/task";

interface InstructorTaskHeaderProps {
  batchId: string;
  task: TaskResponse;
  submissionCount: number;
}

export default function InstructorTaskHeader({
  batchId,
  task,
  submissionCount,
}: InstructorTaskHeaderProps) {
  return (
    <section className="min-w-0">
      {/* BACK */}

      <Link
        href={`/instructor/batches/${batchId}`}
        className="
          inline-flex
          min-h-10
          items-center
          gap-2
          rounded-lg
          text-sm
          font-semibold
          text-slate-500
          transition

          hover:text-[#1256AF]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#1256AF]/25
          focus-visible:ring-offset-2
        "
      >
        <ArrowLeft
          size={16}
          className="shrink-0"
          aria-hidden="true"
        />

        <span>Back to Batch</span>
      </Link>

      {/* HEADER CARD */}

      <div
        className="
          mt-4
          min-w-0
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white

          sm:mt-5
          sm:rounded-3xl
        "
      >
        <div
          className="
            min-w-0
            p-4

            sm:p-6

            lg:p-8
          "
        >
          <div
            className="
              flex
              min-w-0
              flex-col
              gap-5

              sm:gap-6

              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            {/* TASK DETAILS */}

            <div
              className="
                min-w-0
                max-w-3xl
                flex-1
              "
            >
              <div
                className="
                  inline-flex
                  max-w-full
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-[#1256AF]
                "
              >
                <ClipboardList
                  size={14}
                  className="shrink-0"
                  aria-hidden="true"
                />

                <span className="break-words">
                  Batch Task
                </span>
              </div>

              <h1
                className="
                  mt-4
                  break-words
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-950

                  [overflow-wrap:anywhere]

                  sm:text-3xl

                  lg:text-4xl
                "
              >
                {task.title}
              </h1>

              {task.description && (
                <p
                  className="
                    mt-4
                    max-w-full
                    whitespace-pre-wrap
                    break-words
                    text-sm
                    leading-7
                    text-slate-600

                    [overflow-wrap:anywhere]
                  "
                >
                  {task.description}
                </p>
              )}
            </div>

            {/* SUBMISSION COUNT */}

            <div
              className="
                min-w-0
                rounded-2xl
                bg-slate-50
                px-4
                py-4

                sm:px-5

                lg:min-w-40
                lg:shrink-0
              "
            >
              <p
                className="
                  break-words
                  text-xs
                  font-semibold
                  text-slate-400
                "
              >
                Submissions
              </p>

              <p
                className="
                  mt-1
                  break-words
                  text-3xl
                  font-bold
                  leading-tight
                  text-slate-950
                "
              >
                {submissionCount}
              </p>
            </div>
          </div>

          {/* TASK META */}

          <div
            className="
              mt-5
              flex
              min-w-0
              flex-col
              gap-2
              border-t
              border-slate-100
              pt-5

              sm:mt-6
              sm:flex-row
              sm:flex-wrap
              sm:gap-3
            "
          >
            <InfoTag
              icon={
                <CalendarDays
                  size={14}
                  aria-hidden="true"
                />
              }
              label="Due"
              value={
                task.dueAt
                  ? formatDateTime(
                      task.dueAt
                    )
                  : "No due date"
              }
            />

            <InfoTag
              icon={
                <Clock3
                  size={14}
                  aria-hidden="true"
                />
              }
              label="Created"
              value={formatDateTime(
                task.createdAt
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoTag({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        max-w-full
        items-start
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3
        py-2
        text-xs
        leading-5
        text-slate-600

        sm:w-fit
      "
    >
      <span
        className="
          mt-0.5
          shrink-0
          text-[#1256AF]
        "
      >
        {icon}
      </span>

      <div
        className="
          min-w-0
          break-words
        "
      >
        <span className="font-semibold">
          {label}:
        </span>{" "}
        <span
          className="
            [overflow-wrap:anywhere]
          "
        >
          {value}
        </span>
      </div>
    </div>
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