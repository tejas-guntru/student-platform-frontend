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
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4

        sm:p-5
      "
    >
      {/* HEADER */}

      <div className="min-w-0">
        <h3
          className="
            break-words
            font-bold
            text-slate-950
          "
        >
          Create Task
        </h3>

        <p
          className="
            mt-1
            break-words
            text-xs
            leading-5
            text-slate-500
          "
        >
          Assign work to every student in
          this batch.
        </p>
      </div>

      <div
        className="
          mt-5
          min-w-0
          space-y-4
        "
      >
        {/* TITLE */}

        <div className="min-w-0">
          <label
            htmlFor="task-title"
            className="
              text-xs
              font-semibold
              text-slate-700
            "
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
              min-h-11
              min-w-0
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-3.5
              py-2.5
              text-sm
              text-slate-950
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50

              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:text-slate-500

              sm:px-4
              sm:py-3
            "
          />
        </div>

        {/* DESCRIPTION */}

        <div className="min-w-0">
          <div
            className="
              flex
              min-w-0
              items-center
              justify-between
              gap-3
            "
          >
            <label
              htmlFor="task-description"
              className="
                text-xs
                font-semibold
                text-slate-700
              "
            >
              Description
            </label>

            <span
              className="
                shrink-0
                text-[11px]
                text-slate-400
              "
            >
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
              min-w-0
              w-full
              resize-y
              rounded-xl
              border
              border-slate-300
              bg-white
              px-3.5
              py-2.5
              text-sm
              leading-6
              text-slate-950
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50

              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:text-slate-500

              sm:px-4
              sm:py-3
            "
          />
        </div>

        {/* DUE DATE */}

        <div className="min-w-0">
          <label
            htmlFor="task-due-at"
            className="
              text-xs
              font-semibold
              text-slate-700
            "
          >
            Due date
          </label>

          <div
            className="
              relative
              mt-2
              min-w-0
            "
          >
            <CalendarDays
              size={16}
              className="
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                z-10
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
                min-h-11
                min-w-0
                w-full
                max-w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                py-2.5
                pl-10
                pr-2
                text-sm
                text-slate-950
                outline-none
                transition

                focus:border-[#1256AF]
                focus:ring-4
                focus:ring-blue-50

                disabled:cursor-not-allowed
                disabled:bg-slate-100
                disabled:text-slate-500

                sm:py-3
                sm:pr-4
              "
            />
          </div>
        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={
            creating ||
            !title.trim()
          }
          className="
            inline-flex
            min-h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#1256AF]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-colors

            hover:bg-[#0F4B99]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#1256AF]/30
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:py-3
          "
        >
          <Plus
            size={16}
            className="shrink-0"
          />

          {creating
            ? "Creating..."
            : "Create Task"}
        </button>
      </div>
    </form>
  );
}