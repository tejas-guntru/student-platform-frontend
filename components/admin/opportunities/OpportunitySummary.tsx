import {
  Archive,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import type {
  Opportunity,
} from "@/types/opportunity";

interface OpportunitySummaryProps {
  opportunities: Opportunity[];
}

export default function OpportunitySummary({
  opportunities,
}: OpportunitySummaryProps) {
  const active =
    opportunities.filter(
      (opportunity) =>
        opportunity.status ===
        "ACTIVE"
    ).length;

  const closed =
    opportunities.filter(
      (opportunity) =>
        opportunity.status ===
        "CLOSED"
    ).length;

  const summary = [
    {
      label: "Total Opportunities",
      value: opportunities.length,
      description:
        "All jobs and internships",
      icon: BriefcaseBusiness,
      iconClass:
        "bg-[#EAF6FF] text-[#0877E8]",
      accent:
        "from-[#0877E8] to-[#38BDF8]",
    },
    {
      label: "Active Listings",
      value: active,
      description:
        "Currently open to students",
      icon: CheckCircle2,
      iconClass:
        "bg-emerald-50 text-emerald-600",
      accent:
        "from-emerald-500 to-teal-400",
    },
    {
      label: "Closed Listings",
      value: closed,
      description:
        "No longer accepting applications",
      icon: Archive,
      iconClass:
        "bg-slate-100 text-slate-600",
      accent:
        "from-slate-500 to-slate-400",
    },
  ];

  return (
    <section>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-2

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.17em]
              text-[#0877E8]
            "
          >
            Overview
          </p>

          <h2
            className="
              mt-1.5
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
            "
          >
            Opportunity Summary
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#768D9F]
            "
          >
            Current status of job and internship listings.
          </p>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div
        className="
          mt-5
          grid
          gap-4

          sm:grid-cols-3
        "
      >
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="
                group
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-[#DCEAF5]
                bg-white
                p-5
                shadow-[0_8px_28px_rgba(8,119,232,0.045)]
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#B8DCF3]
                hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]
              "
            >
              {/* accent */}

              <div
                className={`
                  absolute
                  left-0
                  right-0
                  top-0
                  h-[3px]
                  bg-gradient-to-r
                  ${item.accent}
                `}
              />

              {/* glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-[#38BDF8]/0
                  blur-3xl
                  transition-all
                  duration-300

                  group-hover:bg-[#38BDF8]/8
                "
              />

              <div className="relative">
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      ${item.iconClass}
                    `}
                  >
                    <Icon size={19} />
                  </div>

                  <span
                    className="
                      rounded-full
                      border
                      border-[#E0ECF5]
                      bg-[#F8FCFF]
                      px-2.5
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#8BA0B1]
                    "
                  >
                    Live
                  </span>
                </div>

                <p
                  className="
                    mt-5
                    text-4xl
                    font-bold
                    tracking-[-0.05em]
                    text-[#173B63]
                  "
                >
                  {item.value}
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-[#456985]
                  "
                >
                  {item.label}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[#899EAF]
                  "
                >
                  {item.description}
                </p>

                <div
                  className="
                    mt-5
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-[#EEF5FA]
                  "
                >
                  <div
                    className={`
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      ${item.accent}
                    `}
                    style={{
                      width:
                        opportunities.length ===
                        0
                          ? "0%"
                          : `${Math.max(
                              8,
                              Math.min(
                                100,
                                (item.value /
                                  opportunities.length) *
                                  100
                              )
                            )}%`,
                    }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}