"use client";

import axios from "axios";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";

import CourseProgressHeader from "@/components/instructor/course/progress/CourseProgressHeader";
import CourseProgressStats from "@/components/instructor/course/progress/CourseProgressStats";
import StudentCourseProgressList from "@/components/instructor/course/progress/StudentCourseProgressList";

import {
  getBatchCourseProgress,
  getCourse,
} from "@/services/instructorCourseService";

import type {
  CourseResponse,
  InstructorStudentProgressResponse,
} from "@/types/course";

/* =========================================================
   PAGE
========================================================= */

export default function InstructorCourseProgressPage() {
  const params = useParams();

  const courseId =
    typeof params.courseId === "string"
      ? params.courseId
      : "";

  const batchId =
    typeof params.batchId === "string"
      ? params.batchId
      : "";

  /* =========================================================
     STATE
  ========================================================= */

  const [course, setCourse] =
    useState<CourseResponse | null>(
      null
    );

  const [students, setStudents] =
    useState<
      InstructorStudentProgressResponse[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================================================
     AUTH FAILURE
  ========================================================= */

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "email"
      );

      localStorage.removeItem(
        "role"
      );

      window.location.replace(
        "/login"
      );
    }, []);

  /* =========================================================
     LOAD PROGRESS
  ========================================================= */

  const loadProgress =
    useCallback(async () => {
      if (!courseId || !batchId) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        /*
         * Course metadata and student
         * progress are independent, so
         * load them concurrently.
         */

        const [
          courseData,
          progressData,
        ] = await Promise.all([
          getCourse(courseId),

          getBatchCourseProgress(
            courseId,
            batchId
          ),
        ]);

        setCourse(courseData);
        setStudents(progressData);
      } catch (error: unknown) {
        console.error(
          "LOAD COURSE PROGRESS ERROR:",
          error
        );

        if (
          axios.isAxiosError(error)
        ) {
          if (
            error.response?.status ===
              401 ||
            error.response?.status ===
              403
          ) {
            handleAuthFailure();
            return;
          }

          setError(
            error.response?.data
              ?.message ||
              "Could not load course progress."
          );

          return;
        }

        setError(
          "Could not load course progress."
        );
      } finally {
        setLoading(false);
      }
    }, [
      courseId,
      batchId,
      handleAuthFailure,
    ]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  /* =========================================================
     DERIVED METRICS
  ========================================================= */

  const averageProgress =
    students.length === 0
      ? 0
      : students.reduce(
          (sum, student) =>
            sum +
            student.progressPercentage,
          0
        ) / students.length;

  const completedCount =
    students.filter(
      (student) =>
        student.totalLessons > 0 &&
        student.completedLessons >=
          student.totalLessons
    ).length;

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main
      className="
        min-h-screen
        bg-slate-50
        px-4
        py-8
        sm:px-6
        sm:py-10
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <CourseProgressHeader
          batchId={batchId}
          courseTitle={
            course?.title ??
            "Course Progress"
          }
        />

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div
            role="alert"
            className="
              mt-5
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              font-medium
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {/* ===================================================
            CONTENT
        =================================================== */}

        {loading ? (
          <CourseProgressSkeleton />
        ) : (
          <>
            <div className="mt-8">
              <CourseProgressStats
                studentCount={
                  students.length
                }
                averageProgress={
                  averageProgress
                }
                completedCount={
                  completedCount
                }
              />
            </div>

            <div className="mt-10">
              <StudentCourseProgressList
                students={students}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function CourseProgressSkeleton() {
  return (
    <div
      className="
        mt-8
        animate-pulse
      "
    >
      <div
        className="
          grid
          gap-4
          sm:grid-cols-3
        "
      >
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-40
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          />
        ))}
      </div>

      <div className="mt-10">
        <div
          className="
            h-3
            w-32
            rounded
            bg-slate-200
          "
        />

        <div
          className="
            mt-3
            h-7
            w-52
            rounded
            bg-slate-200
          "
        />

        <div
          className="
            mt-5
            space-y-3
          "
        >
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="
                h-32
                rounded-2xl
                border
                border-slate-200
                bg-white
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
}