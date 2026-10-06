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
        scroll-mt-24
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
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
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

          <div>
            <h2
              className="
                text-lg
                font-bold
                text-slate-950
              "
            >
              Students
            </h2>

            <p
              className="
                mt-1
                text-sm
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
        >
          {members.length}
        </span>
      </div>

      {members.length === 0 ? (
        <div
          className="
            mt-5
            rounded-xl
            border
            border-dashed
            border-slate-200
            bg-slate-50
            px-5
            py-8
            text-center
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
              mt-1
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
        <div
          className="
            mt-5
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
                  items-center
                  justify-between
                  gap-4
                  py-4
                  first:pt-0
                  last:pb-0
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  "
                >
                  <StudentAvatar
                    name={
                      member.studentName
                    }
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
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
                        truncate
                        text-xs
                        text-slate-500
                      "
                    >
                      {
                        member.studentEmail
                      }
                    </p>

                    <p
                      className="
                        mt-1.5
                        text-[11px]
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

                  <ArrowRight
                    size={15}
                    className="
                      transition-transform

                      group-hover:translate-x-1
                    "
                  />
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
    >
      {initials || "ST"}
    </div>
  );
}
