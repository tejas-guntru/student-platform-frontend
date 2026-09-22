import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

interface OpportunitiesCardProps {
  membershipActive: boolean;
}

export default function OpportunitiesCard({
  membershipActive,
}: OpportunitiesCardProps) {
  return (
    <article
      className="
        group
        relative
        flex
        h-full
        flex-col
        justify-between
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]

        sm:p-6
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#38BDF8]/0
          blur-3xl
          transition-all
          duration-300

          group-hover:bg-[#38BDF8]/10
        "
      />

      <div className="relative">
        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <BriefcaseBusiness size={19} />
          </div>

          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-[#D7E8F4]
              bg-[#F8FCFF]
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-[#68849A]
            "
          >
            <Sparkles
              size={11}
              className="text-[#0877E8]"
            />

            Discover
          </span>
        </div>

        {/* CONTENT */}

        <p
          className="
            mt-5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#0877E8]
          "
        >
          Opportunities
        </p>

        <h3
          className="
            mt-1.5
            text-xl
            font-bold
            tracking-[-0.03em]
            text-[#173B63]
          "
        >
          Discover Opportunities
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-[#6F879A]
          "
        >
          Explore internships, placement drives,
          hiring opportunities and other career
          paths available through Trailbliz.
        </p>

        {/* ACCESS STATUS */}

        <div
          className={`
            mt-5
            rounded-[18px]
            border
            p-4

            ${
              membershipActive
                ? `
                  border-emerald-200
                  bg-emerald-50/70
                `
                : `
                  border-[#DCEAF5]
                  bg-[#F8FCFF]
                `
            }
          `}
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <div
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl

                ${
                  membershipActive
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-[#EAF6FF] text-[#0877E8]"
                }
              `}
            >
              {membershipActive ? (
                <BriefcaseBusiness
                  size={15}
                />
              ) : (
                <LockKeyhole
                  size={15}
                />
              )}
            </div>

            <div>
              <p
                className={`
                  text-xs
                  font-bold

                  ${
                    membershipActive
                      ? "text-emerald-700"
                      : "text-[#456982]"
                  }
                `}
              >
                {membershipActive
                  ? "Opportunity access active"
                  : "Membership required"}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#71899D]
                "
              >
                {membershipActive
                  ? "You can access opportunities available to your profile."
                  : "Activate membership to access eligible paid opportunities."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION */}

      <div
        className="
          relative
          mt-6
          border-t
          border-[#E7F0F7]
          pt-4
        "
      >
        <Link
          href="/opportunities"
          className="
            group/link
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-[#0877E8]
            transition

            hover:text-[#1294F2]
          "
        >
          Browse Opportunities

          <ArrowRight
            size={15}
            className="
              transition-transform
              duration-200
              group-hover/link:translate-x-1
            "
          />
        </Link>
      </div>
    </article>
  );
}