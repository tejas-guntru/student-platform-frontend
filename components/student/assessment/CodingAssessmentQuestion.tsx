
"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import axios from "axios";
import {
  CheckCircle2,
  ChevronDown,
  CircleX,
  Code2,
  LoaderCircle,
  Maximize2,
  Minus,
  Moon,
  Play,
  Plus,
  RotateCcw,
  Send,
  Sun,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
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

type EditorTheme = "vs-dark" | "vs";

function monacoLanguage(language: string) {
  switch (language) {
    case "JAVA":
      return "java";
    case "PYTHON":
      return "python";
    case "CPP":
      return "cpp";
    case "JAVASCRIPT":
      return "javascript";
    default:
      return "plaintext";
  }
}

function formatLanguage(language: string) {
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

function fileName(language: string) {
  switch (language) {
    case "JAVA":
      return "Main.java";
    case "PYTHON":
      return "main.py";
    case "CPP":
      return "main.cpp";
    case "JAVASCRIPT":
      return "main.js";
    default:
      return "solution.txt";
  }
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map(
      (part) =>
        part.charAt(0) +
        part.slice(1).toLowerCase()
    )
    .join(" ");
}

function getErrorMessage(
  error: unknown,
  fallback: string
) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string }
      | undefined;

    return data?.message || fallback;
  }

  return fallback;
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
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-3 font-mono text-xs leading-6 text-slate-800">
        {value}
      </pre>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const accepted = status === "ACCEPTED";
  const partial = status === "PARTIALLY_ACCEPTED";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        accepted
          ? "bg-emerald-100 text-emerald-700"
          : partial
            ? "bg-amber-100 text-amber-700"
            : "bg-red-100 text-red-700"
      }`}
    >
      {formatStatus(status)}
    </span>
  );
}

function ExecutionResult({
  result,
}: {
  result: RunCodeResponse;
}) {
  const allPassed =
    result.totalTestCases > 0 &&
    result.passedTestCases === result.totalTestCases;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {allPassed ? (
            <CheckCircle2
              size={19}
              className="text-emerald-600"
            />
          ) : (
            <CircleX
              size={19}
              className="text-amber-600"
            />
          )}

          <h3 className="text-sm font-bold text-slate-900">
            Sample test results
          </h3>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {result.passedTestCases}/{result.totalTestCases} passed
        </span>
      </div>

      <div className="space-y-3">
        {result.results.map((test, index) => (
          <div
            key={
              test.testCaseId ??
              `${test.position}-${index}`
            }
            className={`min-w-0 rounded-xl border p-4 ${
              test.passed
                ? "border-emerald-200 bg-emerald-50/40"
                : "border-red-200 bg-red-50/30"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              {test.passed ? (
                <CheckCircle2
                  size={17}
                  className="text-emerald-600"
                />
              ) : (
                <CircleX
                  size={17}
                  className="text-red-500"
                />
              )}

              <span className="text-sm font-bold text-slate-800">
                Test {test.position}
              </span>

              <span className="ml-auto text-xs font-medium text-slate-500">
                {formatStatus(test.status)}
              </span>
            </div>

            {test.actualOutput !== null && (
              <div className="mt-3">
                <CodeBox
                  label="Actual output"
                  value={
                    test.actualOutput ||
                    "(empty output)"
                  }
                />
              </div>
            )}

            {test.errorOutput && (
              <div className="mt-3">
                <p className="mb-2 text-xs font-bold text-red-700">
                  {test.status === "COMPILATION_ERROR"
                    ? "Compiler error"
                    : "Execution error"}
                </p>

                <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-red-50 p-3 font-mono text-xs leading-5 text-red-700">
                  {test.errorOutput}
                </pre>
              </div>
            )}

            {test.executionTimeMs !== null && (
              <p className="mt-3 text-xs text-slate-500">
                Execution time: {test.executionTimeMs} ms
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CodingAssessmentQuestion({
  attemptId,
  question,
  disabled,
  onSubmitted,
}: CodingAssessmentQuestionProps) {
  const coding = question.coding;

  const [sourceCode, setSourceCode] = useState("");
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [runResult, setRunResult] =
    useState<RunCodeResponse | null>(null);

  const [submission, setSubmission] =
    useState<CodingSubmissionResponse | null>(null);

  const [error, setError] = useState("");

  const [theme, setTheme] =
    useState<EditorTheme>("vs-dark");

  const [fontSize, setFontSize] = useState(14);
  const [showResetConfirm, setShowResetConfirm] =
    useState(false);

  const [activeTab, setActiveTab] = useState<
    "testcases" | "results"
  >("testcases");

  const [editorExpanded, setEditorExpanded] =
    useState(false);

  const inFlightRef = useRef(false);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(
    null
  );

  const contextRef = useRef({
    attemptId,
    questionId: question.id,
  });

  contextRef.current = {
    attemptId,
    questionId: question.id,
  };

  useEffect(() => {
    setSourceCode(coding?.starterCode ?? "");
    setRunResult(null);
    setSubmission(null);
    setError("");
    setActiveTab("testcases");
    setShowResetConfirm(false);
  }, [attemptId, question.id, coding?.starterCode]);

  const busy = running || submitting;

  const handleRun = useCallback(async () => {
    if (inFlightRef.current || disabled) return;

    if (!sourceCode.trim()) {
      setError("Enter your solution before running the code.");
      return;
    }

    inFlightRef.current = true;
    setRunning(true);
    setError("");
    setRunResult(null);
    setActiveTab("results");

    const currentAttemptId = attemptId;
    const currentQuestionId = question.id;

    try {
      const result = await runAssessmentCode(
        currentAttemptId,
        currentQuestionId,
        { sourceCode }
      );

      if (
        contextRef.current.attemptId === currentAttemptId &&
        contextRef.current.questionId === currentQuestionId
      ) {
        setRunResult(result);
      }
    } catch (err: unknown) {
      if (
        contextRef.current.attemptId === currentAttemptId &&
        contextRef.current.questionId === currentQuestionId
      ) {
        setError(
          getErrorMessage(err, "Could not run the code.")
        );
      }
    } finally {
      inFlightRef.current = false;
      setRunning(false);
    }
  }, [attemptId, question.id, sourceCode, disabled]);

  const handleSubmitCode = useCallback(async () => {
    if (inFlightRef.current || disabled) return;

    if (!sourceCode.trim()) {
      setError("Enter your solution before submitting.");
      return;
    }

    inFlightRef.current = true;
    setSubmitting(true);
    setError("");
    setSubmission(null);
    setActiveTab("results");

    const currentAttemptId = attemptId;
    const currentQuestionId = question.id;

    try {
      const result = await submitAssessmentCode(
        currentAttemptId,
        currentQuestionId,
        { sourceCode }
      );

      if (
        contextRef.current.attemptId === currentAttemptId &&
        contextRef.current.questionId === currentQuestionId
      ) {
        setSubmission(result);
        onSubmitted();
      }
    } catch (err: unknown) {
      if (
        contextRef.current.attemptId === currentAttemptId &&
        contextRef.current.questionId === currentQuestionId
      ) {
        setError(
          getErrorMessage(err, "Could not submit the code.")
        );
      }
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  }, [
    attemptId,
    question.id,
    sourceCode,
    disabled,
    onSubmitted,
  ]);

  const runRef = useRef(handleRun);
  const submitRef = useRef(handleSubmitCode);

  useEffect(() => {
    runRef.current = handleRun;
    submitRef.current = handleSubmitCode;
  }, [handleRun, handleSubmitCode]);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => {
        void runRef.current();
      }
    );

    editor.addCommand(
      monaco.KeyMod.CtrlCmd |
        monaco.KeyMod.Shift |
        monaco.KeyCode.Enter,
      () => {
        void submitRef.current();
      }
    );
  };

  const resetCode = () => {
    if (disabled || busy) return;

    setSourceCode(coding?.starterCode ?? "");
    setRunResult(null);
    setSubmission(null);
    setError("");
    setActiveTab("testcases");
    setShowResetConfirm(false);

    editorRef.current?.focus();
  };

  if (!coding) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        Coding configuration is unavailable for this question.
      </div>
    );
  }

  const language = formatLanguage(coding.language);
  const darkMode = theme === "vs-dark";

  return (
    <div className="min-w-0 space-y-4">
      {/* WORKSPACE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1256AF]">
            <Code2 size={20} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              TRAILBLIZ NEW EDITOR V2.
            </h2>
            <p className="text-xs text-slate-500">
              Write, test, and submit your solution
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
          <Code2 size={14} />
          {language}
        </span>
      </div>

      {/* MAIN WORKSPACE */}
      <div
        className={`grid min-w-0 gap-4 ${
          editorExpanded
            ? "grid-cols-1"
            : "grid-cols-1 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        }`}
      >
        {/* LEFT PANEL */}
        {!editorExpanded && (
          <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 py-3">
              <h3 className="text-sm font-bold text-slate-900">
                Problem details
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Review the constraints and sample cases
              </p>
            </div>

            <div className="max-h-[650px] space-y-5 overflow-y-auto p-4">
              {coding.constraintsText && (
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Constraints
                  </h4>

                  <pre className="whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-700">
                    {coding.constraintsText}
                  </pre>
                </div>
              )}

              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sample test cases
                </h4>

                {coding.sampleTestCases.length > 0 ? (
                  <div className="space-y-3">
                    {coding.sampleTestCases.map(
                      (testCase, index) => (
                        <div
                          key={testCase.id}
                          className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">
                              Example {index + 1}
                            </span>

                            <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-500">
                              Sample
                            </span>
                          </div>

                          <CodeBox
                            label="Input"
                            value={
                              testCase.inputData ||
                              "(no input)"
                            }
                          />

                          <CodeBox
                            label="Expected output"
                            value={testCase.expectedOutput}
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No sample test cases available.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* RIGHT PANEL */}
        <section className="min-w-0 overflow-hidden rounded-xl border border-slate-700 bg-[#1e1e1e]">
          {/* EDITOR TOOLBAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-[#252526] px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <Terminal size={16} />
              {fileName(coding.language)}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setTheme(
                    darkMode ? "vs" : "vs-dark"
                  )
                }
                title={
                  darkMode
                    ? "Switch to light theme"
                    : "Switch to dark theme"
                }
                aria-label="Toggle editor theme"
                className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-700"
              >
                {darkMode ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )}
              </button>

              <div className="flex items-center rounded-lg border border-slate-600">
                <button
                  type="button"
                  onClick={() =>
                    setFontSize((size) =>
                      Math.max(12, size - 1)
                    )
                  }
                  disabled={fontSize <= 12}
                  aria-label="Decrease font size"
                  className="p-2 text-slate-300 disabled:opacity-40"
                >
                  <Minus size={14} />
                </button>

                <span className="min-w-7 text-center text-xs text-slate-300">
                  {fontSize}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setFontSize((size) =>
                      Math.min(22, size + 1)
                    )
                  }
                  disabled={fontSize >= 22}
                  aria-label="Increase font size"
                  className="p-2 text-slate-300 disabled:opacity-40"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                disabled={disabled || busy}
                title="Reset to starter code"
                aria-label="Reset code"
                className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-700 disabled:opacity-40"
              >
                <RotateCcw size={16} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setEditorExpanded((value) => !value)
                }
                title={
                  editorExpanded
                    ? "Show problem panel"
                    : "Expand editor"
                }
                aria-label="Toggle expanded editor"
                className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-700"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* MONACO EDITOR */}
          <div aria-label="Coding solution editor">
            <Editor
              height={editorExpanded ? "650px" : "470px"}
              language={monacoLanguage(coding.language)}
              theme={theme}
              value={sourceCode}
              onMount={handleEditorMount}
              onChange={(value) => {
                setSourceCode(value ?? "");
                setRunResult(null);
                setSubmission(null);
                setError("");
              }}
              loading={
                <div className="flex h-full items-center justify-center gap-2 text-sm text-slate-300">
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Loading code editor...
                </div>
              }
              options={{
                readOnly: disabled || busy,
                domReadOnly: disabled || busy,
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize,
                lineHeight: Math.round(fontSize * 1.6),
                fontFamily:
                  "Consolas, 'Courier New', monospace",
                fontLigatures: true,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 4,
                insertSpaces: true,
                autoIndent: "full",
                bracketPairColorization: {
                  enabled: true,
                },
                guides: {
                  indentation: true,
                  bracketPairs: true,
                },
                padding: {
                  top: 18,
                  bottom: 18,
                },
                overviewRulerBorder: false,
                renderLineHighlight: "line",
                scrollbar: {
                  verticalScrollbarSize: 9,
                  horizontalScrollbarSize: 9,
                },
                accessibilitySupport: "auto",
              }}
            />
          </div>

          {/* EDITOR STATUS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-700 bg-[#252526] px-4 py-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span>UTF-8</span>
              <span>Spaces: 4</span>
              <span>{language}</span>
            </div>

            <span>
              {sourceCode.split("\n").length} lines ·{" "}
              {sourceCode.length} characters
            </span>
          </div>
        </section>
      </div>

      {/* RUN / SUBMIT ACTIONS */}
      {!disabled && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="hidden text-xs leading-5 text-slate-500 lg:block">
            <p>Ctrl/Cmd + Enter — Run sample tests</p>
            <p>
              Ctrl/Cmd + Shift + Enter — Submit code
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-3 lg:w-auto">
            <button
              type="button"
              onClick={() => void handleRun()}
              disabled={busy || !sourceCode.trim()}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 lg:flex-none"
            >
              {running ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Play size={17} />
              )}

              {running
                ? "Running tests..."
                : "Run sample tests"}
            </button>

            <button
              type="button"
              onClick={() => void handleSubmitCode()}
              disabled={busy || !sourceCode.trim()}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#1256AF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0E4895] disabled:cursor-not-allowed disabled:opacity-50 lg:flex-none"
            >
              {submitting ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Send size={17} />
              )}

              {submitting
                ? "Submitting..."
                : "Submit code"}
            </button>
          </div>
        </div>
      )}

      {/* TEST CASES / RESULTS PANEL */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveTab("testcases")}
              className={`border-b-2 py-4 text-sm font-semibold transition ${
                activeTab === "testcases"
                  ? "border-[#1256AF] text-[#1256AF]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Test cases
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("results")}
              className={`border-b-2 py-4 text-sm font-semibold transition ${
                activeTab === "results"
                  ? "border-[#1256AF] text-[#1256AF]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Test results
            </button>
          </div>

          <ChevronDown
            size={16}
            className="text-slate-400"
          />
        </div>

        <div className="min-w-0 p-4">
          {activeTab === "testcases" ? (
            <div className="space-y-4">
              {coding.sampleTestCases.length > 0 ? (
                coding.sampleTestCases.map(
                  (testCase, index) => (
                    <div
                      key={testCase.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <h4 className="mb-3 text-sm font-bold text-slate-800">
                        Test case {index + 1}
                      </h4>

                      <div className="grid gap-3 md:grid-cols-2">
                        <CodeBox
                          label="Input"
                          value={
                            testCase.inputData ||
                            "(no input)"
                          }
                        />

                        <CodeBox
                          label="Expected output"
                          value={testCase.expectedOutput}
                        />
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="text-sm text-slate-500">
                  No sample test cases available.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {busy && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800"
                >
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />

                  <span>
                    {running
                      ? "Executing your code against sample tests..."
                      : "Evaluating your submission against all test cases..."}
                  </span>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  <TriangleAlert
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="break-words">
                    {error}
                  </span>
                </div>
              )}

              {runResult && (
                <ExecutionResult result={runResult} />
              )}

              {submission && (
                <section
                  role="status"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Code submitted
                      </h3>

                      <p className="mt-1 text-sm text-slate-600">
                        {submission.passedTestCases} of{" "}
                        {submission.totalTestCases} test cases
                        passed.
                      </p>
                    </div>

                    <div className="text-right">
                      <StatusBadge
                        status={submission.status}
                      />

                      <p className="mt-2 text-sm font-bold text-slate-900">
                        {submission.awardedMarks} /{" "}
                        {question.marks} marks
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-xs font-medium text-slate-600">
                      <span>Tests passed</span>

                      <span>
                        {submission.passedTestCases}/
                        {submission.totalTestCases}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{
                          width: `${
                            submission.totalTestCases > 0
                              ? Math.min(
                                  100,
                                  (submission.passedTestCases /
                                    submission.totalTestCases) *
                                    100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Hidden test inputs and outputs are not
                    displayed.
                  </p>
                </section>
              )}

              {!busy &&
                !error &&
                !runResult &&
                !submission && (
                  <div className="py-8 text-center">
                    <Terminal
                      size={28}
                      className="mx-auto mb-3 text-slate-400"
                    />

                    <p className="text-sm font-semibold text-slate-700">
                      No execution results yet
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Run your solution to see test results.
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>
      </section>

      {/* RESET CONFIRMATION */}
      {showResetConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-code-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <RotateCcw size={22} />
            </div>

            <h3
              id="reset-code-title"
              className="text-lg font-bold text-slate-900"
            >
              Reset your code?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This will replace your current solution with
              the original starter code. Your unsaved
              changes will be lost.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowResetConfirm(false)
                }
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={resetCode}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Reset code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
