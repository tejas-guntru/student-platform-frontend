import {
  Check,
  CreditCard,
  LoaderCircle,
} from "lucide-react";

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
    <section
      className="
        flex
        flex-col
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
          items-start
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-[#1256AF]
          "
        >
          <CreditCard size={17} />
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
            Annual Plan
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
            Trailbliz Membership
          </h2>

          <p
            className="
              mt-1.5
              text-sm
              leading-6
              text-slate-600
            "
          >
            Unlock application access for
            eligible opportunities.
          </p>
        </div>
      </div>

      {/* PRICE */}

      <div
        className="
          mt-6
          rounded-xl
          border
          border-slate-200
          bg-slate-50/70
          p-5
        "
      >
        <p
          className="
            text-xs
            font-semibold
            text-slate-500
          "
        >
          Membership price
        </p>

        <div
          className="
            mt-1
            flex
            items-end
            gap-2
          "
        >
          <span
            className="
              text-4xl
              font-bold
              tracking-[-0.045em]
              text-slate-900
            "
          >
            ₹499
          </span>

          <span
            className="
              pb-1
              text-sm
              text-slate-500
            "
          >
            / year
          </span>
        </div>
      </div>

      {/* FEATURES */}

      <div
        className="
          mt-6
          space-y-3
        "
      >
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
          Resume submission after shortlist
        </Feature>
      </div>

      {/* ACTION */}

      <div className="mt-auto pt-7">
        <button
          type="button"
          onClick={
            onPayment
          }
          disabled={
            paying
          }
          className="
            inline-flex
            min-h-[44px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#1256AF]
            px-5
            py-3
            text-sm
            font-bold
            text-white
            transition-colors

            hover:bg-[#0E4C9D]

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {paying && (
            <LoaderCircle
              size={16}
              className="animate-spin"
            />
          )}

          {paying
            ? "Opening Payment..."
            : active
              ? "Extend Membership · ₹499"
              : "Get Membership · ₹499"}
        </button>

        <p
          className="
            mt-3
            text-center
            text-xs
            text-slate-500
          "
        >
          Secure checkout powered by Razorpay
        </p>
      </div>
    </section>
  );
}

function Feature({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        text-sm
        text-slate-600
      "
    >
      <span
        className="
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-emerald-50
          text-emerald-600
        "
      >
        <Check
          size={12}
          strokeWidth={2.5}
        />
      </span>

      <span>
        {children}
      </span>
    </div>
  );
}