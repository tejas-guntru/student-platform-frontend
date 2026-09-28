import Image from "next/image";
import Link from "next/link";

import {
  Code2,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

export default function CodingProfilesHeader() {
  return (
    <header
      className="
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#DCEAF5]
        bg-white
        px-5
        py-5
        shadow-[0_10px_32px_rgba(8,119,232,0.05)]

        sm:px-6
        sm:py-6
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-violet-500
          to-[#38BDF8]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-violet-500/10
          blur-[80px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}

        <div
          className="
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
              overflow-hidden
              rounded-2xl
              border
              border-[#D7EAF6]
              bg-[#F8FCFF]
              shadow-[0_7px_18px_rgba(8,119,232,0.06)]
            "
          >
            <Image
              src="/tbz.png"
              alt="Trailbliz"
              width={34}
              height={34}
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
                flex-wrap
                items-center
                gap-2
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#CBE5F8]
                  bg-[#EFF8FF]
                  px-2.5
                  py-1
                "
              >
                <Code2
                  size={12}
                  className="text-[#0877E8]"
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#0877E8]
                  "
                >
                  Coding Profiles
                </span>
              </div>

              <div
                className="
                  hidden
                  items-center
                  gap-1.5
                  text-[9px]
                  font-semibold
                  text-[#8AA0B2]

                  sm:flex
                "
              >
                <Sparkles
                  size={11}
                  className="text-violet-500"
                />

                Competitive programming
              </div>
            </div>

            <h1
              className="
                mt-3
                text-3xl
                font-bold
                tracking-[-0.045em]
                text-[#173B63]

                sm:text-[34px]
              "
            >
              Coding Accounts
            </h1>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-[#71899D]
              "
            >
              Connect and manage your competitive programming
              profiles so your coding progress stays visible
              across Trailbliz.
            </p>
          </div>
        </div>

        {/* DASHBOARD */}

        <Link
          href="/dashboard"
          className="
            inline-flex
            w-fit
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#0877E8]
            to-[#1294F2]
            px-4
            py-2.5
            text-sm
            font-bold
            text-white
            shadow-[0_8px_20px_rgba(8,119,232,0.18)]
            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:shadow-[0_12px_26px_rgba(8,119,232,0.24)]
          "
        >
          <LayoutDashboard size={15} />

          Dashboard
        </Link>
      </div>
    </header>
  );
}