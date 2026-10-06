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

  return (
    <form
      onSubmit={onSubmit}
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4

        sm:p-5
      "
    >
      <div
        className="
          flex
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

        <div>
          <h3 className="font-bold text-slate-950">
            Assign Course
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Add one of your published courses
            to this batch.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <select
          value={selectedCourseId}
          disabled={
            assigning ||
            availableCourses.length === 0
          }
          onChange={(event) =>
            onCourseChange(
              event.target.value
            )
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-sm
            text-slate-950
            outline-none

            focus:border-[#1256AF]
            focus:ring-4
            focus:ring-blue-50

            disabled:cursor-not-allowed
            disabled:bg-slate-100
          "
        >
          <option value="">
            {availableCourses.length ===
            0
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

        <button
          type="submit"
          disabled={
            assigning ||
            !selectedCourseId
          }
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white

            hover:bg-emerald-700

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <BookPlus size={16} />

          {assigning
            ? "Assigning..."
            : "Assign Course"}
        </button>
      </div>
    </form>
  );
}