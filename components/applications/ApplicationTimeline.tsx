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
      <div className="rounded-xl border border-[#E4C7C7] bg-[#FBF1F1] p-4 text-sm font-semibold text-[#A43F3F]">
        Application rejected
      </div>
    );
  }

  const currentIndex =
    applicationFlow.indexOf(
      status
    );

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[850px] items-start">
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

            return (
              <div
                key={step}
                className="relative flex flex-1 flex-col items-center"
              >
                {/* LINE */}
                {index <
                  applicationFlow.length -
                    1 && (
                  <div
                    className={`absolute left-1/2 top-4 h-[2px] w-full ${
                      index <
                      currentIndex
                        ? "bg-[#4B8A55]"
                        : "bg-[#D8D5CC]"
                    }`}
                  />
                )}

                {/* CIRCLE */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                    complete
                      ? "border-[#BFD7C3] bg-[#F1F8F2] text-[#347A3A]"
                      : "border-[#D8D5CC] bg-[#F8F7F3] text-[#9A9DA5]"
                  } ${
                    current
                      ? "ring-4 ring-[#DDEEDF]"
                      : ""
                  }`}
                >
                  {complete
                    ? "✓"
                    : index +
                      1}
                </div>

                <p
                  className={`mt-3 max-w-28 text-center text-xs ${
                    current
                      ? "font-bold text-[#14213D]"
                      : complete
                        ? "font-medium text-[#5F6470]"
                        : "text-[#9A9DA5]"
                  }`}
                >
                  {formatApplicationStatus(
                    step
                  )}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}