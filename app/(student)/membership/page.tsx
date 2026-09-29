"use client";

import {
  LoaderCircle,
} from "lucide-react";

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
      <main
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          bg-[#F7F9FC]
          px-6
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            text-center
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-[#1256AF]
              shadow-sm
            "
          >
            <LoaderCircle
              size={20}
              className="animate-spin"
            />
          </div>

          <p
            className="
              mt-4
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Loading membership...
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Checking your membership access.
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
    <main
      className="
        min-h-screen
        bg-[#F7F9FC]
        text-slate-900
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-6

          sm:px-6
          sm:py-8

          lg:py-10
        "
      >
        <MembershipHeader />

        <div className="mt-5">
          <ProfileAlerts
            error={
              membership.error
            }
            success={
              membership.success
            }
          />
        </div>

        <section
          className="
            mt-6
            grid
            items-stretch
            gap-6

            lg:grid-cols-2
          "
        >
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