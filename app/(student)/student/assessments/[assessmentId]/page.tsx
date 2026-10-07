"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import AssessmentMessages from "@/components/student/assessment/AssessmentMessages";
import AssessmentSubmitCard from "@/components/student/assessment/AssessmentSubmitCard";
import StudentAssessmentHeader from "@/components/student/assessment/StudentAssessmentHeader";
import StudentAssessmentQuestionList from "@/components/student/assessment/StudentAssessmentQuestionList";

import type {
  StudentLocalAnswer,
} from "@/components/student/assessment/StudentAssessmentQuestion";

import {
  getAssessmentAttemptAnswers,
  getMyAssessmentAttempts,
  getStudentAssessment,
  saveAssessmentAnswer,
  startAssessmentAttempt,
  submitAssessmentAttempt,
} from "@/services/studentAssessmentService";

import type {
  AssessmentAnswerResponse,
  AssessmentAttemptResponse,
  SaveAssessmentAnswerRequest,
  StudentAssessmentDetailResponse,
} from "@/types/assessment";

export default function StudentAssessmentPage() {
  const params = useParams();

  const assessmentId =
    typeof params.assessmentId ===
    "string"
      ? params.assessmentId
      : "";

  // =========================================================
  // DATA
  // =========================================================

  const [assessment, setAssessment] =
    useState<StudentAssessmentDetailResponse | null>(
      null
    );

  const [attempt, setAttempt] =
    useState<AssessmentAttemptResponse | null>(
      null
    );

  const [answers, setAnswers] =
    useState<
      Record<
        string,
        StudentLocalAnswer
      >
    >({});

  const [
    savedQuestionIds,
    setSavedQuestionIds,
  ] = useState<Set<string>>(
    () => new Set()
  );

  // =========================================================
  // PAGE STATE
  // =========================================================

  const [loading, setLoading] =
    useState(true);

  const [starting, setStarting] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [
    savingQuestionId,
    setSavingQuestionId,
  ] = useState<string | null>(null);

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
  // ANSWER MAP
  // =========================================================

  const createEmptyAnswerMap =
    useCallback(
      (
        detail:
          StudentAssessmentDetailResponse
      ) => {
        const map: Record<
          string,
          StudentLocalAnswer
        > = {};

        detail.questions.forEach(
          (question) => {
            map[question.id] = {
              selectedOptionId: null,
              booleanAnswer: null,
              textAnswer: "",
            };
          }
        );

        return map;
      },
      []
    );

  // =========================================================
  // RESTORE SAVED ANSWERS
  // =========================================================

  const applySavedAnswers =
    useCallback(
      (
        detail:
          StudentAssessmentDetailResponse,

        savedAnswers:
          AssessmentAnswerResponse[]
      ) => {
        const map =
          createEmptyAnswerMap(
            detail
          );

        const savedIds =
          new Set<string>();

        savedAnswers.forEach(
          (savedAnswer) => {
            map[
              savedAnswer.questionId
            ] = {
              selectedOptionId:
                savedAnswer.selectedOptionId,

              booleanAnswer:
                savedAnswer.booleanAnswer,

              textAnswer:
                savedAnswer.textAnswer ??
                "",
            };

            savedIds.add(
              savedAnswer.questionId
            );
          }
        );

        setAnswers(map);

        setSavedQuestionIds(
          savedIds
        );
      },
      [createEmptyAnswerMap]
    );

  // =========================================================
  // LOAD PAGE
  // =========================================================

  const loadPage = useCallback(
    async () => {
      if (!assessmentId) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const detail =
          await getStudentAssessment(
            assessmentId
          );

        setAssessment(detail);

        setAnswers(
          createEmptyAnswerMap(
            detail
          )
        );

        const attempts =
          await getMyAssessmentAttempts();

        const matchingAttempts =
          attempts.filter(
            (item) =>
              item.assessmentId ===
              assessmentId
          );

        if (
          matchingAttempts.length ===
          0
        ) {
          setAttempt(null);
          return;
        }

        const activeAttempt =
          matchingAttempts.find(
            (item) =>
              item.status ===
              "IN_PROGRESS"
          );

        const existingAttempt =
          activeAttempt ??
          matchingAttempts[
            matchingAttempts.length -
              1
          ];

        setAttempt(
          existingAttempt
        );

        const savedAnswers =
          await getAssessmentAttemptAnswers(
            existingAttempt.id
          );

        applySavedAnswers(
          detail,
          savedAnswers
        );
      } catch (error: unknown) {
        console.error(
          "LOAD STUDENT ASSESSMENT ERROR:",
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
    },
    [
      assessmentId,
      applySavedAnswers,
      createEmptyAnswerMap,
      handleAuthFailure,
    ]
  );

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  // =========================================================
  // START ATTEMPT
  // =========================================================

  const handleStartAttempt =
    async () => {
      if (!assessment) {
        return;
      }

      setStarting(true);
      setError("");
      setMessage("");

      try {
        const createdAttempt =
          await startAssessmentAttempt(
            assessment.id
          );

        setAttempt(
          createdAttempt
        );

        setAnswers(
          createEmptyAnswerMap(
            assessment
          )
        );

        setSavedQuestionIds(
          new Set()
        );

        setMessage(
          "Assessment started."
        );
      } catch (error: unknown) {
        console.error(
          "START ASSESSMENT ERROR:",
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
              "Could not start assessment."
          );

          return;
        }

        setError(
          "Could not start assessment."
        );
      } finally {
        setStarting(false);
      }
    };

  // =========================================================
  // UPDATE LOCAL ANSWER
  // =========================================================

  const updateAnswer = (
    questionId: string,
    changes:
      Partial<StudentLocalAnswer>
  ) => {
    setAnswers((current) => ({
      ...current,

      [questionId]: {
        selectedOptionId:
          current[questionId]
            ?.selectedOptionId ??
          null,

        booleanAnswer:
          current[questionId]
            ?.booleanAnswer ??
          null,

        textAnswer:
          current[questionId]
            ?.textAnswer ?? "",

        ...changes,
      },
    }));

    setSavedQuestionIds(
      (current) => {
        const next =
          new Set(current);

        next.delete(questionId);

        return next;
      }
    );
  };

  // =========================================================
  // SAVE NORMAL ANSWER
  // =========================================================

  const handleSaveAnswer =
    async (
      questionId: string
    ) => {
      if (!attempt) {
        setError(
          "Start the assessment first."
        );
        return;
      }

      if (
        attempt.status !==
        "IN_PROGRESS"
      ) {
        setError(
          "This attempt can no longer be edited."
        );
        return;
      }

      const question =
        assessment?.questions.find(
          (item) =>
            item.id === questionId
        );

      if (!question) {
        return;
      }

      if (
        question.questionType ===
        "CODING"
      ) {
        setError(
          "Use Submit code for coding questions."
        );
        return;
      }

      const localAnswer =
        answers[questionId];

      if (!localAnswer) {
        return;
      }

      let request:
        SaveAssessmentAnswerRequest;

      if (
        question.questionType ===
        "MULTIPLE_CHOICE"
      ) {
        if (
          !localAnswer.selectedOptionId
        ) {
          setError(
            "Select an option before saving."
          );
          return;
        }

        request = {
          selectedOptionId:
            localAnswer.selectedOptionId,
          booleanAnswer: null,
          textAnswer: null,
        };
      } else if (
        question.questionType ===
        "TRUE_FALSE"
      ) {
        if (
          localAnswer.booleanAnswer ===
          null
        ) {
          setError(
            "Select True or False before saving."
          );
          return;
        }

        request = {
          selectedOptionId: null,
          booleanAnswer:
            localAnswer.booleanAnswer,
          textAnswer: null,
        };
      } else {
        const text =
          localAnswer.textAnswer.trim();

        if (!text) {
          setError(
            "Enter an answer before saving."
          );
          return;
        }

        request = {
          selectedOptionId: null,
          booleanAnswer: null,
          textAnswer: text,
        };
      }

      setSavingQuestionId(
        questionId
      );

      setError("");
      setMessage("");

      try {
        await saveAssessmentAnswer(
          attempt.id,
          questionId,
          request
        );

        setSavedQuestionIds(
          (current) => {
            const next =
              new Set(current);

            next.add(questionId);

            return next;
          }
        );

        setMessage(
          "Answer saved."
        );
      } catch (error: unknown) {
        console.error(
          "SAVE ANSWER ERROR:",
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
              "Could not save answer."
          );

          return;
        }

        setError(
          "Could not save answer."
        );
      } finally {
        setSavingQuestionId(
          null
        );
      }
    };

  // =========================================================
  // CODING SUBMITTED
  // =========================================================

  const handleCodingSubmitted = (
    questionId: string
  ) => {
    setSavedQuestionIds(
      (current) => {
        const next =
          new Set(current);

        next.add(questionId);

        return next;
      }
    );

    setError("");

    setMessage(
      "Code submitted successfully."
    );
  };

  // =========================================================
  // SUBMIT ASSESSMENT
  // =========================================================

  const handleSubmit =
    async () => {
      if (!attempt) {
        return;
      }

      if (
        attempt.status !==
        "IN_PROGRESS"
      ) {
        return;
      }

      const unsavedQuestions =
        assessment?.questions.filter(
          (question) =>
            !savedQuestionIds.has(
              question.id
            )
        ) ?? [];

      if (
        unsavedQuestions.length > 0
      ) {
        setError(
          `You still have ${
            unsavedQuestions.length
          } unsaved question${
            unsavedQuestions.length ===
            1
              ? ""
              : "s"
          }. Save every answer before submitting.`
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Submit this assessment? You will not be able to change your answers afterward."
        );

      if (!confirmed) {
        return;
      }

      setSubmitting(true);
      setError("");
      setMessage("");

      try {
        const submitted =
          await submitAssessmentAttempt(
            attempt.id
          );

        setAttempt(submitted);

        setMessage(
          "Assessment submitted successfully."
        );
      } catch (error: unknown) {
        console.error(
          "SUBMIT ASSESSMENT ERROR:",
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
              "Could not submit assessment."
          );

          return;
        }

        setError(
          "Could not submit assessment."
        );
      } finally {
        setSubmitting(false);
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
            href="/student/batches"
            className="text-sm font-semibold text-blue-700"
          >
            ← Back to batches
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
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

  const attemptStarted =
    attempt !== null;

  const attemptEditable =
    attempt?.status ===
    "IN_PROGRESS";

  const savedCount =
    assessment.questions.filter(
      (question) =>
        savedQuestionIds.has(
          question.id
        )
    ).length;

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/student/batches/${assessment.batchId}`}
          className="text-sm font-semibold text-blue-700"
        >
          ← Back to batch
        </Link>

        <StudentAssessmentHeader
          assessment={assessment}
          attempt={attempt}
          savedCount={savedCount}
          starting={starting}
          onStart={
            handleStartAttempt
          }
        />

        <AssessmentMessages
          error={error}
          message={message}
        />

        {!attemptStarted && (
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-950">
              Before you start
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              The questions will become
              available after you start
              the assessment.
            </p>
          </section>
        )}

        {attemptStarted &&
          attempt && (
            <StudentAssessmentQuestionList
              assessment={assessment}
              attemptId={attempt.id}
              editable={
                attemptEditable
              }
              answers={answers}
              savedQuestionIds={
                savedQuestionIds
              }
              savingQuestionId={
                savingQuestionId
              }
              onUpdate={
                updateAnswer
              }
              onSave={
                handleSaveAnswer
              }
              onCodingSubmitted={
                handleCodingSubmitted
              }
            />
          )}

        {attemptEditable && (
          <AssessmentSubmitCard
            savedCount={savedCount}
            totalQuestions={
              assessment.questions
                .length
            }
            submitting={
              submitting
            }
            onSubmit={
              handleSubmit
            }
          />
        )}
      </div>
    </main>
  );
}