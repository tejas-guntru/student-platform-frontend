import {
  BookOpen,
  CheckCircle2,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentCourseProgressProps {
  courses:
    InstructorStudentOverviewResponse["courses"];
}

export default function StudentCourseProgress({
  courses,
}: StudentCourseProgressProps) {
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
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
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
              Course Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Learning progress across courses
              assigned to this batch.
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
          {courses.length}
        </span>
      </div>

      {courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-5 space-y-4">
          {courses.map((course) => {
            const percentage =
              Math.min(
                100,
                Math.max(
                  0,
                  course.progressPercentage
                )
              );

            return (
              <article
                key={course.courseId}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  p-4
                  sm:p-5
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
                  <div>
                    <h3
                      className="
                        font-semibold
                        text-slate-950
                      "
                    >
                      {course.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      {course.completedLessons} /{" "}
                      {course.totalLessons} lessons
                      completed
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className="
                        text-lg
                        font-bold
                        text-[#1256AF]
                      "
                    >
                      {percentage.toFixed(
                        0
                      )}
                      %
                    </p>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-400
                      "
                    >
                      {formatEnum(
                        course.status
                      )}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    mt-4
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-slate-100
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#1256AF]
                      transition-all
                    "
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                {percentage >= 100 && (
                  <p
                    className="
                      mt-3
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      font-semibold
                      text-emerald-600
                    "
                  >
                    <CheckCircle2
                      size={13}
                    />
                    Course completed
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div
      className="
        mt-5
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        p-6
        text-center
        text-sm
        text-slate-500
      "
    >
      No courses assigned to this batch.
    </div>
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