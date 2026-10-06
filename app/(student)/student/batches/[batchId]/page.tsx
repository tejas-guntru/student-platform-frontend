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
  getBatchDetails,
} from "@/services/batchService";

import {
  getAvailableAssessments,
} from "@/services/studentAssessmentService";

import {
  getStudentBatchTasks,
} from "@/services/studentTaskService";

import type {
  StudentBatchDetailResponse,
} from "@/types/batch";

import type {
  StudentAssessmentSummaryResponse,
} from "@/types/assessment";

import type {
  TaskResponse,
} from "@/types/task";

export default function StudentBatchDetailPage() {
  const params = useParams();

  const batchId =
    typeof params.batchId === "string"
      ? params.batchId
      : "";

  // =========================================================
  // DATA
  // =========================================================

  const [batch, setBatch] =
    useState<StudentBatchDetailResponse | null>(
      null
    );

  const [assessments, setAssessments] =
    useState<
      StudentAssessmentSummaryResponse[]
    >([]);

  const [tasks, setTasks] =
    useState<TaskResponse[]>([]);

  // =========================================================
  // PAGE STATE
  // =========================================================

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================================
  // AUTH FAILURE
  // =========================================================

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.replace("/login");
    }, []);

  // =========================================================
  // LOAD BATCH + ASSESSMENTS + TASKS
  // =========================================================

  const loadBatch = useCallback(
    async () => {
      if (!batchId) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [
          batchResponse,
          assessmentResponse,
          taskResponse,
        ] = await Promise.all([
          getBatchDetails(batchId),
          getAvailableAssessments(),
          getStudentBatchTasks(batchId),
        ]);

        setBatch(batchResponse);

        // Student assessment endpoint returns
        // assessments available to the student
        // across all of their batches.
        //
        // Only show assessments belonging
        // to the current batch.

        const currentBatchAssessments =
          assessmentResponse.filter(
            (assessment) =>
              assessment.batchId ===
              batchId
          );

        setAssessments(
          currentBatchAssessments
        );

        setTasks(taskResponse);
      } catch (error: unknown) {
        console.error(
          "STUDENT BATCH DETAILS ERROR:",
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
              "Could not load batch."
          );

          return;
        }

        setError(
          "Could not load batch."
        );
      } finally {
        setLoading(false);
      }
    },
    [batchId, handleAuthFailure]
  );

  useEffect(() => {
    loadBatch();
  }, [loadBatch]);

  // =========================================================
  // HELPERS
  // =========================================================

  const formatDateTime = (
    value: string | null
  ) => {
    if (!value) {
      return null;
    }

    return new Date(
      value
    ).toLocaleString();
  };

  const getAssessmentAvailability = (
    assessment: StudentAssessmentSummaryResponse
  ) => {
    const now = new Date();

    if (
      assessment.status !== "PUBLISHED"
    ) {
      return {
        available: false,
        label: assessment.status,
      };
    }

    if (assessment.startsAt) {
      const startsAt = new Date(
        assessment.startsAt
      );

      if (now < startsAt) {
        return {
          available: false,
          label: "UPCOMING",
        };
      }
    }

    if (assessment.endsAt) {
      const endsAt = new Date(
        assessment.endsAt
      );

      if (now > endsAt) {
        return {
          available: false,
          label: "ENDED",
        };
      }
    }

    return {
      available: true,
      label: "AVAILABLE",
    };
  };

  const getTaskState = (
    task: TaskResponse
  ) => {
    if (!task.dueAt) {
      return {
        overdue: false,
        label: "ACTIVE",
      };
    }

    const overdue =
      new Date() >
      new Date(task.dueAt);

    return {
      overdue,
      label: overdue
        ? "OVERDUE"
        : "ACTIVE",
    };
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-slate-500">
            Loading batch...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error || !batch) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/student/batches"
            className="text-sm font-semibold text-blue-700"
          >
            ← Back to batches
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error ||
              "Batch not found."}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/student/batches"
          className="text-sm font-semibold text-blue-700"
        >
          ← Back to batches
        </Link>

        {/* ===================================================
            BATCH DETAILS
        =================================================== */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-blue-700">
                Student batch
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                {batch.name}
              </h1>

              {batch.description && (
                <p className="mt-3 max-w-2xl text-slate-600">
                  {batch.description}
                </p>
              )}
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                batch.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : batch.status ===
                      "COMPLETED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              {batch.status}
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Instructor
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {batch.instructorName}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Joined
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {new Date(
                  batch.joinedAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            ASSESSMENTS
        =================================================== */}

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                Assessments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Assessments available
                for this batch.
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
              {assessments.length}
            </span>
          </div>

          {assessments.length === 0 ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-medium text-slate-900">
                No assessments
                available.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Published assessments
                from your instructor
                will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {assessments.map(
                (assessment) => {
                  const availability =
                    getAssessmentAvailability(
                      assessment
                    );

                  const startsAt =
                    formatDateTime(
                      assessment.startsAt
                    );

                  const endsAt =
                    formatDateTime(
                      assessment.endsAt
                    );

                  return (
                    <div
                      key={
                        assessment.id
                      }
                      className="rounded-xl border border-slate-200 bg-white p-6"
                    >
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">
                            {
                              assessment.title
                            }
                          </h3>

                          {assessment.description && (
                            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                              {
                                assessment.description
                              }
                            </p>
                          )}
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                            availability.available
                              ? "bg-green-100 text-green-700"
                              : availability.label ===
                                  "UPCOMING"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {
                            availability.label
                          }
                        </span>
                      </div>

                      {/* =====================================
                          ASSESSMENT INFO
                      ===================================== */}

                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Duration
                          </p>

                          <p className="mt-2 font-semibold text-slate-900">
                            {assessment.durationMinutes
                              ? `${assessment.durationMinutes} min`
                              : "No limit"}
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Marks
                          </p>

                          <p className="mt-2 font-semibold text-slate-900">
                            {
                              assessment.totalMarks
                            }
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Opens
                          </p>

                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {startsAt ||
                              "Now"}
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Closes
                          </p>

                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {endsAt ||
                              "No deadline"}
                          </p>
                        </div>
                      </div>

                      {/* =====================================
                          ACTION
                      ===================================== */}

                      <div className="mt-5 border-t border-slate-100 pt-5">
                        {availability.available ? (
                          <Link
                            href={`/student/assessments/${assessment.id}`}
                            className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            View Assessment →
                          </Link>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500"
                          >
                            {availability.label ===
                            "UPCOMING"
                              ? "Not Open Yet"
                              : "Unavailable"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            TASKS
        =================================================== */}

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Assignments from your
                instructor for this batch.
              </p>
            </div>

            <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-800">
              {tasks.length}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-medium text-slate-900">
                No tasks available.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Tasks assigned by your
                instructor will appear
                here.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {tasks.map((task) => {
                const taskState =
                  getTaskState(task);

                const dueAt =
                  formatDateTime(
                    task.dueAt
                  );

                return (
                  <div
                    key={task.id}
                    className="rounded-xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">
                          {task.title}
                        </h3>

                        {task.description && (
                          <p className="mt-2 max-w-2xl whitespace-pre-wrap text-sm leading-6 text-slate-600">
                            {
                              task.description
                            }
                          </p>
                        )}
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                          taskState.overdue
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {
                          taskState.label
                        }
                      </span>
                    </div>

                    {/* =====================================
                        TASK INFO
                    ===================================== */}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Due
                        </p>

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {dueAt ||
                            "No deadline"}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Assigned
                        </p>

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {new Date(
                            task.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* =====================================
                        ACTION
                    ===================================== */}

                    <div className="mt-5 border-t border-slate-100 pt-5">
                      <Link
                        href={`/student/batches/${batchId}/tasks/${task.id}`}
                        className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View Task →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}