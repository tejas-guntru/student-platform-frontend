import {
  CalendarDays,
  CheckCircle2,
  ListTodo,
  MessageSquareText,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentTaskProgressProps {
  tasks:
    InstructorStudentOverviewResponse["tasks"];
}

export default function StudentTaskProgress({
  tasks,
}: StudentTaskProgressProps) {
  return (
    <section
      id="tasks"
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
              bg-cyan-50
              text-cyan-700
            "
          >
            <ListTodo size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Assigned work and submission
              progress.
            </p>
          </div>
        </div>

        <span
          className="
            rounded-full
            bg-cyan-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-cyan-700
          "
        >
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-5 space-y-3">
          {tasks.map((task) => (
            <article
              key={task.taskId}
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
                  gap-3
                  sm:flex-row
                  sm:items-start
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
                    {task.title}
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
                    {task.submissionStatus
                      ? formatEnum(
                          task.submissionStatus
                        )
                      : "Not Submitted"}
                  </span>
                </div>

                {task.dueAt && (
                  <p
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      text-slate-400
                    "
                  >
                    <CalendarDays
                      size={13}
                    />

                    Due{" "}
                    {formatDateTime(
                      task.dueAt
                    )}
                  </p>
                )}
              </div>

              {task.submittedAt && (
                <p
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-1.5
                    text-xs
                    text-emerald-600
                  "
                >
                  <CheckCircle2
                    size={13}
                  />

                  Submitted{" "}
                  {formatDateTime(
                    task.submittedAt
                  )}
                </p>
              )}

              {task.feedback && (
                <div
                  className="
                    mt-4
                    rounded-xl
                    bg-slate-50
                    p-4
                  "
                >
                  <p
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-slate-400
                    "
                  >
                    <MessageSquareText
                      size={12}
                    />
                    Instructor Feedback
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-600
                    "
                  >
                    {task.feedback}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
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
      No tasks assigned to this batch.
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