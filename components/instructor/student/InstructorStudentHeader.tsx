import Link from "next/link";

import {
  ArrowLeft,
  GraduationCap,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface InstructorStudentHeaderProps {
  batchId: string;
  student: InstructorStudentOverviewResponse;
}

export default function InstructorStudentHeader({
  batchId,
  student,
}: InstructorStudentHeaderProps) {
  const initials = student.fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("");

  return (
    <section>
      <Link
        href={`/instructor/batches/${batchId}`}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-500
          transition-colors

          hover:text-[#1256AF]
        "
      >
        <ArrowLeft size={16} />
        Back to Batch
      </Link>

      <div
        className="
          mt-5
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6

          sm:p-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6

            md:flex-row
            md:items-start
            md:justify-between
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
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-sm
                font-bold
                text-[#1256AF]
              "
            >
              {initials || (
                <UserRound size={22} />
              )}
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#1256AF]
                "
              >
                Student Overview
              </p>

              <h1
                className="
                  mt-2
                  break-words
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-950

                  sm:text-3xl
                "
              >
                {student.fullName}
              </h1>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-2
                  text-sm
                  text-slate-500
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                  "
                >
                  <Mail size={14} />
                  {student.email}
                </span>

                {student.city && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                    "
                  >
                    <MapPin size={14} />
                    {student.city}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-2

              md:max-w-sm
              md:justify-end
            "
          >
            {student.degree && (
              <StudentTag>
                <GraduationCap size={13} />
                {student.degree}
              </StudentTag>
            )}

            {student.branch && (
              <StudentTag>
                {student.branch}
              </StudentTag>
            )}

            {student.graduationYear && (
              <StudentTag>
                Class of{" "}
                {student.graduationYear}
              </StudentTag>
            )}
          </div>
        </div>

        {student.bio && (
          <div
            className="
              mt-6
              border-t
              border-slate-100
              pt-5
            "
          >
            <p
              className="
                max-w-3xl
                whitespace-pre-wrap
                text-sm
                leading-6
                text-slate-600
              "
            >
              {student.bio}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function StudentTag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        bg-slate-100
        px-3
        py-1.5
        text-xs
        font-semibold
        text-slate-600
      "
    >
      {children}
    </span>
  );
}