import {
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  CircleX,
  FileText,
  UsersRound,
} from "lucide-react";

interface DashboardStatsProps {
  totalOpportunities: number;
  activeOpportunities: number;
  totalApplications: number;
  shortlisted: number;
  selected: number;
  rejected: number;
}

export default function DashboardStats({
  totalOpportunities,
  activeOpportunities,
  totalApplications,
  shortlisted,
  selected,
  rejected,
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Opportunities",
      value: totalOpportunities,
      description: "Total published roles",
      icon: BriefcaseBusiness,
      iconClass:
        "bg-[#EAF6FF] text-[#0877E8]",
      accent:
        "from-[#0877E8] to-[#38BDF8]",
    },
    {
      label: "Active",
      value: activeOpportunities,
      description: "Currently available",
      icon: BadgeCheck,
      iconClass:
        "bg-emerald-50 text-emerald-600",
      accent:
        "from-emerald-500 to-emerald-400",
    },
    {
      label: "Applications",
      value: totalApplications,
      description: "Student applications",
      icon: FileText,
      iconClass:
        "bg-[#EEF5FF] text-[#3478F6]",
      accent:
        "from-[#3478F6] to-[#65A3FF]",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      description: "Moved forward",
      icon: UsersRound,
      iconClass:
        "bg-violet-50 text-violet-600",
      accent:
        "from-violet-500 to-violet-400",
    },
    {
      label: "Selected",
      value: selected,
      description: "Successfully selected",
      icon: CheckCircle2,
      iconClass:
        "bg-emerald-50 text-emerald-600",
      accent:
        "from-emerald-500 to-teal-400",
    },
    {
      label: "Rejected",
      value: rejected,
      description: "Not progressed",
      icon: CircleX,
      iconClass:
        "bg-red-50 text-red-500",
      accent:
        "from-red-500 to-rose-400",
    },
  ];

  return (
    <section>
      {/* =====================================================
          SECTION HEADER
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
            Platform at a glance
          </h2>
        </div>

        <p
          className="
            text-xs
            text-[#8095A8]
          "
        >
          Live data from Trailbliz
        </p>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div
        className="
          mt-5
          grid
          gap-4

          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-6
        "
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#DCEAF5]
                bg-white
                p-5
                shadow-[0_8px_28px_rgba(8,119,232,0.045)]
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#B7DCF4]
                hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]
              "
            >
              {/* top accent */}

              <div
                className={`
                  absolute
                  left-0
                  right-0
                  top-0
                  h-[3px]
                  bg-gradient-to-r
                  ${stat.accent}
                `}
              />

              {/* hover glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  bg-[#38BDF8]/0
                  blur-2xl
                  transition-all
                  duration-300

                  group-hover:bg-[#38BDF8]/8
                "
              />

              <div className="relative">
                {/* icon */}

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    ${stat.iconClass}
                  `}
                >
                  <Icon size={18} />
                </div>

                {/* value */}

                <p
                  className="
                    mt-5
                    text-3xl
                    font-bold
                    tracking-[-0.045em]
                    text-[#173B63]
                  "
                >
                  {stat.value}
                </p>

                {/* label */}

                <p
                  className="
                    mt-1
                    text-sm
                    font-semibold
                    text-[#456985]
                  "
                >
                  {stat.label}
                </p>

                {/* description */}

                <p
                  className="
                    mt-1
                    text-[11px]
                    leading-4
                    text-[#8A9FAF]
                  "
                >
                  {stat.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}