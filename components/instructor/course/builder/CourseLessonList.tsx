import {
  ExternalLink,
  FileText,
} from "lucide-react";

import type {
  LessonResponse,
} from "@/types/course";

interface CourseLessonListProps {
  lessons: LessonResponse[];
}

export default function CourseLessonList({
  lessons,
}: CourseLessonListProps) {
  const orderedLessons = [
    ...lessons,
  ].sort(
    (a, b) =>
      a.position - b.position
  );

  if (orderedLessons.length === 0) {
    return (
      <div
        className="
          flex
          min-w-0
          items-start
          gap-3
          px-4
          py-5
          text-sm
          leading-6
          text-slate-500

          sm:items-center
          sm:px-6
          sm:py-6
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-400
          "
        >
          <FileText
            size={16}
            aria-hidden="true"
          />
        </div>

        <p
          className="
            min-w-0
            break-words
          "
        >
          No lessons in this module yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {orderedLessons.map(
        (lesson, index) => (
          <article
            key={lesson.id}
            className="
              min-w-0
              border-b
              border-slate-100
              p-4
              last:border-b-0

              sm:p-6
            "
          >
            <div
              className="
                flex
                min-w-0
                items-start
                gap-3

                sm:gap-4
              "
            >
              {/* LESSON NUMBER */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-slate-100
                  text-xs
                  font-bold
                  text-slate-600

                  sm:h-9
                  sm:w-9
                  sm:rounded-xl
                  sm:text-sm
                "
                aria-label={`Lesson ${index + 1}`}
              >
                {index + 1}
              </div>

              {/* LESSON DETAILS */}

              <div
                className="
                  min-w-0
                  flex-1
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
                  <h3
                    className="
                      min-w-0
                      break-words
                      font-semibold
                      leading-6
                      text-slate-900
                    "
                  >
                    {lesson.title}
                  </h3>

                  <span
                    className="
                      inline-flex
                      w-fit
                      shrink-0
                      items-center
                      rounded-full
                      bg-blue-50
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-[#1256AF]
                    "
                  >
                    {formatEnum(
                      lesson.lessonType
                    )}
                  </span>
                </div>

                {/* CONTENT */}

                {lesson.content && (
                  <p
                    className="
                      mt-3
                      max-w-full
                      whitespace-pre-wrap
                      break-words
                      text-sm
                      leading-6
                      text-slate-600

                      sm:leading-7

                      [overflow-wrap:anywhere]
                    "
                  >
                    {lesson.content}
                  </p>
                )}

                {/* RESOURCE */}

                {lesson.resourceUrl && (
                  <a
                    href={
                      lesson.resourceUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-4
                      inline-flex
                      min-h-10
                      max-w-full
                      items-center
                      gap-2
                      rounded-lg
                      text-sm
                      font-semibold
                      text-[#1256AF]
                      transition

                      hover:underline

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#1256AF]/25
                      focus-visible:ring-offset-2
                    "
                  >
                    <ExternalLink
                      size={14}
                      className="shrink-0"
                      aria-hidden="true"
                    />

                    <span className="break-words">
                      Open resource
                    </span>

                    <span className="sr-only">
                      {" "}
                      for {lesson.title}
                      {" "}
                      (opens in a new tab)
                    </span>
                  </a>
                )}
              </div>
            </div>
          </article>
        )
      )}
    </div>
  );
}

function formatEnum(
  value: string
) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}