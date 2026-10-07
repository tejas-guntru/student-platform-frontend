import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import type {
  CourseAssignmentResponse,
  CourseResponse,
} from "@/types/course";

interface BatchCoursesProps {
  batchId: string;
  courses: CourseResponse[];
  assignments: CourseAssignmentResponse[];
  children: React.ReactNode;
}

export default function BatchCourses({
  batchId,
  courses,
  assignments,
  children,
}: BatchCoursesProps) {
  return (
    <section
      id="courses"
      className="
        min-w-0
        scroll-mt-24
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
          justify-between
          gap-3

          sm:gap-4
        "
      >
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
              bg-emerald-50
              text-emerald-700
            "
          >
            <BookOpen size={18} />
          </div>

          <div className="min-w-0">
            <h2
              className="
                break-words
                text-base
                font-bold
                text-slate-950

                sm:text-lg
              "
            >
              Courses
            </h2>

            <p
              className="
                mt-1
                break-words
                text-sm
                leading-5
                text-slate-500
              "
            >
              Learning material assigned to
              this batch.
            </p>
          </div>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            bg-emerald-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-emerald-700
          "
          aria-label={`${assignments.length} assigned courses`}
        >
          {assignments.length}
        </span>
      </div>

      {/* CONTENT */}

      <div
        className="
          mt-6
          grid
          min-w-0
          gap-6

          xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]
        "
      >
        {/* ASSIGNED COURSES */}

        <div className="min-w-0">
          {assignments.length === 0 ? (
            <EmptyCourses />
          ) : (
            <div
              className="
                min-w-0
                space-y-3
              "
            >
              {assignments.map(
                (assignment) => {
                  const course =
                    courses.find(
                      (item) =>
                        item.id ===
                        assignment.courseId
                    );

                  return (
                    <div
                      key={assignment.id}
                      className="
                        min-w-0
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-200
                        p-3.5

                        sm:p-4
                      "
                    >
                      <div
                        className="
                          flex
                          min-w-0
                          flex-col
                          gap-4

                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >
                        {/* COURSE INFO */}

                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >
                          <h3
                            className="
                              break-words
                              font-semibold
                              leading-5
                              text-slate-950
                            "
                          >
                            {course?.title ??
                              "Assigned Course"}
                          </h3>

                          {course?.description && (
                            <p
                              className="
                                mt-1.5
                                line-clamp-2
                                break-words
                                text-sm
                                leading-6
                                text-slate-500
                              "
                            >
                              {
                                course.description
                              }
                            </p>
                          )}

                          <p
                            className="
                              mt-2
                              break-words
                              text-[11px]
                              leading-4
                              text-slate-400
                            "
                          >
                            Assigned{" "}
                            {new Date(
                              assignment.assignedAt
                            ).toLocaleString()}
                          </p>
                        </div>

                        {/* PROGRESS */}

                        <Link
                          href={`/instructor/courses/${assignment.courseId}/batches/${batchId}/progress`}
                          className="
                            inline-flex
                            min-h-10
                            w-full
                            shrink-0
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            border
                            border-emerald-200
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-emerald-700
                            transition-colors

                            hover:bg-emerald-50

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-emerald-200
                            focus-visible:ring-offset-2

                            sm:w-auto
                          "
                        >
                          View Progress

                          <ArrowRight
                            size={14}
                            className="shrink-0"
                          />
                        </Link>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* ASSIGN COURSE */}

        <div className="min-w-0">
          {children}
        </div>
      </div>
    </section>
  );
}

function EmptyCourses() {
  return (
    <div
      className="
        flex
        min-h-[190px]
        min-w-0
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-5
        text-center

        sm:min-h-[200px]
        sm:p-6
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-white
          text-slate-400
        "
      >
        <BookOpen size={18} />
      </div>

      <p
        className="
          mt-3
          text-sm
          font-semibold
          text-slate-700
        "
      >
        No courses assigned
      </p>

      <p
        className="
          mt-1
          max-w-xs
          break-words
          text-xs
          leading-5
          text-slate-400
        "
      >
        Assign one of your published courses
        to make it available to this batch.
      </p>
    </div>
  );
}