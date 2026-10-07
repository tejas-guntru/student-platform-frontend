"use client";

import Image from "next/image";
import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  BriefcaseBusiness,
  ChevronDown,
  ClipboardCheck,
  Code2,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  Trophy,
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
    label: "Home",
    href: "/student",
    icon: Home,
  },
  {
    label: "Courses",
    href: "/student/courses",
    icon: GraduationCap,
  },
  {
    label: "Batches",
    href: "/student/batches",
    icon: ClipboardCheck,
  },
];

const careerLinks = [
  {
    label: "Opportunities",
    description: "Jobs and internships",
    href: "/opportunities",
    icon: BriefcaseBusiness,
  },
  {
    label: "Applications",
    description: "Track your applications",
    href: "/applications",
    icon: FileText,
  },
  {
    label: "Leaderboard",
    description: "Compare coding progress",
    href: "/leaderboard",
    icon: Trophy,
  },
];

const accountLinks = [
  {
    label: "My Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    label: "Coding Profiles",
    href: "/coding-profiles",
    icon: Code2,
  },
  {
    label: "Membership",
    href: "/membership",
    icon: GraduationCap,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getInitials(email: string) {
  if (!email) {
    return "ST";
  }

  const name = email.split("@")[0];

  return name
    .split(/[._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("");
}

/* =========================================================
   NAVBAR
========================================================= */

export default function StudentNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const accountRef =
    useRef<HTMLDivElement>(null);

  const careerRef =
    useRef<HTMLDivElement>(null);

  const [email, setEmail] =
    useState("");

  const [
    accountOpen,
    setAccountOpen,
  ] = useState(false);

  const [
    careerOpen,
    setCareerOpen,
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
      localStorage.getItem("email") ?? "";

    setEmail(storedEmail);
  }, []);

  /* =======================================================
     CLOSE ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
    setCareerOpen(false);
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
        !accountRef.current.contains(target)
      ) {
        setAccountOpen(false);
      }

      if (
        careerRef.current &&
        !careerRef.current.contains(target)
      ) {
        setCareerOpen(false);
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
    href: string
  ) {
    if (href === "/student") {
      return pathname === "/student";
    }

    return pathname.startsWith(href);
  }

  const careerActive =
    careerLinks.some((link) =>
      isActive(link.href)
    );

  const profileActive =
    pathname.startsWith("/profile") ||
    pathname.startsWith(
      "/coding-profiles"
    ) ||
    pathname.startsWith("/membership");

  /* =======================================================
     LOGOUT
  ======================================================= */

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

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
          gap-3
          px-4

          sm:gap-4
          sm:px-6

          lg:px-8
        "
      >
        {/* LOGO */}

        <Link
          href="/student"
          aria-label="Trailbliz student home"
          className="
            flex
            min-w-0
            shrink-0
            items-center
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

        {/* DESKTOP NAVIGATION */}

        <nav
          aria-label="Student navigation"
          className="
            hidden
            min-w-0
            items-center
            gap-1

            md:flex
          "
        >
          {primaryLinks.map(
            (link) => {
              const active =
                isActive(link.href);

              return (
                <NavLink
                  key={link.href}
                  href={link.href}
                  active={active}
                >
                  {link.label}
                </NavLink>
              );
            }
          )}

          {/* CAREER */}

          <div
            ref={careerRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setCareerOpen(
                  (current) => !current
                );

                setAccountOpen(false);
              }}
              className={`
                flex
                h-10
                items-center
                gap-1.5
                rounded-lg
                px-3
                text-sm
                font-semibold
                transition-colors

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1256AF]/25
                focus-visible:ring-offset-2

                lg:px-3.5

                ${
                  careerActive
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
              aria-haspopup="menu"
              aria-expanded={careerOpen}
              aria-controls="student-career-menu"
            >
              <span>Career</span>

              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`
                  shrink-0
                  transition-transform

                  ${
                    careerOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {careerOpen && (
              <CareerDropdown />
            )}
          </div>
        </nav>

        {/* DESKTOP ACCOUNT */}

        <div
          ref={accountRef}
          className="
            relative
            hidden
            shrink-0

            md:block
          "
        >
          <button
            type="button"
            onClick={() => {
              setAccountOpen(
                (current) => !current
              );

              setCareerOpen(false);
            }}
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

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1256AF]/25
              focus-visible:ring-offset-2

              ${
                profileActive ||
                accountOpen
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
            aria-haspopup="menu"
            aria-expanded={accountOpen}
            aria-controls="student-account-menu"
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
                bg-[#1256AF]
                text-[11px]
                font-bold
                text-white
              "
              aria-hidden="true"
            >
              {initials}
            </span>

            <span
              className="
                hidden
                min-w-0
                max-w-[125px]
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
                My Account
              </span>

              <span
                className="
                  block
                  truncate
                  text-[10px]
                  text-slate-500
                "
                title={
                  email || "Student"
                }
              >
                {email || "Student"}
              </span>
            </span>

            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`
                shrink-0
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
              onLogout={handleLogout}
            />
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(
              (current) => !current
            )
          }
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-700
            transition-colors

            hover:bg-slate-50

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#1256AF]/25
            focus-visible:ring-offset-2

            md:hidden
          "
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={mobileOpen}
          aria-controls="student-mobile-navigation"
        >
          {mobileOpen ? (
            <X
              size={19}
              aria-hidden="true"
            />
          ) : (
            <Menu
              size={19}
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}

      <div
        id="student-mobile-navigation"
        className={`
          overflow-hidden
          bg-white
          transition-all
          duration-300

          md:hidden

          ${
            mobileOpen
              ? `
                  max-h-[calc(100dvh-68px)]
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
            max-h-[calc(100dvh-68px)]
            overflow-y-auto
            overscroll-contain
          "
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
            {/* WORKSPACE */}

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

            <div className="mt-2 space-y-1">
              {primaryLinks.map(
                (link) => (
                  <MobileLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    active={isActive(
                      link.href
                    )}
                  />
                )
              )}
            </div>

            {/* CAREER */}

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
              Career
            </p>

            <div className="mt-2 space-y-1">
              {careerLinks.map(
                (link) => (
                  <MobileLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    active={isActive(
                      link.href
                    )}
                  />
                )
              )}
            </div>

            {/* ACCOUNT */}

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

            <div className="mt-2 space-y-1">
              {accountLinks.map(
                (link) => (
                  <MobileLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    active={isActive(
                      link.href
                    )}
                  />
                )
              )}
            </div>

            {/* USER */}

            <div
              className="
                mt-4
                border-t
                border-slate-100
                pt-4
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                  px-3
                  pb-3
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
                  aria-hidden="true"
                >
                  {initials}
                </span>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-900
                    "
                  >
                    Student
                  </p>

                  <p
                    className="
                      break-all
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    {email ||
                      "Trailbliz Student"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  min-h-11
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  font-semibold
                  text-red-600
                  transition-colors

                  hover:bg-red-50

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-red-200
                "
              >
                <LogOut
                  size={16}
                  aria-hidden="true"
                />

                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   DESKTOP NAV LINK
========================================================= */

function NavLink({
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
      aria-current={
        active ? "page" : undefined
      }
      className={`
        relative
        flex
        h-10
        items-center
        rounded-lg
        px-3
        text-sm
        font-semibold
        transition-colors

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1256AF]/25
        focus-visible:ring-offset-2

        lg:px-3.5

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
          aria-hidden="true"
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
   CAREER DROPDOWN
========================================================= */

function CareerDropdown() {
  return (
    <div
      id="student-career-menu"
      role="menu"
      className="
        absolute
        left-1/2
        top-[calc(100%+12px)]
        w-[290px]
        max-w-[calc(100vw-32px)]
        -translate-x-1/2
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-2
        shadow-[0_18px_55px_rgba(15,23,42,0.12)]
      "
    >
      <div
        className="
          px-3
          pb-2
          pt-2
        "
      >
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.13em]
            text-slate-400
          "
        >
          Career
        </p>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-slate-500
          "
        >
          Discover and track your
          opportunities.
        </p>
      </div>

      <div className="mt-1 space-y-1">
        {careerLinks.map(
          (link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className="
                  group
                  flex
                  min-w-0
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  transition-colors

                  hover:bg-slate-50

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#1256AF]/20
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
                    bg-slate-100
                    text-slate-600
                    transition-colors

                    group-hover:bg-blue-50
                    group-hover:text-[#1256AF]
                  "
                >
                  <Icon
                    size={16}
                    aria-hidden="true"
                  />
                </span>

                <span
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <span
                    className="
                      block
                      break-words
                      text-sm
                      font-semibold
                      text-slate-800
                    "
                  >
                    {link.label}
                  </span>

                  <span
                    className="
                      mt-0.5
                      block
                      break-words
                      text-[11px]
                      leading-4
                      text-slate-500
                    "
                  >
                    {link.description}
                  </span>
                </span>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}

/* =========================================================
   ACCOUNT DROPDOWN
========================================================= */

function AccountDropdown({
  email,
  initials,
  onLogout,
}: {
  email: string;
  initials: string;
  onLogout: () => void;
}) {
  return (
    <div
      id="student-account-menu"
      role="menu"
      className="
        absolute
        right-0
        top-[calc(100%+12px)]
        w-[270px]
        max-w-[calc(100vw-32px)]
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-2
        shadow-[0_18px_55px_rgba(15,23,42,0.12)]
      "
    >
      {/* USER */}

      <div
        className="
          flex
          min-w-0
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
          aria-hidden="true"
        >
          {initials}
        </span>

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <p
            className="
              text-sm
              font-bold
              text-slate-900
            "
          >
            My Account
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-[11px]
              text-slate-500
            "
            title={
              email ||
              "Trailbliz Student"
            }
          >
            {email ||
              "Trailbliz Student"}
          </p>
        </div>
      </div>

      {/* LINKS */}

      <div
        className="
          border-t
          border-slate-100
          pt-2
        "
      >
        {accountLinks.map(
          (link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className="
                  flex
                  min-h-10
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-700
                  transition-colors

                  hover:bg-slate-50
                  hover:text-[#1256AF]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#1256AF]/20
                "
              >
                <Icon
                  size={16}
                  className="shrink-0"
                  aria-hidden="true"
                />

                <span className="break-words">
                  {link.label}
                </span>
              </Link>
            );
          }
        )}
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
          role="menuitem"
          className="
            flex
            min-h-10
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

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-200
          "
        >
          <LogOut
            size={16}
            className="shrink-0"
            aria-hidden="true"
          />

          Log out
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE LINK
========================================================= */

function MobileLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={
        active ? "page" : undefined
      }
      className={`
        flex
        min-h-11
        min-w-0
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-sm
        font-semibold
        transition-colors

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1256AF]/20

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
        <Icon
          size={15}
          aria-hidden="true"
        />
      </span>

      <span
        className="
          min-w-0
          break-words
        "
      >
        {label}
      </span>
    </Link>
  );
}