import {
  BookOpen,
  Plus,
} from "lucide-react";

import CreateLessonForm from "./CreateLessonForm";
import CourseLessonList from "./CourseLessonList";

import type {
  CourseModuleResponse,
  LessonResponse,
  LessonType,
} from "@/types/course";

interface CourseModuleCardProps {
  module: CourseModuleResponse;
  lessons: LessonResponse[];
  moduleNumber: number;

  editable: boolean;
  lessonFormOpen: boolean;

  lessonTitle: string;
  lessonContent: string;
  lessonType: LessonType;
  resourceUrl: string;
  creatingLesson: boolean;

  onOpenLessonForm: (
    moduleId: string
  ) => void;

  onCloseLessonForm: () => void;

  onLessonTitleChange: (
    value: string
  ) => void;

  onLessonContentChange: (
    value: string
  ) => void;

  onLessonTypeChange: (
    value: LessonType
  ) => void;

  onResourceUrlChange: (
    value: string
  ) => void;

  onCreateLesson: () => void;
}

export default function CourseModuleCard({
  module,
  lessons,
  moduleNumber,
  editable,
  lessonFormOpen,
  lessonTitle,
  lessonContent,
  lessonType,
  resourceUrl,
  creatingLesson,
  onOpenLessonForm,
  onCloseLessonForm,
  onLessonTitleChange,
  onLessonContentChange,
  onLessonTypeChange,
  onResourceUrlChange,
  onCreateLesson,
}: CourseModuleCardProps) {
  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      <header
        className="
          border-b
          border-slate-100
          p-5
          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div
            className="
              flex
              min-w-0
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-[#1256AF]
              "
            >
              <BookOpen size={19} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#1256AF]
                "
              >
                Module {moduleNumber}
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-bold
                  text-slate-950
                "
              >
                {module.title}
              </h2>

              {module.description && (
                <p
                  className="
                    mt-2
                    max-w-3xl
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  {module.description}
                </p>
              )}

              <p
                className="
                  mt-3
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                {lessons.length}{" "}
                {lessons.length === 1
                  ? "lesson"
                  : "lessons"}
              </p>
            </div>
          </div>

          {editable &&
            !lessonFormOpen && (
              <button
                type="button"
                onClick={() =>
                  onOpenLessonForm(
                    module.id
                  )
                }
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-[#1256AF]
                "
              >
                <Plus size={15} />
                Add Lesson
              </button>
            )}
        </div>
      </header>

      {editable &&
        lessonFormOpen && (
          <CreateLessonForm
            title={lessonTitle}
            content={lessonContent}
            lessonType={lessonType}
            resourceUrl={resourceUrl}
            creating={creatingLesson}
            onTitleChange={
              onLessonTitleChange
            }
            onContentChange={
              onLessonContentChange
            }
            onLessonTypeChange={
              onLessonTypeChange
            }
            onResourceUrlChange={
              onResourceUrlChange
            }
            onSubmit={
              onCreateLesson
            }
            onCancel={
              onCloseLessonForm
            }
          />
        )}

      <CourseLessonList
        lessons={lessons}
      />
    </article>
  );
}