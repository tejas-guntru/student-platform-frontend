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
    <section>
      <Link
        href={`/instructor/batches/${batchId}`}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-500
          transition
          hover:text-[#1256AF]
        "
      >
        <ArrowLeft size={16} />
        Back to Batch
      </Link>

      <div
        className="
          mt-5
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
        "
      >
        <div className="p-6 sm:p-8">
          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            <div className="max-w-3xl">
              <div
                className="
                  inline-flex
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
                <ClipboardList size={14} />
                Batch Task
              </div>

              <h1
                className="
                  mt-4
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  sm:text-3xl
                "
              >
                {task.title}
              </h1>

              {task.description && (
                <p
                  className="
                    mt-4
                    whitespace-pre-wrap
                    text-sm
                    leading-7
                    text-slate-600
                  "
                >
                  {task.description}
                </p>
              )}
            </div>

            <div
              className="
                shrink-0
                rounded-2xl
                bg-slate-50
                px-5
                py-4
                lg:min-w-40
              "
            >
              <p
                className="
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
                  text-3xl
                  font-bold
                  text-slate-950
                "
              >
                {submissionCount}
              </p>
            </div>
          </div>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-3
              border-t
              border-slate-100
              pt-5
            "
          >
            <InfoTag
              icon={
                <CalendarDays size={14} />
              }
              label="Due"
              value={
                task.dueAt
                  ? formatDateTime(task.dueAt)
                  : "No due date"
              }
            />

            <InfoTag
              icon={<Clock3 size={14} />}
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
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3
        py-2
        text-xs
        text-slate-600
      "
    >
      <span className="text-[#1256AF]">
        {icon}
      </span>

      <span className="font-semibold">
        {label}:
      </span>

      <span>{value}</span>
    </div>
  );
}

function formatDateTime(
  value: string
) {
  return new Date(value).toLocaleString();
}