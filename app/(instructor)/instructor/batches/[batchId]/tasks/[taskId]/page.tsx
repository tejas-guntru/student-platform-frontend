"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import InstructorTaskHeader from "@/components/instructor/task/InstructorTaskHeader";
import TaskSubmissionList from "@/components/instructor/task/TaskSubmissionList";

import {
  getTask,
  getTaskSubmissions,
  reviewTaskSubmission,
} from "@/services/instructorTaskService";

import type {
  InstructorTaskSubmissionResponse,
  TaskResponse,
} from "@/types/task";

/* =========================================================
   PAGE
========================================================= */

export default function InstructorTaskPage() {
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
     STATE
  ========================================================= */

  const [task, setTask] =
    useState<TaskResponse | null>(null);

  const [submissions, setSubmissions] =
    useState<
      InstructorTaskSubmissionResponse[]
    >([]);

  const [feedback, setFeedback] =
    useState<Record<string, string>>({});

  const [loading, setLoading] =
    useState(true);

  const [
    reviewingId,
    setReviewingId,
  ] = useState<string | null>(null);

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
     LOAD TASK
  ========================================================= */

  const loadTask =
    useCallback(async () => {
      if (!batchId || !taskId) {
        setError(
          "Invalid batch or task."
        );

        setLoading(false);

        return;
      }

      setLoading(true);
      setError("");

      try {
        const [
          taskResponse,
          submissionResponse,
        ] = await Promise.all([
          getTask(
            batchId,
            taskId
          ),

          getTaskSubmissions(
            batchId,
            taskId
          ),
        ]);

        setTask(taskResponse);

        setSubmissions(
          submissionResponse
        );

        /*
         * Initialize the local feedback map
         * using any feedback already stored
         * against the submissions.
         */

        const initialFeedback:
          Record<string, string> = {};

        submissionResponse.forEach(
          (submission) => {
            initialFeedback[
              submission.id
            ] =
              submission.feedback ?? "";
          }
        );

        setFeedback(initialFeedback);
      } catch (error: unknown) {
        console.error(
          "LOAD TASK ERROR:",
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
    }, [
      batchId,
      taskId,
      handleAuthFailure,
    ]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  /* =========================================================
     FEEDBACK CHANGE
  ========================================================= */

  const handleFeedbackChange = (
    submissionId: string,
    value: string
  ) => {
    setFeedback((current) => ({
      ...current,
      [submissionId]: value,
    }));

    /*
     * Remove a stale validation error once
     * the instructor starts typing again.
     */

    if (
      error ===
      "Feedback is required."
    ) {
      setError("");
    }
  };

  /* =========================================================
     REVIEW SUBMISSION
  ========================================================= */

  const handleReview = async (
    submissionId: string
  ) => {
    const value =
      feedback[
        submissionId
      ]?.trim() ?? "";

    if (!value) {
      setError(
        "Feedback is required."
      );

      setMessage("");

      return;
    }

    setReviewingId(submissionId);

    setError("");
    setMessage("");

    try {
      const reviewed =
        await reviewTaskSubmission(
          batchId,
          taskId,
          submissionId,
          {
            feedback: value,
          }
        );

      /*
       * Replace only the reviewed submission.
       * No full page reload is required.
       */

      setSubmissions((current) =>
        current.map((submission) =>
          submission.id ===
          submissionId
            ? reviewed
            : submission
        )
      );

      /*
       * Keep the textarea synchronized with
       * whatever feedback the backend returns.
       */

      setFeedback((current) => ({
        ...current,

        [submissionId]:
          reviewed.feedback ?? "",
      }));

      setMessage(
        `Submission from ${reviewed.studentName} reviewed successfully.`
      );
    } catch (error: unknown) {
      console.error(
        "REVIEW TASK SUBMISSION ERROR:",
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
            "Could not review submission."
        );

        return;
      }

      setError(
        "Could not review submission."
      );
    } finally {
      setReviewingId(null);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
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
            max-w-6xl
          "
        >
          <TaskPageSkeleton />
        </div>
      </main>
    );
  }

  /* =========================================================
     TASK LOAD FAILURE
  ========================================================= */

  if (!task) {
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
            max-w-6xl
          "
        >
          <Link
            href={`/instructor/batches/${batchId}`}
            className="
              text-sm
              font-semibold
              text-[#1256AF]
            "
          >
            ← Back to Batch
          </Link>

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-6
            "
          >
            <h1
              className="
                font-bold
                text-red-800
              "
            >
              Could not open task
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-red-700
              "
            >
              {error ||
                "Task not found."}
            </p>
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
          max-w-6xl
        "
      >
        {/* TASK */}

        <InstructorTaskHeader
          batchId={batchId}
          task={task}
          submissionCount={
            submissions.length
          }
        />

        {/* MESSAGES */}

        {(error || message) && (
          <div className="mt-5 space-y-3">
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

        {/* SUBMISSIONS */}

        <TaskSubmissionList
          submissions={submissions}
          feedback={feedback}
          reviewingId={reviewingId}
          onFeedbackChange={
            handleFeedbackChange
          }
          onReview={handleReview}
        />
      </div>
    </main>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function TaskPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div
        className="
          h-4
          w-28
          rounded
          bg-slate-200
        "
      />

      <div
        className="
          mt-5
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          sm:p-8
        "
      >
        <div
          className="
            h-6
            w-28
            rounded-full
            bg-slate-100
          "
        />

        <div
          className="
            mt-5
            h-8
            w-80
            max-w-full
            rounded
            bg-slate-100
          "
        />

        <div
          className="
            mt-4
            h-4
            w-full
            max-w-2xl
            rounded
            bg-slate-100
          "
        />

        <div
          className="
            mt-2
            h-4
            w-3/4
            max-w-xl
            rounded
            bg-slate-100
          "
        />

        <div
          className="
            mt-6
            flex
            gap-3
          "
        >
          <div
            className="
              h-9
              w-48
              rounded-xl
              bg-slate-100
            "
          />

          <div
            className="
              h-9
              w-48
              rounded-xl
              bg-slate-100
            "
          />
        </div>
      </div>

      <div className="mt-10">
        <div
          className="
            h-3
            w-24
            rounded
            bg-slate-200
          "
        />

        <div
          className="
            mt-3
            h-7
            w-56
            rounded
            bg-slate-200
          "
        />

        <div
          className="
            mt-5
            space-y-5
          "
        >
          {Array.from({
            length: 2,
          }).map((_, index) => (
            <div
              key={index}
              className="
                h-80
                rounded-2xl
                border
                border-slate-200
                bg-white
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
}