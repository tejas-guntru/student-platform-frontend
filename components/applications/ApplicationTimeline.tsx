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
  status: ApplicationStatus;
}

export default function ApplicationTimeline({
  status,
}: ApplicationTimelineProps) {
  if (status === "REJECTED") {
    return (
      <div
        className="
          flex
          items-start
          gap-3
          rounded-xl
          border
          border-red-200
          bg-red-50
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
            rounded-lg
            bg-red-100
            text-red-600
          "
        >
          <XCircle size={15} />
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
              text-red-600
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
        pb-2
      "
    >
      <div
        className="
          flex
          min-w-[820px]
          items-start
        "
      >
        {applicationFlow.map(
          (
            step,
            index
          ) => {
            const reached =
              index <=
              currentIndex;

            const current =
              step === status;

            const connectorComplete =
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
                {index <
                  applicationFlow.length -
                    1 && (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-[15px]
                      h-[2px]
                      w-full
                      bg-slate-200
                    "
                  >
                    {connectorComplete && (
                      <div
                        className="
                          h-full
                          w-full
                          bg-[#1256AF]
                        "
                      />
                    )}
                  </div>
                )}

                <div
                  className={`
                    relative
                    z-10
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    text-xs
                    transition

                    ${
                      current
                        ? `
                          border-[#1256AF]
                          bg-[#1256AF]
                          text-white
                          ring-4
                          ring-blue-50
                        `
                        : reached
                          ? `
                            border-blue-200
                            bg-blue-50
                            text-[#1256AF]
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-400
                          `
                    }
                  `}
                >
                  {reached ? (
                    <Check
                      size={13}
                      strokeWidth={2.6}
                    />
                  ) : (
                    <Clock3
                      size={12}
                    />
                  )}
                </div>

                <p
                  className={`
                    mt-2.5
                    max-w-28
                    text-center
                    text-[10px]
                    leading-4

                    ${
                      current
                        ? "font-bold text-slate-900"
                        : reached
                          ? "font-semibold text-slate-600"
                          : "font-medium text-slate-400"
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
                      text-[#1256AF]
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