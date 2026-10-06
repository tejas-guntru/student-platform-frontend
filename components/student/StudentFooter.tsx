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
            gap-8

            md:grid-cols-[1fr_auto_auto]
            md:gap-14
          "
        >
          {/* BRAND */}

          <div>
            <Link
              href="/student"
              aria-label="Trailbliz student home"
              className="inline-flex"
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
                text-sm
                leading-6
                text-slate-500
              "
            >
              Learn. Build. Move
              forward.
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
            flex-col
            gap-4
            border-t
            border-slate-100
            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-xs
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
              w-fit
              items-center
              gap-1.5
              text-xs
              font-medium
              text-slate-400
              transition-colors

              hover:text-[#1256AF]
            "
          >
            Built with
            <Heart
              size={11}
              className="fill-current"
            />
            by Tejas Guntru

            <ArrowUpRight
              size={11}
              className="
                ml-0.5
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
    <div>
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
          flex-wrap
          gap-x-5
          gap-y-2.5

          md:flex-col
          md:items-start
          md:gap-2
        "
        aria-label={`${title} links`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="
              text-sm
              font-medium
              text-slate-600
              transition-colors

              hover:text-[#1256AF]
            "
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}