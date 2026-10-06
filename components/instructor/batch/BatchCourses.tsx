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
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5

        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">
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
              bg-emerald-50
              text-emerald-700
            "
          >
            <BookOpen size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Courses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Learning material assigned to
              this batch.
            </p>
          </div>
        </div>

        <span
          className="
            rounded-full
            bg-emerald-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-emerald-700
          "
        >
          {assignments.length}
        </span>
      </div>

      <div
        className="
          mt-6
          grid
          gap-6

          xl:grid-cols-[1.15fr_0.85fr]
        "
      >
        <div>
          {assignments.length === 0 ? (
            <EmptyCourses />
          ) : (
            <div className="space-y-3">
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
                      key={
                        assignment.id
                      }
                      className="
                        rounded-xl
                        border
                        border-slate-200
                        p-4
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          gap-4

                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >
                        <div className="min-w-0">
                          <h3
                            className="
                              font-semibold
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
                              text-[11px]
                              text-slate-400
                            "
                          >
                            Assigned{" "}
                            {new Date(
                              assignment.assignedAt
                            ).toLocaleString()}
                          </p>
                        </div>

                        <Link
                          href={`/instructor/courses/${assignment.courseId}/batches/${batchId}/progress`}
                          className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-emerald-200
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-emerald-700

                            hover:bg-emerald-50
                          "
                        >
                          View Progress

                          <ArrowRight
                            size={14}
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

        <div>{children}</div>
      </div>
    </section>
  );
}

function EmptyCourses() {
  return (
    <div
      className="
        flex
        min-h-[200px]
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-6
        text-center
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

      <p className="mt-3 text-sm font-semibold text-slate-700">
        No courses assigned
      </p>

      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
        Assign one of your published courses
        to make it available to this batch.
      </p>
    </div>
  );
}