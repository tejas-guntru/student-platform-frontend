import Link from "next/link";

import type {
  MembershipResponse,
} from "@/types/membership";

import type {
  ProfileCompletion,
} from "@/services/profileCompletionService";

interface OpportunitiesAccountSummaryProps {
  membership:
    MembershipResponse | null;

  completion:
    ProfileCompletion | null;
}

export default function OpportunitiesAccountSummary({
  membership,
  completion,
}: OpportunitiesAccountSummaryProps) {
  const membershipActive =
    membership?.active === true ||
    membership?.status ===
      "ACTIVE";

  const profileComplete =
    completion?.percentage ===
    100;

  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2">
      <SummaryCard
        label="Membership"
        complete={
          membershipActive
        }
        value={
          membershipActive
            ? "✓ Active"
            : "Membership required"
        }
      >
        {!membershipActive && (
          <Link
            href="/membership"
            className="mt-3 inline-flex text-sm font-bold text-[#A98616] hover:text-[#C9A227]"
          >
            Get Membership →
          </Link>
        )}
      </SummaryCard>

      <SummaryCard
        label="Profile"
        complete={
          profileComplete
        }
        value={
          profileComplete
            ? "✓ 100% Complete"
            : `${
                completion
                  ?.percentage ?? 0
              }% Complete`
        }
      >
        {!profileComplete && (
          <Link
            href="/profile"
            className="mt-3 inline-flex text-sm font-bold text-[#A98616] hover:text-[#C9A227]"
          >
            Complete Profile →
          </Link>
        )}
      </SummaryCard>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  complete,
  children,
}: {
  label: string;
  value: string;
  complete: boolean;
  children:
    React.ReactNode;
}) {
  return (
    <div
      className={
        complete
          ? "rounded-[18px] border border-[#BFD7C3] bg-[#F1F8F2] p-5"
          : "rounded-[18px] border border-[#E8DCA9] bg-[#FBF7E8] p-5"
      }
    >
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#858994]">
        {label}
      </p>

      <p
        className={
          complete
            ? "mt-2 font-bold text-[#347A3A]"
            : "mt-2 font-bold text-[#806E30]"
        }
      >
        {value}
      </p>

      {children}
    </div>
  );
}