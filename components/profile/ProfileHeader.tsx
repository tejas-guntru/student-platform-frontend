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
          flex
          items-end
          justify-between
          gap-4
          px-5
          pt-5

          sm:px-6
          sm:pt-6
        "
      >
        <div>
          <Link
            href="/student"
            className="
              group
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-slate-400
              transition-colors

              hover:text-[#1256AF]
            "
          >
            <ArrowLeft
              size={14}
              className="
                transition-transform
                group-hover:-translate-x-0.5
              "
            />

            Home
          </Link>

          <h1
            className="
              mt-3
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-slate-950
            "
          >
            Profile
          </h1>
        </div>
      </div>

      {/* NAVIGATION */}

      <nav
        className="
          mt-5
          overflow-x-auto
          border-t
          border-slate-100
          px-3

          sm:px-4
        "
        aria-label="Profile navigation"
      >
        <div
          className="
            flex
            min-w-max
            items-center
            gap-1
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
                  key={
                    item.label
                  }
                  href={
                    item.href
                  }
                  scroll={true}
                  className={`
                    relative
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-4
                    text-xs
                    font-semibold
                    transition-colors

                    ${
                      active
                        ? "text-[#1256AF]"
                        : `
                          text-slate-500
                          hover:text-slate-900
                        `
                    }
                  `}
                >
                  <Icon
                    size={14}
                    strokeWidth={
                      active
                        ? 2.5
                        : 2
                    }
                  />

                  {item.label}

                  {active && (
                    <span
                      className="
                        absolute
                        bottom-0
                        left-3
                        right-3
                        h-0.5
                        rounded-full
                        bg-[#1256AF]
                      "
                    />
                  )}
                </Link>
              );
            }
          )}
        </div>
      </nav>
    </header>
  );
}