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
  getAssessment,
  getInstructorAssessmentAttempt,
  getInstructorAttemptAnswers,
  gradeAssessmentAnswer,
} from "@/services/instructorAssessmentService";

import type {
  AssessmentAttemptResponse,
  AssessmentResponse,
  InstructorAssessmentAnswerResponse,
} from "@/types/assessment";

/* =========================================================
   HELPERS
========================================================= */

function formatQuestionType(
  type: InstructorAssessmentAnswerResponse["questionType"]
) {
  switch (type) {
    case "MULTIPLE_CHOICE":
      return "Multiple Choice";

    case "TRUE_FALSE":
      return "True / False";

    case "SHORT_ANSWER":
      return "Short Answer";

    case "CODING":
      return "Coding";

    default:
      return type;
  }
}

function getGradingSource(
  type: InstructorAssessmentAnswerResponse["questionType"]
) {
  switch (type) {
    case "MULTIPLE_CHOICE":
    case "TRUE_FALSE":
      return "Automatically graded";

    case "CODING":
      return "Execution graded";

    case "SHORT_ANSWER":
      return "Instructor graded";

    default:
      return "Graded";
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function InstructorAttemptGradingPage() {
  const params = useParams();

  const batchId =
    typeof params.batchId === "string"
      ? params.batchId
      : "";

  const assessmentId =
    typeof params.assessmentId === "string"
      ? params.assessmentId
      : "";

  const attemptId =
    typeof params.attemptId === "string"
      ? params.attemptId
      : "";

  /* =========================================================
     DATA
  ========================================================= */

  const [assessment, setAssessment] =
    useState<AssessmentResponse | null>(
      null
    );

  const [attempt, setAttempt] =
    useState<AssessmentAttemptResponse | null>(
      null
    );

  const [answers, setAnswers] = useState<
    InstructorAssessmentAnswerResponse[]
  >([]);

  /*
   * Only SHORT_ANSWER uses these values.
   *
   * MCQ / TRUE_FALSE:
   *   backend auto-grades them.
   *
   * CODING:
   *   awardedMarks comes from code execution.
   */
  const [marksByAnswer, setMarksByAnswer] =
    useState<Record<string, string>>({});

  /* =========================================================
     PAGE STATE
  ========================================================= */

  const [loading, setLoading] =
    useState(true);

  const [
    gradingAnswerId,
    setGradingAnswerId,
  ] = useState<string | null>(null);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  /* =========================================================
     AUTH
  ========================================================= */

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.replace("/login");
    }, []);

  /* =========================================================
     LOAD PAGE
  ========================================================= */

  const loadPage =
    useCallback(async () => {
      if (
        !batchId ||
        !assessmentId ||
        !attemptId
      ) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [
          assessmentResponse,
          attemptResponse,
          answerResponse,
        ] = await Promise.all([
          getAssessment(
            batchId,
            assessmentId
          ),

          getInstructorAssessmentAttempt(
            batchId,
            assessmentId,
            attemptId
          ),

          getInstructorAttemptAnswers(
            batchId,
            assessmentId,
            attemptId
          ),
        ]);

        setAssessment(
          assessmentResponse
        );

        setAttempt(
          attemptResponse
        );

        setAnswers(
          answerResponse
        );

        /*
         * Populate manual-grade inputs only
         * for SHORT_ANSWER questions.
         */
        const initialMarks: Record<
          string,
          string
        > = {};

        answerResponse.forEach(
          (answer) => {
            if (
              answer.questionType ===
                "SHORT_ANSWER" &&
              answer.awardedMarks !== null
            ) {
              initialMarks[answer.id] =
                String(
                  answer.awardedMarks
                );
            }
          }
        );

        setMarksByAnswer(
          initialMarks
        );
      } catch (error: unknown) {
        console.error(
          "LOAD INSTRUCTOR ATTEMPT ERROR:",
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
              "Could not load attempt."
          );

          return;
        }

        setError(
          "Could not load attempt."
        );
      } finally {
        setLoading(false);
      }
    }, [
      assessmentId,
      attemptId,
      batchId,
      handleAuthFailure,
    ]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  /* =========================================================
     GRADE SHORT ANSWER
  ========================================================= */

  const handleGradeAnswer =
    async (
      answer: InstructorAssessmentAnswerResponse
    ) => {
      /*
       * Frontend safety guard.
       *
       * Manual grading belongs exclusively
       * to SHORT_ANSWER.
       */
      if (
        answer.questionType !==
        "SHORT_ANSWER"
      ) {
        setError(
          "Only short-answer questions can be manually graded."
        );

        return;
      }

      /*
       * Do not allow grading before the
       * student has submitted the attempt.
       */
      if (
        attempt?.status ===
        "IN_PROGRESS"
      ) {
        setError(
          "The student must submit the assessment before manual grading."
        );

        return;
      }

      const rawMarks =
        marksByAnswer[answer.id];

      if (
        rawMarks === undefined ||
        rawMarks.trim() === ""
      ) {
        setError(
          "Enter awarded marks."
        );

        return;
      }

      const awardedMarks =
        Number(rawMarks);

      if (
        !Number.isFinite(
          awardedMarks
        ) ||
        awardedMarks < 0
      ) {
        setError(
          "Awarded marks must be 0 or greater."
        );

        return;
      }

      if (
        awardedMarks >
        answer.questionMarks
      ) {
        setError(
          `Marks cannot exceed ${answer.questionMarks} for this question.`
        );

        return;
      }

      setGradingAnswerId(
        answer.id
      );

      setError("");
      setMessage("");

      try {
        const graded =
          await gradeAssessmentAnswer(
            batchId,
            assessmentId,
            attemptId,
            answer.id,
            {
              awardedMarks,
            }
          );

        /*
         * Replace only the graded
         * short-answer record.
         */
        setAnswers(
          (current) =>
            current.map(
              (item) =>
                item.id === graded.id
                  ? graded
                  : item
            )
        );

        setMarksByAnswer(
          (current) => ({
            ...current,

            [graded.id]:
              graded.awardedMarks !==
              null
                ? String(
                    graded.awardedMarks
                  )
                : "",
          })
        );

        /*
         * Manual grading may transition
         * SUBMITTED -> GRADED and update
         * the final score.
         */
        const refreshedAttempt =
          await getInstructorAssessmentAttempt(
            batchId,
            assessmentId,
            attemptId
          );

        setAttempt(
          refreshedAttempt
        );

        setMessage(
          "Short answer graded successfully."
        );
      } catch (error: unknown) {
        console.error(
          "GRADE ANSWER ERROR:",
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
              "Could not grade answer."
          );

          return;
        }

        setError(
          "Could not grade answer."
        );
      } finally {
        setGradingAnswerId(
          null
        );
      }
    };

  /* =========================================================
     ANSWER VALUE
  ========================================================= */

  const getAnswerValue = (
    answer: InstructorAssessmentAnswerResponse
  ) => {
    if (
      answer.questionType ===
      "MULTIPLE_CHOICE"
    ) {
      return (
        answer.selectedOptionId ??
        "No option selected"
      );
    }

    if (
      answer.questionType ===
      "TRUE_FALSE"
    ) {
      if (
        answer.booleanAnswer ===
        null
      ) {
        return "No answer";
      }

      return answer.booleanAnswer
        ? "True"
        : "False";
    }

    if (
      answer.questionType ===
      "CODING"
    ) {
      /*
       * The current instructor-answer DTO
       * does not expose source code or the
       * CodingSubmission object.
       *
       * Do not invent submission details.
       */
      return answer.awardedMarks !== null
        ? "Code submitted and evaluated."
        : "No evaluated coding submission.";
    }

    return (
      answer.textAnswer ||
      "No answer"
    );
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
        "
      >
        <div className="mx-auto max-w-5xl">
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              text-sm
              text-slate-500
            "
          >
            Loading student attempt...
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (
    !assessment ||
    !attempt
  ) {
    return (
      <main
        className="
          min-h-screen
          bg-slate-50
          px-4
          py-8

          sm:px-6
          sm:py-10
        "
      >
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/instructor/batches/${batchId}/assessments/${assessmentId}`}
            className="
              text-sm
              font-semibold
              text-[#1256AF]

              hover:underline
            "
          >
            ← Back to assessment
          </Link>

          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-5
              text-sm
              text-red-700
            "
          >
            {error ||
              "Attempt not found."}
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const gradedAnswers =
    answers.filter(
      (answer) =>
        answer.awardedMarks !==
        null
    ).length;

  const awardedTotal =
    answers.reduce(
      (total, answer) =>
        total +
        (answer.awardedMarks ??
          0),
      0
    );

  const pendingManualAnswers =
    answers.filter(
      (answer) =>
        answer.questionType ===
          "SHORT_ANSWER" &&
        answer.awardedMarks === null
    ).length;

  const hasShortAnswers =
    answers.some(
      (answer) =>
        answer.questionType ===
        "SHORT_ANSWER"
    );

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
      "
    >
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/instructor/batches/${batchId}/assessments/${assessmentId}`}
          className="
            text-sm
            font-semibold
            text-[#1256AF]

            hover:underline
          "
        >
          ← Back to assessment
        </Link>

        {/* ===================================================
            HEADER
        =================================================== */}

        <section
          className="
            mt-6
            rounded-2xl
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
              flex-col
              justify-between
              gap-5

              sm:flex-row
              sm:items-start
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-[#1256AF]
                "
              >
                Attempt Review
              </p>

              <h1
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-slate-950

                  sm:text-3xl
                "
              >
                {assessment.title}
              </h1>

              <p
                className="
                  mt-3
                  break-all
                  text-xs
                  text-slate-400
                "
              >
                Attempt ID:{" "}
                {attempt.id}
              </p>
            </div>

            <span
              className={`
                w-fit
                rounded-full
                px-3
                py-1
                text-xs
                font-bold

                ${
                  attempt.status ===
                  "GRADED"
                    ? `
                        bg-green-100
                        text-green-700
                      `
                    : attempt.status ===
                        "SUBMITTED"
                      ? `
                          bg-blue-100
                          text-blue-700
                        `
                      : `
                          bg-amber-100
                          text-amber-700
                        `
                }
              `}
            >
              {attempt.status}
            </span>
          </div>

          <div
            className="
              mt-6
              grid
              gap-3

              sm:grid-cols-2

              lg:grid-cols-4
            "
          >
            <SummaryCard
              label="Answers"
              value={String(
                answers.length
              )}
            />

            <SummaryCard
              label="Graded"
              value={`${gradedAnswers} / ${answers.length}`}
            />

            <SummaryCard
              label="Awarded"
              value={`${awardedTotal} / ${assessment.totalMarks}`}
            />

            <SummaryCard
              label="Final Score"
              value={
                attempt.score !== null
                  ? `${attempt.score} / ${assessment.totalMarks}`
                  : "Pending"
              }
            />
          </div>

          {attempt.status ===
            "SUBMITTED" &&
            pendingManualAnswers >
              0 && (
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-amber-200
                  bg-amber-50
                  px-4
                  py-3
                "
              >
                <p
                  className="
                    text-sm
                    font-semibold
                    text-amber-800
                  "
                >
                  {pendingManualAnswers}{" "}
                  short-answer{" "}
                  {pendingManualAnswers ===
                  1
                    ? "response requires"
                    : "responses require"}{" "}
                  manual grading.
                </p>
              </div>
            )}

          {attempt.status ===
            "GRADED" && (
            <div
              className="
                mt-5
                rounded-xl
                border
                border-green-200
                bg-green-50
                px-4
                py-3
              "
            >
              <p
                className="
                  text-sm
                  font-semibold
                  text-green-800
                "
              >
                Grading complete.
              </p>
            </div>
          )}

          {attempt.submittedAt && (
            <p
              className="
                mt-5
                text-sm
                text-slate-500
              "
            >
              Submitted{" "}
              {new Date(
                attempt.submittedAt
              ).toLocaleString()}
            </p>
          )}
        </section>

        {/* ===================================================
            MESSAGES
        =================================================== */}

        {error && (
          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
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
              p-4
              text-sm
              text-green-700
            "
          >
            {message}
          </div>
        )}

        {/* ===================================================
            ANSWERS
        =================================================== */}

        <section className="mt-8">
          <div
            className="
              flex
              items-end
              justify-between
              gap-4
            "
          >
            <div>
              <h2
                className="
                  text-xl
                  font-semibold
                  text-slate-950
                "
              >
                Student Answers
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                {hasShortAnswers
                  ? "Review the attempt and grade short-answer responses."
                  : "Review the student's graded assessment responses."}
              </p>
            </div>

            <span
              className="
                rounded-full
                bg-blue-100
                px-3
                py-1
                text-sm
                font-semibold
                text-blue-800
              "
            >
              {answers.length}
            </span>
          </div>

          {answers.length === 0 ? (
            <div
              className="
                mt-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                text-sm
                text-slate-500
              "
            >
              No submitted answers.
            </div>
          ) : (
            <div
              className="
                mt-4
                space-y-5
              "
            >
              {answers.map(
                (answer, index) => {
                  const isShortAnswer =
                    answer.questionType ===
                    "SHORT_ANSWER";

                  const isCoding =
                    answer.questionType ===
                    "CODING";

                  const isObjective =
                    answer.questionType ===
                      "MULTIPLE_CHOICE" ||
                    answer.questionType ===
                      "TRUE_FALSE";

                  const canManuallyGrade =
                    isShortAnswer &&
                    attempt.status !==
                      "IN_PROGRESS";

                  return (
                    <article
                      key={answer.id}
                      className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5

                        sm:p-6
                      "
                    >
                      {/* QUESTION */}

                      <div
                        className="
                          flex
                          flex-col
                          justify-between
                          gap-4

                          sm:flex-row
                        "
                      >
                        <div>
                          <p
                            className="
                              text-xs
                              font-bold
                              uppercase
                              tracking-wide
                              text-[#1256AF]
                            "
                          >
                            Question{" "}
                            {index + 1}
                          </p>

                          <h3
                            className="
                              mt-2
                              font-semibold
                              leading-6
                              text-slate-950
                            "
                          >
                            {
                              answer.questionText
                            }
                          </h3>
                        </div>

                        <div
                          className="
                            flex
                            h-fit
                            flex-wrap
                            gap-2
                          "
                        >
                          <span
                            className="
                              rounded-full
                              bg-slate-100
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-slate-700
                            "
                          >
                            {formatQuestionType(
                              answer.questionType
                            )}
                          </span>

                          <span
                            className="
                              rounded-full
                              bg-blue-50
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-blue-700
                            "
                          >
                            {
                              answer.questionMarks
                            }{" "}
                            {answer.questionMarks ===
                            1
                              ? "mark"
                              : "marks"}
                          </span>
                        </div>
                      </div>

                      {/* STUDENT ANSWER */}

                      <div
                        className="
                          mt-5
                          rounded-xl
                          bg-slate-50
                          p-4
                        "
                      >
                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-2
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
                            Student Answer
                          </p>

                          <span
                            className="
                              text-xs
                              font-medium
                              text-slate-400
                            "
                          >
                            {getGradingSource(
                              answer.questionType
                            )}
                          </span>
                        </div>

                        <p
                          className="
                            mt-2
                            whitespace-pre-wrap
                            break-words
                            font-medium
                            text-slate-900
                          "
                        >
                          {getAnswerValue(
                            answer
                          )}
                        </p>

                        {answer.questionType ===
                          "MULTIPLE_CHOICE" && (
                          <p
                            className="
                              mt-2
                              text-xs
                              text-slate-500
                            "
                          >
                            Selected option ID:{" "}
                            {answer.selectedOptionId ??
                              "None"}
                          </p>
                        )}

                        {isCoding && (
                          <p
                            className="
                              mt-2
                              text-xs
                              leading-5
                              text-slate-500
                            "
                          >
                            Coding marks are
                            controlled by the
                            execution result and
                            cannot be manually
                            changed here.
                          </p>
                        )}
                      </div>

                      {/* AWARDED MARKS */}

                      <div
                        className={`
                          mt-4
                          rounded-xl
                          border
                          p-4

                          ${
                            answer.awardedMarks !==
                            null
                              ? `
                                  border-green-200
                                  bg-green-50
                                `
                              : `
                                  border-amber-200
                                  bg-amber-50
                                `
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <div>
                            <p
                              className={`
                                text-sm
                                font-semibold

                                ${
                                  answer.awardedMarks !==
                                  null
                                    ? "text-green-800"
                                    : "text-amber-800"
                                }
                              `}
                            >
                              {answer.awardedMarks !==
                              null
                                ? `Awarded: ${answer.awardedMarks} / ${answer.questionMarks}`
                                : isShortAnswer
                                  ? `Awaiting manual grade / ${answer.questionMarks}`
                                  : `Not graded / ${answer.questionMarks}`}
                            </p>

                            <p
                              className={`
                                mt-1
                                text-xs

                                ${
                                  answer.awardedMarks !==
                                  null
                                    ? "text-green-700"
                                    : "text-amber-700"
                                }
                              `}
                            >
                              {getGradingSource(
                                answer.questionType
                              )}
                            </p>
                          </div>

                          {isObjective &&
                            answer.awardedMarks !==
                              null && (
                              <span
                                className="
                                  rounded-full
                                  bg-white/70
                                  px-2.5
                                  py-1
                                  text-xs
                                  font-semibold
                                  text-green-700
                                "
                              >
                                Auto
                              </span>
                            )}

                          {isCoding &&
                            answer.awardedMarks !==
                              null && (
                              <span
                                className="
                                  rounded-full
                                  bg-white/70
                                  px-2.5
                                  py-1
                                  text-xs
                                  font-semibold
                                  text-green-700
                                "
                              >
                                Execution
                              </span>
                            )}

                          {isShortAnswer &&
                            answer.awardedMarks !==
                              null && (
                              <span
                                className="
                                  rounded-full
                                  bg-white/70
                                  px-2.5
                                  py-1
                                  text-xs
                                  font-semibold
                                  text-green-700
                                "
                              >
                                Manual
                              </span>
                            )}
                        </div>
                      </div>

                      {/* MANUAL GRADING */}

                      {canManuallyGrade && (
                        <div
                          className="
                            mt-5
                            border-t
                            border-slate-100
                            pt-5
                          "
                        >
                          <div>
                            <p
                              className="
                                text-sm
                                font-semibold
                                text-slate-900
                              "
                            >
                              Manual Grading
                            </p>

                            <p
                              className="
                                mt-1
                                text-xs
                                text-slate-500
                              "
                            >
                              Award marks for this
                              short-answer response.
                            </p>
                          </div>

                          <div
                            className="
                              mt-4
                              flex
                              flex-col
                              gap-3

                              sm:flex-row
                              sm:items-end
                            "
                          >
                            <div>
                              <label
                                htmlFor={`marks-${answer.id}`}
                                className="
                                  text-sm
                                  font-medium
                                  text-slate-700
                                "
                              >
                                Award Marks
                              </label>

                              <div
                                className="
                                  mt-2
                                  flex
                                  items-center
                                  gap-2
                                "
                              >
                                <input
                                  id={`marks-${answer.id}`}
                                  type="number"
                                  min={0}
                                  max={
                                    answer.questionMarks
                                  }
                                  step="1"
                                  value={
                                    marksByAnswer[
                                      answer.id
                                    ] ?? ""
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    setMarksByAnswer(
                                      (
                                        current
                                      ) => ({
                                        ...current,

                                        [answer.id]:
                                          event
                                            .target
                                            .value,
                                      })
                                    )
                                  }
                                  className="
                                    w-28
                                    rounded-lg
                                    border
                                    border-slate-300
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                    outline-none
                                    transition-colors

                                    focus:border-[#1256AF]
                                  "
                                />

                                <span
                                  className="
                                    text-sm
                                    text-slate-500
                                  "
                                >
                                  /{" "}
                                  {
                                    answer.questionMarks
                                  }
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              disabled={
                                gradingAnswerId ===
                                answer.id
                              }
                              onClick={() =>
                                handleGradeAnswer(
                                  answer
                                )
                              }
                              className="
                                rounded-lg
                                bg-[#1256AF]
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition-colors

                                hover:bg-[#0F4B99]

                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                            >
                              {gradingAnswerId ===
                              answer.id
                                ? "Saving..."
                                : answer.awardedMarks !==
                                    null
                                  ? "Update Grade"
                                  : "Save Grade"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* READ ONLY GRADING INFO */}

                      {!isShortAnswer &&
                        attempt.status !==
                          "IN_PROGRESS" && (
                          <div
                            className="
                              mt-5
                              border-t
                              border-slate-100
                              pt-4
                            "
                          >
                            <p
                              className="
                                text-xs
                                text-slate-500
                              "
                            >
                              {isCoding
                                ? "This question is read-only. Marks are awarded by code execution."
                                : "This question is read-only. Marks are awarded automatically by the assessment system."}
                            </p>
                          </div>
                        )}

                      {isShortAnswer &&
                        attempt.status ===
                          "IN_PROGRESS" && (
                          <div
                            className="
                              mt-5
                              border-t
                              border-slate-100
                              pt-4
                            "
                          >
                            <p
                              className="
                                text-xs
                                text-amber-700
                              "
                            >
                              Manual grading becomes
                              available after the
                              student submits the
                              assessment.
                            </p>
                          </div>
                        )}
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        bg-slate-50
        p-4
      "
    >
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.1em]
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-xl
          font-bold
          text-slate-950
        "
      >
        {value}
      </p>
    </div>
  );
}
