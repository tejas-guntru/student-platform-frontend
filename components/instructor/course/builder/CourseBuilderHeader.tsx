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
    <section className="min-w-0">
      {/* BACK */}

      <Link
        href="/instructor/courses"
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

        <span>Courses</span>
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

          sm:mt-5
          sm:rounded-3xl
        "
      >
        <div
          className="
            min-w-0
            p-4

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

              lg:flex-row
              lg:items-start
              lg:justify-between
              lg:gap-8
            "
          >
            {/* COURSE DETAILS */}

            <div
              className="
                min-w-0
                flex-1
                lg:max-w-3xl
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  flex-wrap
                  items-center
                  gap-2
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
                    bg-blue-50
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-[#1256AF]
                  "
                >
                  <BookOpen
                    size={14}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  <span className="truncate">
                    Course Builder
                  </span>
                </div>

                <StatusBadge
                  status={course.status}
                />
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
                {course.title}
              </h1>

              {course.description && (
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
                  {course.description}
                </p>
              )}
            </div>

            {/* PUBLISH */}

            {editable && (
              <button
                type="button"
                onClick={onPublish}
                disabled={publishing}
                className="
                  inline-flex
                  min-h-11
                  w-full
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

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500/30
                  focus-visible:ring-offset-2

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  sm:w-auto
                "
              >
                {publishing ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="
                        shrink-0
                        animate-spin
                      "
                      aria-hidden="true"
                    />

                    <span>
                      Publishing...
                    </span>
                  </>
                ) : (
                  <>
                    <Rocket
                      size={16}
                      className="shrink-0"
                      aria-hidden="true"
                    />

                    <span>
                      Publish Course
                    </span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* STATS */}

          <div
            className="
              mt-6
              grid
              min-w-0
              grid-cols-1
              gap-3
              border-t
              border-slate-100
              pt-5

              sm:grid-cols-3
              sm:pt-6
              lg:mt-7
            "
          >
            <Stat
              icon={
                <Layers3
                  size={17}
                  aria-hidden="true"
                />
              }
              label="Modules"
              value={moduleCount}
            />

            <Stat
              icon={
                <Boxes
                  size={17}
                  aria-hidden="true"
                />
              }
              label="Lessons"
              value={lessonCount}
            />

            <Stat
              icon={
                <CheckCircle2
                  size={17}
                  aria-hidden="true"
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
        min-w-0
        items-center
        gap-3
        rounded-xl
        bg-slate-50
        px-3.5
        py-3.5

        sm:rounded-2xl
        sm:px-4
        sm:py-4
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

      <div className="min-w-0">
        <p
          className="
            truncate
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
            break-words
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
        inline-flex
        w-fit
        shrink-0
        items-center
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