import {
  Check,
  Clock3,
  UserPlus,
  X,
} from "lucide-react";

import type {
  PendingBatchJoinRequestResponse,
} from "@/types/batch";

interface PendingJoinRequestsProps {
  requests: PendingBatchJoinRequestResponse[];
  processingId: string | null;
  onApprove: (
    requestId: string
  ) => void | Promise<void>;
  onReject: (
    requestId: string
  ) => void | Promise<void>;
}

export default function PendingJoinRequests({
  requests,
  processingId,
  onApprove,
  onReject,
}: PendingJoinRequestsProps) {
  return (
    <section
      id="join-requests"
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
              bg-amber-50
              text-amber-700
            "
          >
            <UserPlus size={18} />
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
              Pending Requests
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
              Review students waiting to
              join this batch.
            </p>
          </div>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            bg-amber-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-amber-700
          "
          aria-label={`${requests.length} pending requests`}
        >
          {requests.length}
        </span>
      </div>

      {/* EMPTY STATE */}

      {requests.length === 0 ? (
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
            <Check size={18} />
          </div>

          <p
            className="
              mt-3
              text-sm
              font-semibold
              text-slate-700
            "
          >
            You&apos;re all caught up
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-400
            "
          >
            There are no pending join
            requests.
          </p>
        </div>
      ) : (
        /* REQUEST LIST */

        <div
          className="
            mt-5
            min-w-0
            divide-y
            divide-slate-100
          "
        >
          {requests.map(
            (request) => {
              const processing =
                processingId ===
                request.requestId;

              return (
                <div
                  key={
                    request.requestId
                  }
                  className="
                    min-w-0
                    py-4
                    first:pt-0
                    last:pb-0
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    {/* STUDENT */}

                    <div
                      className="
                        flex
                        min-w-0
                        items-start
                        gap-3

                        sm:items-center
                      "
                    >
                      <StudentAvatar
                        name={
                          request.studentName
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
                            request.studentName
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
                            request.studentEmail
                          }
                        >
                          {
                            request.studentEmail
                          }
                        </p>

                        <div
                          className="
                            mt-1.5
                            flex
                            min-w-0
                            items-start
                            gap-1.5
                            text-[11px]
                            leading-4
                            text-slate-400
                          "
                        >
                          <Clock3
                            size={11}
                            className="
                              mt-0.5
                              shrink-0
                            "
                          />

                          <span className="break-words">
                            Requested{" "}
                            {new Date(
                              request.requestedAt
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                        flex
                        w-full
                        min-w-0
                        gap-2

                        sm:w-auto
                        sm:shrink-0
                      "
                    >
                      <button
                        type="button"
                        disabled={
                          processing
                        }
                        onClick={() =>
                          onReject(
                            request.requestId
                          )
                        }
                        className="
                          inline-flex
                          min-h-10
                          min-w-0
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          border
                          border-red-200
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-red-700
                          transition-colors

                          hover:bg-red-50

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-red-200
                          focus-visible:ring-offset-2

                          disabled:cursor-not-allowed
                          disabled:opacity-50

                          sm:flex-none
                          sm:px-3.5
                        "
                      >
                        <X
                          size={14}
                          className="shrink-0"
                        />

                        Reject
                      </button>

                      <button
                        type="button"
                        disabled={
                          processing
                        }
                        onClick={() =>
                          onApprove(
                            request.requestId
                          )
                        }
                        className="
                          inline-flex
                          min-h-10
                          min-w-0
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-[#1256AF]
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-white
                          transition-colors

                          hover:bg-[#0F4B99]

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#1256AF]/30
                          focus-visible:ring-offset-2

                          disabled:cursor-not-allowed
                          disabled:opacity-50

                          sm:flex-none
                          sm:px-3.5
                        "
                      >
                        <Check
                          size={14}
                          className="shrink-0"
                        />

                        {processing
                          ? "Processing..."
                          : "Approve"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
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
        bg-slate-100
        text-xs
        font-bold
        text-slate-600
      "
      aria-hidden="true"
    >
      {initials || "ST"}
    </div>
  );
}