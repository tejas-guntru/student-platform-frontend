import Link from "next/link";

export default function TrackingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* CODING PROFILES */}
      <div className="card group p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#f1f0eb] text-[#14213d]">
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
                <path d="m8 9-4 3 4 3" />
                <path d="m16 9 4 3-4 3" />
                <path d="m14 5-4 14" />
              </svg>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#858994]">
              Progress
            </p>

            <h3 className="mt-1 text-xl font-bold tracking-tight text-[#14213d]">
              Coding Profiles
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#5f6470]">
              Connect your coding profiles and keep your technical progress
              visible in your Trailbliz profile.
            </p>
          </div>

          <div className="hidden rounded-full bg-[#f8f0cf] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a98616] sm:block">
            Skills
          </div>
        </div>

        <Link
          href="/coding-profiles"
          className="
            group/link
            mt-6
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
          Manage Coding Profiles

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover/link:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </Link>
      </div>

      {/* LEADERBOARD */}
      <div className="card group p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
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
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10" />
                <path d="M6 4v4a6 6 0 0 0 12 0V4" />
                <path d="M6 7H4a3 3 0 0 0 3 3" />
                <path d="M18 7h2a3 3 0 0 1-3 3" />
              </svg>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#858994]">
              Rankings
            </p>

            <h3 className="mt-1 text-xl font-bold tracking-tight text-[#14213d]">
              Leaderboard
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#5f6470]">
              Track your performance and see how your assessment and profile
              progress compares within your student community.
            </p>
          </div>

          <div className="hidden rounded-full bg-[#f1f0eb] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5f6470] sm:block">
            Ranking
          </div>
        </div>

        <Link
          href="/leaderboard"
          className="
            group/link
            mt-6
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
          View Leaderboard

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover/link:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
