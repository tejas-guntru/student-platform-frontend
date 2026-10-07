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
              bg-cyan-50
              text-cyan-700
            "
          >
            <ListTodo
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
              Tasks
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
              Assigned work and submission
              progress.
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
            bg-cyan-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-cyan-700
          "
          aria-label={`${tasks.length} tasks`}
        >
          {tasks.length}
        </span>
      </div>

      {/* TASKS */}

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="
            mt-5
            min-w-0
            space-y-3
          "
        >
          {tasks.map((task) => (
            <article
              key={task.taskId}
              className="
                min-w-0
                rounded-xl
                border
                border-slate-200
                p-4

                sm:p-5
              "
            >
              {/* TASK HEADER */}

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3

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
                  <h3
                    className="
                      break-words
                      font-semibold
                      leading-6
                      text-slate-950

                      [overflow-wrap:anywhere]
                    "
                  >
                    {task.title}
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
                      {task.submissionStatus
                        ? formatEnum(
                            task.submissionStatus
                          )
                        : "Not Submitted"}
                    </span>
                  </span>
                </div>

                {task.dueAt && (
                  <p
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-1.5
                      text-xs
                      leading-5
                      text-slate-400

                      sm:shrink-0
                      sm:text-right
                    "
                  >
                    <CalendarDays
                      size={13}
                      className="
                        mt-1
                        shrink-0
                      "
                      aria-hidden="true"
                    />

                    <span className="break-words">
                      Due{" "}
                      {formatDateTime(
                        task.dueAt
                      )}
                    </span>
                  </p>
                )}
              </div>

              {/* SUBMISSION TIME */}

              {task.submittedAt && (
                <p
                  className="
                    mt-3
                    flex
                    min-w-0
                    items-start
                    gap-1.5
                    text-xs
                    leading-5
                    text-emerald-600
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
                    Submitted{" "}
                    {formatDateTime(
                      task.submittedAt
                    )}
                  </span>
                </p>
              )}

              {/* INSTRUCTOR FEEDBACK */}

              {task.feedback && (
                <div
                  className="
                    mt-4
                    min-w-0
                    rounded-xl
                    bg-slate-50
                    p-3

                    sm:p-4
                  "
                >
                  <p
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-1.5
                      text-[10px]
                      font-bold
                      uppercase
                      leading-4
                      tracking-wide
                      text-slate-400
                    "
                  >
                    <MessageSquareText
                      size={12}
                      className="
                        mt-0.5
                        shrink-0
                      "
                      aria-hidden="true"
                    />

                    <span className="break-words">
                      Instructor Feedback
                    </span>
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-full
                      whitespace-pre-wrap
                      break-words
                      text-sm
                      leading-6
                      text-slate-600

                      [overflow-wrap:anywhere]
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
        No tasks assigned to this batch.
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