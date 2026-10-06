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
    <section>
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
          Learning Progress
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
          Student Progress
        </h2>

        <p
          className="
            mt-1
            text-sm
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
        <div className="mt-5 space-y-3">
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

  const completed =
    student.totalLessons > 0 &&
    student.completedLessons >=
      student.totalLessons;

  return (
    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        transition
        hover:border-slate-300
        sm:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
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
              bg-slate-100
              text-slate-600
            "
          >
            <UserRound size={19} />
          </div>

          <div className="min-w-0">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <h3
                className="
                  truncate
                  font-bold
                  text-slate-950
                "
              >
                {student.studentName}
              </h3>

              {completed && (
                <span
                  className="
                    inline-flex
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
                  />
                  Completed
                </span>
              )}
            </div>

            <div
              className="
                mt-1
                flex
                items-center
                gap-1.5
                text-sm
                text-slate-500
              "
            >
              <Clock3 size={13} />

              {student.completedLessons} of{" "}
              {student.totalLessons} lessons
              completed
            </div>
          </div>
        </div>

        <div
          className="
            shrink-0
            sm:text-right
          "
        >
          <p
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-950
            "
          >
            {Math.round(percentage)}%
          </p>

          <p
            className="
              mt-0.5
              text-xs
              text-slate-400
            "
          >
            progress
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
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
        <UserRound size={21} />
      </div>

      <h3
        className="
          mt-4
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