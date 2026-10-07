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
    <section className="min-w-0">
      <Link
        href="/instructor"
        className="
          inline-flex
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
          focus-visible:ring-[#1256AF]/30
          focus-visible:ring-offset-2
        "
      >
        <ArrowLeft
          size={16}
          className="shrink-0"
        />

        My Batches
      </Link>

      <div
        className="
          mt-5
          min-w-0
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4

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
              flex-col
              gap-4

              sm:flex-row
              sm:items-start
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-[#1256AF]

                sm:h-12
                sm:w-12
                sm:rounded-2xl
              "
            >
              <Layers3 size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <div
                className="
                  flex
                  min-w-0
                  flex-wrap
                  items-center
                  gap-2

                  sm:gap-3
                "
              >
                <h1
                  className="
                    min-w-0
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
                  break-words
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
              w-full
              min-w-0
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4

              lg:w-auto
              lg:min-w-[230px]
              lg:max-w-[300px]
              lg:shrink-0
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
                mt-3
                flex
                min-w-0
                flex-col
                gap-3

                xs:flex-row
                xs:items-center
                xs:justify-between
              "
            >
              <p
                className="
                  min-w-0
                  break-all
                  font-mono
                  text-lg
                  font-bold
                  tracking-[0.12em]
                  text-slate-950

                  sm:text-xl
                  sm:tracking-[0.14em]
                "
              >
                {batch.joinCode}
              </p>

              <button
                type="button"
                onClick={onCopyJoinCode}
                className="
                  inline-flex
                  h-10
                  w-full
                  shrink-0
                  items-center
                  justify-center
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

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#1256AF]/30
                  focus-visible:ring-offset-2

                  xs:w-auto
                "
                aria-label={
                  copied
                    ? "Join code copied"
                    : "Copy student join code"
                }
              >
                {copied ? (
                  <>
                    <CheckCircle2
                      size={14}
                      className="shrink-0"
                    />

                    Copied
                  </>
                ) : (
                  <>
                    <Copy
                      size={14}
                      className="shrink-0"
                    />

                    Copy
                  </>
                )}
              </button>
            </div>

            <p
              className="
                mt-3
                break-words
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
        shrink-0
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