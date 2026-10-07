"use client";

import {
  BookPlus,
} from "lucide-react";

import type {
  CourseAssignmentResponse,
  CourseResponse,
} from "@/types/course";

interface AssignCourseFormProps {
  courses: CourseResponse[];
  assignments: CourseAssignmentResponse[];
  selectedCourseId: string;
  assigning: boolean;

  onCourseChange: (
    courseId: string
  ) => void;

  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
}

export default function AssignCourseForm({
  courses,
  assignments,
  selectedCourseId,
  assigning,
  onCourseChange,
  onSubmit,
}: AssignCourseFormProps) {
  const availableCourses =
    courses.filter(
      (course) =>
        !assignments.some(
          (assignment) =>
            assignment.courseId ===
            course.id
        )
    );

  const noCoursesAvailable =
    availableCourses.length === 0;

  return (
    <form
      onSubmit={onSubmit}
      className="
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4

        sm:p-5
      "
    >
      {/* HEADER */}

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
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-white
            text-emerald-700
          "
        >
          <BookPlus size={17} />
        </div>

        <div className="min-w-0">
          <h3
            className="
              break-words
              font-bold
              text-slate-950
            "
          >
            Assign Course
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
            Add one of your published courses
            to this batch.
          </p>
        </div>
      </div>

      {/* FORM */}

      <div
        className="
          mt-5
          min-w-0
          space-y-3
        "
      >
        <div className="min-w-0">
          <label
            htmlFor="batch-course"
            className="
              text-xs
              font-semibold
              text-slate-700
            "
          >
            Published course
          </label>

          <select
            id="batch-course"
            value={selectedCourseId}
            disabled={
              assigning ||
              noCoursesAvailable
            }
            onChange={(event) =>
              onCourseChange(
                event.target.value
              )
            }
            className="
              mt-2
              min-h-11
              min-w-0
              w-full
              max-w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-3.5
              py-2.5
              text-sm
              text-slate-950
              outline-none
              transition

              focus:border-[#1256AF]
              focus:ring-4
              focus:ring-blue-50

              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:text-slate-500

              sm:px-4
              sm:py-3
            "
          >
            <option value="">
              {noCoursesAvailable
                ? "No courses available"
                : "Select published course"}
            </option>

            {availableCourses.map(
              (course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.title}
                </option>
              )
            )}
          </select>

          {noCoursesAvailable && (
            <p
              className="
                mt-2
                break-words
                text-[11px]
                leading-4
                text-slate-400
              "
            >
              All available published courses
              are already assigned to this
              batch.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={
            assigning ||
            !selectedCourseId
          }
          className="
            inline-flex
            min-h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-colors

            hover:bg-emerald-700

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-300
            focus-visible:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:py-3
          "
        >
          <BookPlus
            size={16}
            className="shrink-0"
          />

          {assigning
            ? "Assigning..."
            : "Assign Course"}
        </button>
      </div>
    </form>
  );
}