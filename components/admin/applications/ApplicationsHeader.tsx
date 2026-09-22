import Link from "next/link";

import {
  ArrowLeft,
  BriefcaseBusiness,
  UsersRound,
} from "lucide-react";

export default function ApplicationsHeader() {
  return (
    <header
      className="
        flex
        flex-col
        gap-4
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white/85
        px-5
        py-4
        shadow-[0_10px_35px_rgba(8,119,232,0.05)]
        backdrop-blur-xl

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* LEFT */}

      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[#EAF6FF]
            text-[#0877E8]
          "
        >
          <UsersRound size={20} />
        </div>

        <div>
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <p
              className="
                text-lg
                font-bold
                tracking-[-0.025em]
                text-[#173B63]
              "
            >
              Applications
            </p>

            <span
              className="
                rounded-full
                border
                border-[#CBE5F8]
                bg-[#EFF8FF]
                px-2.5
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#0877E8]
              "
            >
              Admin
            </span>
          </div>

          <p
            className="
              mt-0.5
              text-xs
              text-[#8297AA]
            "
          >
            Review candidates and manage hiring progress
          </p>
        </div>
      </div>

      {/* ACTIONS */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <Link
          href="/admin/opportunities"
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#CFE4F3]
            bg-[#F7FBFF]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#0877E8]
            transition-all
            duration-200

            hover:border-[#A9D2EC]
            hover:bg-[#EEF8FF]
            hover:shadow-[0_8px_22px_rgba(8,119,232,0.07)]
          "
        >
          <BriefcaseBusiness
            size={15}
          />

          Opportunities
        </Link>

        <Link
          href="/admin/dashboard"
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#D8E8F4]
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#58738B]
            transition-all
            duration-200

            hover:border-[#B8DBF3]
            hover:bg-[#F5FBFF]
            hover:text-[#0877E8]
          "
        >
          <ArrowLeft
            size={15}
            className="
              transition-transform
              duration-200
              group-hover:-translate-x-0.5
            "
          />

          Dashboard
        </Link>
      </div>
    </header>
  );
}