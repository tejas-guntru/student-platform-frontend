import {
  BookPlus,
  LoaderCircle,
} from "lucide-react";

interface CreateCourseFormProps {
  title: string;
  description: string;
  creating: boolean;

  onTitleChange: (
    value: string
  ) => void;

  onDescriptionChange: (
    value: string
  ) => void;

  onSubmit: () => void;
}

export default function CreateCourseForm({
  title,
  description,
  creating,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: CreateCourseFormProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        sm:p-6
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
            bg-blue-50
            text-[#1256AF]
          "
        >
          <BookPlus size={18} />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-bold
              text-slate-950
            "
          >
            Create Course
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-6
              text-slate-500
            "
          >
            Start with the course basics.
            New courses remain drafts until
            you publish them.
          </p>
        </div>
      </div>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <label
              htmlFor="course-title"
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Course Title
            </label>

            <span
              className="
                text-xs
                text-slate-400
              "
            >
              {title.length}/150
            </span>
          </div>

          <input
            id="course-title"
            value={title}
            onChange={(event) =>
              onTitleChange(
                event.target.value
              )
            }
            maxLength={150}
            placeholder="Spring Boot Fundamentals"
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
              focus:ring-blue-50
            "
          />
        </div>

        <div>
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <label
              htmlFor="course-description"
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Description
            </label>

            <span
              className="
                text-xs
                text-slate-400
              "
            >
              {description.length}/5000
            </span>
          </div>

          <textarea
            id="course-description"
            value={description}
            onChange={(event) =>
              onDescriptionChange(
                event.target.value
              )
            }
            maxLength={5000}
            rows={6}
            placeholder="Learn how to build REST APIs using Spring Boot."
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
              transition
              placeholder:text-slate-400
              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50
            "
          />
        </div>

        <button
          type="submit"
          disabled={creating}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#1256AF]
            px-5
            py-3
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
                size={16}
                className="animate-spin"
              />
              Creating...
            </>
          ) : (
            <>
              <BookPlus size={16} />
              Create Course
            </>
          )}
        </button>
      </form>
    </section>
  );
}