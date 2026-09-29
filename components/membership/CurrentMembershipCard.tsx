import {
  BadgeCheck,
  CalendarDays,
  CircleAlert,
  Clock3,
} from "lucide-react";

import type {
  MembershipResponse,
} from "@/types/membership";

import {
  formatDate,
} from "@/utils/membershipFormatters";

interface CurrentMembershipCardProps {
  membership:
    MembershipResponse | null;
}

export default function CurrentMembershipCard({
  membership,
}: CurrentMembershipCardProps) {
  const isActive =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        sm:p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-start
          sm:justify-between
        "
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
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl

              ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }
            `}
          >
            {isActive ? (
              <BadgeCheck size={18} />
            ) : (
              <CircleAlert size={18} />
            )}
          </div>

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[#1256AF]
              "
            >
              Current Membership
            </p>

            <h2
              className="
                mt-1
                text-xl
                font-bold
                tracking-[-0.025em]
                text-slate-900
              "
            >
              Membership Status
            </h2>

            <p
              className="
                mt-1.5
                max-w-md
                text-sm
                leading-6
                text-slate-600
              "
            >
              Review your current Trailbliz
              membership access and validity.
            </p>
          </div>
        </div>

        <MembershipStatus
          active={isActive}
        />
      </div>

      {/* ACTIVE */}

      {isActive ? (
        <>
          <div
            className="
              mt-6
              grid
              gap-3

              sm:grid-cols-2
            "
          >
            <Detail
              icon={CalendarDays}
              label="Starts"
              value={formatDate(
                membership?.startsAt
              )}
            />

            <Detail
              icon={Clock3}
              label="Valid Until"
              value={formatDate(
                membership?.endsAt
              )}
            />
          </div>

          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              p-4
            "
          >
            <BadgeCheck
              size={17}
              className="
                mt-0.5
                shrink-0
                text-emerald-600
              "
            />

            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-emerald-800
                "
              >
                Membership access is active
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-emerald-700
                "
              >
                You can apply to eligible jobs
                and internships available through
                Trailbliz.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div
          className="
            mt-6
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-4
          "
        >
          <CircleAlert
            size={17}
            className="
              mt-0.5
              shrink-0
              text-slate-500
            "
          />

          <div>
            <p
              className="
                text-sm
                font-bold
                text-slate-800
              "
            >
              Membership is inactive
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-slate-600
              "
            >
              Activate your membership to start
              applying for eligible opportunities
              on Trailbliz.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function MembershipStatus({
  active,
}: {
  active: boolean;
}) {
  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-[10px]
        font-bold
        uppercase
        tracking-[0.09em]

        ${
          active
            ? `
              border-emerald-200
              bg-emerald-50
              text-emerald-700
            `
            : `
              border-slate-200
              bg-slate-50
              text-slate-600
            `
        }
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          rounded-full

          ${
            active
              ? "bg-emerald-500"
              : "bg-slate-400"
          }
        `}
      />

      {active
        ? "Active"
        : "Inactive"}
    </span>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-slate-200
        bg-slate-50/70
        p-4
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-white
          text-[#1256AF]
          shadow-sm
        "
      >
        <Icon size={15} />
      </div>

      <div>
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.11em]
            text-slate-500
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            text-sm
            font-bold
            text-slate-900
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}