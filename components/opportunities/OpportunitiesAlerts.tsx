import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface OpportunitiesAlertsProps {
  error: string;
  success: string;
}

export default function OpportunitiesAlerts({
  error,
  success,
}: OpportunitiesAlertsProps) {
  return (
    <div className="space-y-3">
      {error && (
        <div
          role="alert"
          className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50/50
            px-4
            py-3.5
          "
        >
          <AlertCircle
            size={17}
            className="
              mt-0.5
              shrink-0
              text-red-600
            "
          />

          <div>
            <p
              className="
                text-sm
                font-bold
                text-red-800
              "
            >
              Unable to continue
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-5
                text-red-700
              "
            >
              {error}
            </p>
          </div>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="
            flex
            flex-col
            gap-3
            rounded-xl
            border
            border-emerald-200
            bg-emerald-50/50
            px-4
            py-3.5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <CheckCircle2
              size={17}
              className="
                mt-0.5
                shrink-0
                text-emerald-600
              "
            />

            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-emerald-800
                "
              >
                Application submitted
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-5
                  text-emerald-700
                "
              >
                {success}
              </p>
            </div>
          </div>

          <Link
            href="/applications"
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-1.5
              text-xs
              font-bold
              text-emerald-700
            "
          >
            View Applications

            <ArrowRight
              size={13}
              className="
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      )}
    </div>
  );
}