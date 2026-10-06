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
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">
            Questions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure assessment
            questions and their answer
            rules.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {questions.length}
        </span>
      </div>

      {questions.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No questions have been added
          yet.
        </div>
      ) : (
        <div className="mt-4 space-y-5">
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