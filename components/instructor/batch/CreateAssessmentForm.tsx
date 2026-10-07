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
          Create Assessment
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
          New assessments start as drafts so
          you can add questions before
          publishing.
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
            htmlFor="assessment-title"
            className="
              text-xs
              font-semibold
              text-slate-700
            "
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
              htmlFor="assessment-description"
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

        {/* DURATION */}

        <div className="min-w-0">
          <label
            htmlFor="assessment-duration"
            className="
              text-xs
              font-semibold
              text-slate-700
            "
          >
            Duration
          </label>

          <div
            className="
              relative
              mt-2
              min-w-0
            "
          >
            <Clock3
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
                pr-14
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
                sm:pr-16
              "
            />

            <span
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-xs
                text-slate-400

                sm:right-4
              "
            >
              min
            </span>
          </div>

          <p
            className="
              mt-1.5
              text-[11px]
              leading-4
              text-slate-400
            "
          >
            Enter the total time students
            have to complete the assessment.
          </p>
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
            : "Create Assessment"}
        </button>
      </div>
    </form>
  );
}