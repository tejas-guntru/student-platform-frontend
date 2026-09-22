import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FileText,
  ShieldCheck,
} from "lucide-react";

interface ManagementCardsProps {
  activeOpportunities: number;
  totalApplications: number;
}

export default function ManagementCards({
  activeOpportunities,
  totalApplications,
}: ManagementCardsProps) {
  const cards = [
    {
      href: "/admin/opportunities",
      eyebrow: "Opportunity Management",
      title: "Jobs & Internships",
      description:
        "Create new opportunities, edit listings and close applications when required.",
      metricLabel: "Active listings",
      metricValue: activeOpportunities,
      action: "Manage opportunities",
      icon: BriefcaseBusiness,
      secondaryIcon: CheckCircle2,
      accent:
        "from-[#0877E8] via-[#1294F2] to-[#38BDF8]",
      iconClass:
        "bg-[#EAF6FF] text-[#0877E8]",
      badgeClass:
        "border-[#CBE5F8] bg-[#EFF8FF] text-[#0877E8]",
    },
    {
      href: "/admin/applications",
      eyebrow: "Candidate Management",
      title: "Applications",
      description:
        "Review candidates, shortlist students, request resumes and update final decisions.",
      metricLabel: "Total applications",
      metricValue: totalApplications,
      action: "Review applications",
      icon: FileText,
      secondaryIcon: ShieldCheck,
      accent:
        "from-[#2563EB] via-[#3B82F6] to-[#60A5FA]",
      iconClass:
        "bg-[#EEF4FF] text-[#2563EB]",
      badgeClass:
        "border-[#D5E1FF] bg-[#F3F7FF] text-[#2563EB]",
    },
    {
      href: "/admin/coding-verification",
      eyebrow: "Coding Profiles",
      title: "Verification",
      description:
        "Verify student Codeforces, LeetCode and CodeChef accounts before including them in rankings.",
      metricLabel: "Ranking system",
      metricValue: "Verify & rebuild",
      action: "Verify profiles",
      icon: Code2,
      secondaryIcon: ShieldCheck,
      accent:
        "from-[#0EA5E9] via-[#38BDF8] to-[#67E8F9]",
      iconClass:
        "bg-cyan-50 text-cyan-600",
      badgeClass:
        "border-cyan-200 bg-cyan-50 text-cyan-700",
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
            Management
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
            Manage the Trailbliz platform
          </h2>
        </div>

        <p
          className="
            max-w-md
            text-xs
            leading-5
            text-[#8095A8]
          "
        >
          Access the main administrative workflows for
          opportunities, applications and coding verification.
        </p>
      </div>

      {/* =====================================================
          CARDS
      ===================================================== */}

      <div
        className="
          mt-5
          grid
          gap-5

          lg:grid-cols-3
        "
      >
        {cards.map((card) => {
          const Icon = card.icon;
          const SecondaryIcon = card.secondaryIcon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="
                group
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-[#DCEAF5]
                bg-white
                p-6
                shadow-[0_10px_32px_rgba(8,119,232,0.045)]
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#B6DCF4]
                hover:shadow-[0_22px_50px_rgba(8,119,232,0.10)]

                sm:p-7
              "
            >
              {/* top accent */}

              <div
                className={`
                  absolute
                  left-0
                  right-0
                  top-0
                  h-[4px]
                  bg-gradient-to-r
                  ${card.accent}
                `}
              />

              {/* background glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-44
                  w-44
                  rounded-full
                  bg-[#38BDF8]/0
                  blur-3xl
                  transition-all
                  duration-300

                  group-hover:bg-[#38BDF8]/10
                "
              />

              <div className="relative">
                {/* =================================================
                    TOP
                ================================================= */}

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
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      ${card.iconClass}

                      transition-all
                      duration-300

                      group-hover:scale-105
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  <div
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      px-2.5
                      py-1.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.13em]
                      ${card.badgeClass}
                    `}
                  >
                    <SecondaryIcon size={11} />

                    Admin
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <p
                  className="
                    mt-6
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#8B9FAF]
                  "
                >
                  {card.eyebrow}
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    tracking-[-0.035em]
                    text-[#173B63]
                  "
                >
                  {card.title}
                </h3>

                <p
                  className="
                    mt-3
                    min-h-[72px]
                    text-sm
                    leading-6
                    text-[#6E8599]
                  "
                >
                  {card.description}
                </p>

                {/* =================================================
                    METRIC
                ================================================= */}

                <div
                  className="
                    mt-6
                    rounded-[18px]
                    border
                    border-[#E0EDF6]
                    bg-[#F8FCFF]
                    px-4
                    py-4
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.13em]
                      text-[#91A4B4]
                    "
                  >
                    {card.metricLabel}
                  </p>

                  <div
                    className="
                      mt-2
                      flex
                      items-end
                      justify-between
                      gap-3
                    "
                  >
                    <p
                      className={`
                        font-bold
                        text-[#173B63]

                        ${
                          typeof card.metricValue ===
                          "number"
                            ? "text-3xl tracking-[-0.045em]"
                            : "text-sm"
                        }
                      `}
                    >
                      {card.metricValue}
                    </p>

                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-[#0877E8]
                        shadow-[0_4px_14px_rgba(8,119,232,0.08)]
                      "
                    >
                      <ArrowRight
                        size={15}
                        className="
                          transition-transform
                          duration-300

                          group-hover:translate-x-0.5
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    ACTION
                ================================================= */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-sm
                      font-semibold
                      text-[#0877E8]
                    "
                  >
                    {card.action}
                  </span>

                  <ArrowRight
                    size={17}
                    className="
                      text-[#8BC8EE]
                      transition-all
                      duration-300

                      group-hover:translate-x-1
                      group-hover:text-[#0877E8]
                    "
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}