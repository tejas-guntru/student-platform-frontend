import Link from "next/link";

import {
  ArrowRight,
  UsersRound,
} from "lucide-react";

import type {
  BatchMemberResponse,
} from "@/types/batch";

interface BatchMembersProps {
  batchId: string;
  members: BatchMemberResponse[];
}

export default function BatchMembers({
  batchId,
  members,
}: BatchMembersProps) {
  return (
    <section
      id="students"
      className="
        min-w-0
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-6
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
            flex
            min-w-0
            items-start
            gap-3
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
              bg-blue-50
              text-[#1256AF]
            "
          >
            <UsersRound size={18} />
          </div>

          <div className="min-w-0">
            <h2
              className="
                break-words
                text-base
                font-bold
                text-slate-950

                sm:text-lg
              "
            >
              Students
            </h2>

            <p
              className="
                mt-1
                break-words
                text-sm
                leading-5
                text-slate-500
              "
            >
              Students currently enrolled
              in this batch.
            </p>
          </div>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            bg-blue-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-[#1256AF]
          "
          aria-label={`${members.length} students`}
        >
          {members.length}
        </span>
      </div>

      {/* EMPTY STATE */}

      {members.length === 0 ? (
        <div
          className="
            mt-5
            rounded-xl
            border
            border-dashed
            border-slate-200
            bg-slate-50
            px-4
            py-7
            text-center

            sm:px-5
            sm:py-8
          "
        >
          <div
            className="
              mx-auto
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              text-slate-400
            "
          >
            <UsersRound size={18} />
          </div>

          <p
            className="
              mt-3
              text-sm
              font-semibold
              text-slate-700
            "
          >
            No students yet
          </p>

          <p
            className="
              mx-auto
              mt-1
              max-w-md
              text-xs
              leading-5
              text-slate-400
            "
          >
            Share the batch join code and
            approve student requests when
            they arrive.
          </p>
        </div>
      ) : (
        /* STUDENT LIST */

        <div
          className="
            mt-5
            min-w-0
            divide-y
            divide-slate-100
          "
        >
          {members.map(
            (member) => (
              <Link
                key={
                  member.membershipId
                }
                href={`/instructor/batches/${batchId}/students/${member.studentId}`}
                className="
                  group
                  flex
                  min-w-0
                  items-center
                  justify-between
                  gap-3
                  rounded-lg
                  py-4

                  first:pt-0
                  last:pb-0

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#1256AF]/30
                  focus-visible:ring-offset-2

                  sm:gap-4
                "
              >
                {/* STUDENT INFO */}

                <div
                  className="
                    flex
                    min-w-0
                    flex-1
                    items-start
                    gap-3

                    sm:items-center
                  "
                >
                  <StudentAvatar
                    name={
                      member.studentName
                    }
                  />

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        break-words
                        text-sm
                        font-bold
                        text-slate-950
                      "
                    >
                      {
                        member.studentName
                      }
                    </p>

                    <p
                      className="
                        mt-0.5
                        max-w-full
                        truncate
                        text-xs
                        text-slate-500
                      "
                      title={
                        member.studentEmail
                      }
                    >
                      {
                        member.studentEmail
                      }
                    </p>

                    <p
                      className="
                        mt-1.5
                        break-words
                        text-[11px]
                        leading-4
                        text-slate-400
                      "
                    >
                      Joined{" "}
                      {new Date(
                        member.joinedAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* VIEW ACTION */}

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-[#1256AF]
                  "
                >
                  <span
                    className="
                      hidden
                      sm:inline
                    "
                  >
                    View Student
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                      transition-colors

                      group-hover:bg-blue-100
                    "
                  >
                    <ArrowRight
                      size={15}
                      className="
                        transition-transform
                        group-hover:translate-x-0.5
                      "
                    />
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </section>
  );
}

function StudentAvatar({
  name,
}: {
  name: string;
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) =>
      part
        .charAt(0)
        .toUpperCase()
    )
    .join("");

  return (
    <div
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-blue-50
        text-xs
        font-bold
        text-[#1256AF]
      "
      aria-hidden="true"
    >
      {initials || "ST"}
    </div>
  );
}