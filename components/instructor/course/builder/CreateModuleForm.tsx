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
      <div
        className="
          flex
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
          <Layers3 size={18} />
        </div>

        <div>
          <h2
            className="
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
              text-sm
              leading-6
              text-slate-500
            "
          >
            Group related lessons into a
            structured section of the course.
          </p>
        </div>
      </div>

      <form
        className="
          mt-6
          grid
          gap-4
          lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto]
          lg:items-end
        "
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label
            htmlFor="module-title"
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Module Title
          </label>

          <input
            id="module-title"
            value={title}
            onChange={(event) =>
              onTitleChange(
                event.target.value
              )
            }
            maxLength={150}
            placeholder="Getting Started"
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
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
          <label
            htmlFor="module-description"
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Description
          </label>

          <input
            id="module-description"
            value={description}
            onChange={(event) =>
              onDescriptionChange(
                event.target.value
              )
            }
            maxLength={5000}
            placeholder="What students will learn in this module"
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
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

        <button
          type="submit"
          disabled={creating}
          className="
            inline-flex
            h-[46px]
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-950
            px-5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#1256AF]
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
              Adding...
            </>
          ) : (
            <>
              <Plus size={15} />
              Add Module
            </>
          )}
        </button>
      </form>
    </section>
  );
}