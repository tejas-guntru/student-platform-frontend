import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Layers3,
} from "lucide-react";

import type {
  BatchResponse,
} from "@/types/batch";

interface BatchWorkspaceHeaderProps {
  batch: BatchResponse;
  copied: boolean;
  onCopyJoinCode: () => void;
}

export default function BatchWorkspaceHeader({
  batch,
  copied,
  onCopyJoinCode,
}: BatchWorkspaceHeaderProps) {
  return (
    <section>
      <Link
        href="/instructor"
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

        My Batches
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

            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* BATCH INFO */}

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
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-[#1256AF]
              "
            >
              <Layers3 size={22} />
            </div>

            <div className="min-w-0">
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <h1
                  className="
                    break-words
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-950

                    sm:text-3xl
                  "
                >
                  {batch.name}
                </h1>

                <BatchStatus
                  status={batch.status}
                />
              </div>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-600

                  sm:text-base
                "
              >
                {batch.description ||
                  "Manage students, learning activities and progress for this batch."}
              </p>
            </div>
          </div>

          {/* JOIN CODE */}

          <div
            className="
              shrink-0
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4

              sm:min-w-[230px]
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Student Join Code
            </p>

            <div
              className="
                mt-2
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <p
                className="
                  font-mono
                  text-xl
                  font-bold
                  tracking-[0.14em]
                  text-slate-950
                "
              >
                {batch.joinCode}
              </p>

              <button
                type="button"
                onClick={onCopyJoinCode}
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-xs
                  font-semibold
                  text-slate-600
                  transition-colors

                  hover:border-blue-200
                  hover:text-[#1256AF]
                "
              >
                {copied ? (
                  <>
                    <CheckCircle2
                      size={14}
                    />

                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />

                    Copy
                  </>
                )}
              </button>
            </div>

            <p
              className="
                mt-2
                text-xs
                leading-5
                text-slate-400
              "
            >
              Share this code with students
              who should request access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BatchStatus({
  status,
}: {
  status: BatchResponse["status"];
}) {
  const styles =
    status === "ACTIVE"
      ? "bg-green-50 text-green-700"
      : status === "COMPLETED"
        ? "bg-blue-50 text-blue-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-bold
        uppercase
        tracking-wide
        ${styles}
      `}
    >
      {status}
    </span>
  );
}
