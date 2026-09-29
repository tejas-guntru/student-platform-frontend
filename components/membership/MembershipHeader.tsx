import Link from "next/link";

import {
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";

export default function MembershipHeader() {
  return (
    <header
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-5
        py-6
        shadow-sm

        sm:px-6
      "
    >
      <Link
        href="/profile"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-500
          transition-colors

          hover:text-[#1256AF]
        "
      >
        <ArrowLeft size={15} />

        Back to Profile
      </Link>

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
            bg-blue-50
            text-[#1256AF]
          "
        >
          <BadgeCheck size={21} />
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
            Account · Membership
          </p>

          <h1
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-slate-900

              sm:text-3xl
            "
          >
            Student Membership
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-600
            "
          >
            Manage your Trailbliz membership,
            application access, validity period,
            and payment history.
          </p>
        </div>
      </div>
    </header>
  );
}