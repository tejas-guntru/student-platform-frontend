import {
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

import type {
  InstructorStudentProgressResponse,
} from "@/types/course";

interface StudentCourseProgressListProps {
  students: InstructorStudentProgressResponse[];
}

export default function StudentCourseProgressList({
  students,
}: StudentCourseProgressListProps) {
  return (
    <section className="min-w-0">
      {/* SECTION HEADER */}

      <div className="min-w-0">
        <p
          className="
            break-words
            text-xs
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#1256AF]
          "
        >
          Learning Progress
        </p>

        <h2
          className="
            mt-2
            break-words
            text-xl
            font-bold
            tracking-tight
            text-slate-950

            sm:text-2xl
          "
        >
          Student Progress
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
          See how far each student has
          progressed through the course.
        </p>
      </div>

      {students.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="
            mt-5
            min-w-0
            space-y-3
          "
        >
          {students.map((student) => (
            <StudentProgressCard
              key={student.studentId}
              student={student}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function StudentProgressCard({
  student,
}: {
  student: InstructorStudentProgressResponse;
}) {
  const percentage = clampPercentage(
    student.progressPercentage
  );

  const roundedPercentage =
    Math.round(percentage);

  const completed =
    student.totalLessons > 0 &&
    student.completedLessons >=
      student.totalLessons;

  return (
    <article
      className="
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        transition

        hover:border-slate-300

        sm:p-6
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
          sm:gap-5
        "
      >
        {/* STUDENT */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-start
            gap-3

            sm:items-center
            sm:gap-4
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
              bg-slate-100
              text-slate-600

              sm:h-11
              sm:w-11
            "
          >
            <UserRound
              size={19}
              aria-hidden="true"
            />
          </div>

          <div
            className="
              min-w-0
              flex-1
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
              <h3
                className="
                  min-w-0
                  break-words
                  font-bold
                  leading-6
                  text-slate-950
                "
              >
                {student.studentName}
              </h3>

              {completed && (
                <span
                  className="
                    inline-flex
                    w-fit
                    shrink-0
                    items-center
                    gap-1
                    rounded-full
                    bg-emerald-50
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-emerald-700
                  "
                >
                  <CheckCircle2
                    size={11}
                    aria-hidden="true"
                  />

                  Completed
                </span>
              )}
            </div>

            <div
              className="
                mt-1.5
                flex
                min-w-0
                items-start
                gap-1.5
                text-sm
                leading-5
                text-slate-500

                sm:items-center
              "
            >
              <Clock3
                size={13}
                className="
                  mt-0.5
                  shrink-0

                  sm:mt-0
                "
                aria-hidden="true"
              />

              <span className="break-words">
                {student.completedLessons} of{" "}
                {student.totalLessons} lessons
                completed
              </span>
            </div>
          </div>
        </div>

        {/* PERCENTAGE */}

        <div
          className="
            flex
            shrink-0
            items-end
            justify-between
            gap-3
            border-t
            border-slate-100
            pt-3

            sm:block
            sm:border-t-0
            sm:pt-0
            sm:text-right
          "
        >
          <p
            className="
              text-xs
              text-slate-400

              sm:mt-0.5
              sm:order-2
            "
          >
            progress
          </p>

          <p
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-950
            "
          >
            {roundedPercentage}%
          </p>
        </div>
      </div>

      {/* PROGRESS BAR */}

      <div
        className="
          mt-4
          h-2
          overflow-hidden
          rounded-full
          bg-slate-100

          sm:mt-5
        "
        role="progressbar"
        aria-label={`${student.studentName} course progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedPercentage}
      >
        <div
          className="
            h-full
            rounded-full
            bg-emerald-600
            transition-all
          "
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div
      className="
        mt-5
        flex
        min-w-0
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-4
        py-10
        text-center

        sm:px-6
        sm:py-12
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-slate-400
        "
      >
        <UserRound
          size={21}
          aria-hidden="true"
        />
      </div>

      <h3
        className="
          mt-4
          break-words
          font-semibold
          text-slate-900
        "
      >
        No students found
      </h3>

      <p
        className="
          mt-1
          max-w-sm
          break-words
          text-sm
          leading-6
          text-slate-500
        "
      >
        There are currently no students
        with course progress in this batch.
      </p>
    </div>
  );
}

function clampPercentage(
  value: number
) {
  return Math.min(
    100,
    Math.max(0, value)
  );
}