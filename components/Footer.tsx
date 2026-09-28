import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
} from "lucide-react";

/* =========================================================
   SOCIAL ICONS
========================================================= */

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        ry="5"
      />

      <circle cx="12" cy="12" r="4" />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.4 3.5A2.4 2.4 0 1 1 5.4 8.3a2.4 2.4 0 0 1 0-4.8ZM3.4 9.7h4v10.8h-4V9.7Zm6.4 0h3.8v1.5h.1c.5-.9 1.8-1.9 3.8-1.9 4.1 0 4.8 2.7 4.8 6.2v5h-4v-4.4c0-1.1 0-3-1.9-3-1.9 0-2.2 1.4-2.2 2.9v4.5h-4V9.7Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM10 15.3V8.7l5.7 3.3L10 15.3Z" />
    </svg>
  );
}

/* =========================================================
   DATA
========================================================= */

const quickLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Hiring",
    href: "/hiring",
  },
  {
    label: "Blogs",
    href: "/login",
  },
  {
    label: "About",
    href: "/about",
  },
];

const platformLinks = [
  {
    label: "Build your profile",
    href: "/register",
  },
  {
    label: "Log in",
    href: "/login",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/trailbliz/",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/trailbliz/",
    icon: LinkedInIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@trailbliz",
    icon: YouTubeIcon,
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-gray-950
        text-white
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            top-0
            h-80
            w-80
            rounded-full
            bg-[#1256af]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-0
            h-80
            w-80
            rounded-full
            bg-[#1256af]/10
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          pb-8
          pt-14
          sm:px-6
          sm:pt-16
          lg:px-8
          lg:pt-20
        "
      >
        {/* =====================================================
            TOP MESSAGE
        ===================================================== */}

        <div
          className="
            mb-12
            flex
            flex-col
            gap-6
            border-b
            border-white/10
            pb-10
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#60A5FA]
              "
            >
              Trailbliz
            </p>

            <h2
              className="
                mt-3
                max-w-2xl
                text-2xl
                font-bold
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              Build your story.
              <span className="text-gray-400">
                {" "}
                Keep moving forward.
              </span>
            </h2>
          </div>

          <Link
            href="/register"
            className="
              group
              inline-flex
              min-h-11
              w-fit
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#1256af]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#0f4b99]
              hover:shadow-md
            "
          >
            Join Trailbliz

            <span
              aria-hidden="true"
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>
        </div>

        {/* =====================================================
            MAIN FOOTER GRID
        ===================================================== */}

        <div
          className="
            grid
            gap-12
            md:grid-cols-2
            lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]
            lg:gap-10
          "
        >
          {/* ===================================================
              BRAND
          =================================================== */}

          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Trailbliz home"
              className="
                inline-flex
                items-center
              "
            >
              <div
                className="
                  rounded-xl
                  bg-white
                  px-3
                  py-2
                "
              >
                <Image
                  src="/tbz.png"
                  alt="Trailbliz"
                  width={180}
                  height={50}
                  className="
                    h-9
                    w-auto
                    object-contain
                    sm:h-10
                  "
                />
              </div>
            </Link>

            <p
              className="
                mt-6
                text-sm
                leading-7
                text-gray-400
                sm:text-[15px]
              "
            >
              Build your skills, showcase your work, discover
              opportunities and keep moving toward what comes
              next.
            </p>

            {/* Social links */}

            <div
              className="
                mt-7
                flex
                items-center
                gap-3
              "
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-gray-400
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#1256af]
                      hover:bg-[#1256af]
                      hover:text-white
                    "
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ===================================================
              EXPLORE
          =================================================== */}

          <div>
            <h3
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              Explore
            </h3>

            <div
              className="
                mt-5
                flex
                flex-col
                gap-3.5
              "
            >
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-gray-400
                    transition-colors
                    duration-200
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ===================================================
              PLATFORM
          =================================================== */}

          <div>
            <h3
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              Platform
            </h3>

            <div
              className="
                mt-5
                flex
                flex-col
                gap-3.5
              "
            >
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-gray-400
                    transition-colors
                    duration-200
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ===================================================
              CONTACT
          =================================================== */}

          <div>
            <h3
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              Get in touch
            </h3>

            <div className="mt-5 space-y-4">
              {/* Email */}

              <a
                href="mailto:contact@nirudhyog.com"
                className="
                  group
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-gray-400
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                <div
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/[0.05]
                    text-gray-400
                    transition-all
                    duration-200
                    group-hover:bg-[#1256af]
                    group-hover:text-white
                  "
                >
                  <Mail size={15} />
                </div>

                <span
                  className="
                    break-all
                    pt-1.5
                  "
                >
                  contact@nirudhyog.com
                </span>
              </a>

              {/* Phone */}

              <a
                href="tel:+918121398942"
                className="
                  group
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-gray-400
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                <div
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/[0.05]
                    text-gray-400
                    transition-all
                    duration-200
                    group-hover:bg-[#1256af]
                    group-hover:text-white
                  "
                >
                  <MessageCircle size={15} />
                </div>

                <span className="pt-1.5">
                  +91 81213 98942
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div
          className="
            mt-12
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            pt-7
            text-sm
            text-gray-500
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {currentYear} Trailbliz. All rights reserved.
          </p>

          <p>
  Made with love.{" "}
  <Link
    href="/developers"
    className="text-gray-300 transition-colors duration-200 hover:text-white"
  >
    Tejas Guntru
  </Link>
</p>
        </div>
      </div>
    </footer>
  );
}