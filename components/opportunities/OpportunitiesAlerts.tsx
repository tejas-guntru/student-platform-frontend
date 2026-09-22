import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
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
    <>
      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="
            relative
            overflow-hidden
            rounded-[18px]
            border
            border-red-200
            bg-white
            px-4
            py-4
            shadow-[0_8px_24px_rgba(220,38,38,0.04)]

            sm:px-5
          "
        >
          <div
            className="
              absolute
              bottom-0
              left-0
              top-0
              w-[3px]
              bg-red-500
            "
          />

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
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-600
              "
            >
              <AlertCircle size={16} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-red-600
                "
              >
                Something went wrong
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-red-700
                "
              >
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {success && (
        <div
          className="
            relative
            overflow-hidden
            rounded-[18px]
            border
            border-emerald-200
            bg-white
            px-4
            py-4
            shadow-[0_8px_24px_rgba(16,185,129,0.04)]

            sm:px-5
          "
        >
          <div
            className="
              absolute
              bottom-0
              left-0
              top-0
              w-[3px]
              bg-emerald-500
            "
          />

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
                items-start
                gap-3
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
                  bg-emerald-50
                  text-emerald-600
                "
              >
                <CheckCircle2 size={16} />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-emerald-700
                  "
                >
                  Application Updated
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-emerald-700/85
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
                justify-center
                gap-2
                rounded-xl
                border
                border-emerald-200
                bg-emerald-50
                px-3.5
                py-2.5
                text-xs
                font-bold
                text-emerald-700
                transition-all
                duration-200

                hover:border-emerald-300
                hover:bg-emerald-100
              "
            >
              <FileText size={14} />

              View Applications

              <ArrowRight
                size={13}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}