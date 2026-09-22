import {
  Check,
  Clock3,
  XCircle,
} from "lucide-react";

import type {
  ApplicationStatus,
} from "@/types/application";

import {
  applicationFlow,
  formatApplicationStatus,
} from "@/utils/applicationUtils";

interface ApplicationTimelineProps {
  status:
    ApplicationStatus;
}

export default function ApplicationTimeline({
  status,
}: ApplicationTimelineProps) {
  if (
    status === "REJECTED"
  ) {
    return (
      <div
        className="
          flex
          items-start
          gap-3
          rounded-[16px]
          border
          border-red-200
          bg-red-50/70
          px-4
          py-3.5
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-red-100
            text-red-600
          "
        >
          <XCircle
            size={15}
          />
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
              text-red-700/75
            "
          >
            This application is no longer progressing
            through the selection workflow.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex =
    applicationFlow.indexOf(
      status
    );

  return (
    <div
      className="
        overflow-x-auto
        pb-1
      "
    >
      <div
        className="
          flex
          min-w-[850px]
          items-start
        "
      >
        {applicationFlow.map(
          (
            step,
            index
          ) => {
            const complete =
              index <=
              currentIndex;

            const current =
              step === status;

            const previousComplete =
              index <
              currentIndex;

            return (
              <div
                key={step}
                className="
                  relative
                  flex
                  flex-1
                  flex-col
                  items-center
                  px-1
                "
              >
                {/* CONNECTOR */}

                {index <
                  applicationFlow.length -
                    1 && (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-[17px]
                      h-[2px]
                      w-full
                      overflow-hidden
                      bg-[#E1ECF4]
                    "
                  >
                    {previousComplete && (
                      <div
                        className="
                          h-full
                          w-full
                          bg-gradient-to-r
                          from-[#0877E8]
                          to-[#38BDF8]
                        "
                      />
                    )}
                  </div>
                )}

                {/* STEP */}

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
                    border
                    text-xs
                    font-bold
                    transition-all
                    duration-200

                    ${
                      current
                        ? `
                          border-[#0877E8]
                          bg-[#0877E8]
                          text-white
                          shadow-[0_0_0_5px_rgba(8,119,232,0.10)]
                        `
                        : complete
                          ? `
                            border-[#B9DCF2]
                            bg-[#EAF6FF]
                            text-[#0877E8]
                          `
                          : `
                            border-[#D9E6EE]
                            bg-[#F8FBFD]
                            text-[#9AAEBC]
                          `
                    }
                  `}
                >
                  {complete ? (
                    <Check
                      size={14}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Clock3
                      size={13}
                    />
                  )}
                </div>

                {/* LABEL */}

                <p
                  className={`
                    mt-3
                    max-w-28
                    text-center
                    text-[10px]
                    leading-4

                    ${
                      current
                        ? "font-bold text-[#173B63]"
                        : complete
                          ? "font-semibold text-[#58748B]"
                          : "font-medium text-[#9AAEBC]"
                    }
                  `}
                >
                  {formatApplicationStatus(
                    step
                  )}
                </p>

                {current && (
                  <span
                    className="
                      mt-1
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
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
  );
}