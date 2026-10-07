import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  ListTodo,
} from "lucide-react";

import type {
  TaskResponse,
} from "@/types/task";

interface BatchTasksProps {
  batchId: string;
  tasks: TaskResponse[];
  children: React.ReactNode;
}

export default function BatchTasks({
  batchId,
  tasks,
  children,
}: BatchTasksProps) {
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
            <ListTodo size={18} />
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
              Tasks
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
              Assign and track work for this
              batch.
            </p>
          </div>
        </div>

        <span
          className="
            shrink-0
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
        {/* TASK LIST */}

        <div className="min-w-0">
          {tasks.length === 0 ? (
            <EmptyTasks />
          ) : (
            <div
              className="
                min-w-0
                space-y-3
              "
            >
              {tasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/instructor/batches/${batchId}/tasks/${task.id}`}
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
                        {task.title}
                      </h3>

                      {task.description && (
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
                          {task.description}
                        </p>
                      )}
                    </div>

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-50
                        text-slate-400
                        transition-colors

                        group-hover:bg-blue-50
                        group-hover:text-[#1256AF]
                      "
                    >
                      <ArrowRight
                        size={15}
                        className="
                          transition-transform
                          group-hover:translate-x-0.5
                        "
                      />
                    </span>
                  </div>

                  <div
                    className="
                      mt-4
                      min-w-0
                    "
                  >
                    {task.dueAt ? (
                      <div
                        className="
                          inline-flex
                          max-w-full
                          items-start
                          gap-1.5
                          rounded-lg
                          bg-amber-50
                          px-2.5
                          py-1.5
                          text-xs
                          font-medium
                          leading-5
                          text-amber-700
                        "
                      >
                        <CalendarDays
                          size={13}
                          className="
                            mt-0.5
                            shrink-0
                          "
                        />

                        <span className="break-words">
                          Due{" "}
                          {new Date(
                            task.dueAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span
                        className="
                          text-xs
                          text-slate-400
                        "
                      >
                        No due date
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CREATE TASK */}

        <div className="min-w-0">
          {children}
        </div>
      </div>
    </section>
  );
}

function EmptyTasks() {
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
        <ListTodo size={18} />
      </div>

      <p
        className="
          mt-3
          text-sm
          font-semibold
          text-slate-700
        "
      >
        No tasks yet
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
        Create the first task for students in
        this batch.
      </p>
    </div>
  );
}