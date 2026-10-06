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
    <section>
      <Link
        href={`/instructor/batches/${batchId}`}
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
        Back to batch
      </Link>

      <div
        className="
          mt-5
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          sm:p-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                inline-flex
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
              <BarChart3 size={14} />
              Course Progress
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
              {courseTitle}
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
              "
            >
              Track lesson completion and
              learning progress for students
              assigned to this course.
            </p>
          </div>

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              text-[#1256AF]
            "
          >
            <BookOpen size={21} />
          </div>
        </div>
      </div>
    </section>
  );
}