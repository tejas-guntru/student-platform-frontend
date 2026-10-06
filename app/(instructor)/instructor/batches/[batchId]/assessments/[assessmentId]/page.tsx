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

import AssessmentQuestionForm from "@/components/assessments/instructor/AssessmentQuestionForm";
import InstructorAssessmentHeader from "@/components/assessments/instructor/InstructorAssessmentHeader";
import InstructorAssessmentQuestionList from "@/components/assessments/instructor/InstructorAssessmentQuestionList";

import {
  createAssessmentQuestion,
  createQuestionOption,
  getAssessment,
  getAssessmentAttempts,
  getAssessmentQuestions,
  getQuestionOptions,
  publishAssessment,
} from "@/services/instructorAssessmentService";

import type {
  AssessmentQuestionResponse,
  AssessmentResponse,
  InstructorAssessmentAttemptResponse,
  InstructorAssessmentQuestionOptionResponse,
  QuestionType,
} from "@/types/assessment";

export default function InstructorAssessmentPage() {
  const params = useParams();

  const batchId =
    typeof params.batchId === "string"
      ? params.batchId
      : "";

  const assessmentId =
    typeof params.assessmentId === "string"
      ? params.assessmentId
      : "";

  // =========================================================
  // DATA
  // =========================================================

  const [assessment, setAssessment] =
    useState<AssessmentResponse | null>(null);

  const [questions, setQuestions] =
    useState<AssessmentQuestionResponse[]>([]);

  const [options, setOptions] = useState<
    Record<
      string,
      InstructorAssessmentQuestionOptionResponse[]
    >
  >({});

  const [attempts, setAttempts] = useState<
    InstructorAssessmentAttemptResponse[]
  >([]);

  // =========================================================
  // QUESTION FORM
  // =========================================================

  const [questionText, setQuestionText] =
    useState("");

  const [questionType, setQuestionType] =
    useState<QuestionType>(
      "MULTIPLE_CHOICE"
    );

  const [marks, setMarks] =
    useState("1");

  const [
    correctBooleanAnswer,
    setCorrectBooleanAnswer,
  ] = useState(true);

  // =========================================================
  // OPTION FORM
  // =========================================================

  const [
    optionTextByQuestion,
    setOptionTextByQuestion,
  ] = useState<Record<string, string>>(
    {}
  );

  const [
    optionCorrectByQuestion,
    setOptionCorrectByQuestion,
  ] = useState<
    Record<string, boolean>
  >({});

  // =========================================================
  // PAGE STATE
  // =========================================================

  const [loading, setLoading] =
    useState(true);

  const [
    creatingQuestion,
    setCreatingQuestion,
  ] = useState(false);

  const [
    creatingOptionFor,
    setCreatingOptionFor,
  ] = useState<string | null>(null);

  const [publishing, setPublishing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  // =========================================================
  // AUTH
  // =========================================================

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.replace(
        "/login"
      );
    }, []);

  // =========================================================
  // LOAD MCQ OPTIONS
  // =========================================================

  const loadOptionsForQuestions =
    useCallback(
      async (
        loadedQuestions: AssessmentQuestionResponse[]
      ) => {
        const mcqQuestions =
          loadedQuestions.filter(
            (question) =>
              question.questionType ===
              "MULTIPLE_CHOICE"
          );

        if (
          mcqQuestions.length === 0
        ) {
          setOptions({});
          return;
        }

        const optionResults =
          await Promise.all(
            mcqQuestions.map(
              async (question) => {
                const questionOptions =
                  await getQuestionOptions(
                    batchId,
                    assessmentId,
                    question.id
                  );

                return {
                  questionId:
                    question.id,

                  options:
                    questionOptions,
                };
              }
            )
          );

        const nextOptions: Record<
          string,
          InstructorAssessmentQuestionOptionResponse[]
        > = {};

        optionResults.forEach(
          (result) => {
            nextOptions[
              result.questionId
            ] = result.options;
          }
        );

        setOptions(nextOptions);
      },
      [batchId, assessmentId]
    );

  // =========================================================
  // LOAD ASSESSMENT
  // =========================================================

  const loadAssessment =
    useCallback(async () => {
      if (
        !batchId ||
        !assessmentId
      ) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [
          assessmentResponse,
          questionResponse,
          attemptResponse,
        ] = await Promise.all([
          getAssessment(
            batchId,
            assessmentId
          ),

          getAssessmentQuestions(
            batchId,
            assessmentId
          ),

          getAssessmentAttempts(
            batchId,
            assessmentId
          ),
        ]);

        setAssessment(
          assessmentResponse
        );

        setQuestions(
          questionResponse
        );

        setAttempts(
          attemptResponse
        );

        await loadOptionsForQuestions(
          questionResponse
        );
      } catch (error: unknown) {
        console.error(
          "LOAD ASSESSMENT ERROR:",
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
              "Could not load assessment."
          );

          return;
        }

        setError(
          "Could not load assessment."
        );
      } finally {
        setLoading(false);
      }
    }, [
      assessmentId,
      batchId,
      handleAuthFailure,
      loadOptionsForQuestions,
    ]);

  useEffect(() => {
    loadAssessment();
  }, [loadAssessment]);

  // =========================================================
  // CREATE QUESTION
  // =========================================================

  const handleCreateQuestion =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      const text =
        questionText.trim();

      const questionMarks =
        Number(marks);

      if (!text) {
        setError(
          "Question text is required."
        );
        return;
      }

      if (
        !Number.isInteger(
          questionMarks
        ) ||
        questionMarks < 1
      ) {
        setError(
          "Marks must be at least 1."
        );
        return;
      }

      setCreatingQuestion(true);

      setError("");
      setMessage("");

      try {
        const created =
          await createAssessmentQuestion(
            batchId,
            assessmentId,
            {
              questionText: text,
              questionType,
              marks:
                questionMarks,

              correctBooleanAnswer:
                questionType ===
                "TRUE_FALSE"
                  ? correctBooleanAnswer
                  : null,
            }
          );

        setQuestions(
          (current) => [
            ...current,
            created,
          ]
        );

        if (
          created.questionType ===
          "MULTIPLE_CHOICE"
        ) {
          setOptions(
            (current) => ({
              ...current,

              [created.id]: [],
            })
          );
        }

        setQuestionText("");

        setQuestionType(
          "MULTIPLE_CHOICE"
        );

        setMarks("1");

        setCorrectBooleanAnswer(
          true
        );

        if (
          created.questionType ===
          "CODING"
        ) {
          setMessage(
            "Coding question created. Configure its language and test cases below."
          );
        } else {
          setMessage(
            "Question created successfully."
          );
        }

        // Refresh because totalMarks
        // may have changed.

        const refreshed =
          await getAssessment(
            batchId,
            assessmentId
          );

        setAssessment(refreshed);
      } catch (error: unknown) {
        console.error(
          "CREATE QUESTION ERROR:",
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
              "Could not create question."
          );

          return;
        }

        setError(
          "Could not create question."
        );
      } finally {
        setCreatingQuestion(false);
      }
    };

  // =========================================================
  // CREATE MCQ OPTION
  // =========================================================

  const handleCreateOption =
    async (
      questionId: string
    ) => {
      const optionText =
        optionTextByQuestion[
          questionId
        ]?.trim();

      if (!optionText) {
        setError(
          "Option text is required."
        );
        return;
      }

      setCreatingOptionFor(
        questionId
      );

      setError("");
      setMessage("");

      try {
        const created =
          await createQuestionOption(
            batchId,
            assessmentId,
            questionId,
            {
              optionText,

              correct:
                optionCorrectByQuestion[
                  questionId
                ] ?? false,
            }
          );

        setOptions(
          (current) => ({
            ...current,

            [questionId]: [
              ...(current[
                questionId
              ] ?? []),

              created,
            ],
          })
        );

        setOptionTextByQuestion(
          (current) => ({
            ...current,
            [questionId]: "",
          })
        );

        setOptionCorrectByQuestion(
          (current) => ({
            ...current,
            [questionId]: false,
          })
        );

        setMessage(
          "Option added successfully."
        );
      } catch (error: unknown) {
        console.error(
          "CREATE OPTION ERROR:",
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
              "Could not create option."
          );

          return;
        }

        setError(
          "Could not create option."
        );
      } finally {
        setCreatingOptionFor(
          null
        );
      }
    };

  // =========================================================
  // PUBLISH
  // =========================================================

  const handlePublish =
    async () => {
      if (!assessment) {
        return;
      }

      const confirmed =
        window.confirm(
          "Publish this assessment? Students may be able to access it after publishing."
        );

      if (!confirmed) {
        return;
      }

      setPublishing(true);

      setError("");
      setMessage("");

      try {
        const published =
          await publishAssessment(
            batchId,
            assessmentId
          );

        setAssessment(
          published
        );

        setMessage(
          "Assessment published successfully."
        );
      } catch (error: unknown) {
        console.error(
          "PUBLISH ASSESSMENT ERROR:",
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
              "Could not publish assessment."
          );

          return;
        }

        setError(
          "Could not publish assessment."
        );
      } finally {
        setPublishing(false);
      }
    };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-slate-500">
            Loading assessment...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // NOT FOUND
  // =========================================================

  if (!assessment) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/instructor/batches/${batchId}`}
            className="text-sm font-semibold text-blue-700"
          >
            ← Back to batch
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error ||
              "Assessment not found."}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // DERIVED STATE
  // =========================================================

  const editable =
    assessment.status === "DRAFT";

  const submittedAttempts =
    attempts.filter(
      (attempt) =>
        attempt.status ===
          "SUBMITTED" ||
        attempt.status === "GRADED"
    );

  const pendingGrading =
    attempts.filter(
      (attempt) =>
        attempt.status ===
        "SUBMITTED"
    ).length;

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* BACK */}

        <Link
          href={`/instructor/batches/${batchId}`}
          className="text-sm font-semibold text-blue-700"
        >
          ← Back to batch
        </Link>

        {/* HEADER */}

        <div className="mt-6">
          <InstructorAssessmentHeader
            assessment={assessment}
            publishing={
              publishing
            }
            onPublish={
              handlePublish
            }
          />
        </div>

        {/* MESSAGES */}

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

        {/* QUESTION FORM */}

        <AssessmentQuestionForm
          questionText={
            questionText
          }
          questionType={
            questionType
          }
          marks={marks}
          correctBooleanAnswer={
            correctBooleanAnswer
          }
          creating={
            creatingQuestion
          }
          disabled={!editable}
          onQuestionTextChange={
            setQuestionText
          }
          onQuestionTypeChange={
            setQuestionType
          }
          onMarksChange={
            setMarks
          }
          onCorrectBooleanAnswerChange={
            setCorrectBooleanAnswer
          }
          onSubmit={
            handleCreateQuestion
          }
        />

        {/* QUESTIONS */}

        <InstructorAssessmentQuestionList
          questions={questions}
          batchId={batchId}
          assessmentId={
            assessmentId
          }
          options={options}
          optionTextByQuestion={
            optionTextByQuestion
          }
          optionCorrectByQuestion={
            optionCorrectByQuestion
          }
          creatingOptionFor={
            creatingOptionFor
          }
          disabled={!editable}
          onOptionTextChange={(
            questionId,
            value
          ) => {
            setOptionTextByQuestion(
              (current) => ({
                ...current,
                [questionId]:
                  value,
              })
            );
          }}
          onOptionCorrectChange={(
            questionId,
            value
          ) => {
            setOptionCorrectByQuestion(
              (current) => ({
                ...current,
                [questionId]:
                  value,
              })
            );
          }}
          onCreateOption={
            handleCreateOption
          }
          onError={setError}
          onMessage={setMessage}
          onAuthFailure={
            handleAuthFailure
          }
        />

        {/* ATTEMPTS */}

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                Student Attempts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review submissions and
                grade short-answer
                responses.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {attempts.length} total
              </span>

              {pendingGrading > 0 && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  {pendingGrading} pending
                  grading
                </span>
              )}
            </div>
          </div>

          {attempts.length === 0 ? (
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              No students have started
              this assessment yet.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {attempts.map(
                (attempt) => (
                  <div
                    key={attempt.id}
                    className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {
                          attempt.studentName
                        }
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <AttemptStatus
                          status={
                            attempt.status
                          }
                        />

                        {attempt.score !==
                          null && (
                          <span className="text-sm font-medium text-slate-600">
                            Score:{" "}
                            {
                              attempt.score
                            }{" "}
                            /{" "}
                            {
                              assessment.totalMarks
                            }
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-slate-400">
                        Started{" "}
                        {formatDate(
                          attempt.startedAt
                        )}
                      </p>

                      {attempt.submittedAt && (
                        <p className="mt-1 text-xs text-slate-400">
                          Submitted{" "}
                          {formatDate(
                            attempt.submittedAt
                          )}
                        </p>
                      )}
                    </div>

                    {attempt.status !==
                      "IN_PROGRESS" && (
                      <Link
                        href={`/instructor/batches/${batchId}/assessments/${assessmentId}/attempts/${attempt.id}`}
                        className="w-fit rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        {attempt.status ===
                        "SUBMITTED"
                          ? "Review & Grade"
                          : "View Result"}
                      </Link>
                    )}
                  </div>
                )
              )}
            </div>
          )}

          {submittedAttempts.length ===
            0 &&
            attempts.length > 0 && (
              <p className="mt-5 text-sm text-slate-500">
                No submitted attempts
                are ready for review yet.
              </p>
            )}
        </section>
      </div>
    </main>
  );
}

// =========================================================
// ATTEMPT STATUS
// =========================================================

function AttemptStatus({
  status,
}: {
  status:
    InstructorAssessmentAttemptResponse["status"];
}) {
  const styles =
    status === "GRADED"
      ? "bg-green-100 text-green-700"
      : status === "SUBMITTED"
        ? "bg-amber-100 text-amber-700"
        : "bg-blue-100 text-blue-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}
    >
      {status.replaceAll(
        "_",
        " "
      )}
    </span>
  );
}

// =========================================================
// DATE
// =========================================================

function formatDate(
  value: string
) {
  return new Date(
    value
  ).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}