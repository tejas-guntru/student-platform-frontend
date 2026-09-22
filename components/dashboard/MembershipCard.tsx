import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CircleAlert,
  CreditCard,
} from "lucide-react";

import type {
  MembershipResponse,
} from "@/types/membership";

interface MembershipCardProps {
  membership: MembershipResponse | null;

  formatDate: (
    value: string | null
  ) => string;
}

export default function MembershipCard({
  membership,
  formatDate,
}: MembershipCardProps) {
  const isActive =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  const isExpired =
    membership?.status === "EXPIRED";

  const statusLabel = isActive
    ? "Active"
    : isExpired
      ? "Expired"
      : "Inactive";

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
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r

          ${
            isActive
              ? "from-emerald-500 to-cyan-400"
              : isExpired
                ? "from-red-400 to-orange-400"
                : "from-[#0877E8] to-[#38BDF8]"
          }
        `}
      />

      {/* GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-14
          -top-14
          h-36
          w-36
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
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl

              ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : isExpired
                    ? "bg-red-50 text-red-500"
                    : "bg-[#EAF6FF] text-[#0877E8]"
              }
            `}
          >
            <CreditCard size={19} />
          </div>

          <span
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
              tracking-[0.1em]

              ${
                isActive
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : isExpired
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-[#D8E8F4] bg-[#F8FCFF] text-[#728CA0]"
              }
            `}
          >
            {isActive ? (
              <BadgeCheck size={12} />
            ) : (
              <CircleAlert size={12} />
            )}

            {statusLabel}
          </span>
        </div>

        {/* LABEL */}

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
          Membership
        </p>

        {/* TITLE */}

        <h3
          className="
            mt-1.5
            text-xl
            font-bold
            tracking-[-0.03em]
            text-[#173B63]
          "
        >
          {isActive
            ? "Membership Active"
            : isExpired
              ? "Membership Expired"
              : "Unlock Membership"}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-[#6F879A]
          "
        >
          {isActive
            ? membership?.endsAt
              ? `You have access to eligible membership opportunities until ${formatDate(
                  membership.endsAt
                )}.`
              : "Your Trailbliz membership is currently active."
            : isExpired
              ? membership?.endsAt
                ? `Your membership ended on ${formatDate(
                    membership.endsAt
                  )}. Renew it to continue accessing eligible opportunities.`
                : "Your previous membership has expired."
              : "Activate your membership to access eligible paid opportunities on Trailbliz."}
        </p>

        {/* DATES */}

        {membership &&
          (membership.startsAt ||
            membership.endsAt) && (
            <div
              className="
                mt-5
                overflow-hidden
                rounded-[18px]
                border
                border-[#E1ECF5]
                bg-[#F8FCFF]
              "
            >
              {membership.startsAt && (
                <MembershipDateRow
                  label="Started"
                  value={formatDate(
                    membership.startsAt
                  )}
                />
              )}

              {membership.endsAt && (
                <MembershipDateRow
                  label={
                    isActive
                      ? "Valid until"
                      : "Ended"
                  }
                  value={formatDate(
                    membership.endsAt
                  )}
                  divider={
                    Boolean(
                      membership.startsAt
                    )
                  }
                />
              )}
            </div>
          )}
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
          href="/membership"
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
          {isActive
            ? "Manage Membership"
            : isExpired
              ? "Renew Membership"
              : "View Membership"}

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

function MembershipDateRow({
  label,
  value,
  divider = false,
}: {
  label: string;
  value: string;
  divider?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        gap-4
        px-4
        py-3

        ${
          divider
            ? "border-t border-[#E3EDF5]"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <CalendarDays
          size={13}
          className="text-[#8BB9D6]"
        />

        <span
          className="
            text-[10px]
            font-semibold
            text-[#8196A8]
          "
        >
          {label}
        </span>
      </div>

      <span
        className="
          text-xs
          font-bold
          text-[#496B84]
        "
      >
        {value}
      </span>
    </div>
  );
}