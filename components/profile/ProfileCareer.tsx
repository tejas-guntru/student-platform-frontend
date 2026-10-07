import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  Crown,
  Trophy,
} from "lucide-react";

const careerLinks = [
  {
    title: "Opportunities",
    description:
      "Discover internships and roles available through Trailbliz.",
    href: "/opportunities",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    description:
      "Track your applications and their current status.",
    href: "/applications",
    icon: ClipboardList,
  },
  {
    title: "Leaderboard",
    description:
      "See your progress across college and global rankings.",
    href: "/leaderboard",
    icon: Trophy,
  },
];

export default function ProfileCareer() {
  return (
    <section
      className="min-w-0"
      aria-labelledby="profile-career-title"
    >
      {/* HEADING */}

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-[#1256AF]
          "
        >
          Career
        </p>

        <h2
          id="profile-career-title"
          className="
            mt-2
            break-words
            text-xl
            font-bold
            tracking-[-0.035em]
            text-slate-950

            sm:text-2xl
          "
        >
          Move forward
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            break-words
            text-sm
            leading-6
            text-slate-500
          "
        >
          Your career tools live here and use the
          profile you&apos;ve built on Trailbliz.
        </p>
      </div>

      {/* CAREER TOOLS */}

      <div
        className="
          mt-5
          grid
          min-w-0
          grid-cols-1
          gap-4

          sm:mt-6
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {careerLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                group
                flex
                min-w-0
                flex-col
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                transition-all
                duration-300

                hover:border-[#1256AF]/20
                hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/25
                focus-visible:ring-offset-2

                sm:min-h-[190px]
                sm:p-5

                lg:hover:-translate-y-1
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#1256AF]/[0.07]
                  text-[#1256AF]

                  sm:h-11
                  sm:w-11
                "
              >
                <Icon
                  size={19}
                  aria-hidden="true"
                />
              </div>

              <h3
                className="
                  mt-4
                  break-words
                  font-bold
                  text-slate-900

                  [overflow-wrap:anywhere]

                  sm:mt-5
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-2
                  flex-1
                  break-words
                  text-sm
                  leading-6
                  text-slate-500

                  [overflow-wrap:anywhere]
                "
              >
                {item.description}
              </p>

              <div
                className="
                  mt-4
                  flex
                  min-h-10
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#1256AF]

                  sm:mt-5
                "
              >
                Open

                <ArrowRight
                  size={14}
                  className="
                    shrink-0
                    transition-transform

                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* MEMBERSHIP */}

      <Link
        href="/membership"
        className="
          group
          mt-4
          flex
          min-w-0
          flex-col
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          transition-all

          hover:border-[#1256AF]/20
          hover:shadow-[0_12px_34px_rgba(15,23,42,0.05)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#1256AF]/25
          focus-visible:ring-offset-2

          sm:flex-row
          sm:items-center
          sm:p-5
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-amber-50
            text-amber-600

            sm:h-11
            sm:w-11
          "
        >
          <Crown
            size={19}
            aria-hidden="true"
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
              break-words
              font-bold
              text-slate-900
            "
          >
            Membership
          </h3>

          <p
            className="
              mt-1
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-slate-500

              [overflow-wrap:anywhere]
            "
          >
            View your Trailbliz membership and account
            access.
          </p>
        </div>

        <div
          className="
            flex
            min-h-10
            shrink-0
            items-center
            gap-2
            self-start
            text-sm
            font-semibold
            text-[#1256AF]

            sm:self-auto
          "
        >
          <span className="break-words">
            Manage membership
          </span>

          <ArrowRight
            size={14}
            className="
              shrink-0
              transition-transform

              group-hover:translate-x-1
            "
            aria-hidden="true"
          />
        </div>
      </Link>
    </section>
  );
}