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
              Assign and track work for this
              batch.
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

      <div
        className="
          mt-6
          grid
          gap-6

          xl:grid-cols-[1.15fr_0.85fr]
        "
      >
        <div>
          {tasks.length === 0 ? (
            <EmptyTasks />
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/instructor/batches/${batchId}/tasks/${task.id}`}
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
                        {task.title}
                      </h3>

                      {task.description && (
                        <p
                          className="
                            mt-1.5
                            line-clamp-2
                            text-sm
                            leading-6
                            text-slate-500
                          "
                        >
                          {task.description}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      size={16}
                      className="
                        mt-1
                        shrink-0
                        text-slate-400
                        transition-transform

                        group-hover:translate-x-1
                        group-hover:text-[#1256AF]
                      "
                    />
                  </div>

                  <div className="mt-4">
                    {task.dueAt ? (
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-amber-50
                          px-2.5
                          py-1.5
                          text-xs
                          font-medium
                          text-amber-700
                        "
                      >
                        <CalendarDays
                          size={13}
                        />

                        Due{" "}
                        {new Date(
                          task.dueAt
                        ).toLocaleString()}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">
                        No due date
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
}

function EmptyTasks() {
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
        <ListTodo size={18} />
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-700">
        No tasks yet
      </p>

      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
        Create the first task for students in
        this batch.
      </p>
    </div>
  );
}