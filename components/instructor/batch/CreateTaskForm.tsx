"use client";

import {
  CalendarDays,
  Plus,
} from "lucide-react";

interface CreateTaskFormProps {
  title: string;
  description: string;
  dueAt: string;
  creating: boolean;

  onTitleChange: (
    value: string
  ) => void;

  onDescriptionChange: (
    value: string
  ) => void;

  onDueAtChange: (
    value: string
  ) => void;

  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
}

export default function CreateTaskForm({
  title,
  description,
  dueAt,
  creating,
  onTitleChange,
  onDescriptionChange,
  onDueAtChange,
  onSubmit,
}: CreateTaskFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4

        sm:p-5
      "
    >
      <div>
        <h3 className="font-bold text-slate-950">
          Create Task
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Assign work to every student in this
          batch.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="task-title"
            className="text-xs font-semibold text-slate-700"
          >
            Task title
          </label>

          <input
            id="task-title"
            type="text"
            value={title}
            maxLength={150}
            required
            disabled={creating}
            onChange={(event) =>
              onTitleChange(
                event.target.value
              )
            }
            placeholder="Example: Build REST API"
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              text-slate-950
              outline-none

              placeholder:text-slate-400

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50

              disabled:bg-slate-100
            "
          />
        </div>

        <div>
          <div className="flex justify-between gap-3">
            <label
              htmlFor="task-description"
              className="text-xs font-semibold text-slate-700"
            >
              Description
            </label>

            <span className="text-[11px] text-slate-400">
              Optional
            </span>
          </div>

          <textarea
            id="task-description"
            value={description}
            rows={3}
            disabled={creating}
            onChange={(event) =>
              onDescriptionChange(
                event.target.value
              )
            }
            placeholder="Describe what students need to complete."
            className="
              mt-2
              w-full
              resize-none
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              leading-6
              text-slate-950
              outline-none

              placeholder:text-slate-400

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50

              disabled:bg-slate-100
            "
          />
        </div>

        <div>
          <label
            htmlFor="task-due-at"
            className="text-xs font-semibold text-slate-700"
          >
            Due date
          </label>

          <div className="relative mt-2">
            <CalendarDays
              size={16}
              className="
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              id="task-due-at"
              type="datetime-local"
              value={dueAt}
              disabled={creating}
              onChange={(event) =>
                onDueAtChange(
                  event.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                py-3
                pl-10
                pr-4
                text-sm
                text-slate-950
                outline-none

                focus:border-[#1256AF]
                focus:ring-4
                focus:ring-blue-50

                disabled:bg-slate-100
              "
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={
            creating ||
            !title.trim()
          }
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#1256AF]
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition-colors

            hover:bg-[#0F4B99]

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Plus size={16} />

          {creating
            ? "Creating..."
            : "Create Task"}
        </button>
      </div>
    </form>
  );
}