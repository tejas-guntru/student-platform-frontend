"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LoaderCircle,
  UserRound,
} from "lucide-react";

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

  /* =========================================================
     DATA
  ========================================================= */

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

  /* =========================================================
     PAGE STATE
  ========================================================= */

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
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
     LOAD BATCH + ASSESSMENTS + TASKS
  ========================================================= */

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

        /*
         * Student assessment endpoint returns
         * assessments available to the student
         * across all of their batches.
         *
         * Only show assessments belonging
         * to the current batch.
         */
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

      if (
        !Number.isNaN(startsAt.getTime()) &&
        now < startsAt
      ) {
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

      if (
        !Number.isNaN(endsAt.getTime()) &&
        now > endsAt
      ) {
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

    const dueAt =
      new Date(task.dueAt);

    if (Number.isNaN(dueAt.getTime())) {
      return {
        overdue: false,
        label: "ACTIVE",
      };
    }

    const overdue =
      new Date() > dueAt;

    return {
      overdue,
      label: overdue
        ? "OVERDUE"
        : "ACTIVE",
    };
  };

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

          Loading batch...
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !batch) {
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
          <BackToBatches />

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
              "Batch not found."}
          </div>
        </div>
      </main>
    );
  }

  const joinedAt =
    formatDateTime(batch.joinedAt) ||
    "Unknown";

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
          max-w-5xl
        "
      >
        <BackToBatches />

        {/* ===================================================
            BATCH DETAILS
        =================================================== */}

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
                <GraduationCap
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
                  Student batch
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
                {batch.name}
              </h1>

              {batch.description && (
                <p
                  className="
                    mt-3
                    max-w-2xl
                    whitespace-pre-wrap
                    break-words
                    text-sm
                    leading-7
                    text-slate-600

                    [overflow-wrap:anywhere]

                    sm:text-base
                  "
                >
                  {batch.description}
                </p>
              )}
            </div>

            <StatusBadge
              value={batch.status}
            />
          </div>

          <div
            className="
              mt-6
              grid
              min-w-0
              grid-cols-1
              gap-3

              sm:mt-8
              sm:grid-cols-2
              sm:gap-4
            "
          >
            <InfoCard
              label="Instructor"
              value={batch.instructorName}
              icon={UserRound}
            />

            <InfoCard
              label="Joined"
              value={joinedAt}
              icon={Clock3}
            />
          </div>
        </section>

        {/* ===================================================
            ASSESSMENTS
        =================================================== */}

        <section
          className="
            mt-10
            min-w-0
          "
        >
          <SectionHeader
            eyebrow="Evaluation"
            title="Assessments"
            description="Assessments available for this batch."
            count={assessments.length}
            icon={ClipboardCheck}
            countClassName="
              bg-blue-100
              text-blue-800
            "
          />

          {assessments.length === 0 ? (
            <EmptyState
              title="No assessments available."
              description="Published assessments from your instructor will appear here."
              icon={ClipboardCheck}
            />
          ) : (
            <div
              className="
                mt-4
                min-w-0
                space-y-4
              "
            >
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
                    <article
                      key={assessment.id}
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
                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >
                          <h3
                            className="
                              break-words
                              text-lg
                              font-semibold
                              text-slate-950

                              [overflow-wrap:anywhere]
                            "
                          >
                            {assessment.title}
                          </h3>

                          {assessment.description && (
                            <p
                              className="
                                mt-2
                                max-w-2xl
                                whitespace-pre-wrap
                                break-words
                                text-sm
                                leading-6
                                text-slate-600

                                [overflow-wrap:anywhere]
                              "
                            >
                              {
                                assessment.description
                              }
                            </p>
                          )}
                        </div>

                        <AvailabilityBadge
                          available={
                            availability.available
                          }
                          label={
                            availability.label
                          }
                        />
                      </div>

                      {/* ASSESSMENT INFO */}

                      <div
                        className="
                          mt-5
                          grid
                          min-w-0
                          grid-cols-1
                          gap-3

                          sm:grid-cols-2

                          lg:grid-cols-4
                        "
                      >
                        <MetricCard
                          label="Duration"
                          value={
                            assessment.durationMinutes
                              ? `${assessment.durationMinutes} min`
                              : "No limit"
                          }
                        />

                        <MetricCard
                          label="Marks"
                          value={String(
                            assessment.totalMarks
                          )}
                        />

                        <MetricCard
                          label="Opens"
                          value={
                            startsAt || "Now"
                          }
                        />

                        <MetricCard
                          label="Closes"
                          value={
                            endsAt ||
                            "No deadline"
                          }
                        />
                      </div>

                      {/* ACTION */}

                      <div
                        className="
                          mt-5
                          border-t
                          border-slate-100
                          pt-5
                        "
                      >
                        {availability.available ? (
                          <Link
                            href={`/student/assessments/${assessment.id}`}
                            className="
                              group
                              inline-flex
                              min-h-11
                              w-full
                              items-center
                              justify-center
                              gap-2
                              rounded-lg
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

                              sm:w-auto
                            "
                          >
                            View Assessment

                            <ArrowRight
                              size={15}
                              className="
                                shrink-0
                                transition-transform

                                group-hover:translate-x-1
                              "
                              aria-hidden="true"
                            />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="
                              inline-flex
                              min-h-11
                              w-full
                              cursor-not-allowed
                              items-center
                              justify-center
                              rounded-lg
                              bg-slate-200
                              px-5
                              text-sm
                              font-semibold
                              text-slate-500

                              sm:w-auto
                            "
                          >
                            {availability.label ===
                            "UPCOMING"
                              ? "Not Open Yet"
                              : "Unavailable"}
                          </button>
                        )}
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            TASKS
        =================================================== */}

        <section
          className="
            mt-12
            min-w-0
          "
        >
          <SectionHeader
            eyebrow="Assignments"
            title="Tasks"
            description="Assignments from your instructor for this batch."
            count={tasks.length}
            icon={FileText}
            countClassName="
              bg-cyan-100
              text-cyan-800
            "
          />

          {tasks.length === 0 ? (
            <EmptyState
              title="No tasks available."
              description="Tasks assigned by your instructor will appear here."
              icon={FileText}
            />
          ) : (
            <div
              className="
                mt-4
                min-w-0
                space-y-4
              "
            >
              {tasks.map((task) => {
                const taskState =
                  getTaskState(task);

                const dueAt =
                  formatDateTime(
                    task.dueAt
                  );

                const assignedAt =
                  formatDateTime(
                    task.createdAt
                  ) || "Unknown";

                return (
                  <article
                    key={task.id}
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
                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <h3
                          className="
                            break-words
                            text-lg
                            font-semibold
                            text-slate-950

                            [overflow-wrap:anywhere]
                          "
                        >
                          {task.title}
                        </h3>

                        {task.description && (
                          <p
                            className="
                              mt-2
                              max-w-2xl
                              whitespace-pre-wrap
                              break-words
                              text-sm
                              leading-6
                              text-slate-600

                              [overflow-wrap:anywhere]
                            "
                          >
                            {task.description}
                          </p>
                        )}
                      </div>

                      <TaskStateBadge
                        overdue={
                          taskState.overdue
                        }
                        label={
                          taskState.label
                        }
                      />
                    </div>

                    {/* TASK INFO */}

                    <div
                      className="
                        mt-5
                        grid
                        min-w-0
                        grid-cols-1
                        gap-3

                        sm:grid-cols-2
                      "
                    >
                      <MetricCard
                        label="Due"
                        value={
                          dueAt ||
                          "No deadline"
                        }
                      />

                      <MetricCard
                        label="Assigned"
                        value={assignedAt}
                      />
                    </div>

                    {/* ACTION */}

                    <div
                      className="
                        mt-5
                        border-t
                        border-slate-100
                        pt-5
                      "
                    >
                      <Link
                        href={`/student/batches/${batchId}/tasks/${task.id}`}
                        className="
                          group
                          inline-flex
                          min-h-11
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-lg
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

                          sm:w-auto
                        "
                      >
                        View Task

                        <ArrowRight
                          size={15}
                          className="
                            shrink-0
                            transition-transform

                            group-hover:translate-x-1
                          "
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   BACK LINK
========================================================= */

function BackToBatches() {
  return (
    <Link
      href="/student/batches"
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

      Back to batches
    </Link>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
  count,
  icon: Icon,
  countClassName,
}: {
  eyebrow: string;
  title: string;
  description: string;
  count: number;
  icon: typeof FileText;
  countClassName: string;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-start
        justify-between
        gap-4
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
            mt-0.5
            hidden
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white
            text-blue-700
            ring-1
            ring-slate-200

            sm:flex
          "
        >
          <Icon
            size={18}
            aria-hidden="true"
          />
        </div>

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
            {eyebrow}
          </p>

          <h2
            className="
              mt-1
              break-words
              text-xl
              font-semibold
              text-slate-950

              sm:text-2xl
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-slate-500
            "
          >
            {description}
          </p>
        </div>
      </div>

      <span
        className={`
          inline-flex
          min-w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          px-2.5
          py-1
          text-sm
          font-semibold
          ${countClassName}
        `}
        aria-label={`${count} ${title.toLowerCase()}`}
      >
        {count}
      </span>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof UserRound;
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
   METRIC CARD
========================================================= */

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-lg
        bg-slate-50
        p-4
      "
    >
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        {label}
      </p>

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
   EMPTY STATE
========================================================= */

function EmptyState({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof FileText;
}) {
  return (
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
        <Icon
          size={18}
          aria-hidden="true"
        />
      </div>

      <p
        className="
          mt-4
          break-words
          font-medium
          text-slate-900
        "
      >
        {title}
      </p>

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
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   BATCH STATUS
========================================================= */

function StatusBadge({
  value,
}: {
  value: string;
}) {
  const className =
    value === "ACTIVE"
      ? "bg-green-100 text-green-700"
      : value === "COMPLETED"
        ? "bg-blue-100 text-blue-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`
        inline-flex
        w-fit
        max-w-full
        shrink-0
        rounded-full
        px-3
        py-1.5
        text-xs
        font-bold
        ${className}
      `}
    >
      <span
        className="
          break-words
          [overflow-wrap:anywhere]
        "
      >
        {formatStatus(value)}
      </span>
    </span>
  );
}

/* =========================================================
   ASSESSMENT STATUS
========================================================= */

function AvailabilityBadge({
  available,
  label,
}: {
  available: boolean;
  label: string;
}) {
  const className =
    available
      ? "bg-green-100 text-green-700"
      : label === "UPCOMING"
        ? "bg-amber-100 text-amber-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`
        inline-flex
        w-fit
        max-w-full
        shrink-0
        rounded-full
        px-3
        py-1
        text-xs
        font-bold
        ${className}
      `}
    >
      {formatStatus(label)}
    </span>
  );
}

/* =========================================================
   TASK STATUS
========================================================= */

function TaskStateBadge({
  overdue,
  label,
}: {
  overdue: boolean;
  label: string;
}) {
  return (
    <span
      className={`
        inline-flex
        w-fit
        max-w-full
        shrink-0
        rounded-full
        px-3
        py-1
        text-xs
        font-bold

        ${
          overdue
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }
      `}
    >
      {formatStatus(label)}
    </span>
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