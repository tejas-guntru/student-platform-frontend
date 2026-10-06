"use client";

import axios from "axios";
import Link from "next/link";
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
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/student"
          className="text-sm font-semibold text-blue-700"
        >
          ← Back to student home
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-blue-700">
            Learning
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            My Courses
          </h1>

          <p className="mt-2 text-slate-500">
            Courses assigned through your
            batches.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8">
            <h2 className="font-semibold text-slate-950">
              No courses yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              When an instructor assigns a
              course to one of your batches,
              it will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {courses.map((course) => {
              const courseProgress =
                progress[course.courseId];

              const percentage =
                courseProgress
                  ?.progressPercentage ?? 0;

              return (
                <Link
                  key={course.courseId}
                  href={`/student/courses/${course.courseId}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold text-slate-950">
                      {course.title}
                    </h2>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      {course.status}
                    </span>
                  </div>

                  {course.description && (
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {course.description}
                    </p>
                  )}

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-600">
                        Progress
                      </span>

                      <span className="font-semibold text-slate-950">
                        {Math.round(
                          percentage
                        )}
                        %
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              percentage
                            )
                          )}%`,
                        }}
                      />
                    </div>

                    {courseProgress && (
                      <p className="mt-2 text-xs text-slate-400">
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

                  <p className="mt-5 text-sm font-semibold text-blue-700">
                    Continue course →
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}