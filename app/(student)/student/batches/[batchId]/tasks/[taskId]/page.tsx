"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  LoaderCircle,
  LockKeyhole,
  Send,
} from "lucide-react";

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

  /* =========================================================
     DATA
  ========================================================= */

  const [task, setTask] =
    useState<TaskResponse | null>(null);

  const [submission, setSubmission] =
    useState<TaskSubmissionResponse | null>(
      null
    );

  /* =========================================================
     FORM
  ========================================================= */

  const [content, setContent] =
    useState("");

  const [resourceUrl, setResourceUrl] =
    useState("");

  /* =========================================================
     PAGE STATE
  ========================================================= */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
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
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.replace("/login");
    }, []);

  /* =========================================================
     LOAD
  ========================================================= */

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

  /* =========================================================
     SUBMIT / UPDATE
  ========================================================= */

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

  /* =========================================================
     HELPERS
  ========================================================= */

  const formatDateTime = (
    value: string | null
  ) => {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleString();
  };

  const dueDate =
    task?.dueAt
      ? new Date(task.dueAt)
      : null;

  const isOverdue =
    dueDate &&
    !Number.isNaN(
      dueDate.getTime()
    )
      ? new Date() > dueDate
      : false;

  const isReviewed =
    submission?.status === "REVIEWED";

  const submittedAt =
    submission
      ? formatDateTime(
          submission.submittedAt
        )
      : null;

  const reviewedAt =
    submission?.reviewedAt
      ? formatDateTime(
          submission.reviewedAt
        )
      : null;

  /* =========================================================
     LOADING
  ========================================================= */

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
            max-w-4xl
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

          Loading task...
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR / NOT FOUND
  ========================================================= */

  if (!task) {
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
          <BackToBatch
            batchId={batchId}
          />

          <div
            className="
              mt-6
              min-w-0
              break-words
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-5
              text-sm
              leading-6
              text-red-700

              [overflow-wrap:anywhere]
            "
            role="alert"
          >
            {error ||
              "Task not found."}
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

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
        <BackToBatch
          batchId={batchId}
        />

        {/* =================================================
            MESSAGES
        ================================================= */}

        {error && (
          <div
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
            role="alert"
          >
            {error}
          </div>
        )}

        {message && (
          <div
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
            role="status"
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

        {/* =================================================
            TASK DETAILS
        ================================================= */}

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
          "
        >
          <div
            className="
              flex
              min-w-0
              flex-col
              gap-4

              sm:flex-row
              sm:items-start
              sm:justify-between
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
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1.5
                  text-blue-700
                "
              >
                <FileText
                  size={14}
                  aria-hidden="true"
                />

                <span
                  className="
                    text-xs
                    font-semibold
                  "
                >
                  Task
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
                {task.title}
              </h1>
            </div>

            <span
              className={`
                inline-flex
                w-fit
                shrink-0
                rounded-full
                px-3
                py-1.5
                text-xs
                font-bold

                ${
                  isOverdue
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }
              `}
            >
              {isOverdue
                ? "Overdue"
                : "Active"}
            </span>
          </div>

          {task.description && (
            <p
              className="
                mt-5
                whitespace-pre-wrap
                break-words
                text-sm
                leading-7
                text-slate-600

                [overflow-wrap:anywhere]
              "
            >
              {task.description}
            </p>
          )}

          <div
            className="
              mt-6
              grid
              min-w-0
              grid-cols-1
              gap-3

              sm:grid-cols-2
            "
          >
            <TaskInfo
              label="Due"
              value={
                formatDateTime(
                  task.dueAt
                ) || "No deadline"
              }
              icon={Clock3}
            />

            <TaskInfo
              label="Assigned"
              value={
                formatDateTime(
                  task.createdAt
                ) || "Unknown"
              }
              icon={FileText}
            />
          </div>
        </section>

        {/* =================================================
            SUBMISSION STATUS
        ================================================= */}

        {submission && (
          <section
            className="
              mt-6
              min-w-0
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4

              sm:p-6
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-col
                gap-3

                sm:flex-row
                sm:items-start
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
                  Submission
                </p>

                <h2
                  className="
                    mt-1
                    font-semibold
                    text-slate-950
                  "
                >
                  Submission Status
                </h2>

                <p
                  className="
                    mt-1
                    break-words
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  Submitted{" "}
                  {submittedAt ||
                    "recently"}
                </p>
              </div>

              <span
                className={`
                  inline-flex
                  w-fit
                  shrink-0
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-bold

                  ${
                    isReviewed
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }
                `}
              >
                {formatStatus(
                  submission.status
                )}
              </span>
            </div>

            {reviewedAt && (
              <div
                className="
                  mt-4
                  flex
                  min-w-0
                  items-start
                  gap-2
                  border-t
                  border-slate-100
                  pt-4
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                <CheckCircle2
                  size={15}
                  className="
                    mt-0.5
                    shrink-0
                  "
                  aria-hidden="true"
                />

                <span className="break-words">
                  Reviewed {reviewedAt}
                </span>
              </div>
            )}
          </section>
        )}

        {/* =================================================
            INSTRUCTOR FEEDBACK
        ================================================= */}

        {isReviewed && submission && (
          <section
            className="
              mt-6
              min-w-0
              rounded-2xl
              border
              border-green-200
              bg-green-50
              p-4

              sm:p-6
            "
          >
            <div
              className="
                flex
                min-w-0
                items-start
                gap-3
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
                  rounded-xl
                  bg-green-100
                  text-green-700
                "
              >
                <CheckCircle2
                  size={18}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-green-700
                  "
                >
                  Instructor Feedback
                </p>

                <h2
                  className="
                    mt-2
                    break-words
                    text-lg
                    font-semibold
                    text-slate-950
                  "
                >
                  Your work has been reviewed
                </h2>
              </div>
            </div>

            <p
              className="
                mt-4
                whitespace-pre-wrap
                break-words
                text-sm
                leading-7
                text-slate-700

                [overflow-wrap:anywhere]
              "
            >
              {submission.feedback ||
                "No feedback was provided."}
            </p>
          </section>
        )}

        {/* =================================================
            SUBMISSION FORM
        ================================================= */}

        <section
          className="
            mt-6
            min-w-0
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4

            sm:p-6
          "
        >
          <div
            className="
              flex
              min-w-0
              items-start
              gap-3
            "
          >
            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl

                ${
                  isReviewed
                    ? "bg-slate-100 text-slate-500"
                    : "bg-blue-50 text-blue-700"
                }
              `}
            >
              {isReviewed ? (
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                />
              ) : (
                <Send
                  size={18}
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="min-w-0">
              <h2
                className="
                  break-words
                  text-lg
                  font-semibold
                  text-slate-950

                  sm:text-xl
                "
              >
                {submission
                  ? isReviewed
                    ? "Your Submission"
                    : "Update Submission"
                  : "Submit Task"}
              </h2>

              <p
                className="
                  mt-1
                  break-words
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {isReviewed
                  ? "Your submission has been reviewed and is now locked."
                  : "You can provide written work, a resource link, or both."}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
              mt-6
              min-w-0
              space-y-5
            "
          >
            {/* CONTENT */}

            <div className="min-w-0">
              <label
                htmlFor="submission-content"
                className="
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Submission
              </label>

              <textarea
                id="submission-content"
                name="submissionContent"
                value={content}
                onChange={(event) => {
                  setContent(
                    event.target.value
                  );

                  if (error) {
                    setError("");
                  }
                }}
                disabled={isReviewed}
                rows={8}
                placeholder="Write your answer, explanation, notes, or submission here."
                className="
                  mt-2
                  min-h-44
                  w-full
                  min-w-0
                  resize-y
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-slate-950
                  outline-none
                  transition

                  placeholder:text-slate-400

                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100

                  disabled:cursor-not-allowed
                  disabled:bg-slate-100
                  disabled:text-slate-500
                "
              />
            </div>

            {/* RESOURCE */}

            <div className="min-w-0">
              <label
                htmlFor="resource-url"
                className="
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Resource Link
              </label>

              <input
                id="resource-url"
                name="resourceUrl"
                type="url"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={resourceUrl}
                onChange={(event) => {
                  setResourceUrl(
                    event.target.value
                  );

                  if (error) {
                    setError("");
                  }
                }}
                disabled={isReviewed}
                placeholder="https://github.com/username/project"
                className="
                  mt-2
                  min-h-12
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  text-sm
                  text-slate-950
                  outline-none
                  transition

                  placeholder:text-slate-400

                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100

                  disabled:cursor-not-allowed
                  disabled:bg-slate-100
                  disabled:text-slate-500
                "
              />

              <p
                className="
                  mt-2
                  break-words
                  text-xs
                  leading-5
                  text-slate-400
                "
              >
                Example: GitHub repository,
                Google Drive file, deployed
                project, or documentation.
              </p>

              {isReviewed &&
                resourceUrl && (
                  <a
                    href={resourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      mt-3
                      inline-flex
                      min-h-10
                      max-w-full
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-blue-700

                      hover:text-blue-800

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-blue-200
                      focus-visible:ring-offset-2
                    "
                  >
                    <span className="break-all">
                      Open submitted resource
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
                )}
            </div>

            {/* ACTION */}

            {!isReviewed && (
              <div
                className="
                  border-t
                  border-slate-100
                  pt-5
                "
              >
                <button
                  type="submit"
                  disabled={saving}
                  className="
                    inline-flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
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
                  {saving ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="
                          shrink-0
                          animate-spin
                        "
                        aria-hidden="true"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Send
                        size={16}
                        className="shrink-0"
                        aria-hidden="true"
                      />

                      {submission
                        ? "Update Submission"
                        : "Submit Task"}
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   BACK LINK
========================================================= */

function BackToBatch({
  batchId,
}: {
  batchId: string;
}) {
  return (
    <Link
      href={`/student/batches/${batchId}`}
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

      Back to batch
    </Link>
  );
}

/* =========================================================
   TASK INFO
========================================================= */

function TaskInfo({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Clock3;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-xl
        bg-slate-50
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-slate-400
        "
      >
        <Icon
          size={14}
          className="shrink-0"
          aria-hidden="true"
        />

        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide
          "
        >
          {label}
        </p>
      </div>

      <p
        className="
          mt-2
          break-words
          text-sm
          font-semibold
          leading-6
          text-slate-900

          [overflow-wrap:anywhere]
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   FORMAT STATUS
========================================================= */

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