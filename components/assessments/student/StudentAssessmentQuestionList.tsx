"use client";

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
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">
            Questions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Save each answer before
            submitting. Coding questions
            use Submit Code instead.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {assessment.questions.length}
        </span>
      </div>

      <div className="mt-4 space-y-5">
        {assessment.questions.map(
          (question, index) => {
            const answer =
              answers[question.id] ?? {
                selectedOptionId: null,
                booleanAnswer: null,
                textAnswer: "",
              };

            return (
              <StudentAssessmentQuestion
                key={question.id}
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
            );
          }
        )}
      </div>
    </section>
  );
}