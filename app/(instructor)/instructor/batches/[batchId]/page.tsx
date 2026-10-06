"use client";

import axios from "axios";
import { useParams } from "next/navigation";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import BatchWorkspaceHeader from "@/components/instructor/batch/BatchWorkspaceHeader";
import BatchOverview from "@/components/instructor/batch/BatchOverview";
import PendingJoinRequests from "@/components/instructor/batch/PendingJoinRequests";
import BatchMembers from "@/components/instructor/batch/BatchMembers";

import BatchTasks from "@/components/instructor/batch/BatchTasks";
import CreateTaskForm from "@/components/instructor/batch/CreateTaskForm";

import BatchAssessments from "@/components/instructor/batch/BatchAssessments";
import CreateAssessmentForm from "@/components/instructor/batch/CreateAssessmentForm";

import BatchCourses from "@/components/instructor/batch/BatchCourses";
import AssignCourseForm from "@/components/instructor/batch/AssignCourseForm";

import {
  approveJoinRequest,
  getBatchMembers,
  getInstructorBatch,
  getPendingJoinRequests,
  rejectJoinRequest,
} from "@/services/instructorBatchService";

import {
  createTask,
  getBatchTasks,
} from "@/services/instructorTaskService";

import {
  createAssessment,
  getBatchAssessments,
} from "@/services/instructorAssessmentService";

import {
  assignCourseToBatch,
  getBatchCourseAssignments,
  getMyCourses,
} from "@/services/instructorCourseService";

import type {
  BatchMemberResponse,
  BatchResponse,
  PendingBatchJoinRequestResponse,
} from "@/types/batch";

import type {
  TaskResponse,
} from "@/types/task";

import type {
  AssessmentResponse,
} from "@/types/assessment";

import type {
  CourseAssignmentResponse,
  CourseResponse,
} from "@/types/course";

/* =========================================================
   PAGE
========================================================= */

export default function InstructorBatchPage() {
  const params = useParams();

  const batchId =
    typeof params.batchId === "string"
      ? params.batchId
      : "";

  /* =========================================================
     BATCH
  ========================================================= */

  const [batch, setBatch] =
    useState<BatchResponse | null>(
      null
    );

  const [requests, setRequests] =
    useState<
      PendingBatchJoinRequestResponse[]
    >([]);

  const [members, setMembers] =
    useState<BatchMemberResponse[]>(
      []
    );

  /* =========================================================
     TASKS
  ========================================================= */

  const [tasks, setTasks] =
    useState<TaskResponse[]>([]);

  const [taskTitle, setTaskTitle] =
    useState("");

  const [
    taskDescription,
    setTaskDescription,
  ] = useState("");

  const [taskDueAt, setTaskDueAt] =
    useState("");

  const [
    creatingTask,
    setCreatingTask,
  ] = useState(false);

  /* =========================================================
     ASSESSMENTS
  ========================================================= */

  const [
    assessments,
    setAssessments,
  ] = useState<
    AssessmentResponse[]
  >([]);

  const [
    assessmentTitle,
    setAssessmentTitle,
  ] = useState("");

  const [
    assessmentDescription,
    setAssessmentDescription,
  ] = useState("");

  const [
    assessmentDuration,
    setAssessmentDuration,
  ] = useState("30");

  const [
    creatingAssessment,
    setCreatingAssessment,
  ] = useState(false);

  /* =========================================================
     COURSES
  ========================================================= */

  const [courses, setCourses] =
    useState<CourseResponse[]>([]);

  const [
    courseAssignments,
    setCourseAssignments,
  ] = useState<
    CourseAssignmentResponse[]
  >([]);

  const [
    selectedCourseId,
    setSelectedCourseId,
  ] = useState("");

  const [
    assigningCourse,
    setAssigningCourse,
  ] = useState(false);

  /* =========================================================
     PAGE STATE
  ========================================================= */

  const [loading, setLoading] =
    useState(true);

  const [
    processingId,
    setProcessingId,
  ] = useState<string | null>(
    null
  );

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  /* =========================================================
     AUTH FAILURE
  ========================================================= */

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "email"
      );

      localStorage.removeItem(
        "role"
      );

      window.location.replace(
        "/login"
      );
    }, []);

  /* =========================================================
     API ERROR
  ========================================================= */

  const handleApiError =
    useCallback(
      (
        error: unknown,
        fallbackMessage: string
      ) => {
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
              fallbackMessage
          );

          return;
        }

        if (
          error instanceof Error &&
          error.message ===
            "Batch not found."
        ) {
          setError(
            "This batch could not be found."
          );

          return;
        }

        setError(fallbackMessage);
      },
      [handleAuthFailure]
    );

  /* =========================================================
     LOAD BATCH WORKSPACE
  ========================================================= */

  const loadBatchData =
    useCallback(async () => {
      if (!batchId) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [
          currentBatch,
          pendingRequests,
          batchMembers,
          batchAssessments,
          batchTasks,
          instructorCourses,
          batchCourseAssignments,
        ] = await Promise.all([
          getInstructorBatch(
            batchId
          ),

          getPendingJoinRequests(
            batchId
          ),

          getBatchMembers(
            batchId
          ),

          getBatchAssessments(
            batchId
          ),

          getBatchTasks(batchId),

          getMyCourses(),

          getBatchCourseAssignments(
            batchId
          ),
        ]);

        setBatch(currentBatch);

        setRequests(
          pendingRequests
        );

        setMembers(batchMembers);

        setAssessments(
          batchAssessments
        );

        setTasks(batchTasks);

        setCourses(
          instructorCourses.filter(
            (course) =>
              course.status ===
              "PUBLISHED"
          )
        );

        setCourseAssignments(
          batchCourseAssignments
        );
      } catch (error: unknown) {
        console.error(
          "LOAD INSTRUCTOR BATCH ERROR:",
          error
        );

        handleApiError(
          error,
          "Could not load batch."
        );
      } finally {
        setLoading(false);
      }
    }, [
      batchId,
      handleApiError,
    ]);

  useEffect(() => {
    loadBatchData();
  }, [loadBatchData]);

  /* =========================================================
     APPROVE JOIN REQUEST
  ========================================================= */

  const handleApprove = async (
    requestId: string
  ) => {
    setProcessingId(requestId);

    setError("");
    setMessage("");

    try {
      const response =
        await approveJoinRequest(
          batchId,
          requestId
        );

      setMessage(
        `${response.studentName} approved successfully.`
      );

      await loadBatchData();
    } catch (error: unknown) {
      console.error(
        "APPROVE JOIN REQUEST ERROR:",
        error
      );

      handleApiError(
        error,
        "Could not approve request."
      );
    } finally {
      setProcessingId(null);
    }
  };

  /* =========================================================
     REJECT JOIN REQUEST
  ========================================================= */

  const handleReject = async (
    requestId: string
  ) => {
    setProcessingId(requestId);

    setError("");
    setMessage("");

    try {
      const response =
        await rejectJoinRequest(
          batchId,
          requestId
        );

      setMessage(
        `${response.studentName}'s request was rejected.`
      );

      await loadBatchData();
    } catch (error: unknown) {
      console.error(
        "REJECT JOIN REQUEST ERROR:",
        error
      );

      handleApiError(
        error,
        "Could not reject request."
      );
    } finally {
      setProcessingId(null);
    }
  };

  /* =========================================================
     CREATE TASK
  ========================================================= */

  const handleCreateTask = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const title =
      taskTitle.trim();

    const description =
      taskDescription.trim();

    if (!title) {
      setError(
        "Task title is required."
      );

      return;
    }

    setCreatingTask(true);

    setError("");
    setMessage("");

    try {
      const created =
        await createTask(
          batchId,
          {
            title,

            description:
              description || null,

            dueAt: taskDueAt
              ? new Date(
                  taskDueAt
                ).toISOString()
              : null,
          }
        );

      setTasks(
        (current) => [
          created,
          ...current,
        ]
      );

      setTaskTitle("");
      setTaskDescription("");
      setTaskDueAt("");

      setMessage(
        `Task "${created.title}" created successfully.`
      );
    } catch (error: unknown) {
      console.error(
        "CREATE TASK ERROR:",
        error
      );

      handleApiError(
        error,
        "Could not create task."
      );
    } finally {
      setCreatingTask(false);
    }
  };

  /* =========================================================
     CREATE ASSESSMENT
  ========================================================= */

  const handleCreateAssessment =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      const title =
        assessmentTitle.trim();

      const description =
        assessmentDescription.trim();

      const duration =
        Number(
          assessmentDuration
        );

      if (!title) {
        setError(
          "Assessment title is required."
        );

        return;
      }

      if (
        !Number.isInteger(
          duration
        ) ||
        duration < 1
      ) {
        setError(
          "Duration must be at least 1 minute."
        );

        return;
      }

      setCreatingAssessment(
        true
      );

      setError("");
      setMessage("");

      try {
        const created =
          await createAssessment(
            batchId,
            {
              title,

              description:
                description ||
                null,

              durationMinutes:
                duration,

              startsAt: null,

              endsAt: null,
            }
          );

        setAssessments(
          (current) => [
            ...current,
            created,
          ]
        );

        setAssessmentTitle(
          ""
        );

        setAssessmentDescription(
          ""
        );

        setAssessmentDuration(
          "30"
        );

        setMessage(
          `Assessment "${created.title}" created successfully.`
        );
      } catch (
        error: unknown
      ) {
        console.error(
          "CREATE ASSESSMENT ERROR:",
          error
        );

        handleApiError(
          error,
          "Could not create assessment."
        );
      } finally {
        setCreatingAssessment(
          false
        );
      }
    };

  /* =========================================================
     ASSIGN COURSE
  ========================================================= */

  const handleAssignCourse =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (
        !selectedCourseId
      ) {
        setError(
          "Select a course to assign."
        );

        return;
      }

      setAssigningCourse(
        true
      );

      setError("");
      setMessage("");

      try {
        const assignment =
          await assignCourseToBatch(
            selectedCourseId,
            batchId
          );

        setCourseAssignments(
          (current) => [
            ...current,
            assignment,
          ]
        );

        const assignedCourse =
          courses.find(
            (course) =>
              course.id ===
              selectedCourseId
          );

        setSelectedCourseId(
          ""
        );

        setMessage(
          assignedCourse
            ? `Course "${assignedCourse.title}" assigned successfully.`
            : "Course assigned successfully."
        );
      } catch (
        error: unknown
      ) {
        console.error(
          "ASSIGN COURSE ERROR:",
          error
        );

        handleApiError(
          error,
          "Could not assign course."
        );
      } finally {
        setAssigningCourse(
          false
        );
      }
    };

  /* =========================================================
     COPY JOIN CODE
  ========================================================= */

  const handleCopyJoinCode =
    async () => {
      if (!batch) {
        return;
      }

      setError("");

      try {
        await navigator.clipboard.writeText(
          batch.joinCode
        );

        setCopied(true);

        window.setTimeout(
          () => {
            setCopied(false);
          },
          1600
        );
      } catch {
        setError(
          "Could not copy join code."
        );
      }
    };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main
        className="
          bg-slate-50
          px-4
          py-8

          sm:px-6

          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
          "
        >
          <BatchWorkspaceSkeleton />
        </div>
      </main>
    );
  }

  /* =========================================================
     FAILED TO LOAD BATCH
  ========================================================= */

  if (!batch) {
    return (
      <main
        className="
          bg-slate-50
          px-4
          py-8

          sm:px-6

          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-6
            "
          >
            <h1
              className="
                text-lg
                font-bold
                text-red-800
              "
            >
              Could not open batch
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-red-700
              "
            >
              {error ||
                "This batch could not be loaded."}
            </p>

            <a
              href="/instructor"
              className="
                mt-5
                inline-flex
                rounded-lg
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                text-red-700
              "
            >
              Back to My Batches
            </a>
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
          max-w-7xl
        "
      >
        {/* HEADER */}

        <BatchWorkspaceHeader
          batch={batch}
          copied={copied}
          onCopyJoinCode={
            handleCopyJoinCode
          }
        />

        {/* OVERVIEW */}

        <BatchOverview
          memberCount={
            members.length
          }
          pendingRequestCount={
            requests.length
          }
          taskCount={
            tasks.length
          }
          assessmentCount={
            assessments.length
          }
          courseCount={
            courseAssignments.length
          }
        />

        {/* MESSAGES */}

        {error && (
          <div
            className="
              mt-6
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
            className="
              mt-6
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              font-medium
              text-green-700
            "
          >
            {message}
          </div>
        )}

        {/* ===================================================
            PEOPLE
        =================================================== */}

        <section className="mt-10">
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#1256AF]
              "
            >
              People
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-bold
                text-slate-950
              "
            >
              Students & Access
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Review new join
              requests and manage
              students already in
              this batch.
            </p>
          </div>

          <div
            className="
              mt-5
              grid
              gap-5

              xl:grid-cols-2
            "
          >
            <PendingJoinRequests
              requests={requests}
              processingId={
                processingId
              }
              onApprove={
                handleApprove
              }
              onReject={
                handleReject
              }
            />

            <BatchMembers
              batchId={batchId}
              members={members}
            />
          </div>
        </section>

        {/* ===================================================
            LEARNING
        =================================================== */}

        <section className="mt-12">
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#1256AF]
              "
            >
              Learning
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-bold
                text-slate-950
              "
            >
              Batch Learning
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Create work, evaluate
              students and provide
              structured course
              content.
            </p>
          </div>

          <div
            className="
              mt-5
              space-y-6
            "
          >
            {/* TASKS */}

            <BatchTasks
              batchId={batchId}
              tasks={tasks}
            >
              <CreateTaskForm
                title={
                  taskTitle
                }
                description={
                  taskDescription
                }
                dueAt={
                  taskDueAt
                }
                creating={
                  creatingTask
                }
                onTitleChange={
                  setTaskTitle
                }
                onDescriptionChange={
                  setTaskDescription
                }
                onDueAtChange={
                  setTaskDueAt
                }
                onSubmit={
                  handleCreateTask
                }
              />
            </BatchTasks>

            {/* ASSESSMENTS */}

            <BatchAssessments
              batchId={batchId}
              assessments={
                assessments
              }
            >
              <CreateAssessmentForm
                title={
                  assessmentTitle
                }
                description={
                  assessmentDescription
                }
                duration={
                  assessmentDuration
                }
                creating={
                  creatingAssessment
                }
                onTitleChange={
                  setAssessmentTitle
                }
                onDescriptionChange={
                  setAssessmentDescription
                }
                onDurationChange={
                  setAssessmentDuration
                }
                onSubmit={
                  handleCreateAssessment
                }
              />
            </BatchAssessments>

            {/* COURSES */}

            <BatchCourses
              batchId={batchId}
              courses={courses}
              assignments={
                courseAssignments
              }
            >
              <AssignCourseForm
                courses={
                  courses
                }
                assignments={
                  courseAssignments
                }
                selectedCourseId={
                  selectedCourseId
                }
                assigning={
                  assigningCourse
                }
                onCourseChange={
                  setSelectedCourseId
                }
                onSubmit={
                  handleAssignCourse
                }
              />
            </BatchCourses>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function BatchWorkspaceSkeleton() {
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
          p-8
        "
      >
        <div
          className="
            flex
            gap-4
          "
        >
          <div
            className="
              h-12
              w-12
              rounded-2xl
              bg-slate-100
            "
          />

          <div className="flex-1">
            <div
              className="
                h-6
                w-52
                rounded
                bg-slate-100
              "
            />

            <div
              className="
                mt-3
                h-4
                max-w-lg
                rounded
                bg-slate-100
              "
            />
          </div>
        </div>
      </div>

      <div
        className="
          mt-6
          grid
          gap-3

          sm:grid-cols-2

          lg:grid-cols-5
        "
      >
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-20
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          />
        ))}
      </div>

      <div
        className="
          mt-10
          grid
          gap-5

          xl:grid-cols-2
        "
      >
        <div
          className="
            h-80
            rounded-2xl
            border
            border-slate-200
            bg-white
          "
        />

        <div
          className="
            h-80
            rounded-2xl
            border
            border-slate-200
            bg-white
          "
        />
      </div>
    </div>
  );
}