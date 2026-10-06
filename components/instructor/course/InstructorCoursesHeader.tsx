import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Layers3,
} from "lucide-react";

interface InstructorCoursesHeaderProps {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
}

export default function InstructorCoursesHeader({
  totalCourses,
  publishedCourses,
  draftCourses,
}: InstructorCoursesHeaderProps) {
  return (
    <section>
      <Link
        href="/instructor"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-500
          transition
          hover:text-[#1256AF]
        "
      >
        <ArrowLeft size={16} />
        Instructor Workspace
      </Link>

      <div
        className="
          mt-5
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
        "
      >
        <div
          className="
            flex
            flex-col
            gap-8
            p-6
            sm:p-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-blue-50
                px-3
                py-1.5
                text-xs
                font-bold
                text-[#1256AF]
              "
            >
              <BookOpen size={14} />
              Learning Content
            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-bold
                tracking-tight
                text-slate-950
                sm:text-4xl
              "
            >
              Courses
            </h1>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
              "
            >
              Create structured learning
              experiences, organize lessons and
              publish courses when they are ready
              for your batches.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-3
              gap-3
              sm:min-w-[420px]
            "
          >
            <Stat
              label="Total"
              value={totalCourses}
            />

            <Stat
              label="Drafts"
              value={draftCourses}
            />

            <Stat
              label="Published"
              value={publishedCourses}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-slate-50
        p-4
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          bg-white
          text-[#1256AF]
          shadow-sm
        "
      >
        <Layers3 size={15} />
      </div>

      <p
        className="
          mt-4
          text-2xl
          font-bold
          text-slate-950
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-xs
          font-medium
          text-slate-400
        "
      >
        {label}
      </p>
    </div>
  );
}