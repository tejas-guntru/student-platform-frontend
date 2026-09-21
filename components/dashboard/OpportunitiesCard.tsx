import Link from "next/link";

interface OpportunitiesCardProps {
  membershipActive: boolean;
}

export default function OpportunitiesCard({
  membershipActive,
}: OpportunitiesCardProps) {
  return (
    <div className="card flex h-full flex-col justify-between p-6">
      <div>
        {/* ICON */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#14213d] text-white">
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
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M3 12h18" />
            <path d="M10 12v2h4v-2" />
          </svg>
        </div>

        {/* LABEL */}
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#858994]">
          Opportunities
        </p>

        {/* TITLE */}
        <h3 className="text-xl font-bold tracking-tight text-[#14213d]">
          Discover Opportunities
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm leading-6 text-[#5f6470]">
          Explore placement drives, internships, hiring opportunities and
          other career opportunities available through Trailbliz.
        </p>

        {/* MEMBERSHIP NOTICE */}
        <div
          className={`mt-5 rounded-[10px] px-4 py-3 ${
            membershipActive
              ? "bg-[#f1f0eb]"
              : "bg-[#f8f0cf]"
          }`}
        >
          <p
            className={`text-xs font-bold ${
              membershipActive
                ? "text-[#30394c]"
                : "text-[#a98616]"
            }`}
          >
            {membershipActive
              ? "Your membership is active."
              : "Membership required"}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#5f6470]">
            {membershipActive
              ? "You can access opportunities available to your profile."
              : "Activate your membership before accessing paid opportunities."}
          </p>
        </div>
      </div>

      {/* ACTION */}
      <div className="mt-6">
        <Link
          href="/opportunities"
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
          Browse Opportunities

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
