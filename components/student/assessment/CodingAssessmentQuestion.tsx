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
import {
  useEffect,
  useState,
} from "react";

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

  const [
    sourceCode,
    setSourceCode,
  ] = useState("");

  const [running, setRunning] =
    useState(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    runResult,
    setRunResult,
  ] =
    useState<RunCodeResponse | null>(
      null
    );

  const [
    submission,
    setSubmission,
  ] =
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
      <div
        className="
          min-w-0
          rounded-xl
          border
          border-red-200
          bg-red-50
          p-3.5
          text-sm
          font-medium
          leading-6
          text-red-700

          sm:p-4
        "
        role="alert"
      >
        Coding configuration is
        unavailable for this question.
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

      if (
        axios.isAxiosError(error)
      ) {
        setError(
          error.response?.data
            ?.message ||
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

  const handleSubmitCode =
    async () => {
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

        if (
          axios.isAxiosError(error)
        ) {
          setError(
            error.response?.data
              ?.message ||
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
    <div
      className="
        min-w-0
        space-y-5
      "
    >
      {/* LANGUAGE */}

      <div
        className="
          flex
          min-w-0
          flex-col
          items-start
          gap-2

          sm:flex-row
          sm:flex-wrap
          sm:items-center
          sm:gap-3
        "
      >
        <div
          className="
            inline-flex
            shrink-0
            items-center
            gap-2
            rounded-lg
            bg-slate-900
            px-3
            py-2
            text-xs
            font-semibold
            text-white
          "
        >
          <Code2
            size={14}
            aria-hidden="true"
          />

          {formatLanguage(
            coding.language
          )}
        </div>

        <p
          className="
            min-w-0
            break-words
            text-xs
            leading-5
            text-slate-500
          "
        >
          Your solution will be evaluated
          against sample and hidden test
          cases.
        </p>
      </div>

      {/* CONSTRAINTS */}

      {coding.constraintsText && (
        <section
          className="
            min-w-0
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3.5

            sm:p-4
          "
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-slate-500
            "
          >
            Constraints
          </p>

          <pre
            className="
              mt-2
              max-w-full
              overflow-x-auto
              whitespace-pre-wrap
              break-words
              font-mono
              text-sm
              leading-6
              text-slate-700
            "
          >
            {coding.constraintsText}
          </pre>
        </section>
      )}

      {/* SAMPLE TEST CASES */}

      {coding.sampleTestCases.length >
        0 && (
        <section className="min-w-0">
          <p
            className="
              mb-3
              text-sm
              font-semibold
              text-slate-800
            "
          >
            Sample test cases
          </p>

          <div
            className="
              min-w-0
              space-y-3
            "
          >
            {coding.sampleTestCases.map(
              (testCase, index) => (
                <div
                  key={testCase.id}
                  className="
                    grid
                    min-w-0
                    gap-3
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-3.5

                    md:grid-cols-2
                    md:p-4
                  "
                >
                  <CodeBox
                    label={`Input ${
                      index + 1
                    }`}
                    value={
                      testCase.inputData ||
                      "(no input)"
                    }
                  />

                  <CodeBox
                    label="Expected output"
                    value={
                      testCase.expectedOutput
                    }
                  />
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* CODE EDITOR */}

      <section className="min-w-0">
        <div
          className="
            mb-2
            flex
            min-w-0
            flex-col
            gap-1.5

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-3
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-2
            "
          >
            <Terminal
              size={16}
              className="
                shrink-0
                text-slate-500
              "
              aria-hidden="true"
            />

            <p
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              Solution
            </p>
          </div>

          <span
            className="
              text-xs
              text-slate-400
            "
          >
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
          disabled={
            disabled ||
            running ||
            submitting
          }
          spellCheck={false}
          aria-label="Coding solution"
          className="
            min-h-[280px]
            min-w-0
            w-full
            max-w-full
            resize-y
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            p-3
            font-mono
            text-sm
            leading-6
            text-slate-100
            outline-none
            transition

            placeholder:text-slate-500

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20

            disabled:cursor-not-allowed
            disabled:opacity-70

            sm:min-h-[340px]
            sm:p-4
          "
        />
      </section>

      {/* ERROR */}

      {error && (
        <div
          className="
            flex
            min-w-0
            items-start
            gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-3.5
            text-sm
            leading-6
            text-red-700

            sm:p-4
          "
          role="alert"
          aria-live="assertive"
        >
          <TriangleAlert
            size={17}
            className="
              mt-0.5
              shrink-0
            "
            aria-hidden="true"
          />

          <span
            className="
              min-w-0
              break-words
            "
          >
            {error}
          </span>
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
        <div
          className="
            min-w-0
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3.5

            sm:p-4
          "
          role="status"
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
            <div
              className="
                min-w-0
                flex-1
              "
            >
              <p
                className="
                  font-bold
                  text-slate-900
                "
              >
                Code submitted
              </p>

              <p
                className="
                  mt-1
                  break-words
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
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

            <div
              className="
                flex
                min-w-0
                flex-wrap
                items-center
                gap-2

                sm:block
                sm:shrink-0
                sm:text-right
              "
            >
              <StatusBadge
                status={
                  submission.status
                }
              />

              <p
                className="
                  text-sm
                  font-bold
                  text-slate-900

                  sm:mt-2
                "
              >
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
        <div
          className="
            flex
            min-w-0
            flex-col
            gap-2.5

            sm:flex-row
            sm:flex-wrap
            sm:gap-3
          "
        >
          <button
            type="button"
            onClick={handleRun}
            disabled={
              running ||
              submitting ||
              !sourceCode.trim()
            }
            className="
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
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

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-slate-300
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-60

              sm:w-auto
            "
          >
            {running ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Play
                size={16}
                aria-hidden="true"
              />
            )}

            {running
              ? "Running..."
              : "Run sample tests"}
          </button>

          <button
            type="button"
            onClick={
              handleSubmitCode
            }
            disabled={
              running ||
              submitting ||
              !sourceCode.trim()
            }
            className="
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#1256AF]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition

              hover:bg-[#0E4895]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1256AF]/30
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-60

              sm:w-auto
            "
          >
            {submitting ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Send
                size={16}
                aria-hidden="true"
              />
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

function CodeBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </p>

      <pre
        className="
          mt-2
          max-w-full
          overflow-x-auto
          whitespace-pre-wrap
          break-words
          rounded-lg
          bg-white
          p-3
          font-mono
          text-sm
          leading-6
          text-slate-800
        "
      >
        {value}
      </pre>
    </div>
  );
}

function ExecutionResult({
  result,
}: {
  result: RunCodeResponse;
}) {
  return (
    <section
      className="
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        p-3.5

        sm:p-4
      "
    >
      <div
        className="
          flex
          min-w-0
          flex-col
          gap-1

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:gap-3
        "
      >
        <p
          className="
            text-sm
            font-bold
            text-slate-900
          "
        >
          Sample test result
        </p>

        <p
          className="
            text-xs
            font-semibold
            text-slate-500
          "
        >
          {result.passedTestCases}/
          {result.totalTestCases} passed
        </p>
      </div>

      <div
        className="
          mt-4
          min-w-0
          space-y-3
        "
      >
        {result.results.map(
          (test, index) => (
            <div
              key={
                test.testCaseId ??
                `${test.position}-${index}`
              }
              className="
                min-w-0
                overflow-hidden
                rounded-lg
                bg-slate-50
                p-3
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                {test.passed ? (
                  <CheckCircle2
                    size={16}
                    className="
                      shrink-0
                      text-emerald-600
                    "
                    aria-hidden="true"
                  />
                ) : (
                  <CircleX
                    size={16}
                    className="
                      shrink-0
                      text-red-500
                    "
                    aria-hidden="true"
                  />
                )}

                <span
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  Test {test.position}
                </span>

                <span
                  className="
                    ml-auto
                    break-words
                    text-right
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  {formatStatus(
                    test.status
                  )}
                </span>
              </div>

              {test.actualOutput !==
                null && (
                <div
                  className="
                    mt-3
                    min-w-0
                  "
                >
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-slate-500
                    "
                  >
                    Output
                  </p>

                  <pre
                    className="
                      mt-1
                      max-w-full
                      overflow-x-auto
                      whitespace-pre-wrap
                      break-words
                      font-mono
                      text-xs
                      leading-5
                      text-slate-700
                    "
                  >
                    {test.actualOutput}
                  </pre>
                </div>
              )}

              {test.errorOutput && (
                <pre
                  className="
                    mt-3
                    max-w-full
                    overflow-x-auto
                    whitespace-pre-wrap
                    break-words
                    rounded-lg
                    bg-red-50
                    p-3
                    font-mono
                    text-xs
                    leading-5
                    text-red-700
                  "
                >
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
        w-fit
        shrink-0
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