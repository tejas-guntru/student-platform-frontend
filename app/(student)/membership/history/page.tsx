"use client";

import Link from "next/link";

import {
  ArrowLeft,
  LoaderCircle,
  ReceiptText,
} from "lucide-react";

import PaymentHistory from "@/components/membership/PaymentHistory";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useMembership,
} from "@/hooks/useMembership";

function HistoryLoading() {
  return (
    <main
      className="
        flex
        min-h-[65vh]
        items-center
        justify-center
        bg-[#F7F9FC]
        px-6
      "
    >
      <div className="text-center">
        <div
          className="
            mx-auto
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
          role="status"
          className="
            mt-4
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Loading payment history...
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
          "
        >
          Retrieving your membership
          payments.
        </p>
      </div>
    </main>
  );
}

export default function MembershipHistoryPage() {
  const membership =
    useMembership();

  if (membership.loading) {
    return <HistoryLoading />;
  }

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
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
          lg:py-12
        "
      >
        {/* BACK */}

        <Link
          href="/membership"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-500
            transition-colors

            hover:text-slate-950
          "
        >
          <ArrowLeft
            size={16}
          />

          Back to Membership
        </Link>

        {/* HEADER */}

        <div
          className="
            mt-6
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#1256AF]/[0.07]
              text-[#1256AF]
            "
          >
            <ReceiptText
              size={20}
            />
          </div>

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
              Membership
            </p>

            <h1
              className="
                mt-1
                text-2xl
                font-bold
                tracking-[-0.04em]
                text-slate-950

                sm:text-3xl
              "
            >
              Payment History
            </h1>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              Review your membership
              payments and transaction
              status.
            </p>
          </div>
        </div>

        {/* ERROR */}

        {membership.error && (
          <div className="mt-6">
            <ProfileAlerts
              error={
                membership.error
              }
              success=""
            />
          </div>
        )}

        {/* HISTORY */}

        <div className="mt-7">
          <PaymentHistory
            payments={
              membership.payments
            }
          />
        </div>
      </div>
    </main>
  );
}