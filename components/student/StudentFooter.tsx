import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Heart,
} from "lucide-react";

const exploreLinks = [
  {
    label: "Home",
    href: "/student",
  },
  {
    label: "Courses",
    href: "/student/courses",
  },
  {
    label: "Batches",
    href: "/student/batches",
  },
  {
    label: "Opportunities",
    href: "/opportunities",
  },
];

const accountLinks = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Applications",
    href: "/applications",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Membership",
    href: "/membership",
  },
];

export default function StudentFooter() {
  const year =
    new Date().getFullYear();

  return (
    <footer
      className="
        min-w-0
        border-t
        border-slate-200
        bg-white
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
        "
      >
        {/* MAIN */}

        <div
          className="
            grid
            min-w-0
            grid-cols-1
            gap-8

            sm:grid-cols-2
            sm:gap-x-10

            md:grid-cols-[minmax(0,1fr)_auto_auto]
            md:gap-14
          "
        >
          {/* BRAND */}

          <div
            className="
              min-w-0

              sm:col-span-2

              md:col-span-1
            "
          >
            <Link
              href="/student"
              aria-label="Trailbliz student home"
              className="
                inline-flex
                rounded-lg

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/25
                focus-visible:ring-offset-2
              "
            >
              <Image
                src="/tbz.png"
                alt="Trailbliz"
                width={150}
                height={42}
                className="
                  h-8
                  w-auto
                  object-contain
                "
              />
            </Link>

            <p
              className="
                mt-3
                max-w-xs
                break-words
                text-sm
                leading-6
                text-slate-500
              "
            >
              Learn. Build. Move forward.
            </p>
          </div>

          {/* EXPLORE */}

          <FooterGroup
            title="Explore"
            links={exploreLinks}
          />

          {/* ACCOUNT */}

          <FooterGroup
            title="Account"
            links={accountLinks}
          />
        </div>

        {/* BOTTOM */}

        <div
          className="
            mt-8
            flex
            min-w-0
            flex-col
            gap-3
            border-t
            border-slate-100
            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-4
          "
        >
          <p
            className="
              shrink-0
              text-xs
              leading-5
              text-slate-400
            "
          >
            © {year} Trailbliz
          </p>

          <Link
            href="/developers"
            className="
              group
              inline-flex
              min-h-10
              w-fit
              max-w-full
              items-center
              gap-1.5
              rounded-lg
              text-xs
              font-medium
              leading-5
              text-slate-400
              transition-colors

              hover:text-[#1256AF]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1256AF]/25
              focus-visible:ring-offset-2
            "
          >
            <span className="break-words">
              Built with
            </span>

            <Heart
              size={11}
              className="
                shrink-0
                fill-current
              "
              aria-hidden="true"
            />

            <span className="break-words">
              by Tejas Guntru
            </span>

            <ArrowUpRight
              size={11}
              aria-hidden="true"
              className="
                ml-0.5
                shrink-0
                transition-transform

                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER GROUP
========================================================= */

interface FooterGroupProps {
  title: string;

  links: {
    label: string;
    href: string;
  }[];
}

function FooterGroup({
  title,
  links,
}: FooterGroupProps) {
  return (
    <div className="min-w-0">
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-slate-400
        "
      >
        {title}
      </p>

      <nav
        className="
          mt-3
          flex
          min-w-0
          flex-wrap
          gap-x-4
          gap-y-1

          md:flex-col
          md:items-start
          md:gap-1
        "
        aria-label={`${title} links`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="
              inline-flex
              min-h-10
              max-w-full
              items-center
              rounded-lg
              py-1
              text-sm
              font-medium
              text-slate-600
              transition-colors

              hover:text-[#1256AF]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1256AF]/20
              focus-visible:ring-offset-1
            "
          >
            <span className="break-words">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}