import {
  Code2,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

import type {
  AdminCodingProfile,
} from "@/types/adminCodingProfile";

interface CodingVerificationSummaryProps {
  profiles: AdminCodingProfile[];
}

export default function CodingVerificationSummary({
  profiles,
}: CodingVerificationSummaryProps) {
  const verifiedCount =
    profiles.filter(
      (profile) =>
        profile.verificationStatus ===
        "VERIFIED"
    ).length;

  const unverifiedCount =
    profiles.filter(
      (profile) =>
        profile.verificationStatus ===
        "UNVERIFIED"
    ).length;

  const stats = [
    {
      label: "Total Profiles",
      value: profiles.length,
      description:
        "Connected coding accounts",
      icon: Code2,
      iconClass:
        "bg-[#EAF6FF] text-[#0877E8]",
      accent:
        "from-[#0877E8] to-[#38BDF8]",
    },
    {
      label: "Verified",
      value: verifiedCount,
      description:
        "Approved for rankings",
      icon: ShieldCheck,
      iconClass:
        "bg-emerald-50 text-emerald-600",
      accent:
        "from-emerald-500 to-teal-400",
    },
    {
      label: "Pending Verification",
      value: unverifiedCount,
      description:
        "Profiles awaiting review",
      icon: ShieldQuestion,
      iconClass:
        "bg-amber-50 text-amber-600",
      accent:
        "from-amber-500 to-orange-400",
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
            Verification Overview
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
            Coding Profile Summary
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#768D9F]
            "
          >
            Current verification status of student
            coding accounts.
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
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
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
              {/* ACCENT */}

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

              {/* GLOW */}

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
                      ${stat.iconClass}
                    `}
                  >
                    <Icon size={20} />
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
                  {stat.value}
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-[#456985]
                  "
                >
                  {stat.label}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[#899EAF]
                  "
                >
                  {stat.description}
                </p>

                {/* PROGRESS */}

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
                      ${stat.accent}
                    `}
                    style={{
                      width:
                        profiles.length === 0
                          ? "0%"
                          : `${Math.max(
                              stat.value === 0
                                ? 0
                                : 8,
                              Math.min(
                                100,
                                (stat.value /
                                  profiles.length) *
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