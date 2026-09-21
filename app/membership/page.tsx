"use client";

import MembershipHeader from "@/components/membership/MembershipHeader";
import CurrentMembershipCard from "@/components/membership/CurrentMembershipCard";
import MembershipPlanCard from "@/components/membership/MembershipPlanCard";
import PaymentHistory from "@/components/membership/PaymentHistory";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useMembership,
} from "@/hooks/useMembership";

export default function MembershipPage() {
  const membership =
    useMembership();

  if (
    membership.loading
  ) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] text-[#14213D]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-4 text-sm font-medium text-[#6B707B]">
            Loading membership...
          </p>
        </div>
      </main>
    );
  }

  const isActive =
    membership.membership
      ?.active === true ||
    membership.membership
      ?.status === "ACTIVE";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:py-10 lg:py-12">
        <MembershipHeader />

        <ProfileAlerts
          error={
            membership.error
          }
          success={
            membership.success
          }
        />

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <CurrentMembershipCard
            membership={
              membership.membership
            }
          />

          <MembershipPlanCard
            active={
              isActive
            }
            paying={
              membership.paying
            }
            onPayment={
              membership.handlePayment
            }
          />
        </section>

        <PaymentHistory
          payments={
            membership.payments
          }
        />
      </div>
    </main>
  );
}