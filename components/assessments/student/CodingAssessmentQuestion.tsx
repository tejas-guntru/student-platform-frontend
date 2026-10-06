"use client";

import axios from "axios";
import {
  CheckCircle2,
  CircleX,
  Code2,
  LoaderCircle,
  Play,
  Send,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  runAssessmentCode,
  submitAssessmentCode,
} from "@/services/studentAssessmentService";

import type {
  CodingSubmissionResponse,
  RunCodeResponse,
  StudentAssessmentQuestionResponse,
} from "@/types/assessment";

interface CodingAssessmentQuestionProps {
  attemptId: string;
  question: StudentAssessmentQuestionResponse;
  disabled: boolean;
  onSubmitted: () => void;
}

export default function CodingAssessmentQuestion({
  attemptId,
  question,
  disabled,
  onSubmitted,
}: CodingAssessmentQuestionProps) {
  const coding = question.coding;

  const [sourceCode, setSourceCode] =
    useState("");

  const [running, setRunning] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [runResult, setRunResult] =
    useState<RunCodeResponse | null>(null);

  const [submission, setSubmission] =
    useState<CodingSubmissionResponse | null>(
      null
    );

  const [error, setError] =
    useState("");

  useEffect(() => {
    setSourceCode(
      coding?.starterCode ?? ""
    );

    setRunResult(null);
    setSubmission(null);
    setError("");
  }, [
    question.id,
    coding?.starterCode,
  ]);

  if (!coding) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
        Coding configuration is unavailable
        for this question.
      </div>
    );
  }

  const handleRun = async () => {
    if (!sourceCode.trim()) {
      setError(
        "Enter your solution before running the code."
      );
      return;
    }

    setRunning(true);
    setError("");
    setRunResult(null);

    try {
      const result =
        await runAssessmentCode(
          attemptId,
          question.id,
          {
            sourceCode,
          }
        );

      setRunResult(result);
    } catch (error: unknown) {
      console.error(
        "RUN CODE ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Could not run the code."
        );
      } else {
        setError(
          "Could not run the code."
        );
      }
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!sourceCode.trim()) {
      setError(
        "Enter your solution before submitting."
      );
      return;
    }

    setSubmitting(true);
    setError("");
    setSubmission(null);

    try {
      const result =
        await submitAssessmentCode(
          attemptId,
          question.id,
          {
            sourceCode,
          }
        );

      setSubmission(result);

      onSubmitted();
    } catch (error: unknown) {
      console.error(
        "SUBMIT CODE ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Could not submit the code."
        );
      } else {
        setError(
          "Could not submit the code."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* LANGUAGE */}

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
          <Code2 size={14} />

          {formatLanguage(
            coding.language
          )}
        </div>

        <p className="text-xs text-slate-500">
          Your solution will be evaluated
          against sample and hidden test cases.
        </p>
      </div>

      {/* CONSTRAINTS */}

      {coding.constraintsText && (
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Constraints
          </p>

          <pre className="mt-2 whitespace-pre-wrap font-mono text-sm leading-6 text-slate-700">
            {coding.constraintsText}
          </pre>
        </section>
      )}

      {/* SAMPLE CASES */}

      {coding.sampleTestCases.length > 0 && (
        <section>
          <p className="mb-3 text-sm font-semibold text-slate-800">
            Sample test cases
          </p>

          <div className="space-y-3">
            {coding.sampleTestCases.map(
              (testCase, index) => (
                <div
                  key={testCase.id}
                  className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Input {index + 1}
                    </p>

                    <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-white p-3 font-mono text-sm text-slate-800">
                      {testCase.inputData ||
                        "(no input)"}
                    </pre>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Expected output
                    </p>

                    <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-white p-3 font-mono text-sm text-slate-800">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* EDITOR */}

      <section>
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal
              size={16}
              className="text-slate-500"
            />

            <p className="text-sm font-semibold text-slate-800">
              Solution
            </p>
          </div>

          <span className="text-xs text-slate-400">
            {sourceCode.length} characters
          </span>
        </div>

        <textarea
          value={sourceCode}
          onChange={(event) =>
            setSourceCode(
              event.target.value
            )
          }
          disabled={disabled}
          spellCheck={false}
          className="
            min-h-[340px]
            w-full
            resize-y
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            p-4
            font-mono
            text-sm
            leading-6
            text-slate-100
            outline-none
            transition

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20

            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        />
      </section>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <TriangleAlert
            size={17}
            className="mt-0.5 shrink-0"
          />

          <span>{error}</span>
        </div>
      )}

      {/* RUN RESULT */}

      {runResult && (
        <ExecutionResult
          result={runResult}
        />
      )}

      {/* SUBMISSION RESULT */}

      {submission && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Code submitted
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {
                  submission.passedTestCases
                }{" "}
                of{" "}
                {
                  submission.totalTestCases
                }{" "}
                test cases passed.
              </p>
            </div>

            <div className="text-right">
              <StatusBadge
                status={
                  submission.status
                }
              />

              <p className="mt-2 text-sm font-bold text-slate-900">
                {
                  submission.awardedMarks
                }{" "}
                / {question.marks} marks
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ACTIONS */}

      {!disabled && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRun}
            disabled={
              running || submitting
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              transition

              hover:bg-slate-50

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {running ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <Play size={16} />
            )}

            {running
              ? "Running..."
              : "Run sample tests"}
          </button>

          <button
            type="button"
            onClick={handleSubmitCode}
            disabled={
              running || submitting
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-blue-700
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition

              hover:bg-blue-800

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {submitting ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <Send size={16} />
            )}

            {submitting
              ? "Submitting..."
              : "Submit code"}
          </button>
        </div>
      )}
    </div>
  );
}

function ExecutionResult({
  result,
}: {
  result: RunCodeResponse;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-900">
          Sample test result
        </p>

        <p className="text-xs font-semibold text-slate-500">
          {result.passedTestCases}/
          {result.totalTestCases} passed
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {result.results.map(
          (test, index) => (
            <div
              key={
                test.testCaseId ??
                `${test.position}-${index}`
              }
              className="rounded-lg bg-slate-50 p-3"
            >
              <div className="flex items-center gap-2">
                {test.passed ? (
                  <CheckCircle2
                    size={16}
                    className="text-emerald-600"
                  />
                ) : (
                  <CircleX
                    size={16}
                    className="text-red-500"
                  />
                )}

                <span className="text-sm font-semibold text-slate-800">
                  Test {test.position}
                </span>

                <span className="ml-auto text-xs font-medium text-slate-500">
                  {formatStatus(
                    test.status
                  )}
                </span>
              </div>

              {test.actualOutput !==
                null && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-500">
                    Output
                  </p>

                  <pre className="mt-1 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-slate-700">
                    {
                      test.actualOutput
                    }
                  </pre>
                </div>
              )}

              {test.errorOutput && (
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg bg-red-50 p-3 font-mono text-xs text-red-700">
                  {test.errorOutput}
                </pre>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const accepted =
    status === "ACCEPTED";

  const partial =
    status ===
    "PARTIALLY_ACCEPTED";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-2.5
        py-1
        text-xs
        font-bold

        ${
          accepted
            ? "bg-emerald-100 text-emerald-700"
            : partial
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
        }
      `}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(
  value: string
) {
  return value
    .split("_")
    .map(
      (part) =>
        part.charAt(0) +
        part
          .slice(1)
          .toLowerCase()
    )
    .join(" ");
}

function formatLanguage(
  language: string
) {
  switch (language) {
    case "JAVA":
      return "Java";

    case "PYTHON":
      return "Python";

    case "CPP":
      return "C++";

    case "JAVASCRIPT":
      return "JavaScript";

    default:
      return language;
  }
}