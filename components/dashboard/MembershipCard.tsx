import Link from "next/link";

interface MembershipResponse {
  membershipId: string | null;
  status: "ACTIVE" | "EXPIRED" | null;
  active: boolean;
  startsAt: string | null;
  endsAt: string | null;
}

interface MembershipCardProps {
  membership: MembershipResponse | null;
  formatDate: (value: string | null) => string;
}

export default function MembershipCard({
  membership,
  formatDate,
}: MembershipCardProps) {
  const isActive =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  return (
    <div className="card flex h-full flex-col justify-between p-6">
      <div>
        {/* ICON */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#f8f0cf] text-[#a98616]">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
            />

            <path d="M3 10h18" />

            <path d="M7 15h4" />
          </svg>
        </div>

        {/* LABEL */}
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#858994]">
          Membership
        </p>

        {/* TITLE */}
        <h3 className="text-xl font-bold tracking-tight text-[#14213d]">
          {isActive
            ? "Active Membership"
            : membership?.status === "EXPIRED"
              ? "Membership Expired"
              : "Membership Required"}
        </h3>

        {/* STATUS */}
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isActive
                ? "bg-[#22c55e]"
                : membership?.status === "EXPIRED"
                  ? "bg-[#ef4444]"
                  : "bg-[#858994]"
            }`}
          />

          <span className="text-sm font-semibold text-[#30394c]">
            {isActive
              ? "Active"
              : membership?.status === "EXPIRED"
                ? "Expired"
                : "Inactive"}
          </span>
        </div>

        {/* DETAILS */}
        <p className="mt-3 text-sm leading-6 text-[#5f6470]">
          {isActive
            ? membership?.endsAt
              ? `Your membership is active until ${formatDate(
                  membership.endsAt
                )}.`
              : "Your membership is currently active."
            : membership?.status === "EXPIRED"
              ? membership.endsAt
                ? `Your membership expired on ${formatDate(
                    membership.endsAt
                  )}.`
                : "Your membership has expired."
              : "Activate your membership to access paid opportunities on Trailbliz."}
        </p>

        {/* OPTIONAL MEMBERSHIP DATES */}
        {membership && (
          <div className="mt-5 space-y-3 border-t border-[#e7e4dc] pt-5">
            {membership.startsAt && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#858994]">
                  Started
                </span>

                <span className="text-xs font-semibold text-[#30394c]">
                  {formatDate(membership.startsAt)}
                </span>
              </div>
            )}

            {membership.endsAt && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#858994]">
                  {isActive
                    ? "Valid until"
                    : "Ended"}
                </span>

                <span className="text-xs font-semibold text-[#30394c]">
                  {formatDate(membership.endsAt)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ACTION */}
      <div className="mt-6">
        <Link
          href="/membership"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-[#14213d]
            transition
            hover:text-[#a98616]
          "
        >
          {isActive
            ? "Manage Membership"
            : membership?.status === "EXPIRED"
              ? "Renew Membership"
              : "View Membership"}

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}