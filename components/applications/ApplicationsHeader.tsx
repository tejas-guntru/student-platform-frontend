import Link from "next/link";

import {
  ArrowLeft,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";

interface ApplicationsHeaderProps {
  count: number;
}

export default function ApplicationsHeader({
  count,
}: ApplicationsHeaderProps) {
  return (
    <header>
      <div
        className="
          flex
          flex-col
          gap-6

          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          <Link
            href="/profile"
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
            <ArrowLeft size={15} />

            Back to profile
          </Link>

          <div
            className="
              mt-6
              flex
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
                rounded-xl
                bg-[#EAF2FF]
                text-[#1256AF]
              "
            >
              <FileText size={21} />
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#1256AF]
                "
              >
                Career · Applications
              </p>

              <h1
                className="
                  mt-1
                  text-3xl
                  font-bold
                  tracking-[-0.04em]
                  text-slate-900

                  sm:text-4xl
                "
              >
                My Applications
              </h1>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Track your applications, follow their
                progress and respond when an employer
                requests your resume.
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-slate-100
                text-slate-600
              "
            >
              <FileText size={16} />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-slate-400
                "
              >
                Total
              </p>

              <p
                className="
                  text-sm
                  font-bold
                  text-slate-800
                "
              >
                {count}{" "}
                {count === 1
                  ? "application"
                  : "applications"}
              </p>
            </div>
          </div>

          <Link
            href="/opportunities"
            className="
              inline-flex
              min-h-[46px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#1256AF]
              px-4
              text-sm
              font-bold
              text-white
              transition

              hover:bg-[#0E4C9D]
            "
          >
            <BriefcaseBusiness size={15} />

            Opportunities
          </Link>
        </div>
      </div>
    </header>
  );
}