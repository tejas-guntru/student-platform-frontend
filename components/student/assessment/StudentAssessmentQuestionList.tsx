"use client";

import {
  FileQuestion,
} from "lucide-react";

import StudentAssessmentQuestion, {
  type StudentLocalAnswer,
} from "./StudentAssessmentQuestion";

import type {
  StudentAssessmentDetailResponse,
} from "@/types/assessment";

interface StudentAssessmentQuestionListProps {
  assessment:
    StudentAssessmentDetailResponse;

  attemptId: string;

  editable: boolean;

  answers: Record<
    string,
    StudentLocalAnswer
  >;

  savedQuestionIds: Set<string>;

  savingQuestionId: string | null;

  onUpdate: (
    questionId: string,
    changes: Partial<StudentLocalAnswer>
  ) => void;

  onSave: (
    questionId: string
  ) => void;

  onCodingSubmitted: (
    questionId: string
  ) => void;
}

export default function StudentAssessmentQuestionList({
  assessment,
  attemptId,
  editable,
  answers,
  savedQuestionIds,
  savingQuestionId,
  onUpdate,
  onSave,
  onCodingSubmitted,
}: StudentAssessmentQuestionListProps) {
  const totalQuestions =
    assessment.questions.length;

  if (totalQuestions === 0) {
    return (
      <section
        className="
          mt-6
          min-w-0
          rounded-xl
          border
          border-dashed
          border-slate-300
          bg-white
          px-4
          py-10
          text-center

          sm:mt-8
          sm:px-6
          sm:py-12
        "
      >
        <div
          className="
            mx-auto
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-500
          "
        >
          <FileQuestion
            size={20}
            aria-hidden="true"
          />
        </div>

        <h2
          className="
            mt-4
            text-base
            font-semibold
            text-slate-900
          "
        >
          No questions available
        </h2>

        <p
          className="
            mx-auto
            mt-1.5
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          This assessment does not
          currently contain any questions.
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        mt-6
        min-w-0

        sm:mt-8
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          min-w-0
          items-start
          justify-between
          gap-3

          sm:items-center
          sm:gap-4
        "
      >
        <div
          className="
            min-w-0
            flex-1
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              tracking-tight
              text-slate-950

              sm:text-xl
            "
          >
            Questions
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
            {editable
              ? "Save each answer before submitting. Coding questions use Submit Code instead."
              : "Review the questions and your submitted answers below."}
          </p>
        </div>

        <span
          className="
            inline-flex
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-sm
            font-semibold
            text-blue-800
          "
          aria-label={`${totalQuestions} ${
            totalQuestions === 1
              ? "question"
              : "questions"
          }`}
        >
          {totalQuestions}
        </span>
      </div>

      {/* QUESTIONS */}

      <div
        className="
          mt-4
          min-w-0
          space-y-4

          sm:space-y-5
        "
      >
        {assessment.questions.map(
          (question, index) => {
            const answer =
              answers[question.id] ?? {
                selectedOptionId: null,
                booleanAnswer: null,
                textAnswer: "",
              };

            return (
              <div
                key={question.id}
                className="min-w-0"
              >
                <StudentAssessmentQuestion
                  index={index}
                  question={question}
                  answer={answer}
                  attemptId={attemptId}
                  editable={editable}
                  saved={savedQuestionIds.has(
                    question.id
                  )}
                  saving={
                    savingQuestionId ===
                    question.id
                  }
                  onUpdate={onUpdate}
                  onSave={onSave}
                  onCodingSubmitted={
                    onCodingSubmitted
                  }
                />
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}