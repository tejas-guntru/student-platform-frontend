import Link from "next/link";

import {
  ArrowRight,
  Code2,
  Trophy,
} from "lucide-react";

export default function TrackingCards() {
  return (
    <div
      className="
        grid
        gap-5

        md:grid-cols-2
      "
    >
      {/* =====================================================
          CODING PROFILES
      ===================================================== */}

      <article
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-[#DCEAF5]
          bg-white
          p-5
          shadow-[0_10px_30px_rgba(8,119,232,0.045)]
          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-[#B8DCF3]
          hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]

          sm:p-6
        "
      >
        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-[3px]
            bg-gradient-to-r
            from-[#0877E8]
            to-[#38BDF8]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-14
            -top-14
            h-36
            w-36
            rounded-full
            bg-[#38BDF8]/0
            blur-3xl
            transition-all
            duration-300

            group-hover:bg-[#38BDF8]/10
          "
        />

        <div className="relative">
          <div
            className="
              flex
              items-start
              justify-between
              gap-5
            "
          >
            <div>
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#EAF6FF]
                  text-[#0877E8]
                "
              >
                <Code2 size={19} />
              </div>

              <p
                className="
                  mt-5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#0877E8]
                "
              >
                Progress
              </p>

              <h3
                className="
                  mt-1.5
                  text-xl
                  font-bold
                  tracking-[-0.03em]
                  text-[#173B63]
                "
              >
                Coding Profiles
              </h3>

              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-[#6F879A]
                "
              >
                Connect your coding profiles and
                keep your technical progress visible
                in your Trailbliz profile.
              </p>
            </div>

            <span
              className="
                hidden
                rounded-full
                border
                border-[#D7E8F4]
                bg-[#F8FCFF]
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#66849A]

                sm:inline-flex
              "
            >
              Skills
            </span>
          </div>

          <div
            className="
              mt-6
              border-t
              border-[#E7F0F7]
              pt-4
            "
          >
            <Link
              href="/coding-profiles"
              className="
                group/link
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-[#0877E8]
                transition

                hover:text-[#1294F2]
              "
            >
              Manage Coding Profiles

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover/link:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </article>

      {/* =====================================================
          LEADERBOARD
      ===================================================== */}

      <article
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-[#DCEAF5]
          bg-white
          p-5
          shadow-[0_10px_30px_rgba(8,119,232,0.045)]
          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-[#B8DCF3]
          hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]

          sm:p-6
        "
      >
        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-[3px]
            bg-gradient-to-r
            from-violet-500
            via-[#0877E8]
            to-[#38BDF8]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-14
            -top-14
            h-36
            w-36
            rounded-full
            bg-violet-500/0
            blur-3xl
            transition-all
            duration-300

            group-hover:bg-violet-500/10
          "
        />

        <div className="relative">
          <div
            className="
              flex
              items-start
              justify-between
              gap-5
            "
          >
            <div>
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-violet-50
                  text-violet-600
                "
              >
                <Trophy size={19} />
              </div>

              <p
                className="
                  mt-5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-violet-600
                "
              >
                Rankings
              </p>

              <h3
                className="
                  mt-1.5
                  text-xl
                  font-bold
                  tracking-[-0.03em]
                  text-[#173B63]
                "
              >
                Leaderboard
              </h3>

              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-[#6F879A]
                "
              >
                Track your performance and see how
                your verified coding progress compares
                across the student community.
              </p>
            </div>

            <span
              className="
                hidden
                rounded-full
                border
                border-violet-100
                bg-violet-50
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-violet-600

                sm:inline-flex
              "
            >
              Ranking
            </span>
          </div>

          <div
            className="
              mt-6
              border-t
              border-[#E7F0F7]
              pt-4
            "
          >
            <Link
              href="/leaderboard"
              className="
                group/link
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-[#0877E8]
                transition

                hover:text-[#1294F2]
              "
            >
              View Leaderboard

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover/link:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}