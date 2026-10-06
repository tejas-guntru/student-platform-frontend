"use client";

import axios from "axios";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import InstructorCoursesHeader from "@/components/instructor/course/InstructorCoursesHeader";
import CreateCourseForm from "@/components/instructor/course/CreateCourseForm";
import InstructorCourseList from "@/components/instructor/course/InstructorCourseList";

import {
  createCourse,
  getMyCourses,
} from "@/services/instructorCourseService";

import type {
  CourseResponse,
} from "@/types/course";

/* =========================================================
   PAGE
========================================================= */

export default function InstructorCoursesPage() {
  /* =========================================================
     STATE
  ========================================================= */

  const [courses, setCourses] =
    useState<CourseResponse[]>([]);

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
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
     LOAD COURSES
  ========================================================= */

  const loadCourses =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getMyCourses();

        setCourses(response);
      } catch (error: unknown) {
        console.error(
          "LOAD COURSES ERROR:",
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
              "Could not load courses."
          );

          return;
        }

        setError(
          "Could not load courses."
        );
      } finally {
        setLoading(false);
      }
    }, [handleAuthFailure]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  /* =========================================================
     CREATE COURSE
  ========================================================= */

  const handleCreateCourse =
    async () => {
      const cleanTitle =
        title.trim();

      const cleanDescription =
        description.trim();

      if (!cleanTitle) {
        setError(
          "Course title is required."
        );

        setMessage("");

        return;
      }

      setCreating(true);

      setError("");
      setMessage("");

      try {
        const course =
          await createCourse({
            title: cleanTitle,

            description:
              cleanDescription ||
              null,
          });

        /*
         * The backend returns the newly
         * created course, so prepend it
         * without another API request.
         */

        setCourses((current) => [
          course,
          ...current,
        ]);

        setTitle("");
        setDescription("");

        setMessage(
          "Course created successfully."
        );
      } catch (error: unknown) {
        console.error(
          "CREATE COURSE ERROR:",
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
              "Could not create course."
          );

          return;
        }

        setError(
          "Could not create course."
        );
      } finally {
        setCreating(false);
      }
    };

  /* =========================================================
     DERIVED COUNTS
  ========================================================= */

  const publishedCourses =
    courses.filter(
      (course) =>
        course.status ===
        "PUBLISHED"
    ).length;

  const draftCourses =
    courses.filter(
      (course) =>
        course.status === "DRAFT"
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
          max-w-7xl
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <InstructorCoursesHeader
          totalCourses={
            courses.length
          }
          publishedCourses={
            publishedCourses
          }
          draftCourses={
            draftCourses
          }
        />

        {/* ===================================================
            MESSAGES
        =================================================== */}

        {(error || message) && (
          <div
            className="
              mt-5
              space-y-3
            "
          >
            {error && (
              <div
                role="alert"
                className="
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

            {message && (
              <div
                role="status"
                className="
                  rounded-xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-emerald-700
                "
              >
                {message}
              </div>
            )}
          </div>
        )}

        {/* ===================================================
            WORKSPACE
        =================================================== */}

        <div
          className="
            mt-8
            grid
            gap-8
            xl:grid-cols-[380px_minmax(0,1fr)]
            xl:items-start
          "
        >
          {/* CREATE */}

          <div
            className="
              xl:sticky
              xl:top-24
            "
          >
            <CreateCourseForm
              title={title}
              description={
                description
              }
              creating={creating}
              onTitleChange={(
                value
              ) => {
                setTitle(value);

                if (
                  error ===
                  "Course title is required."
                ) {
                  setError("");
                }
              }}
              onDescriptionChange={
                setDescription
              }
              onSubmit={
                handleCreateCourse
              }
            />
          </div>

          {/* COURSES */}

          <InstructorCourseList
            courses={courses}
            loading={loading}
          />
        </div>
      </div>
    </main>
  );
}