import Link from "next/link";

interface MembershipResponse {
  membershipId: string | null;
  status: "ACTIVE" | "EXPIRED" | null;
  active: boolean;
  startsAt: string | null;
  endsAt: string | null;
}

interface DashboardHeroProps {
  membership: MembershipResponse | null;
  formatDate: (value: string | null) => string;
}

export default function DashboardHero({
  membership,
  formatDate,
}: DashboardHeroProps) {
  const isActive =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  return (
    <section className="relative overflow-hidden rounded-[24px] bg-[#14213d]">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9a227] opacity-20 blur-3xl" />

      <div className="relative grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:p-11">
        {/* LEFT */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#c9a227]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#e0c766]">
              Student Dashboard
            </span>
          </div>

          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
            Build your profile.
            <br />

            <span className="text-[#e0c766]">
              Discover your opportunities.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Keep your career profile updated, track your progress and access
            opportunities that match your journey.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/profile"
              className="
                inline-flex
                items-center
                justify-center
                rounded-[10px]
                bg-white
                px-5
                py-3
                text-sm
                font-bold
                text-[#14213d]
                transition
                hover:bg-[#f1f0eb]
              "
            >
              Complete Profile
            </Link>

            <Link
              href="/opportunities"
              className="
                inline-flex
                items-center
                justify-center
                rounded-[10px]
                border
                border-white/20
                px-5
                py-3
                text-sm
                font-bold
                text-white
                transition
                hover:border-[#e0c766]
                hover:text-[#e0c766]
              "
            >
              Explore Opportunities
            </Link>
          </div>
        </div>

        {/* MEMBERSHIP SUMMARY */}
        <div className="w-full lg:w-[280px]">
          <div className="rounded-[16px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                Membership
              </p>

              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isActive
                    ? "bg-[#22c55e]"
                    : "bg-[#858994]"
                }`}
              />
            </div>

            <div className="mt-5">
              <p className="text-lg font-bold text-white">
                {isActive
                  ? "Active Membership"
                  : "No Active Membership"}
              </p>

              <p className="mt-2 text-sm leading-6 text-white/55">
                {isActive
                  ? membership?.endsAt
                    ? `Valid until ${formatDate(
                        membership.endsAt
                      )}`
                    : "Your membership is currently active."
                  : membership?.status === "EXPIRED"
                    ? "Your previous membership has expired."
                    : "Activate your membership to access paid opportunities."}
              </p>
            </div>

            <Link
              href="/membership"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-[#e0c766]
                transition
                hover:text-white
              "
            >
              {isActive
                ? "View Membership"
                : "Get Membership"}

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}