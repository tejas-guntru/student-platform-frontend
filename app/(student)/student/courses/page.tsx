"use client";

import axios from "axios";
import Link from "next/link";

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
  getMyCourses,
  getStudentCourseProgress,
} from "@/services/studentCourseService";

import type {
  StudentCourseProgressResponse,
  StudentCourseResponse,
} from "@/types/course";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<
    StudentCourseResponse[]
  >([]);

  const [progress, setProgress] = useState<
    Record<
      string,
      StudentCourseProgressResponse
    >
  >({});

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

  const loadCourses = useCallback(
    async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getMyCourses();

        setCourses(data);

        const progressResults =
          await Promise.all(
            data.map(async (course) => {
              try {
                const courseProgress =
                  await getStudentCourseProgress(
                    course.courseId
                  );

                return [
                  course.courseId,
                  courseProgress,
                ] as const;
              } catch {
                return null;
              }
            })
          );

        const progressMap: Record<
          string,
          StudentCourseProgressResponse
        > = {};

        progressResults.forEach(
          (result) => {
            if (result) {
              progressMap[result[0]] =
                result[1];
            }
          }
        );

        setProgress(progressMap);
      } catch (error: unknown) {
        console.error(
          "LOAD STUDENT COURSES ERROR:",
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
    },
    [handleAuthFailure]
  );

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

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
          href="/student"
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

          Back to student home
        </Link>

        {/* HEADER */}

        <div
          className="
            mt-5
            min-w-0

            sm:mt-6
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
                break-words
                text-xs
                font-semibold
              "
            >
              Learning
            </span>
          </div>

          <h1
            className="
              mt-3
              break-words
              text-3xl
              font-bold
              tracking-tight
              text-slate-950

              sm:text-4xl
            "
          >
            My Courses
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-slate-500

              sm:text-base
            "
          >
            Courses assigned through your
            batches.
          </p>
        </div>

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

        {/* CONTENT */}

        {loading ? (
          <div
            className="
              mt-8
              flex
              min-w-0
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
              Loading courses...
            </span>
          </div>
        ) : courses.length === 0 ? (
          <div
            className="
              mt-8
              min-w-0
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5

              sm:p-8
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-700
              "
            >
              <BookOpen
                size={19}
                aria-hidden="true"
              />
            </div>

            <h2
              className="
                mt-4
                break-words
                font-semibold
                text-slate-950
              "
            >
              No courses yet
            </h2>

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
              When an instructor assigns a
              course to one of your batches,
              it will appear here.
            </p>
          </div>
        ) : (
          <div
            className="
              mt-8
              grid
              min-w-0
              grid-cols-1
              gap-4

              sm:gap-5

              md:grid-cols-2
            "
          >
            {courses.map((course) => {
              const courseProgress =
                progress[course.courseId];

              const rawPercentage =
                courseProgress
                  ?.progressPercentage ?? 0;

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

              return (
                <Link
                  key={course.courseId}
                  href={`/student/courses/${course.courseId}`}
                  className="
                    group
                    flex
                    min-w-0
                    flex-col
                    rounded-2xl
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
                  {/* COURSE */}

                  <div
                    className="
                      flex
                      min-w-0
                      flex-col
                      gap-3

                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                      sm:gap-4
                    "
                  >
                    <h2
                      className="
                        min-w-0
                        break-words
                        text-lg
                        font-semibold
                        leading-7
                        text-slate-950

                        [overflow-wrap:anywhere]
                      "
                    >
                      {course.title}
                    </h2>

                    <span
                      className="
                        inline-flex
                        w-fit
                        max-w-full
                        shrink-0
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-green-700
                      "
                    >
                      <span
                        className="
                          break-words
                          [overflow-wrap:anywhere]
                        "
                      >
                        {formatStatus(
                          course.status
                        )}
                      </span>
                    </span>
                  </div>

                  {course.description && (
                    <p
                      className="
                        mt-3
                        break-words
                        text-sm
                        leading-6
                        text-slate-500

                        [overflow-wrap:anywhere]
                      "
                    >
                      {course.description}
                    </p>
                  )}

                  {/* PROGRESS */}

                  <div
                    className="
                      mt-6
                      min-w-0
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        justify-between
                        gap-4
                        text-sm
                      "
                    >
                      <span
                        className="
                          font-medium
                          text-slate-600
                        "
                      >
                        Progress
                      </span>

                      <span
                        className="
                          shrink-0
                          font-semibold
                          text-slate-950
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
                          bg-blue-600
                          transition-all
                        "
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    {courseProgress && (
                      <p
                        className="
                          mt-2
                          break-words
                          text-xs
                          leading-5
                          text-slate-400
                        "
                      >
                        {
                          courseProgress.completedLessons
                        }{" "}
                        of{" "}
                        {
                          courseProgress.totalLessons
                        }{" "}
                        lessons completed
                      </p>
                    )}
                  </div>

                  {/* ACTION */}

                  <div
                    className="
                      mt-auto
                      flex
                      min-w-0
                      items-center
                      gap-2
                      pt-5
                      text-sm
                      font-semibold
                      text-blue-700
                    "
                  >
                    <span className="break-words">
                      Continue course
                    </span>

                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="
                        shrink-0
                        transition-transform

                        group-hover:translate-x-1
                      "
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function formatStatus(
  value: string
) {
  return value
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}