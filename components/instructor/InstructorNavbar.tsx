"use client";

import Image from "next/image";
import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  BookOpen,
  ChevronDown,
  Layers3,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

/* =========================================================
   NAVIGATION
========================================================= */

const primaryLinks = [
  {
    label: "My Batches",
    href: "/instructor",
    icon: Layers3,
    exact: true,
  },
  {
    label: "Courses",
    href: "/instructor/courses",
    icon: BookOpen,
    exact: false,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getInitials(
  email: string
) {
  if (!email) {
    return "IN";
  }

  const name =
    email.split("@")[0];

  return name
    .split(/[._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part
        .charAt(0)
        .toUpperCase()
    )
    .join("");
}

/* =========================================================
   NAVBAR
========================================================= */

export default function InstructorNavbar() {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const accountRef =
    useRef<HTMLDivElement>(null);

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    accountOpen,
    setAccountOpen,
  ] = useState(false);

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  /* =======================================================
     EMAIL
  ======================================================= */

  useEffect(() => {
    const storedEmail =
      localStorage.getItem(
        "email"
      ) ?? "";

    setEmail(storedEmail);
  }, []);

  /* =======================================================
     CLOSE ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  /* =======================================================
     OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      const target =
        event.target as Node;

      if (
        accountRef.current &&
        !accountRef.current.contains(
          target
        )
      ) {
        setAccountOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     ACTIVE STATE
  ======================================================= */

  function isActive(
    href: string,
    exact = false
  ) {
    if (exact) {
      /*
       * Batch detail pages still belong to
       * the My Batches workspace.
       */
      return (
        pathname === "/instructor" ||
        pathname.startsWith(
          "/instructor/batches/"
        )
      );
    }

    return pathname.startsWith(
      href
    );
  }

  const profileActive =
    pathname.startsWith(
      "/instructor/profile"
    );

  /* =======================================================
     LOGOUT
  ======================================================= */

  function handleLogout() {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "email"
    );

    router.replace("/login");
  }

  const initials =
    getInitials(email);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200/80
        bg-white/95
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[68px]
          max-w-7xl
          items-center
          justify-between
          gap-4
          px-4

          sm:px-6

          lg:px-8
        "
      >
        {/* LOGO */}

        <Link
          href="/instructor"
          aria-label="Trailbliz instructor home"
          className="
            flex
            shrink-0
            items-center
          "
        >
          <Image
            src="/tbz.png"
            alt="Trailbliz"
            width={180}
            height={48}
            priority
            className="
              h-8
              w-auto
              object-contain

              sm:h-9
            "
          />
        </Link>

        {/* DESKTOP NAV */}

        <nav
          aria-label="Instructor navigation"
          className="
            hidden
            items-center
            gap-1

            md:flex
          "
        >
          {primaryLinks.map(
            (link) => (
              <DesktopNavLink
                key={link.href}
                href={link.href}
                active={isActive(
                  link.href,
                  link.exact
                )}
              >
                {link.label}
              </DesktopNavLink>
            )
          )}
        </nav>

        {/* ACCOUNT */}

        <div
          ref={accountRef}
          className="
            relative
            hidden

            md:block
          "
        >
          <button
            type="button"
            onClick={() =>
              setAccountOpen(
                (current) =>
                  !current
              )
            }
            className={`
              flex
              h-11
              items-center
              gap-2
              rounded-xl
              border
              px-1.5
              pr-2.5
              transition-colors

              ${
                accountOpen ||
                profileActive
                  ? `
                      border-[#1256AF]/20
                      bg-blue-50/70
                    `
                  : `
                      border-slate-200
                      bg-white
                      hover:bg-slate-50
                    `
              }
            `}
            aria-expanded={
              accountOpen
            }
          >
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[#1256AF]
                text-[11px]
                font-bold
                text-white
              "
            >
              {initials}
            </span>

            <span
              className="
                hidden
                max-w-[135px]
                text-left

                lg:block
              "
            >
              <span
                className="
                  block
                  text-xs
                  font-bold
                  text-slate-900
                "
              >
                Instructor
              </span>

              <span
                className="
                  block
                  truncate
                  text-[10px]
                  text-slate-500
                "
              >
                {email ||
                  "Instructor account"}
              </span>
            </span>

            <ChevronDown
              size={14}
              className={`
                text-slate-400
                transition-transform

                ${
                  accountOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {accountOpen && (
            <AccountDropdown
              email={email}
              initials={initials}
              pathname={pathname}
              onLogout={
                handleLogout
              }
            />
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(
              (current) =>
                !current
            )
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-700

            md:hidden
          "
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={
            mobileOpen
          }
        >
          {mobileOpen ? (
            <X size={19} />
          ) : (
            <Menu size={19} />
          )}
        </button>
      </div>

      {/* MOBILE NAV */}

      <div
        className={`
          overflow-hidden
          bg-white
          transition-all
          duration-300

          md:hidden

          ${
            mobileOpen
              ? `
                  max-h-[650px]
                  border-t
                  border-slate-200
                  opacity-100
                `
              : `
                  max-h-0
                  opacity-0
                `
          }
        `}
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-4

            sm:px-6
          "
        >
          <p
            className="
              px-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-slate-400
            "
          >
            Workspace
          </p>

          <div
            className="
              mt-2
              space-y-1
            "
          >
            {primaryLinks.map(
              (link) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  active={isActive(
                    link.href,
                    link.exact
                  )}
                />
              )
            )}
          </div>

          {/* MOBILE ACCOUNT */}

          <div
            className="
              my-4
              border-t
              border-slate-100
            "
          />

          <p
            className="
              px-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-slate-400
            "
          >
            Account
          </p>

          <div
            className="
              mt-2
              rounded-xl
              bg-slate-50
              p-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#1256AF]
                  text-[11px]
                  font-bold
                  text-white
                "
              >
                {initials}
              </span>

              <div className="min-w-0">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-900
                  "
                >
                  Instructor
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {email ||
                    "Trailbliz Instructor"}
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE PROFILE */}

          <Link
            href="/instructor/profile"
            className={`
              mt-2
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-semibold
              transition-colors

              ${
                profileActive
                  ? `
                      bg-blue-50
                      text-[#1256AF]
                    `
                  : `
                      text-slate-700
                      hover:bg-slate-50
                    `
              }
            `}
          >
            <span
              className={`
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg

                ${
                  profileActive
                    ? `
                        bg-white
                        text-[#1256AF]
                      `
                    : `
                        bg-slate-100
                        text-slate-500
                      `
                }
              `}
            >
              <UserRound
                size={15}
              />
            </span>

            My Profile
          </Link>

          {/* MOBILE LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-1
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-semibold
              text-red-600
              transition-colors

              hover:bg-red-50
            "
          >
            <span
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-red-50
              "
            >
              <LogOut
                size={15}
              />
            </span>

            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   DESKTOP NAV LINK
========================================================= */

function DesktopNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        relative
        flex
        h-10
        items-center
        rounded-lg
        px-3.5
        text-sm
        font-semibold
        transition-colors

        ${
          active
            ? `
                bg-blue-50
                text-[#1256AF]
              `
            : `
                text-slate-600
                hover:bg-slate-50
                hover:text-slate-950
              `
        }
      `}
    >
      {children}

      {active && (
        <span
          className="
            absolute
            -bottom-[15px]
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

/* =========================================================
   ACCOUNT DROPDOWN
========================================================= */

function AccountDropdown({
  email,
  initials,
  pathname,
  onLogout,
}: {
  email: string;
  initials: string;
  pathname: string;
  onLogout: () => void;
}) {
  const profileActive =
    pathname.startsWith(
      "/instructor/profile"
    );

  return (
    <div
      className="
        absolute
        right-0
        top-[calc(100%+12px)]
        w-[270px]
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-2
        shadow-[0_18px_55px_rgba(15,23,42,0.12)]
      "
    >
      {/* ACCOUNT SUMMARY */}

      <div
        className="
          flex
          items-center
          gap-3
          px-3
          pb-3
          pt-2
        "
      >
        <span
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#1256AF]
            text-xs
            font-bold
            text-white
          "
        >
          {initials}
        </span>

        <div className="min-w-0">
          <p
            className="
              text-sm
              font-bold
              text-slate-900
            "
          >
            Instructor Account
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-[11px]
              text-slate-500
            "
          >
            {email ||
              "Trailbliz Instructor"}
          </p>
        </div>
      </div>

      {/* PROFILE */}

      <div
        className="
          border-t
          border-slate-100
          pt-2
        "
      >
        <Link
          href="/instructor/profile"
          className={`
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            font-semibold
            transition-colors

            ${
              profileActive
                ? `
                    bg-blue-50
                    text-[#1256AF]
                  `
                : `
                    text-slate-700
                    hover:bg-slate-50
                  `
            }
          `}
        >
          <span
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg

              ${
                profileActive
                  ? `
                      bg-white
                      text-[#1256AF]
                    `
                  : `
                      bg-slate-100
                      text-slate-500
                    `
              }
            `}
          >
            <UserRound
              size={15}
            />
          </span>

          <div>
            <p>
              My Profile
            </p>

            <p
              className="
                mt-0.5
                text-[10px]
                font-normal
                text-slate-400
              "
            >
              View and edit profile
            </p>
          </div>
        </Link>
      </div>

      {/* LOGOUT */}

      <div
        className="
          mt-2
          border-t
          border-slate-100
          pt-2
        "
      >
        <button
          type="button"
          onClick={onLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-left
            text-sm
            font-semibold
            text-red-600
            transition-colors

            hover:bg-red-50
          "
        >
          <span
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-red-50
            "
          >
            <LogOut
              size={15}
            />
          </span>

          Log out
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE NAV LINK
========================================================= */

function MobileNavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Layers3;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-sm
        font-semibold
        transition-colors

        ${
          active
            ? `
                bg-blue-50
                text-[#1256AF]
              `
            : `
                text-slate-700
                hover:bg-slate-50
              `
        }
      `}
    >
      <span
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg

          ${
            active
              ? `
                  bg-white
                  text-[#1256AF]
                `
              : `
                  bg-slate-100
                  text-slate-500
                `
          }
        `}
      >
        <Icon size={15} />
      </span>

      {label}
    </Link>
  );
}