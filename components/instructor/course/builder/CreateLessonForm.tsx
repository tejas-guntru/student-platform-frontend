import {
  LoaderCircle,
  Plus,
  X,
} from "lucide-react";

import type {
  LessonType,
} from "@/types/course";

interface CreateLessonFormProps {
  title: string;
  content: string;
  lessonType: LessonType;
  resourceUrl: string;
  creating: boolean;

  onTitleChange: (
    value: string
  ) => void;

  onContentChange: (
    value: string
  ) => void;

  onLessonTypeChange: (
    value: LessonType
  ) => void;

  onResourceUrlChange: (
    value: string
  ) => void;

  onSubmit: () => void;
  onCancel: () => void;
}

export default function CreateLessonForm({
  title,
  content,
  lessonType,
  resourceUrl,
  creating,
  onTitleChange,
  onContentChange,
  onLessonTypeChange,
  onResourceUrlChange,
  onSubmit,
  onCancel,
}: CreateLessonFormProps) {
  const canSubmit =
    title.trim().length > 0 &&
    !creating;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (!canSubmit) {
          return;
        }

        onSubmit();
      }}
      className="
        min-w-0
        border-b
        border-blue-100
        bg-blue-50/50
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
        <div className="min-w-0">
          <p
            className="
              break-words
              text-xs
              font-bold
              uppercase
              tracking-[0.1em]
              text-[#1256AF]
            "
          >
            Course Content
          </p>

          <h3
            className="
              mt-1
              break-words
              font-bold
              text-slate-950
            "
          >
            New Lesson
          </h3>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={creating}
          aria-label="Close lesson form"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            transition

            hover:bg-slate-50
            hover:text-slate-950

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#1256AF]/25
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <X
            size={16}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* BASIC DETAILS */}

      <div
        className="
          mt-5
          grid
          min-w-0
          grid-cols-1
          gap-4

          md:grid-cols-2
        "
      >
        <div className="min-w-0">
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <label
              htmlFor="lesson-title"
              className="
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Lesson Title
            </label>

            <span
              className="
                shrink-0
                text-xs
                text-slate-400
              "
            >
              {title.length}/150
            </span>
          </div>

          <input
            id="lesson-title"
            type="text"
            value={title}
            onChange={(event) =>
              onTitleChange(
                event.target.value
              )
            }
            disabled={creating}
            required
            maxLength={150}
            autoComplete="off"
            placeholder="Introduction to REST APIs"
            className="
              mt-2
              min-h-11
              min-w-0
              w-full
              max-w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              text-slate-950
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-100

              disabled:cursor-not-allowed
              disabled:bg-slate-50
              disabled:text-slate-500
              disabled:opacity-80
            "
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="lesson-type"
            className="
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Lesson Type
          </label>

          <select
            id="lesson-type"
            value={lessonType}
            onChange={(event) =>
              onLessonTypeChange(
                event.target
                  .value as LessonType
              )
            }
            disabled={creating}
            className="
              mt-2
              min-h-11
              min-w-0
              w-full
              max-w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              text-slate-950
              outline-none
              transition

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-100

              disabled:cursor-not-allowed
              disabled:bg-slate-50
              disabled:text-slate-500
              disabled:opacity-80
            "
          >
            <option value="TEXT">
              Text
            </option>

            <option value="VIDEO">
              Video
            </option>

            <option value="DOCUMENT">
              Document
            </option>

            <option value="LINK">
              Link
            </option>

            <option value="MIXED">
              Mixed
            </option>
          </select>
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          mt-4
          min-w-0
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-2
          "
        >
          <label
            htmlFor="lesson-content"
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Lesson Content
          </label>

          <span
            className="
              shrink-0
              text-xs
              text-slate-400
            "
          >
            {content.length}/50000
          </span>
        </div>

        <textarea
          id="lesson-content"
          value={content}
          onChange={(event) =>
            onContentChange(
              event.target.value
            )
          }
          disabled={creating}
          maxLength={50000}
          rows={6}
          placeholder="Write the lesson content..."
          className="
            mt-2
            min-h-40
            min-w-0
            w-full
            max-w-full
            resize-y
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
            transition

            sm:leading-7

            placeholder:text-slate-400

            focus:border-[#1256AF]
            focus:ring-4
            focus:ring-blue-100

            disabled:cursor-not-allowed
            disabled:bg-slate-50
            disabled:text-slate-500
            disabled:opacity-80
          "
        />
      </div>

      {/* RESOURCE */}

      <div
        className="
          mt-4
          min-w-0
        "
      >
        <label
          htmlFor="lesson-resource-url"
          className="
            block
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Resource URL

          <span
            className="
              ml-1
              font-normal
              text-slate-400
            "
          >
            (optional)
          </span>
        </label>

        <input
          id="lesson-resource-url"
          type="url"
          value={resourceUrl}
          onChange={(event) =>
            onResourceUrlChange(
              event.target.value
            )
          }
          disabled={creating}
          maxLength={2000}
          autoComplete="url"
          inputMode="url"
          placeholder="https://..."
          className="
            mt-2
            min-h-11
            min-w-0
            w-full
            max-w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-sm
            text-slate-950
            outline-none
            transition

            placeholder:text-slate-400

            focus:border-[#1256AF]
            focus:ring-4
            focus:ring-blue-100

            disabled:cursor-not-allowed
            disabled:bg-slate-50
            disabled:text-slate-500
            disabled:opacity-80
          "
        />
      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-5
          flex
          flex-col
          gap-3

          sm:flex-row
          sm:flex-wrap
        "
      >
        <button
          type="submit"
          disabled={!canSubmit}
          className="
            inline-flex
            min-h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#1256AF]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition

            hover:bg-[#0E478F]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#1256AF]/30
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:w-auto
          "
        >
          {creating ? (
            <>
              <LoaderCircle
                size={15}
                className="
                  shrink-0
                  animate-spin
                "
                aria-hidden="true"
              />

              <span>
                Creating...
              </span>
            </>
          ) : (
            <>
              <Plus
                size={15}
                className="shrink-0"
                aria-hidden="true"
              />

              <span>
                Create Lesson
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={creating}
          className="
            inline-flex
            min-h-11
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-slate-300
            bg-white
            px-5
            py-2.5
            text-sm
            font-semibold
            text-slate-700
            transition

            hover:bg-slate-50
            hover:text-slate-950

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-300
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:w-auto
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
}