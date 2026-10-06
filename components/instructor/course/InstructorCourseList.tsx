import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Inbox,
} from "lucide-react";

import type {
  CourseResponse,
} from "@/types/course";

interface InstructorCourseListProps {
  courses: CourseResponse[];
  loading: boolean;
}

export default function InstructorCourseList({
  courses,
  loading,
}: InstructorCourseListProps) {
  if (loading) {
    return (
      <CourseListSkeleton />
    );
  }

  return (
    <section>
      <div
        className="
          flex
          items-end
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
              tracking-[0.12em]
              text-[#1256AF]
            "
          >
            Course Library
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-tight
              text-slate-950
            "
          >
            My Courses
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {courses.length}{" "}
            {courses.length === 1
              ? "course"
              : "courses"}{" "}
            created.
          </p>
        </div>
      </div>

      {courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="
            mt-5
            grid
            gap-4
            md:grid-cols-2
          "
        >
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function CourseCard({
  course,
}: {
  course: CourseResponse;
}) {
  return (
    <article
      className="
        group
        flex
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        transition
        hover:-translate-y-0.5
        hover:border-blue-200
        hover:shadow-sm
        sm:p-6
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
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
          "
        >
          <BookOpen size={19} />
        </div>

        <CourseStatus
          status={course.status}
        />
      </div>

      <div className="mt-5 flex-1">
        <h3
          className="
            text-lg
            font-bold
            text-slate-950
          "
        >
          {course.title}
        </h3>

        {course.description ? (
          <p
            className="
              mt-2
              line-clamp-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            {course.description}
          </p>
        ) : (
          <p
            className="
              mt-2
              text-sm
              italic
              text-slate-400
            "
          >
            No description added.
          </p>
        )}
      </div>

      <div
        className="
          mt-6
          flex
          items-end
          justify-between
          gap-4
          border-t
          border-slate-100
          pt-4
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            Created
          </p>

          <p
            className="
              mt-1
              text-xs
              font-medium
              text-slate-600
            "
          >
            {formatDateTime(
              course.createdAt
            )}
          </p>
        </div>

        <Link
          href={`/instructor/courses/${course.id}`}
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-xl
            bg-slate-950
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#1256AF]
          "
        >
          {course.status === "DRAFT"
            ? "Build Course"
            : "View Course"}

          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

function CourseStatus({
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

function EmptyState() {
  return (
    <div
      className="
        mt-5
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-12
        text-center
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-slate-400
        "
      >
        <Inbox size={21} />
      </div>

      <h3
        className="
          mt-4
          font-semibold
          text-slate-900
        "
      >
        No courses yet
      </h3>

      <p
        className="
          mt-1
          max-w-sm
          text-sm
          leading-6
          text-slate-500
        "
      >
        Create your first course to start
        building lessons and learning content.
      </p>
    </div>
  );
}

function CourseListSkeleton() {
  return (
    <section className="animate-pulse">
      <div
        className="
          h-3
          w-24
          rounded
          bg-slate-200
        "
      />

      <div
        className="
          mt-3
          h-7
          w-44
          rounded
          bg-slate-200
        "
      />

      <div
        className="
          mt-5
          grid
          gap-4
          md:grid-cols-2
        "
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-64
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          />
        ))}
      </div>
    </section>
  );
}

function formatDateTime(
  value: string
) {
  return new Date(value).toLocaleString();
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