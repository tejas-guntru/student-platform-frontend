import Link from "next/link";

import {
  ArrowRight,
  Code2,
  Sparkles,
  UserRound,
} from "lucide-react";

export default function LeaderboardLinks() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.04)]

        sm:p-6
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-[#38BDF8]/10
          blur-[80px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* COPY */}

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
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#0877E8]
              "
            >
              Keep Improving
            </p>

            <Sparkles
              size={12}
              className="text-violet-500"
            />
          </div>

          <h2
            className="
              mt-2
              text-xl
              font-bold
              tracking-[-0.03em]
              text-[#173B63]
            "
          >
            Strengthen your ranking
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            Keep your coding accounts updated and your
            Trailbliz profile complete so your progress is
            represented accurately.
          </p>
        </div>

        {/* LINKS */}

        <div
          className="
            flex
            flex-col
            gap-2.5

            sm:flex-row
          "
        >
          <Link
            href="/coding-profiles"
            className="
              group
              inline-flex
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
            <Code2 size={15} />

            Coding Profiles

            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </Link>

          <Link
            href="/profile"
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D5E7F3]
              bg-[#F8FCFF]
              px-4
              py-2.5
              text-sm
              font-bold
              text-[#58748B]
              transition-all
              duration-200

              hover:border-[#B9DCF2]
              hover:bg-white
              hover:text-[#0877E8]
            "
          >
            <UserRound size={15} />

            My Profile

            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}