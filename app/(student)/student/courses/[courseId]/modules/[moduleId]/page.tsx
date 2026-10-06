"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
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

  const refreshProgress =
    async () => {
      const data =
        await getStudentCourseProgress(
          courseId
        );

      setProgress(data);
    };

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
        className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:underline"
      >
        Open resource ↗
      </a>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/student/courses/${courseId}`}
          className="text-sm font-semibold text-blue-700"
        >
          ← Back to course
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              Course Module
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Lessons
            </h1>
          </div>

          {progress && (
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-3">
              <p className="text-xs text-slate-500">
                Course progress
              </p>

              <p className="mt-1 font-bold text-slate-950">
                {progress.completedLessons}
                {" / "}
                {progress.totalLessons}
                {" lessons · "}
                {Math.round(
                  progress.progressPercentage
                )}
                %
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Loading lessons...
          </div>
        ) : lessons.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            No lessons in this module.
          </div>
        ) : (
          <div className="mt-8 space-y-5">
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
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                          Lesson {index + 1}
                          {" · "}
                          {lesson.lessonType}
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-slate-950">
                          {lesson.title}
                        </h2>
                      </div>

                      {completed && (
                        <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                          Completed
                        </span>
                      )}
                    </div>

                    {lesson.content && (
                      <div className="mt-5 whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                        {lesson.content}
                      </div>
                    )}

                    {renderResource(
                      lesson
                    )}

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      {completed ? (
                        <button
                          type="button"
                          disabled={
                            processing
                          }
                          onClick={() =>
                            handleUndo(
                              lesson.id
                            )
                          }
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {processing
                            ? "Updating..."
                            : "Mark Incomplete"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={
                            processing
                          }
                          onClick={() =>
                            handleComplete(
                              lesson.id
                            )
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
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