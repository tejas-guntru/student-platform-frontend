"use client";

import Link from "next/link";

import {
  ArrowRight,
  LoaderCircle,
  ReceiptText,
} from "lucide-react";

import MembershipHeader from "@/components/membership/MembershipHeader";
import CurrentMembershipCard from "@/components/membership/CurrentMembershipCard";
import MembershipPlanCard from "@/components/membership/MembershipPlanCard";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useMembership,
} from "@/hooks/useMembership";

export default function MembershipPage() {
  const membership =
    useMembership();

  if (membership.loading) {
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
            Checking your membership
            access.
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

          lg:px-8
          lg:py-10
        "
      >
        <MembershipHeader />

        {(membership.error ||
          membership.success) && (
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
        )}

        {/* MEMBERSHIP */}

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
            active={isActive}
            paying={
              membership.paying
            }
            onPayment={
              membership.handlePayment
            }
          />
        </section>

        {/* ACCOUNT OPTIONS */}

        <section className="mt-8">
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#1256AF]
              "
            >
              Account
            </p>

            <h2
              className="
                mt-1.5
                text-xl
                font-bold
                tracking-[-0.03em]
                text-slate-950
              "
            >
              Membership activity
            </h2>
          </div>

          <Link
            href="/membership/history"
            className="
              group
              mt-4
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              transition-all

              hover:-translate-y-0.5
              hover:border-slate-300
              hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)]

              sm:p-6
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#1256AF]/[0.07]
                text-[#1256AF]
              "
            >
              <ReceiptText
                size={18}
              />
            </div>

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <h3
                className="
                  text-sm
                  font-bold
                  text-slate-900
                "
              >
                Payment History
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                View your previous
                membership payments and
                transaction status.
              </p>
            </div>

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                text-slate-500
                transition-all

                group-hover:border-[#1256AF]
                group-hover:bg-[#1256AF]
                group-hover:text-white
              "
            >
              <ArrowRight
                size={15}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}