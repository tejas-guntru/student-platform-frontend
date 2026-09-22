import {
  Check,
  Circle,
  CircleX,
} from "lucide-react";

import type {
  ApplicationStatus,
} from "@/types/application";

import {
  formatAdminApplicationStatus,
} from "@/utils/adminApplicationUtils";

interface ApplicationProgressProps {
  status: ApplicationStatus;
}

const adminApplicationFlow:
  ApplicationStatus[] = [
    "APPLIED",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "RESUME_REQUESTED",
    "RESUME_SUBMITTED",
    "FORWARDED_TO_EMPLOYER",
    "SELECTED",
  ];

export default function ApplicationProgress({
  status,
}: ApplicationProgressProps) {
  // =========================================================
  // REJECTED
  // =========================================================

  if (status === "REJECTED") {
    return (
      <div
        className="
          mt-5
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-red-200
          bg-red-50
          px-4
          py-4
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
            bg-red-100
            text-red-600
          "
        >
          <CircleX size={17} />
        </div>

        <div>
          <p
            className="
              text-sm
              font-bold
              text-red-700
            "
          >
            Application rejected
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-red-600/80
            "
          >
            This application has been closed and will not
            continue through the hiring workflow.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // CURRENT STEP
  // =========================================================

  const currentIndex =
    adminApplicationFlow.indexOf(
      status
    );

  // =========================================================
  // PROGRESS
  // =========================================================

  return (
    <div className="mt-5">
      <div
        className="
          overflow-x-auto
          pb-2
        "
      >
        <div
          className="
            flex
            min-w-[940px]
            items-start
            px-2
          "
        >
          {adminApplicationFlow.map(
            (step, index) => {
              const complete =
                index < currentIndex;

              const current =
                index === currentIndex;

              const reached =
                index <= currentIndex;

              return (
                <div
                  key={step}
                  className="
                    relative
                    flex
                    flex-1
                    flex-col
                    items-center
                  "
                >
                  {/* =========================================
                      CONNECTOR LINE
                  ========================================= */}

                  {index <
                    adminApplicationFlow.length -
                      1 && (
                    <div
                      className="
                        absolute
                        left-1/2
                        top-[18px]
                        h-[3px]
                        w-full
                        overflow-hidden
                        bg-[#E1EBF3]
                      "
                    >
                      <div
                        className={`
                          h-full
                          transition-all
                          duration-500

                          ${
                            index <
                            currentIndex
                              ? "w-full bg-gradient-to-r from-[#0877E8] to-[#38BDF8]"
                              : "w-0"
                          }
                        `}
                      />
                    </div>
                  )}

                  {/* =========================================
                      STEP
                  ========================================= */}

                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      transition-all
                      duration-300

                      ${
                        complete
                          ? `
                            border-[#1294F2]
                            bg-[#0877E8]
                            text-white
                            shadow-[0_5px_16px_rgba(8,119,232,0.18)]
                          `
                          : current
                            ? `
                              border-[#0877E8]
                              bg-white
                              text-[#0877E8]
                              ring-4
                              ring-[#0877E8]/10
                              shadow-[0_5px_18px_rgba(8,119,232,0.16)]
                            `
                            : `
                              border-[#D5E3ED]
                              bg-[#F8FBFD]
                              text-[#A1B3C1]
                            `
                      }
                    `}
                  >
                    {complete ? (
                      <Check
                        size={15}
                        strokeWidth={3}
                      />
                    ) : current ? (
                      <Circle
                        size={11}
                        fill="currentColor"
                      />
                    ) : (
                      <span
                        className="
                          text-[10px]
                          font-bold
                        "
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* =========================================
                      LABEL
                  ========================================= */}

                  <p
                    className={`
                      mt-3
                      max-w-[115px]
                      text-center
                      text-[10px]
                      font-semibold
                      leading-4
                      transition-colors

                      ${
                        current
                          ? "text-[#0877E8]"
                          : reached
                            ? "text-[#52718A]"
                            : "text-[#A0B1BF]"
                      }
                    `}
                  >
                    {formatAdminApplicationStatus(
                      step
                    )}
                  </p>

                  {/* CURRENT BADGE */}

                  {current && (
                    <span
                      className="
                        mt-2
                        rounded-full
                        border
                        border-[#CBE5F8]
                        bg-[#EFF8FF]
                        px-2
                        py-1
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-[#0877E8]
                      "
                    >
                      Current
                    </span>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* =====================================================
          CURRENT STATUS SUMMARY
      ===================================================== */}

      <div
        className="
          mt-4
          flex
          flex-col
          gap-2
          rounded-2xl
          border
          border-[#DFEBF4]
          bg-[#F8FCFF]
          px-4
          py-3

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <span
          className="
            text-xs
            text-[#8095A7]
          "
        >
          Current stage
        </span>

        <span
          className="
            text-xs
            font-bold
            text-[#0877E8]
          "
        >
          {formatAdminApplicationStatus(
            status
          )}
        </span>
      </div>
    </div>
  );
}