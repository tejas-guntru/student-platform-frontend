"use client";

import Link from "next/link";
import {
  usePathname,
} from "next/navigation";

import {
  ArrowLeft,
  BriefcaseBusiness,
  Code2,
  FolderGit2,
  UserRound,
  Wrench,
} from "lucide-react";

const profileNavigation = [
  {
    label: "Basic",
    href: "/profile#basic-profile",
    route: "/profile",
    icon: UserRound,
  },
  {
    label: "Skills",
    href: "/profile/skills",
    route: "/profile/skills",
    icon: Wrench,
  },
  {
    label: "Projects",
    href: "/profile/projects",
    route: "/profile/projects",
    icon: FolderGit2,
  },
  {
    label: "Experience",
    href: "/profile/experience",
    route: "/profile/experience",
    icon: BriefcaseBusiness,
  },
  {
    label: "Coding",
    href: "/coding-profiles",
    route: "/coding-profiles",
    icon: Code2,
  },
];

export default function ProfileHeader() {
  const pathname =
    usePathname();

  return (
    <header
      className="
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      {/* TOP */}

      <div
        className="
          min-w-0
          px-4
          pt-4

          sm:px-6
          sm:pt-6
        "
      >
        <div className="min-w-0">
          <Link
            href="/student"
            className="
              group
              inline-flex
              min-h-10
              items-center
              gap-1.5
              rounded-lg
              text-xs
              font-semibold
              text-slate-400
              transition-colors

              hover:text-[#1256AF]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1256AF]/25
              focus-visible:ring-offset-2
            "
          >
            <ArrowLeft
              size={14}
              className="
                shrink-0
                transition-transform

                group-hover:-translate-x-0.5
              "
              aria-hidden="true"
            />

            Home
          </Link>

          <h1
            className="
              mt-2
              break-words
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-slate-950

              [overflow-wrap:anywhere]

              sm:mt-3
              sm:text-3xl
            "
          >
            Profile
          </h1>

          <p
            className="
              mt-1
              max-w-xl
              break-words
              text-sm
              leading-6
              text-slate-500
            "
          >
            Manage your profile, skills,
            projects, experience, and coding
            information.
          </p>
        </div>
      </div>

      {/* NAVIGATION */}

      <nav
        className="
          mt-4
          min-w-0
          border-t
          border-slate-100

          sm:mt-5
        "
        aria-label="Profile navigation"
      >
        <div
          className="
            overflow-x-auto
            overscroll-x-contain
            px-2

            sm:px-4
          "
        >
          <div
            className="
              flex
              min-w-max
              items-center
              gap-0.5

              sm:gap-1
            "
          >
            {profileNavigation.map(
              (item) => {
                const Icon =
                  item.icon;

                const active =
                  pathname ===
                  item.route;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    scroll={true}
                    aria-current={
                      active
                        ? "page"
                        : undefined
                    }
                    className={`
                      relative
                      inline-flex
                      min-h-12
                      shrink-0
                      items-center
                      justify-center
                      gap-2
                      rounded-t-lg
                      px-3
                      text-xs
                      font-semibold
                      transition-colors

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-[#1256AF]/25

                      sm:min-h-14
                      sm:px-4

                      ${
                        active
                          ? `
                            bg-[#1256AF]/[0.035]
                            text-[#1256AF]
                          `
                          : `
                            text-slate-500

                            hover:bg-slate-50
                            hover:text-slate-900
                          `
                      }
                    `}
                  >
                    <Icon
                      size={14}
                      className="shrink-0"
                      strokeWidth={
                        active
                          ? 2.5
                          : 2
                      }
                      aria-hidden="true"
                    />

                    <span>
                      {item.label}
                    </span>

                    {active && (
                      <span
                        className="
                          absolute
                          bottom-0
                          left-2.5
                          right-2.5
                          h-0.5
                          rounded-full
                          bg-[#1256AF]

                          sm:left-3
                          sm:right-3
                        "
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}