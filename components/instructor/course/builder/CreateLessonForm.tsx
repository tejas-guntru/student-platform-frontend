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
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="
        border-b
        border-blue-100
        bg-blue-50/50
        p-5
        sm:p-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
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
          aria-label="Close lesson form"
          className="
            flex
            h-9
            w-9
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
          "
        >
          <X size={16} />
        </button>
      </div>

      <div
        className="
          mt-5
          grid
          gap-4
          md:grid-cols-2
        "
      >
        <div>
          <label
            htmlFor="lesson-title"
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Lesson Title
          </label>

          <input
            id="lesson-title"
            value={title}
            onChange={(event) =>
              onTitleChange(
                event.target.value
              )
            }
            maxLength={150}
            placeholder="Introduction to REST APIs"
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
              transition
              placeholder:text-slate-400
              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        <div>
          <label
            htmlFor="lesson-type"
            className="
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
              transition
              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-100
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

      <div className="mt-4">
        <div
          className="
            flex
            items-center
            justify-between
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
          maxLength={50000}
          rows={6}
          placeholder="Write the lesson content..."
          className="
            mt-2
            w-full
            resize-y
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-sm
            leading-7
            text-slate-950
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-[#1256AF]
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="lesson-resource-url"
          className="
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
          maxLength={2000}
          placeholder="https://..."
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
            transition
            placeholder:text-slate-400
            focus:border-[#1256AF]
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>

      <div
        className="
          mt-5
          flex
          flex-wrap
          gap-3
        "
      >
        <button
          type="submit"
          disabled={creating}
          className="
            inline-flex
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
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {creating ? (
            <>
              <LoaderCircle
                size={15}
                className="animate-spin"
              />
              Creating...
            </>
          ) : (
            <>
              <Plus size={15} />
              Create Lesson
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={creating}
          className="
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
            disabled:opacity-50
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
}