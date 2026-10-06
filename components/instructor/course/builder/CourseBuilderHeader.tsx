import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Boxes,
  CheckCircle2,
  Layers3,
  LoaderCircle,
  Rocket,
} from "lucide-react";

import type {
  CourseResponse,
} from "@/types/course";

interface CourseBuilderHeaderProps {
  course: CourseResponse;
  moduleCount: number;
  lessonCount: number;
  publishing: boolean;
  onPublish: () => void;
}

export default function CourseBuilderHeader({
  course,
  moduleCount,
  lessonCount,
  publishing,
  onPublish,
}: CourseBuilderHeaderProps) {
  const editable =
    course.status === "DRAFT";

  return (
    <section>
      <Link
        href="/instructor/courses"
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
        Courses
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
        <div className="p-6 sm:p-8">
          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            <div className="max-w-3xl">
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
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

                  Course Builder
                </div>

                <StatusBadge
                  status={course.status}
                />
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
                {course.title}
              </h1>

              {course.description && (
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
                  {course.description}
                </p>
              )}
            </div>

            {editable && (
              <button
                type="button"
                onClick={onPublish}
                disabled={publishing}
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-emerald-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-emerald-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {publishing ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Rocket size={16} />
                    Publish Course
                  </>
                )}
              </button>
            )}
          </div>

          <div
            className="
              mt-7
              grid
              gap-3
              border-t
              border-slate-100
              pt-6
              sm:grid-cols-3
            "
          >
            <Stat
              icon={<Layers3 size={17} />}
              label="Modules"
              value={moduleCount}
            />

            <Stat
              icon={<Boxes size={17} />}
              label="Lessons"
              value={lessonCount}
            />

            <Stat
              icon={
                <CheckCircle2
                  size={17}
                />
              }
              label="Status"
              textValue={formatEnum(
                course.status
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  textValue,
}: {
  icon: React.ReactNode;
  label: string;
  value?: number;
  textValue?: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-slate-50
        px-4
        py-4
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-white
          text-[#1256AF]
          shadow-sm
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-xs
            font-medium
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            text-sm
            font-bold
            text-slate-950
          "
        >
          {textValue ?? value}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: CourseResponse["status"];
}) {
  const classes =
    status === "PUBLISHED"
      ? "bg-emerald-50 text-emerald-700"
      : status === "ARCHIVED"
        ? "bg-slate-100 text-slate-600"
        : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1.5
        text-[10px]
        font-bold
        uppercase
        tracking-wide
        ${classes}
      `}
    >
      {formatEnum(status)}
    </span>
  );
}

function formatEnum(
  value: string
) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}