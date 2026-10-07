import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
} from "lucide-react";

interface CourseProgressHeaderProps {
  batchId: string;
  courseTitle: string;
}

export default function CourseProgressHeader({
  batchId,
  courseTitle,
}: CourseProgressHeaderProps) {
  return (
    <section className="min-w-0">
      {/* BACK */}

      <Link
        href={`/instructor/batches/${batchId}`}
        className="
          inline-flex
          min-h-10
          items-center
          gap-2
          rounded-lg
          text-sm
          font-semibold
          text-slate-500
          transition

          hover:text-[#1256AF]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#1256AF]/25
          focus-visible:ring-offset-2
        "
      >
        <ArrowLeft
          size={16}
          className="shrink-0"
          aria-hidden="true"
        />

        <span>Back to batch</span>
      </Link>

      {/* HEADER CARD */}

      <div
        className="
          mt-4
          min-w-0
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4

          sm:mt-5
          sm:rounded-3xl
          sm:p-6

          lg:p-8
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-col
            gap-5

            sm:flex-row
            sm:items-start
            sm:justify-between
            sm:gap-6
          "
        >
          {/* DETAILS */}

          <div
            className="
              min-w-0
              flex-1
              sm:max-w-3xl
            "
          >
            <div
              className="
                inline-flex
                w-fit
                max-w-full
                items-center
                gap-2
                rounded-full
                bg-emerald-50
                px-3
                py-1.5
                text-xs
                font-bold
                text-emerald-700
              "
            >
              <BarChart3
                size={14}
                className="shrink-0"
                aria-hidden="true"
              />

              <span className="truncate">
                Course Progress
              </span>
            </div>

            <h1
              className="
                mt-4
                break-words
                text-2xl
                font-bold
                tracking-tight
                text-slate-950

                sm:text-3xl
                lg:text-4xl
              "
            >
              {courseTitle}
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                break-words
                text-sm
                leading-6
                text-slate-500

                sm:text-base
                sm:leading-7
              "
            >
              Track lesson completion and
              learning progress for students
              assigned to this course.
            </p>
          </div>

          {/* ICON */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-[#1256AF]

              sm:h-12
              sm:w-12
              sm:rounded-2xl
            "
          >
            <BookOpen
              size={21}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}