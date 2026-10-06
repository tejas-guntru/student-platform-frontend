import {
  LockKeyhole,
} from "lucide-react";

import type {
  CourseResponse,
} from "@/types/course";

interface CourseLockedNoticeProps {
  status: CourseResponse["status"];
}

export default function CourseLockedNotice({
  status,
}: CourseLockedNoticeProps) {
  return (
    <section
      className="
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        sm:p-6
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-500
        "
      >
        <LockKeyhole size={18} />
      </div>

      <div>
        <h2
          className="
            font-bold
            text-slate-950
          "
        >
          Course content locked
        </h2>

        <p
          className="
            mt-1
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
          "
        >
          This course is{" "}
          <span
            className="
              font-semibold
              text-slate-700
            "
          >
            {formatEnum(status)}
          </span>
          . The current backend allows
          modules and lessons to be modified
          only while the course is in draft
          status.
        </p>
      </div>
    </section>
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