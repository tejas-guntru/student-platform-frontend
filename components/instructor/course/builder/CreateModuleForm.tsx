import {
  Layers3,
  LoaderCircle,
  Plus,
} from "lucide-react";

interface CreateModuleFormProps {
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

export default function CreateModuleForm({
  title,
  description,
  creating,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: CreateModuleFormProps) {
  const canSubmit =
    title.trim().length > 0 &&
    !creating;

  return (
    <section
      className="
        min-w-0
        overflow-hidden
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
            bg-blue-50
            text-[#1256AF]
          "
        >
          <Layers3
            size={18}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <h2
            className="
              break-words
              text-lg
              font-bold
              text-slate-950
            "
          >
            Add Module
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
            Group related lessons into a
            structured section of the
            course.
          </p>
        </div>
      </div>

      {/* FORM */}

      <form
        className="
          mt-5
          grid
          min-w-0
          grid-cols-1
          gap-4

          sm:mt-6

          lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto]
          lg:items-end
        "
        onSubmit={(event) => {
          event.preventDefault();

          if (!canSubmit) {
            return;
          }

          onSubmit();
        }}
      >
        {/* TITLE */}

        <div className="min-w-0">
          <label
            htmlFor="module-title"
            className="
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Module Title
          </label>

          <input
            id="module-title"
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
            placeholder="Getting Started"
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
              focus:ring-blue-50

              disabled:cursor-not-allowed
              disabled:bg-slate-50
              disabled:text-slate-500
              disabled:opacity-80
            "
          />

          <p
            className="
              mt-1.5
              text-xs
              text-slate-400
            "
          >
            {title.length} / 150
          </p>
        </div>

        {/* DESCRIPTION */}

        <div className="min-w-0">
          <label
            htmlFor="module-description"
            className="
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Description{" "}
            <span
              className="
                font-normal
                text-slate-400
              "
            >
              (optional)
            </span>
          </label>

          <input
            id="module-description"
            type="text"
            value={description}
            onChange={(event) =>
              onDescriptionChange(
                event.target.value
              )
            }
            disabled={creating}
            maxLength={5000}
            autoComplete="off"
            placeholder="What students will learn in this module"
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
              focus:ring-blue-50

              disabled:cursor-not-allowed
              disabled:bg-slate-50
              disabled:text-slate-500
              disabled:opacity-80
            "
          />
        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={!canSubmit}
          className="
            inline-flex
            min-h-[46px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-950
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition

            hover:bg-[#1256AF]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#1256AF]/30
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50

            lg:w-auto
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

              <span>Adding...</span>
            </>
          ) : (
            <>
              <Plus
                size={15}
                className="shrink-0"
                aria-hidden="true"
              />

              <span>Add Module</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}