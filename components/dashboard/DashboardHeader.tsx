"use client";

import Image from "next/image";
import Link from "next/link";

import {
  LogOut,
  UserRound,
} from "lucide-react";

interface DashboardHeaderProps {
  email: string;
  onLogout: () => void;
}

export default function DashboardHeader({
  email,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#DCEAF5]/90
        bg-white/85
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[76px]
          max-w-[1280px]
          items-center
          justify-between
          px-4

          sm:px-6
          lg:px-8
        "
      >
        {/* ===================================================
            BRAND
        =================================================== */}

        <Link
          href="/dashboard"
          className="
            group
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-[#D6E9F6]
              bg-white
              shadow-[0_7px_20px_rgba(8,119,232,0.08)]
              transition-all
              duration-200

              group-hover:-translate-y-0.5
              group-hover:border-[#B9DCF3]
              group-hover:shadow-[0_10px_26px_rgba(8,119,232,0.12)]
            "
          >
            <Image
              src="/trailbliz-icon.png"
              alt="Trailbliz"
              width={32}
              height={32}
              className="
                h-8
                w-8
                object-contain
              "
              priority
            />
          </div>

          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <p
                className="
                  text-[16px]
                  font-bold
                  tracking-[-0.025em]
                  text-[#173B63]
                "
              >
                Trailbliz
              </p>

              <span
                className="
                  hidden
                  rounded-full
                  border
                  border-[#CBE5F8]
                  bg-[#EFF8FF]
                  px-2
                  py-0.5
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#0877E8]

                  sm:inline-flex
                "
              >
                Student
              </span>
            </div>

            <p
              className="
                mt-0.5
                text-[10px]
                font-medium
                text-[#8AA0B2]
              "
            >
              Your career workspace
            </p>
          </div>
        </Link>

        {/* ===================================================
            ACCOUNT
        =================================================== */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              hidden
              items-center
              gap-3
              rounded-2xl
              border
              border-[#DFEBF4]
              bg-[#F8FCFF]
              px-3.5
              py-2

              sm:flex
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#EAF6FF]
                text-[#0877E8]
              "
            >
              <UserRound size={15} />
            </div>

            <div
              className="
                max-w-[210px]
                text-right
              "
            >
              <p
                className="
                  truncate
                  text-xs
                  font-semibold
                  text-[#456982]
                "
              >
                {email || "Student"}
              </p>

              <div
                className="
                  mt-0.5
                  flex
                  items-center
                  justify-end
                  gap-1.5
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-500
                  "
                />

                <p
                  className="
                    text-[9px]
                    font-medium
                    text-[#8A9FAF]
                  "
                >
                  Student account
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D9E8F3]
              bg-white
              px-3.5
              py-2.5
              text-sm
              font-semibold
              text-[#607A90]
              transition-all
              duration-200

              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <LogOut
              size={15}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}