import {
  Layers3,
} from "lucide-react";

import CourseModuleCard from "./CourseModuleCard";

import type {
  CourseModuleResponse,
  LessonResponse,
  LessonType,
} from "@/types/course";

interface ModuleWithLessons {
  module: CourseModuleResponse;
  lessons: LessonResponse[];
}

interface CourseModuleListProps {
  modules: ModuleWithLessons[];

  editable: boolean;

  activeModuleId: string | null;

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

export default function CourseModuleList({
  modules,
  editable,
  activeModuleId,
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
}: CourseModuleListProps) {
  const orderedModules = [
    ...modules,
  ].sort(
    (a, b) =>
      a.module.position -
      b.module.position
  );

  return (
    <section className="min-w-0">
      {/* SECTION HEADER */}

      <div className="min-w-0">
        <p
          className="
            break-words
            text-xs
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#1256AF]
          "
        >
          Course Structure
        </p>

        <h2
          className="
            mt-2
            break-words
            text-xl
            font-bold
            tracking-tight
            text-slate-950

            sm:text-2xl
          "
        >
          Modules &amp; Lessons
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
          Build the course in the order
          students should work through it.
        </p>
      </div>

      {/* EMPTY STATE */}

      {orderedModules.length === 0 ? (
        <div
          className="
            mt-5
            flex
            min-w-0
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-4
            py-10
            text-center

            sm:px-6
            sm:py-12
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
              text-slate-400
            "
          >
            <Layers3
              size={21}
              aria-hidden="true"
            />
          </div>

          <h3
            className="
              mt-4
              break-words
              font-semibold
              text-slate-900
            "
          >
            No modules yet
          </h3>

          <p
            className="
              mt-1
              max-w-sm
              break-words
              text-sm
              leading-6
              text-slate-500
            "
          >
            Add your first module to
            start organizing the course
            content.
          </p>
        </div>
      ) : (
        /* MODULES */

        <div
          className="
            mt-5
            min-w-0
            space-y-4

            sm:space-y-5
          "
        >
          {orderedModules.map(
            (
              {
                module,
                lessons,
              },
              index
            ) => (
              <div
                key={module.id}
                className="min-w-0"
              >
                <CourseModuleCard
                  module={module}
                  lessons={lessons}
                  moduleNumber={
                    index + 1
                  }
                  editable={editable}
                  lessonFormOpen={
                    activeModuleId ===
                    module.id
                  }
                  lessonTitle={
                    lessonTitle
                  }
                  lessonContent={
                    lessonContent
                  }
                  lessonType={
                    lessonType
                  }
                  resourceUrl={
                    resourceUrl
                  }
                  creatingLesson={
                    creatingLesson
                  }
                  onOpenLessonForm={
                    onOpenLessonForm
                  }
                  onCloseLessonForm={
                    onCloseLessonForm
                  }
                  onLessonTitleChange={
                    onLessonTitleChange
                  }
                  onLessonContentChange={
                    onLessonContentChange
                  }
                  onLessonTypeChange={
                    onLessonTypeChange
                  }
                  onResourceUrlChange={
                    onResourceUrlChange
                  }
                  onCreateLesson={
                    onCreateLesson
                  }
                />
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}