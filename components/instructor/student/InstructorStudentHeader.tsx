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
    <section className="min-w-0">
      {/* BACK */}

      <Link
        href={`/instructor/batches/${batchId}`}
        className="
          inline-flex
          min-h-10
          items-center
          gap-2
          rounded-lg
          text-sm
          font-semibold
          text-slate-500
          transition-colors

          hover:text-[#1256AF]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#1256AF]/25
          focus-visible:ring-offset-2
        "
      >
        <ArrowLeft
          size={16}
          className="shrink-0"
          aria-hidden="true"
        />

        <span>Back to Batch</span>
      </Link>

      {/* STUDENT HEADER */}

      <div
        className="
          mt-4
          min-w-0
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4

          sm:mt-5
          sm:rounded-3xl
          sm:p-6

          lg:p-8
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-col
            gap-5

            md:flex-row
            md:items-start
            md:justify-between
            md:gap-6
          "
        >
          {/* IDENTITY */}

          <div
            className="
              flex
              min-w-0
              flex-1
              items-start
              gap-3

              sm:gap-4
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
                rounded-xl
                bg-blue-50
                text-sm
                font-bold
                text-[#1256AF]

                sm:h-14
                sm:w-14
                sm:rounded-2xl
              "
              aria-hidden="true"
            >
              {initials || (
                <UserRound size={22} />
              )}
            </div>

            <div
              className="
                min-w-0
                flex-1
              "
            >
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

              {/* CONTACT DETAILS */}

              <div
                className="
                  mt-3
                  flex
                  min-w-0
                  flex-col
                  gap-2
                  text-sm
                  text-slate-500

                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-x-5
                  sm:gap-y-2
                "
              >
                <span
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-1.5

                    sm:items-center
                  "
                >
                  <Mail
                    size={14}
                    className="
                      mt-0.5
                      shrink-0

                      sm:mt-0
                    "
                    aria-hidden="true"
                  />

                  <span
                    className="
                      min-w-0
                      break-all
                    "
                  >
                    {student.email}
                  </span>
                </span>

                {student.city && (
                  <span
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-1.5

                      sm:items-center
                    "
                  >
                    <MapPin
                      size={14}
                      className="
                        mt-0.5
                        shrink-0

                        sm:mt-0
                      "
                      aria-hidden="true"
                    />

                    <span className="break-words">
                      {student.city}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* EDUCATION TAGS */}

          <div
            className="
              flex
              min-w-0
              flex-wrap
              gap-2

              md:max-w-sm
              md:justify-end
            "
          >
            {student.degree && (
              <StudentTag>
                <GraduationCap
                  size={13}
                  className="shrink-0"
                  aria-hidden="true"
                />

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

        {/* BIO */}

        {student.bio && (
          <div
            className="
              mt-5
              min-w-0
              border-t
              border-slate-100
              pt-5

              sm:mt-6
            "
          >
            <p
              className="
                max-w-3xl
                whitespace-pre-wrap
                break-words
                text-sm
                leading-6
                text-slate-600

                [overflow-wrap:anywhere]
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
        min-w-0
        max-w-full
        items-center
        gap-1.5
        rounded-full
        bg-slate-100
        px-3
        py-1.5
        text-xs
        font-semibold
        leading-5
        text-slate-600
      "
    >
      <span
        className="
          min-w-0
          max-w-full
          break-words
        "
      >
        {children}
      </span>
    </span>
  );
}