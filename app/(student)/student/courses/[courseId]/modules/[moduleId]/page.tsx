"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  LoaderCircle,
  RotateCcw,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  completeLesson,
  getStudentCourseProgress,
  getStudentModuleLessons,
  uncompleteLesson,
} from "@/services/studentCourseService";

import type {
  StudentCourseProgressResponse,
  StudentLessonResponse,
} from "@/types/course";

export default function StudentModulePage() {
  const params = useParams();

  const courseId =
    typeof params.courseId === "string"
      ? params.courseId
      : "";

  const moduleId =
    typeof params.moduleId === "string"
      ? params.moduleId
      : "";

  const [lessons, setLessons] = useState<
    StudentLessonResponse[]
  >([]);

  const [progress, setProgress] =
    useState<StudentCourseProgressResponse | null>(
      null
    );

  const [
    processingLessonId,
    setProcessingLessonId,
  ] = useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.replace("/login");
    }, []);

  /* =======================================================
     LOAD MODULE
  ======================================================= */

  const loadModule = useCallback(
    async () => {
      if (!courseId || !moduleId) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [
          lessonData,
          progressData,
        ] = await Promise.all([
          getStudentModuleLessons(
            courseId,
            moduleId
          ),
          getStudentCourseProgress(
            courseId
          ),
        ]);

        setLessons(
          [...lessonData].sort(
            (a, b) =>
              a.position - b.position
          )
        );

        setProgress(progressData);
      } catch (error: unknown) {
        console.error(
          "LOAD MODULE ERROR:",
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
              "Could not load lessons."
          );

          return;
        }

        setError(
          "Could not load lessons."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      courseId,
      moduleId,
      handleAuthFailure,
    ]
  );

  useEffect(() => {
    loadModule();
  }, [loadModule]);

  /* =======================================================
     REFRESH PROGRESS
  ======================================================= */

  const refreshProgress =
    async () => {
      const data =
        await getStudentCourseProgress(
          courseId
        );

      setProgress(data);
    };

  /* =======================================================
     COMPLETE LESSON
  ======================================================= */

  const handleComplete = async (
    lessonId: string
  ) => {
    setProcessingLessonId(lessonId);
    setError("");
    setMessage("");

    try {
      await completeLesson(
        courseId,
        moduleId,
        lessonId
      );

      setLessons((current) =>
        current.map((lesson) =>
          lesson.id === lessonId
            ? {
                ...lesson,
                completed: true,
              }
            : lesson
        )
      );

      await refreshProgress();

      setMessage(
        "Lesson marked as complete."
      );
    } catch (error: unknown) {
      console.error(
        "COMPLETE LESSON ERROR:",
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
            "Could not complete lesson."
        );

        return;
      }

      setError(
        "Could not complete lesson."
      );
    } finally {
      setProcessingLessonId(null);
    }
  };

  /* =======================================================
     UNDO LESSON
  ======================================================= */

  const handleUndo = async (
    lessonId: string
  ) => {
    setProcessingLessonId(lessonId);
    setError("");
    setMessage("");

    try {
      await uncompleteLesson(
        courseId,
        moduleId,
        lessonId
      );

      setLessons((current) =>
        current.map((lesson) =>
          lesson.id === lessonId
            ? {
                ...lesson,
                completed: false,
              }
            : lesson
        )
      );

      await refreshProgress();

      setMessage(
        "Lesson completion removed."
      );
    } catch (error: unknown) {
      console.error(
        "UNCOMPLETE LESSON ERROR:",
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
            "Could not update lesson."
        );

        return;
      }

      setError(
        "Could not update lesson."
      );
    } finally {
      setProcessingLessonId(null);
    }
  };

  /* =======================================================
     RESOURCE
  ======================================================= */

  const renderResource = (
    lesson: StudentLessonResponse
  ) => {
    if (!lesson.resourceUrl) {
      return null;
    }

    return (
      <a
        href={lesson.resourceUrl}
        target="_blank"
        rel="noreferrer"
        className="
          mt-4
          inline-flex
          min-h-10
          max-w-full
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
        <span className="break-words">
          Open resource
        </span>

        <ExternalLink
          size={14}
          className="shrink-0"
          aria-hidden="true"
        />

        <span className="sr-only">
          Opens in a new tab
        </span>
      </a>
    );
  };

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
          max-w-4xl
        "
      >
        {/* BACK */}

        <Link
          href={`/student/courses/${courseId}`}
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

          Back to course
        </Link>

        {/* HEADER */}

        <div
          className="
            mt-5
            flex
            min-w-0
            flex-col
            gap-4

            sm:mt-6
            sm:flex-row
            sm:items-end
            sm:justify-between
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
              Course Module
            </p>

            <h1
              className="
                mt-2
                break-words
                text-3xl
                font-bold
                tracking-tight
                text-slate-950

                sm:text-4xl
              "
            >
              Lessons
            </h1>
          </div>

          {progress && (
            <div
              className="
                min-w-0
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3

                sm:w-auto
                sm:min-w-52
                sm:shrink-0
                sm:px-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <p
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  Course progress
                </p>

                <span
                  className="
                    shrink-0
                    text-xs
                    font-bold
                    text-blue-700
                  "
                >
                  {roundedPercentage}%
                </span>
              </div>

              <p
                className="
                  mt-1
                  break-words
                  text-sm
                  font-bold
                  text-slate-950
                "
              >
                {progress.completedLessons}
                {" / "}
                {progress.totalLessons}
                {" lessons"}
              </p>

              <div
                className="
                  mt-3
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-slate-100
                "
                role="progressbar"
                aria-label="Course progress"
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
        </div>

        {/* MESSAGES */}

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

        {message && (
          <div
            role="status"
            className="
              mt-6
              flex
              min-w-0
              items-start
              gap-2
              rounded-xl
              border
              border-green-200
              bg-green-50
              p-4
              text-sm
              leading-6
              text-green-700
            "
          >
            <CheckCircle2
              size={16}
              className="
                mt-0.5
                shrink-0
              "
              aria-hidden="true"
            />

            <span className="break-words">
              {message}
            </span>
          </div>
        )}

        {/* LESSONS */}

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

            Loading lessons...
          </div>
        ) : lessons.length === 0 ? (
          <div
            className="
              mt-8
              min-w-0
              rounded-xl
              border
              border-slate-200
              bg-white
              p-5

              sm:p-6
            "
          >
            <h2
              className="
                font-semibold
                text-slate-950
              "
            >
              No lessons yet
            </h2>

            <p
              className="
                mt-2
                break-words
                text-sm
                leading-6
                text-slate-500
              "
            >
              No lessons have been added to
              this module yet.
            </p>
          </div>
        ) : (
          <div
            className="
              mt-8
              min-w-0
              space-y-4

              sm:space-y-5
            "
          >
            {lessons.map(
              (lesson, index) => {
                const completed =
                  lesson.completed;

                const processing =
                  processingLessonId ===
                  lesson.id;

                return (
                  <article
                    key={lesson.id}
                    className="
                      min-w-0
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-4

                      sm:p-6
                    "
                  >
                    {/* LESSON HEADER */}

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
                      <div className="min-w-0">
                        <p
                          className="
                            break-words
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-blue-700
                          "
                        >
                          Lesson {index + 1}
                          {" · "}
                          {formatLessonType(
                            lesson.lessonType
                          )}
                        </p>

                        <h2
                          className="
                            mt-2
                            break-words
                            text-lg
                            font-semibold
                            leading-7
                            text-slate-950

                            [overflow-wrap:anywhere]

                            sm:text-xl
                          "
                        >
                          {lesson.title}
                        </h2>
                      </div>

                      {completed && (
                        <span
                          className="
                            inline-flex
                            w-fit
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-full
                            bg-green-100
                            px-3
                            py-1
                            text-xs
                            font-bold
                            text-green-700
                          "
                        >
                          <CheckCircle2
                            size={13}
                            aria-hidden="true"
                          />

                          Completed
                        </span>
                      )}
                    </div>

                    {/* CONTENT */}

                    {lesson.content && (
                      <div
                        className="
                          mt-5
                          min-w-0
                          whitespace-pre-wrap
                          break-words
                          rounded-xl
                          bg-slate-50
                          p-4
                          text-sm
                          leading-7
                          text-slate-700

                          [overflow-wrap:anywhere]

                          sm:p-5
                        "
                      >
                        {lesson.content}
                      </div>
                    )}

                    {/* RESOURCE */}

                    {renderResource(
                      lesson
                    )}

                    {/* ACTION */}

                    <div
                      className="
                        mt-6
                        min-w-0
                        border-t
                        border-slate-100
                        pt-5
                      "
                    >
                      {completed ? (
                        <button
                          type="button"
                          disabled={processing}
                          onClick={() =>
                            handleUndo(
                              lesson.id
                            )
                          }
                          className="
                            inline-flex
                            min-h-11
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-slate-700
                            transition

                            hover:bg-slate-50

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-slate-300
                            focus-visible:ring-offset-2

                            disabled:cursor-not-allowed
                            disabled:opacity-50

                            sm:w-auto
                          "
                        >
                          {processing ? (
                            <LoaderCircle
                              size={15}
                              className="
                                shrink-0
                                animate-spin
                              "
                              aria-hidden="true"
                            />
                          ) : (
                            <RotateCcw
                              size={15}
                              className="shrink-0"
                              aria-hidden="true"
                            />
                          )}

                          {processing
                            ? "Updating..."
                            : "Mark Incomplete"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={processing}
                          onClick={() =>
                            handleComplete(
                              lesson.id
                            )
                          }
                          className="
                            inline-flex
                            min-h-11
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            transition

                            hover:bg-blue-700

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-blue-300
                            focus-visible:ring-offset-2

                            disabled:cursor-not-allowed
                            disabled:opacity-50

                            sm:w-auto
                          "
                        >
                          {processing ? (
                            <LoaderCircle
                              size={15}
                              className="
                                shrink-0
                                animate-spin
                              "
                              aria-hidden="true"
                            />
                          ) : (
                            <CheckCircle2
                              size={15}
                              className="shrink-0"
                              aria-hidden="true"
                            />
                          )}

                          {processing
                            ? "Updating..."
                            : "Mark Complete"}
                        </button>
                      )}
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   FORMAT LESSON TYPE
========================================================= */

function formatLessonType(
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