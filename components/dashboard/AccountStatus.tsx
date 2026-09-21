interface AccountStatusProps {
  email: string;
  membershipActive: boolean;
}

export default function AccountStatus({
  email,
  membershipActive,
}: AccountStatusProps) {
  return (
    <section className="card overflow-hidden">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        {/* LEFT */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#f1f0eb] text-[#14213d]">
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
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#858994]">
              Account Status
            </p>

            <h3 className="mt-1 text-lg font-bold tracking-tight text-[#14213d]">
              Your Trailbliz account
            </h3>

            <p className="mt-1 max-w-xl text-sm text-[#5f6470]">
              {email}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          {/* ACCOUNT */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e3e1da] bg-[#f8f7f3] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />

            <span className="text-xs font-bold text-[#30394c]">
              Account Active
            </span>
          </div>

          {/* MEMBERSHIP */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 ${
              membershipActive
                ? "border-[#d8e8dc] bg-[#f0f7f1]"
                : "border-[#e6d9a7] bg-[#fdf8e7]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                membershipActive ? "bg-[#22c55e]" : "bg-[#c9a227]"
              }`}
            />

            <span
              className={`text-xs font-bold ${
                membershipActive ? "text-[#28743a]" : "text-[#a98616]"
              }`}
            >
              {membershipActive
                ? "Membership Active"
                : "Membership Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* GOLD ACCENT */}
      <div className="h-[3px] bg-[#c9a227]" />
    </section>
  );
}
