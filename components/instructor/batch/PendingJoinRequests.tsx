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
              bg-amber-50
              text-amber-700
            "
          >
            <UserPlus size={18} />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-bold
                text-slate-950
              "
            >
              Pending Requests
            </h2>

            <p
              className="
                mt-1
                text-sm
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
        >
          {requests.length}
        </span>
      </div>

      {requests.length === 0 ? (
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
              text-slate-400
            "
          >
            There are no pending join
            requests.
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
                    py-4
                    first:pt-0
                    last:pb-0
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
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
                          request.studentName
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
                            request.studentName
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
                            request.studentEmail
                          }
                        </p>

                        <div
                          className="
                            mt-1.5
                            flex
                            items-center
                            gap-1.5
                            text-[11px]
                            text-slate-400
                          "
                        >
                          <Clock3
                            size={11}
                          />

                          Requested{" "}
                          {new Date(
                            request.requestedAt
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div
                      className="
                        flex
                        shrink-0
                        gap-2
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
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          border
                          border-red-200
                          px-3.5
                          py-2
                          text-xs
                          font-semibold
                          text-red-700
                          transition-colors

                          hover:bg-red-50

                          disabled:cursor-not-allowed
                          disabled:opacity-50

                          sm:flex-none
                        "
                      >
                        <X size={14} />

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
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-[#1256AF]
                          px-3.5
                          py-2
                          text-xs
                          font-semibold
                          text-white
                          transition-colors

                          hover:bg-[#0F4B99]

                          disabled:cursor-not-allowed
                          disabled:opacity-50

                          sm:flex-none
                        "
                      >
                        <Check
                          size={14}
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
    >
      {initials || "ST"}
    </div>
  );
}
