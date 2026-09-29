import Link from "next/link";

import {
  ArrowRight,
  Code2,
  UserRound,
} from "lucide-react";

export default function LeaderboardLinks() {
  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        sm:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#1256AF]
            "
          >
            Keep improving
          </p>

          <h2
            className="
              mt-1.5
              text-lg
              font-bold
              text-slate-900
            "
          >
            Strengthen your ranking
          </h2>

          <p
            className="
              mt-1.5
              max-w-xl
              text-sm
              leading-6
              text-slate-600
            "
          >
            Keep your coding accounts updated and your
            Trailbliz profile complete so your progress is
            represented accurately.
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            gap-2

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
              rounded-lg
              bg-[#1256AF]
              px-4
              py-2.5
              text-sm
              font-bold
              text-white
              transition

              hover:bg-[#0E4C9D]
            "
          >
            <Code2 size={15} />

            Coding Profiles

            <ArrowRight
              size={14}
              className="
                transition-transform
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
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-bold
              text-slate-600
              transition

              hover:border-blue-200
              hover:text-[#1256AF]
            "
          >
            <UserRound size={15} />

            My Profile

            <ArrowRight
              size={14}
              className="
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}