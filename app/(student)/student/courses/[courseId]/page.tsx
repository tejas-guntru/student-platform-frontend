"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  LoaderCircle,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getStudentCourse,
  getStudentCourseModules,
  getStudentCourseProgress,
} from "@/services/studentCourseService";

import type {
  StudentCourseModuleResponse,
  StudentCourseProgressResponse,
  StudentCourseResponse,
} from "@/types/course";

export default function StudentCoursePage() {
  const params = useParams();

  const courseId =
    typeof params.courseId === "string"
      ? params.courseId
      : "";

  const [course, setCourse] =
    useState<StudentCourseResponse | null>(
      null
    );

  const [modules, setModules] = useState<
    StudentCourseModuleResponse[]
  >([]);

  const [progress, setProgress] =
    useState<StudentCourseProgressResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.replace("/login");
    }, []);

  const loadCourse = useCallback(
    async () => {
      if (!courseId) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [
          courseData,
          moduleData,
          progressData,
        ] = await Promise.all([
          getStudentCourse(courseId),
          getStudentCourseModules(
            courseId
          ),
          getStudentCourseProgress(
            courseId
          ),
        ]);

        setCourse(courseData);

        setModules(
          [...moduleData].sort(
            (a, b) =>
              a.position - b.position
          )
        );

        setProgress(progressData);
      } catch (error: unknown) {
        console.error(
          "LOAD STUDENT COURSE ERROR:",
          error
        );

        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            handleAuthFailure();
            return;
          }

          setError(
            error.response?.data?.message ||
              "Could not load course."
          );

          return;
        }

        setError(
          "Could not load course."
        );
      } finally {
        setLoading(false);
      }
    },
    [courseId, handleAuthFailure]
  );

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          min-w-0
          bg-slate-50
          px-4
          py-8

          sm:px-6
          sm:py-10
        "
      >
        <div
          className="
            mx-auto
            flex
            min-w-0
            max-w-5xl
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5
            text-sm
            text-slate-500

            sm:p-6
          "
          role="status"
        >
          <LoaderCircle
            size={18}
            className="
              shrink-0
              animate-spin
            "
            aria-hidden="true"
          />

          <span>
            Loading course...
          </span>
        </div>
      </main>
    );
  }

  /* =======================================================
     PROGRESS
  ======================================================= */

  const rawPercentage =
    progress?.progressPercentage ?? 0;

  const percentage =
    Number.isFinite(rawPercentage)
      ? Math.min(
          100,
          Math.max(
            0,
            rawPercentage
          )
        )
      : 0;

  const roundedPercentage =
    Math.round(percentage);

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        min-w-0
        bg-slate-50
        px-4
        py-8

        sm:px-6
        sm:py-10
      "
    >
      <div
        className="
          mx-auto
          min-w-0
          max-w-5xl
        "
      >
        {/* BACK */}

        <Link
          href="/student/courses"
          className="
            inline-flex
            min-h-10
            items-center
            gap-2
            rounded-lg
            text-sm
            font-semibold
            text-blue-700
            transition-colors

            hover:text-blue-800

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-200
            focus-visible:ring-offset-2
          "
        >
          <ArrowLeft
            size={15}
            aria-hidden="true"
          />

          My Courses
        </Link>

        {/* ERROR */}

        {error && (
          <div
            role="alert"
            className="
              mt-6
              min-w-0
              break-words
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              leading-6
              text-red-700

              [overflow-wrap:anywhere]
            "
          >
            {error}
          </div>
        )}

        {course && (
          <>
            {/* COURSE HEADER */}

            <section
              className="
                mt-5
                min-w-0
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4

                sm:mt-6
                sm:p-6

                lg:p-7
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-6

                  md:flex-row
                  md:items-start
                  md:justify-between
                "
              >
                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <div
                    className="
                      inline-flex
                      max-w-full
                      items-center
                      gap-2
                      rounded-full
                      bg-blue-50
                      px-3
                      py-1.5
                      text-blue-700
                    "
                  >
                    <BookOpen
                      size={14}
                      className="shrink-0"
                      aria-hidden="true"
                    />

                    <span
                      className="
                        text-xs
                        font-semibold
                      "
                    >
                      Course
                    </span>
                  </div>

                  <h1
                    className="
                      mt-3
                      break-words
                      text-2xl
                      font-bold
                      tracking-tight
                      text-slate-950

                      [overflow-wrap:anywhere]

                      sm:text-3xl
                    "
                  >
                    {course.title}
                  </h1>

                  {course.description && (
                    <p
                      className="
                        mt-3
                        max-w-2xl
                        break-words
                        text-sm
                        leading-7
                        text-slate-500

                        [overflow-wrap:anywhere]

                        sm:text-base
                      "
                    >
                      {course.description}
                    </p>
                  )}
                </div>

                {progress && (
                  <div
                    className="
                      min-w-0
                      rounded-xl
                      bg-slate-50
                      p-4

                      md:w-44
                      md:shrink-0
                    "
                  >
                    <p
                      className="
                        text-sm
                        font-medium
                        text-slate-500
                      "
                    >
                      Progress
                    </p>

                    <p
                      className="
                        mt-1
                        text-2xl
                        font-bold
                        text-slate-950
                      "
                    >
                      {roundedPercentage}%
                    </p>

                    <p
                      className="
                        mt-1
                        break-words
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      {
                        progress.completedLessons
                      }{" "}
                      of{" "}
                      {
                        progress.totalLessons
                      }{" "}
                      lessons completed
                    </p>
                  </div>
                )}
              </div>

              {progress && (
                <div className="mt-6 min-w-0">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      text-xs
                    "
                  >
                    <span
                      className="
                        font-medium
                        text-slate-500
                      "
                    >
                      Course completion
                    </span>

                    <span
                      className="
                        shrink-0
                        font-semibold
                        text-slate-700
                      "
                    >
                      {roundedPercentage}%
                    </span>
                  </div>

                  <div
                    className="
                      mt-2
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-slate-100
                    "
                    role="progressbar"
                    aria-label={`${course.title} course progress`}
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
                        bg-blue-600
                        transition-all
                      "
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* MODULES */}

            <section
              className="
                mt-8
                min-w-0

                sm:mt-10
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-blue-700
                  "
                >
                  Course content
                </p>

                <h2
                  className="
                    mt-2
                    break-words
                    text-xl
                    font-semibold
                    text-slate-950

                    sm:text-2xl
                  "
                >
                  Course Modules
                </h2>
              </div>

              {modules.length === 0 ? (
                <div
                  className="
                    mt-4
                    min-w-0
                    rounded-xl
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
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-700
                    "
                  >
                    <BookOpen
                      size={18}
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className="
                      mt-4
                      font-semibold
                      text-slate-950
                    "
                  >
                    No modules yet
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-xl
                      break-words
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    This course does not have
                    any modules yet.
                  </p>
                </div>
              ) : (
                <div
                  className="
                    mt-4
                    min-w-0
                    space-y-3

                    sm:space-y-4
                  "
                >
                  {modules.map(
                    (module, index) => (
                      <Link
                        key={module.id}
                        href={`/student/courses/${courseId}/modules/${module.id}`}
                        className="
                          group
                          block
                          min-w-0
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          p-4
                          transition

                          hover:border-blue-300
                          hover:shadow-sm

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-blue-200
                          focus-visible:ring-offset-2

                          sm:p-6
                        "
                      >
                        <div
                          className="
                            flex
                            min-w-0
                            items-start
                            gap-3

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
                              rounded-full
                              bg-blue-50
                              text-sm
                              font-bold
                              text-blue-700
                            "
                            aria-hidden="true"
                          >
                            {index + 1}
                          </div>

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
                              {module.title}
                            </h3>

                            {module.description && (
                              <p
                                className="
                                  mt-1
                                  break-words
                                  text-sm
                                  leading-6
                                  text-slate-500

                                  [overflow-wrap:anywhere]
                                "
                              >
                                {
                                  module.description
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          className="
                            mt-4
                            flex
                            min-w-0
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-blue-700
                          "
                        >
                          <span>
                            Open module
                          </span>

                          <ArrowRight
                            size={14}
                            className="
                              shrink-0
                              transition-transform

                              group-hover:translate-x-1
                            "
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    )
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}