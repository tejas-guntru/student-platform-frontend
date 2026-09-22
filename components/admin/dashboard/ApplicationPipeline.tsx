import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  FileSearch,
  Send,
  Trophy,
} from "lucide-react";

interface ApplicationPipelineProps {
  reviewing: number;
  shortlisted: number;
  resumeRequested: number;
  forwarded: number;
  selected: number;
}

export default function ApplicationPipeline({
  reviewing,
  shortlisted,
  resumeRequested,
  forwarded,
  selected,
}: ApplicationPipelineProps) {
  const stages = [
    {
      label: "New / Reviewing",
      shortLabel: "Review",
      value: reviewing,
      description: "New applications under review",
      icon: FileSearch,
      iconClass:
        "bg-[#EAF6FF] text-[#0877E8]",
      dotClass: "bg-[#0877E8]",
    },
    {
      label: "Shortlisted",
      shortLabel: "Shortlist",
      value: shortlisted,
      description: "Candidates moved forward",
      icon: BadgeCheck,
      iconClass:
        "bg-violet-50 text-violet-600",
      dotClass: "bg-violet-500",
    },
    {
      label: "Resume Stage",
      shortLabel: "Resume",
      value: resumeRequested,
      description: "Resume requested or received",
      icon: FileCheck2,
      iconClass:
        "bg-amber-50 text-amber-600",
      dotClass: "bg-amber-500",
    },
    {
      label: "Forwarded",
      shortLabel: "Employer",
      value: forwarded,
      description: "Profiles sent to employers",
      icon: Send,
      iconClass:
        "bg-cyan-50 text-cyan-600",
      dotClass: "bg-cyan-500",
    },
    {
      label: "Selected",
      shortLabel: "Selected",
      value: selected,
      description: "Candidates successfully selected",
      icon: Trophy,
      iconClass:
        "bg-emerald-50 text-emerald-600",
      dotClass: "bg-emerald-500",
    },
  ];

  const totalInPipeline =
    reviewing +
    shortlisted +
    resumeRequested +
    forwarded +
    selected;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        p-6
        shadow-[0_10px_34px_rgba(8,119,232,0.05)]

        sm:p-7
      "
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-64
          w-64
          rounded-full
          bg-[#38BDF8]/8
          blur-[80px]
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          flex
          flex-col
          gap-4

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
            Candidate Pipeline
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
            Current Application Status
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#738A9D]
            "
          >
            Track candidates as they move through the
            Trailbliz hiring workflow.
          </p>
        </div>

        <div
          className="
            w-fit
            rounded-2xl
            border
            border-[#DDEBF5]
            bg-[#F7FBFF]
            px-4
            py-3
          "
        >
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#91A5B5]
            "
          >
            In pipeline
          </p>

          <p
            className="
              mt-1
              text-2xl
              font-bold
              tracking-[-0.04em]
              text-[#173B63]
            "
          >
            {totalInPipeline}
          </p>
        </div>
      </div>

      {/* =====================================================
          PIPELINE
      ===================================================== */}

      <div
        className="
          relative
          mt-8
          grid
          gap-4

          sm:grid-cols-2
          lg:grid-cols-5
        "
      >
        {/* desktop connecting line */}

        <div
          className="
            pointer-events-none
            absolute
            left-[9%]
            right-[9%]
            top-[25px]
            hidden
            h-[2px]
            bg-gradient-to-r
            from-[#B8DDF5]
            via-[#8FCDF3]
            to-[#A8E4CF]

            lg:block
          "
        />

        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <div
              key={stage.label}
              className="
                group
                relative
                z-10
                rounded-[22px]
                border
                border-[#E0EDF6]
                bg-[#FCFEFF]
                p-4
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#B8DCF3]
                hover:bg-white
                hover:shadow-[0_14px_32px_rgba(8,119,232,0.08)]
              "
            >
              {/* =================================================
                  TOP
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <div
                  className={`
                    flex
                    h-[50px]
                    w-[50px]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white
                    shadow-[0_5px_16px_rgba(8,119,232,0.08)]
                    ${stage.iconClass}
                  `}
                >
                  <Icon size={20} />
                </div>

                <span
                  className="
                    text-[10px]
                    font-bold
                    text-[#B0C2D0]
                  "
                >
                  0{index + 1}
                </span>
              </div>

              {/* =================================================
                  VALUE
              ================================================= */}

              <p
                className="
                  mt-5
                  text-3xl
                  font-bold
                  tracking-[-0.045em]
                  text-[#173B63]
                "
              >
                {stage.value}
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-semibold
                  text-[#456985]
                "
              >
                {stage.label}
              </p>

              <p
                className="
                  mt-1.5
                  min-h-[32px]
                  text-[10px]
                  leading-4
                  text-[#8A9EAE]
                "
              >
                {stage.description}
              </p>

              {/* =================================================
                  STAGE FOOTER
              ================================================= */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  border-t
                  border-[#E8F1F7]
                  pt-3
                "
              >
                <span
                  className={`
                    h-2
                    w-2
                    rounded-full
                    ${stage.dotClass}
                  `}
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-[#8197AA]
                  "
                >
                  {stage.shortLabel}
                </span>

                {index < stages.length - 1 && (
                  <ArrowRight
                    size={12}
                    className="
                      ml-auto
                      text-[#A8CFE8]

                      lg:hidden
                    "
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          FLOW LABELS
      ===================================================== */}

      <div
        className="
          mt-6
          hidden
          items-center
          justify-center
          gap-2

          lg:flex
        "
      >
        {stages.map((stage, index) => (
          <div
            key={stage.shortLabel}
            className="flex items-center gap-2"
          >
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[#91A5B5]
              "
            >
              {stage.shortLabel}
            </span>

            {index < stages.length - 1 && (
              <ArrowRight
                size={12}
                className="text-[#B4D5E9]"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}