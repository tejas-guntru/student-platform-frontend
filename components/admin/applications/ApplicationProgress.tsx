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
  if (status === "REJECTED") {
    return (
      <div className="mt-4 rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-300">
        Application rejected
      </div>
    );
  }

  const currentIndex =
    adminApplicationFlow.indexOf(
      status
    );

  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex min-w-[900px] items-start">
        {adminApplicationFlow.map(
          (step, index) => {
            const complete =
              index <= currentIndex;

            const current =
              step === status;

            return (
              <div
                key={step}
                className="relative flex flex-1 flex-col items-center"
              >
                {index <
                  adminApplicationFlow.length -
                    1 && (
                  <div
                    className={`absolute left-1/2 top-4 h-[2px] w-full ${
                      index <
                      currentIndex
                        ? "bg-emerald-600"
                        : "bg-zinc-700"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                    complete
                      ? "border-emerald-600 bg-emerald-950 text-emerald-400"
                      : "border-zinc-700 bg-zinc-950 text-zinc-600"
                  } ${
                    current
                      ? "ring-4 ring-emerald-950"
                      : ""
                  }`}
                >
                  {complete
                    ? "✓"
                    : index + 1}
                </div>

                <p
                  className={`mt-3 max-w-28 text-center text-xs ${
                    current
                      ? "font-semibold text-white"
                      : complete
                        ? "text-zinc-300"
                        : "text-zinc-600"
                  }`}
                >
                  {formatAdminApplicationStatus(
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