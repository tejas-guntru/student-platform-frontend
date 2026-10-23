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

  const linkClass =
    "rounded-sm text-sm text-slate-600 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-14 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr]">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Trailbliz home"
              className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              <Image
                src="/tbz.png"
                alt="Trailbliz"
                width={180}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
              Build your skills, showcase your work, and discover
              your next opportunity.
            </p>

            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Explore">
            <h3 className="text-sm font-semibold text-slate-900">
              Explore
            </h3>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Platform">
            <h3 className="text-sm font-semibold text-slate-900">
              Platform
            </h3>

            <ul className="mt-4 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900">
              Get in touch
            </h3>

            <address className="mt-4 space-y-3 not-italic">
              <a
                href="mailto:contact@nirudhyog.com"
                className={`${linkClass} inline-flex max-w-full items-center gap-3`}
              >
                <Mail
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-slate-400"
                />
                <span className="break-all">
                  contact@nirudhyog.com
                </span>
              </a>

              <div>
                <a
                  href="tel:+918121398942"
                  className={`${linkClass} inline-flex items-center gap-3`}
                >
                  <MessageCircle
                    size={17}
                    aria-hidden="true"
                    className="shrink-0 text-slate-400"
                  />
                  <span>+91 81213 98942</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Trailbliz. All rights reserved.</p>

          <p>
            Made with love by{" "}
            <Link
              href="/developers"
              className="rounded-sm font-medium text-slate-700 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              Tejas Guntru
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}