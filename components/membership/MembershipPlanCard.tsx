interface MembershipPlanCardProps {
  active: boolean;
  paying: boolean;

  onPayment:
    () => void;
}

export default function MembershipPlanCard({
  active,
  paying,
  onPayment,
}: MembershipPlanCardProps) {
  return (
    <div className="rounded-[24px] border border-[#D8D5CC] bg-white p-7 shadow-[0_16px_45px_rgba(20,33,61,0.05)]">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A227]" />

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227]">
          Annual Plan
        </p>
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-4xl font-bold tracking-[-0.04em] text-[#14213D]">
          ₹499
        </span>

        <span className="pb-1 text-sm text-[#858994]">
          / year
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <Feature>
          Apply to internships
        </Feature>

        <Feature>
          Apply to job opportunities
        </Feature>

        <Feature>
          Track application progress
        </Feature>

        <Feature>
          Resume submission after
          shortlist
        </Feature>
      </div>

      <button
        type="button"
        onClick={
          onPayment
        }
        disabled={
          paying
        }
        className="mt-8 w-full rounded-xl bg-[#C9A227] px-5 py-3 font-bold text-[#14213D] transition-all hover:bg-[#E0C766] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        {paying
          ? "Opening Payment..."
          : active
            ? "Extend Membership ₹499"
            : "Get Membership ₹499"}
      </button>

      <p className="mt-4 text-center text-xs text-[#858994]">
        Razorpay secure checkout
      </p>
    </div>
  );
}

function Feature({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <div className="flex gap-3 text-sm text-[#5F6470]">
      <span className="font-bold text-[#4B8A55]">
        ✓
      </span>

      <span>
        {children}
      </span>
    </div>
  );
}