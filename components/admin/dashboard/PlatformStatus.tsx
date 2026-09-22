import type { ReactNode } from "react";

import {
  Activity,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  FileText,
  Server,
} from "lucide-react";

interface StatusPillProps {
  children: ReactNode;
  icon: React.ElementType;
}

function StatusPill({
  children,
  icon: Icon,
}: StatusPillProps) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-emerald-200
        bg-emerald-50
        px-3
        py-1.5
        text-[10px]
        font-bold
        text-emerald-700
      "
    >
      <Icon size={12} />

      {children}
    </span>
  );
}

export default function PlatformStatus() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#DCEAF5]
        bg-white
        p-6
        shadow-[0_8px_30px_rgba(8,119,232,0.045)]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-44
          w-44
          rounded-full
          bg-[#38BDF8]/10
          blur-[70px]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          flex
          flex-col
          gap-5

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}

        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Server size={21} />
          </div>

          <div>
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-[#0877E8]
                "
              >
                Platform Status
              </p>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-2
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-emerald-700
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-500
                    shadow-[0_0_0_3px_rgba(16,185,129,0.10)]
                  "
                />

                Ready
              </span>
            </div>

            <h2
              className="
                mt-2
                text-lg
                font-bold
                tracking-[-0.025em]
                text-[#173B63]
              "
            >
              Admin workspace is ready
            </h2>

            <p
              className="
                mt-1
                max-w-xl
                text-sm
                leading-6
                text-[#748B9E]
              "
            >
              Core Trailbliz administration modules are available
              from this dashboard.
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            flex-wrap
            gap-2

            lg:justify-end
          "
        >
          <StatusPill
            icon={BriefcaseBusiness}
          >
            Opportunities
          </StatusPill>

          <StatusPill
            icon={FileText}
          >
            Applications
          </StatusPill>

          <StatusPill
            icon={Code2}
          >
            Coding Verification
          </StatusPill>
        </div>
      </div>

      {/* =====================================================
          BOTTOM STATUS BAR
      ===================================================== */}

      <div
        className="
          relative
          mt-5
          flex
          flex-col
          gap-3
          border-t
          border-[#E7F0F7]
          pt-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <Activity
            size={14}
            className="text-emerald-500"
          />

          <span
            className="
              text-xs
              font-medium
              text-[#617D94]
            "
          >
            Administration modules available
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <BadgeCheck
            size={14}
            className="text-[#0877E8]"
          />

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#8CA1B2]
            "
          >
            Trailbliz Admin
          </span>
        </div>
      </div>
    </section>
  );
}