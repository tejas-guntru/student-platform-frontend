"use client";

import InstructorAssessmentQuestionCard from "./InstructorAssessmentQuestionCard";

import type {
  AssessmentQuestionResponse,
  InstructorAssessmentQuestionOptionResponse,
} from "@/types/assessment";

interface InstructorAssessmentQuestionListProps {
  questions:
    AssessmentQuestionResponse[];

  batchId: string;
  assessmentId: string;

  options: Record<
    string,
    InstructorAssessmentQuestionOptionResponse[]
  >;

  optionTextByQuestion:
    Record<string, string>;

  optionCorrectByQuestion:
    Record<string, boolean>;

  creatingOptionFor:
    string | null;

  disabled: boolean;

  onOptionTextChange: (
    questionId: string,
    value: string
  ) => void;

  onOptionCorrectChange: (
    questionId: string,
    value: boolean
  ) => void;

  onCreateOption: (
    questionId: string
  ) => void;

  onError: (
    message: string
  ) => void;

  onMessage: (
    message: string
  ) => void;

  onAuthFailure: () => void;
}

export default function InstructorAssessmentQuestionList({
  questions,
  batchId,
  assessmentId,
  options,
  optionTextByQuestion,
  optionCorrectByQuestion,
  creatingOptionFor,
  disabled,
  onOptionTextChange,
  onOptionCorrectChange,
  onCreateOption,
  onError,
  onMessage,
  onAuthFailure,
}: InstructorAssessmentQuestionListProps) {
  return (
    <section
      className="
        mt-8
        min-w-0
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
              break-words
              text-lg
              font-semibold
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
            Configure assessment questions
            and their answer rules.
          </p>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-sm
            font-semibold
            text-blue-800
          "
          aria-label={`${questions.length} questions`}
        >
          {questions.length}
        </span>
      </div>

      {/* QUESTIONS */}

      {questions.length === 0 ? (
        <div
          className="
            mt-4
            flex
            min-h-[150px]
            min-w-0
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-slate-300
            bg-white
            p-5
            text-center
            text-sm
            leading-6
            text-slate-500

            sm:min-h-[170px]
            sm:p-8
          "
        >
          No questions have been added yet.
        </div>
      ) : (
        <div
          className="
            mt-4
            min-w-0
            space-y-4

            sm:space-y-5
          "
        >
          {questions.map(
            (question, index) => (
              <InstructorAssessmentQuestionCard
                key={question.id}
                index={index}
                question={question}
                batchId={batchId}
                assessmentId={
                  assessmentId
                }
                options={
                  options[
                    question.id
                  ] ?? []
                }
                optionText={
                  optionTextByQuestion[
                    question.id
                  ] ?? ""
                }
                optionCorrect={
                  optionCorrectByQuestion[
                    question.id
                  ] ?? false
                }
                creatingOption={
                  creatingOptionFor ===
                  question.id
                }
                disabled={disabled}
                onOptionTextChange={(
                  value
                ) =>
                  onOptionTextChange(
                    question.id,
                    value
                  )
                }
                onOptionCorrectChange={(
                  value
                ) =>
                  onOptionCorrectChange(
                    question.id,
                    value
                  )
                }
                onCreateOption={() =>
                  onCreateOption(
                    question.id
                  )
                }
                onError={onError}
                onMessage={
                  onMessage
                }
                onAuthFailure={
                  onAuthFailure
                }
              />
            )
          )}
        </div>
      )}
    </section>
  );
}