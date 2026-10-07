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
            flex-1
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
            <BookOpen
              size={18}
              aria-hidden="true"
            />
          </div>

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <h2
              className="
                break-words
                text-lg
                font-bold
                text-slate-950
              "
            >
              Course Progress
            </h2>

            <p
              className="
                mt-1
                max-w-2xl
                break-words
                text-sm
                leading-6
                text-slate-500
              "
            >
              Learning progress across courses
              assigned to this batch.
            </p>
          </div>
        </div>

        <span
          className="
            inline-flex
            min-w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-emerald-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-emerald-700
          "
          aria-label={`${courses.length} courses`}
        >
          {courses.length}
        </span>
      </div>

      {/* COURSE LIST */}

      {courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="
            mt-5
            min-w-0
            space-y-4
          "
        >
          {courses.map((course) => {
            const rawPercentage =
              Number.isFinite(
                course.progressPercentage
              )
                ? course.progressPercentage
                : 0;

            const percentage =
              Math.min(
                100,
                Math.max(
                  0,
                  rawPercentage
                )
              );

            const roundedPercentage =
              Math.round(percentage);

            return (
              <article
                key={course.courseId}
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-slate-200
                  p-4

                  sm:p-5
                "
              >
                {/* COURSE SUMMARY */}

                <div
                  className="
                    flex
                    min-w-0
                    flex-col
                    gap-3

                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    sm:gap-5
                  "
                >
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
                        leading-6
                        text-slate-950

                        [overflow-wrap:anywhere]
                      "
                    >
                      {course.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        break-words
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      {course.completedLessons}{" "}
                      / {course.totalLessons}{" "}
                      lessons completed
                    </p>
                  </div>

                  {/* PERCENTAGE / STATUS */}

                  <div
                    className="
                      min-w-0
                      border-t
                      border-slate-100
                      pt-3

                      sm:shrink-0
                      sm:border-t-0
                      sm:pt-0
                      sm:text-right
                    "
                  >
                    <p
                      className="
                        text-lg
                        font-bold
                        leading-6
                        text-[#1256AF]
                      "
                    >
                      {roundedPercentage}%
                    </p>

                    <p
                      className="
                        mt-1
                        max-w-full
                        break-words
                        text-[10px]
                        font-bold
                        uppercase
                        leading-4
                        tracking-wide
                        text-slate-400

                        [overflow-wrap:anywhere]
                      "
                    >
                      {formatEnum(
                        course.status
                      )}
                    </p>
                  </div>
                </div>

                {/* PROGRESS BAR */}

                <div
                  className="
                    mt-4
                    h-2
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-slate-100
                  "
                  role="progressbar"
                  aria-label={`${course.title} progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={
                    roundedPercentage
                  }
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

                {/* COMPLETION */}

                {percentage >= 100 && (
                  <p
                    className="
                      mt-3
                      flex
                      min-w-0
                      items-center
                      gap-1.5
                      text-xs
                      font-semibold
                      leading-5
                      text-emerald-600
                    "
                  >
                    <CheckCircle2
                      size={13}
                      className="shrink-0"
                      aria-hidden="true"
                    />

                    <span className="break-words">
                      Course completed
                    </span>
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
        min-w-0
        rounded-xl
        border
        border-dashed
        border-slate-200
        bg-slate-50
        px-4
        py-6
        text-center

        sm:px-6
      "
    >
      <p
        className="
          break-words
          text-sm
          font-medium
          leading-6
          text-slate-500
        "
      >
        No courses assigned to this batch.
      </p>
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