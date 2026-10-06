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
          items-center
          gap-3
          px-5
          py-6
          text-sm
          text-slate-500
          sm:px-6
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
          <FileText size={16} />
        </div>

        No lessons in this module yet.
      </div>
    );
  }

  return (
    <div>
      {orderedLessons.map(
        (lesson, index) => (
          <article
            key={lesson.id}
            className="
              border-b
              border-slate-100
              p-5
              last:border-b-0
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-start
                gap-4
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
                  text-sm
                  font-bold
                  text-slate-600
                "
              >
                {index + 1}
              </div>

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <h3
                    className="
                      font-semibold
                      text-slate-900
                    "
                  >
                    {lesson.title}
                  </h3>

                  <span
                    className="
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

                {lesson.content && (
                  <p
                    className="
                      mt-3
                      whitespace-pre-wrap
                      text-sm
                      leading-7
                      text-slate-600
                    "
                  >
                    {lesson.content}
                  </p>
                )}

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
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-[#1256AF]
                      transition
                      hover:underline
                    "
                  >
                    <ExternalLink
                      size={14}
                    />

                    Open resource
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