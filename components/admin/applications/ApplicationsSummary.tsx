import {
  BadgeCheck,
  FileCheck2,
  FileClock,
  FileSearch,
  FileText,
  Send,
  Trophy,
  UsersRound,
} from "lucide-react";

interface ApplicationsSummaryProps {
  total: number;
  applied: number;
  underReview: number;
  shortlisted: number;
  resumeRequested: number;
  resumeSubmitted: number;
  forwarded: number;
  selected: number;
}

export default function ApplicationsSummary({
  total,
  applied,
  underReview,
  shortlisted,
  resumeRequested,
  resumeSubmitted,
  forwarded,
  selected,
}: ApplicationsSummaryProps) {
  const stats = [
    {
      label: "Total",
      value: total,
      description: "All applications",
      icon: UsersRound,
      iconClass: "bg-[#EAF6FF] text-[#0877E8]",
      accent: "from-[#0877E8] to-[#38BDF8]",
    },
    {
      label: "Applied",
      value: applied,
      description: "New submissions",
      icon: FileText,
      iconClass: "bg-[#F1F6FF] text-[#3478F6]",
      accent: "from-[#3478F6] to-[#60A5FA]",
    },
    {
      label: "Under Review",
      value: underReview,
      description: "Being reviewed",
      icon: FileSearch,
      iconClass: "bg-sky-50 text-sky-600",
      accent: "from-sky-500 to-cyan-400",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      description: "Moved forward",
      icon: BadgeCheck,
      iconClass: "bg-violet-50 text-violet-600",
      accent: "from-violet-500 to-purple-400",
    },
    {
      label: "Resume Requested",
      value: resumeRequested,
      description: "Resume requested",
      icon: FileClock,
      iconClass: "bg-amber-50 text-amber-600",
      accent: "from-amber-500 to-orange-400",
    },
    {
      label: "Resume Submitted",
      value: resumeSubmitted,
      description: "Resume received",
      icon: FileCheck2,
      iconClass: "bg-blue-50 text-blue-600",
      accent: "from-blue-500 to-indigo-400",
    },
    {
      label: "Forwarded",
      value: forwarded,
      description: "Sent to employer",
      icon: Send,
      iconClass: "bg-cyan-50 text-cyan-600",
      accent: "from-cyan-500 to-sky-400",
    },
    {
      label: "Selected",
      value: selected,
      description: "Successfully selected",
      icon: Trophy,
      iconClass: "bg-emerald-50 text-emerald-600",
      accent: "from-emerald-500 to-teal-400",
    },
  ];

  return (
    <section>
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
          Pipeline Overview
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
          Application Summary
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-[#768D9F]
          "
        >
          Current distribution of candidates across the
          application workflow.
        </p>
      </div>

      <div
        className="
          mt-5
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
          xl:grid-cols-8
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
                p-4
                shadow-[0_8px_28px_rgba(8,119,232,0.045)]
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#B8DCF3]
                hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]
              "
            >
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

              <p
                className="
                  mt-4
                  text-3xl
                  font-bold
                  tracking-[-0.045em]
                  text-[#173B63]
                "
              >
                {stat.value}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  font-semibold
                  text-[#4A6B84]
                "
              >
                {stat.label}
              </p>

              <p
                className="
                  mt-1
                  min-h-[28px]
                  text-[10px]
                  leading-4
                  text-[#8A9FAF]
                "
              >
                {stat.description}
              </p>

              <div
                className="
                  mt-4
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-[#EDF4F9]
                "
              >
                <div
                  className={`
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    ${stat.accent}
                  `}
                  style={{
                    width:
                      total === 0
                        ? "0%"
                        : `${Math.max(
                            stat.value === 0 ? 0 : 8,
                            Math.min(
                              100,
                              (stat.value / total) * 100
                            )
                          )}%`,
                  }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}