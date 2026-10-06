"use client";

import {
  Clock3,
  Plus,
} from "lucide-react";

interface CreateAssessmentFormProps {
  title: string;
  description: string;
  duration: string;
  creating: boolean;

  onTitleChange: (
    value: string
  ) => void;

  onDescriptionChange: (
    value: string
  ) => void;

  onDurationChange: (
    value: string
  ) => void;

  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
}

export default function CreateAssessmentForm({
  title,
  description,
  duration,
  creating,
  onTitleChange,
  onDescriptionChange,
  onDurationChange,
  onSubmit,
}: CreateAssessmentFormProps) {
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
      <h3 className="font-bold text-slate-950">
        Create Assessment
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        New assessments start as drafts so
        you can add questions before
        publishing.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="assessment-title"
            className="text-xs font-semibold text-slate-700"
          >
            Assessment title
          </label>

          <input
            id="assessment-title"
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
            placeholder="Example: Java Fundamentals Test"
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
          <label
            htmlFor="assessment-description"
            className="text-xs font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="assessment-description"
            value={description}
            rows={3}
            disabled={creating}
            onChange={(event) =>
              onDescriptionChange(
                event.target.value
              )
            }
            placeholder="Optional assessment description"
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
            htmlFor="assessment-duration"
            className="text-xs font-semibold text-slate-700"
          >
            Duration
          </label>

          <div className="relative mt-2">
            <Clock3
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
              id="assessment-duration"
              type="number"
              min={1}
              value={duration}
              required
              disabled={creating}
              onChange={(event) =>
                onDurationChange(
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
                pr-16
                text-sm
                text-slate-950
                outline-none

                focus:border-[#1256AF]
                focus:ring-4
                focus:ring-blue-50

                disabled:bg-slate-100
              "
            />

            <span
              className="
                pointer-events-none
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-xs
                text-slate-400
              "
            >
              min
            </span>
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

            hover:bg-[#0F4B99]

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Plus size={16} />

          {creating
            ? "Creating..."
            : "Create Assessment"}
        </button>
      </div>
    </form>
  );
}