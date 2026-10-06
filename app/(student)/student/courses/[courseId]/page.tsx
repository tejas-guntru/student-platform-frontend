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

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
          Loading course...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/student/courses"
          className="text-sm font-semibold text-blue-700"
        >
          ← My Courses
        </Link>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {course && (
          <>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7">
              <div className="flex flex-col justify-between gap-5 md:flex-row">
                <div>
                  <p className="text-sm font-semibold text-blue-700">
                    Course
                  </p>

                  <h1 className="mt-2 text-3xl font-bold text-slate-950">
                    {course.title}
                  </h1>

                  {course.description && (
                    <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                      {course.description}
                    </p>
                  )}
                </div>

                {progress && (
                  <div className="min-w-40 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      Progress
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-950">
                      {Math.round(
                        progress.progressPercentage
                      )}
                      %
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {
                        progress.completedLessons
                      }{" "}
                      /{" "}
                      {
                        progress.totalLessons
                      }{" "}
                      lessons
                    </p>
                  </div>
                )}
              </div>

              {progress && (
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          progress.progressPercentage
                        )
                      )}%`,
                    }}
                  />
                </div>
              )}
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-semibold text-slate-950">
                Course Modules
              </h2>

              {modules.length === 0 ? (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
                  This course does not have
                  any modules yet.
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {modules.map(
                    (module, index) => (
                      <Link
                        key={module.id}
                        href={`/student/courses/${courseId}/modules/${module.id}`}
                        className="block rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                            {index + 1}
                          </div>

                          <div>
                            <h3 className="font-semibold text-slate-950">
                              {
                                module.title
                              }
                            </h3>

                            {module.description && (
                              <p className="mt-1 text-sm text-slate-500">
                                {
                                  module.description
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="mt-4 text-sm font-semibold text-blue-700">
                          Open module →
                        </p>
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