"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getOwnTaskSubmission,
  getStudentTask,
  submitTask,
  updateTaskSubmission,
} from "@/services/studentTaskService";

import type {
  TaskResponse,
  TaskSubmissionResponse,
} from "@/types/task";

export default function StudentTaskPage() {
  const params = useParams();

  const batchId =
    typeof params.batchId === "string"
      ? params.batchId
      : "";

  const taskId =
    typeof params.taskId === "string"
      ? params.taskId
      : "";

  // =========================================================
  // DATA
  // =========================================================

  const [task, setTask] =
    useState<TaskResponse | null>(null);

  const [submission, setSubmission] =
    useState<TaskSubmissionResponse | null>(
      null
    );

  // =========================================================
  // FORM
  // =========================================================

  const [content, setContent] =
    useState("");

  const [resourceUrl, setResourceUrl] =
    useState("");

  // =========================================================
  // PAGE STATE
  // =========================================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
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
  // LOAD
  // =========================================================

  const loadTask = useCallback(
    async () => {
      if (!batchId || !taskId) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const taskResponse =
          await getStudentTask(
            batchId,
            taskId
          );

        setTask(taskResponse);

        /*
         * A student may not have submitted
         * this task yet.
         *
         * Therefore a 404 from the submission
         * endpoint is a valid initial state.
         */

        try {
          const submissionResponse =
            await getOwnTaskSubmission(
              taskId
            );

          setSubmission(
            submissionResponse
          );

          setContent(
            submissionResponse.content ??
              ""
          );

          setResourceUrl(
            submissionResponse.resourceUrl ??
              ""
          );
        } catch (
          submissionError: unknown
        ) {
          if (
            axios.isAxiosError(
              submissionError
            )
          ) {
            if (
              submissionError.response
                ?.status === 401 ||
              submissionError.response
                ?.status === 403
            ) {
              handleAuthFailure();
              return;
            }

            if (
              submissionError.response
                ?.status === 404
            ) {
              setSubmission(null);
              setContent("");
              setResourceUrl("");
              return;
            }
          }

          throw submissionError;
        }
      } catch (error: unknown) {
        console.error(
          "STUDENT TASK ERROR:",
          error
        );

        if (axios.isAxiosError(error)) {
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
              "Could not load task."
          );

          return;
        }

        setError(
          "Could not load task."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      batchId,
      taskId,
      handleAuthFailure,
    ]
  );

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  // =========================================================
  // SUBMIT / UPDATE
  // =========================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanContent =
      content.trim();

    const cleanResourceUrl =
      resourceUrl.trim();

    if (
      !cleanContent &&
      !cleanResourceUrl
    ) {
      setError(
        "Add submission content or a resource link."
      );
      return;
    }

    if (
      submission?.status === "REVIEWED"
    ) {
      setError(
        "This submission has already been reviewed and can no longer be edited."
      );
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const request = {
        content:
          cleanContent || null,
        resourceUrl:
          cleanResourceUrl || null,
      };

      let saved:
        TaskSubmissionResponse;

      if (submission) {
        saved =
          await updateTaskSubmission(
            taskId,
            request
          );

        setMessage(
          "Submission updated successfully."
        );
      } else {
        saved =
          await submitTask(
            taskId,
            request
          );

        setMessage(
          "Task submitted successfully."
        );
      }

      setSubmission(saved);

      setContent(
        saved.content ?? ""
      );

      setResourceUrl(
        saved.resourceUrl ?? ""
      );
    } catch (error: unknown) {
      console.error(
        "SAVE TASK SUBMISSION ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
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
            "Could not save submission."
        );

        return;
      }

      setError(
        "Could not save submission."
      );
    } finally {
      setSaving(false);
    }
  };

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

  const isOverdue =
    task?.dueAt
      ? new Date() >
        new Date(task.dueAt)
      : false;

  const isReviewed =
    submission?.status === "REVIEWED";

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-500">
            Loading task...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR / NOT FOUND
  // =========================================================

  if (!task) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/student/batches/${batchId}`}
            className="text-sm font-semibold text-blue-700"
          >
            ← Back to batch
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error ||
              "Task not found."}
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
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/student/batches/${batchId}`}
          className="text-sm font-semibold text-blue-700"
        >
          ← Back to batch
        </Link>

        {/* =================================================
            MESSAGES
        ================================================= */}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* =================================================
            TASK DETAILS
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-blue-700">
                Task
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                {task.title}
              </h1>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                isOverdue
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {isOverdue
                ? "OVERDUE"
                : "ACTIVE"}
            </span>
          </div>

          {task.description && (
            <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Due
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {formatDateTime(
                  task.dueAt
                ) || "No deadline"}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Assigned
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {formatDateTime(
                  task.createdAt
                )}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            SUBMISSION STATUS
        ================================================= */}

        {submission && (
          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold text-slate-950">
                  Submission Status
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Submitted{" "}
                  {new Date(
                    submission.submittedAt
                  ).toLocaleString()}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                  isReviewed
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {submission.status}
              </span>
            </div>

            {submission.reviewedAt && (
              <p className="mt-4 text-sm text-slate-500">
                Reviewed{" "}
                {new Date(
                  submission.reviewedAt
                ).toLocaleString()}
              </p>
            )}
          </section>
        )}

        {/* =================================================
            INSTRUCTOR FEEDBACK
        ================================================= */}

        {isReviewed && (
          <section className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-green-700">
              Instructor Feedback
            </p>

            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              Your work has been reviewed
            </h2>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
              {submission.feedback ||
                "No feedback was provided."}
            </p>
          </section>
        )}

        {/* =================================================
            SUBMISSION FORM
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-950">
            {submission
              ? isReviewed
                ? "Your Submission"
                : "Update Submission"
              : "Submit Task"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isReviewed
              ? "Your submission has been reviewed and is now locked."
              : "You can provide written work, a resource link, or both."}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="submission-content"
                className="text-sm font-medium text-slate-700"
              >
                Submission
              </label>

              <textarea
                id="submission-content"
                value={content}
                onChange={(event) =>
                  setContent(
                    event.target.value
                  )
                }
                disabled={isReviewed}
                rows={8}
                placeholder="Write your answer, explanation, notes, or submission here."
                className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="resource-url"
                className="text-sm font-medium text-slate-700"
              >
                Resource Link
              </label>

              <input
                id="resource-url"
                type="url"
                value={resourceUrl}
                onChange={(event) =>
                  setResourceUrl(
                    event.target.value
                  )
                }
                disabled={isReviewed}
                placeholder="https://github.com/username/project"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
              />

              <p className="mt-2 text-xs text-slate-400">
                Example: GitHub repository,
                Google Drive file, deployed
                project, or documentation.
              </p>
            </div>

            {!isReviewed && (
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : submission
                    ? "Update Submission"
                    : "Submit Task"}
              </button>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}