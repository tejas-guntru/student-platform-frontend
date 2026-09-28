"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
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

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className="
        fixed
        left-1/2
        top-2
        z-50
        w-[96%]
        max-w-7xl
        -translate-x-1/2
        sm:top-4
        sm:w-[95%]
      "
    >
      <nav
        aria-label="Main navigation"
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-gray-200/80
          bg-white/95
          px-4
          shadow-lg
          shadow-gray-900/[0.06]
          backdrop-blur-xl
          sm:px-5
          lg:px-6
        "
      >
        {/* =====================================================
            SUBTLE NAVBAR GLOW
        ===================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-80px]
            h-[130px]
            w-[65%]
            -translate-x-1/2
            rounded-full
            bg-[#1256af]/[0.05]
            blur-[45px]
          "
        />

        {/* =====================================================
            NAVBAR CONTENT
        ===================================================== */}

        <div
          className="
            relative
            z-10
            flex
            h-[68px]
            items-center
            justify-between
            sm:h-[72px]
          "
        >
          {/* ===================================================
              LOGO
          =================================================== */}

          <Link
            href="/"
            onClick={closeMobileMenu}
            className="
              flex
              shrink-0
              items-center
              transition-all
              duration-300
              hover:scale-[1.02]
            "
            aria-label="Trailbliz home"
          >
            <Image
              src="/tbz.png"
              alt="Trailbliz"
              width={190}
              height={50}
              priority
              className="
                h-9
                w-auto
                object-contain
                sm:h-10
                lg:h-11
              "
            />
          </Link>

          {/* ===================================================
              DESKTOP NAVIGATION
          =================================================== */}

          <div
            className="
              hidden
              items-center
              gap-1
              lg:flex
            "
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    relative
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      active
                        ? "text-[#1256af]"
                        : "text-gray-600 hover:bg-[#1256af]/[0.05] hover:text-[#1256af]"
                    }
                  `}
                >
                  {link.label}

                  {active && (
                    <span
                      className="
                        absolute
                        bottom-0
                        left-1/2
                        h-[2px]
                        w-5
                        -translate-x-1/2
                        rounded-full
                        bg-[#1256af]
                      "
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ===================================================
              DESKTOP ACTIONS
          =================================================== */}

          <div
            className="
              hidden
              items-center
              gap-3
              lg:flex
            "
          >
            <Link
              href="/login"
              className="
                inline-flex
                min-h-10
                items-center
                justify-center
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                text-gray-600
                transition-all
                duration-200
                hover:bg-[#1256af]/[0.05]
                hover:text-[#1256af]
              "
            >
              Log in
            </Link>

            <Link
              href="/register"
              className="
                group
                inline-flex
                min-h-11
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
                shadow-[0_8px_24px_rgba(18,86,175,0.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#0f4b99]
                hover:shadow-[0_12px_30px_rgba(18,86,175,0.24)]
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

          {/* ===================================================
              MOBILE MENU BUTTON
          =================================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              bg-white
              text-gray-700
              transition-all
              duration-200
              hover:border-[#1256af]/30
              hover:bg-[#1256af]/[0.04]
              hover:text-[#1256af]
              lg:hidden
            "
          >
            {mobileOpen ? (
              <X size={21} strokeWidth={2} />
            ) : (
              <Menu size={21} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}

        <div
          className={`
            relative
            z-10
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            lg:hidden

            ${
              mobileOpen
                ? "max-h-[520px] border-t border-gray-100 opacity-100"
                : "max-h-0 border-t border-transparent opacity-0"
            }
          `}
        >
          <div className="py-4">
            {/* Mobile navigation links */}

            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      transition-all
                      duration-200

                      ${
                        active
                          ? "bg-[#1256af]/[0.07] text-[#1256af]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#1256af]"
                      }
                    `}
                  >
                    <span>{link.label}</span>

                    {active && (
                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-[#1256af]
                        "
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile actions */}

            <div
              className="
                mt-4
                grid
                grid-cols-2
                gap-3
                border-t
                border-gray-100
                pt-4
              "
            >
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-gray-700
                  transition-all
                  duration-200
                  hover:border-[#1256af]
                  hover:text-[#1256af]
                "
              >
                Log in
              </Link>

              <Link
                href="/register"
                onClick={closeMobileMenu}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#1256af]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_6px_18px_rgba(18,86,175,0.16)]
                  transition-all
                  duration-200
                  hover:bg-[#0f4b99]
                "
              >
                Join Trailbliz
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}