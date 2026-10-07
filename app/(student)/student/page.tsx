"use client";

import axios from "axios";
import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Crown,
  FileText,
  LoaderCircle,
  Trophy,
  UserRound,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  getMyMembership,
} from "@/services/membershipService";

import type {
  MembershipResponse,
} from "@/types/membership";

/* =========================================================
   TYPES
========================================================= */

interface StudentAction {
  title: string;
  description: string;
  href: string;
  label: string;
  icon: typeof UserRound;
}

/* =========================================================
   DATA
========================================================= */

const progressActions: StudentAction[] = [
  {
    title: "Your profile",
    description:
      "Keep your academic, professional and career information ready.",
    href: "/profile",
    label: "View profile",
    icon: UserRound,
  },
  {
    title: "Learning",
    description:
      "Explore courses and continue building skills that matter.",
    href: "/student/courses",
    label: "Explore courses",
    icon: BookOpen,
  },
  {
    title: "Coding profiles",
    description:
      "Connect your coding profiles and showcase your technical progress.",
    href: "/coding-profiles",
    label: "Manage profiles",
    icon: Code2,
  },
];

const careerActions: StudentAction[] = [
  {
    title: "Opportunities",
    description:
      "Discover opportunities that can move your career forward.",
    href: "/opportunities",
    label: "Explore opportunities",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    description:
      "Keep track of the opportunities you have applied for.",
    href: "/applications",
    label: "Track applications",
    icon: FileText,
  },
  {
    title: "Leaderboard",
    description:
      "See your progress and position across the Trailbliz community.",
    href: "/leaderboard",
    label: "View leaderboard",
    icon: Trophy,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function StudentHomePage() {
  const [
    membership,
    setMembership,
  ] = useState<MembershipResponse | null>(
    null
  );

  const [
    membershipLoading,
    setMembershipLoading,
  ] = useState(true);

  const [
    email,
    setEmail,
  ] = useState("");

  /* =======================================================
     LOAD STUDENT HOME
  ======================================================= */

  useEffect(() => {
    const storedEmail =
      localStorage.getItem("email");

    setEmail(storedEmail || "");

    const loadMembership =
      async () => {
        try {
          const response =
            await getMyMembership();

          setMembership(response);
        } catch (error: unknown) {
          console.error(
            "STUDENT HOME MEMBERSHIP ERROR:",
            error
          );

          /*
           * Individual API calls can still reject
           * expired/invalid tokens.
           */
          if (
            axios.isAxiosError(error) &&
            (
              error.response?.status === 401 ||
              error.response?.status === 403
            )
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");

            window.location.replace(
              "/login"
            );

            return;
          }

          /*
           * Membership failing should not make the
           * entire student home unusable.
           */
          setMembership(null);
        } finally {
          setMembershipLoading(false);
        }
      };

    loadMembership();
  }, []);

  /* =======================================================
     DERIVED DATA
  ======================================================= */

  const membershipActive =
    membership?.active === true;

  const displayName =
    email
      ? email.split("@")[0]
      : "student";

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div
      className="
        min-w-0
        bg-[#F7F9FC]
        text-slate-950
      "
    >
      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className="
          min-w-0
          border-b
          border-slate-200
          bg-white
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-10

            sm:px-6
            sm:py-14

            lg:px-8
            lg:py-20
          "
        >
          <div
            className="
              grid
              min-w-0
              items-end
              gap-8

              lg:grid-cols-[minmax(0,1fr)_340px]
              lg:gap-10
            "
          >
            {/* LEFT */}

            <div
              className="
                min-w-0
                max-w-3xl
              "
            >
              <div
                className="
                  inline-flex
                  max-w-full
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#1256AF]/10
                  bg-[#1256AF]/[0.05]
                  px-3
                  py-1.5
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-[#1256AF]
                  "
                  aria-hidden="true"
                />

                <span
                  className="
                    break-words
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[#1256AF]
                  "
                >
                  Student workspace
                </span>
              </div>

              <h1
                className="
                  mt-5
                  break-words
                  text-3xl
                  font-bold
                  tracking-[-0.045em]
                  text-slate-950

                  [overflow-wrap:anywhere]

                  sm:mt-6
                  sm:text-5xl

                  lg:text-[56px]
                  lg:leading-[1.03]
                "
              >
                Welcome back,
                <br />

                <span className="text-[#1256AF]">
                  {displayName}.
                </span>
              </h1>

              <p
                className="
                  mt-4
                  max-w-2xl
                  break-words
                  text-sm
                  leading-7
                  text-slate-600

                  sm:mt-5
                  sm:text-[17px]
                "
              >
                Build your profile, strengthen your
                skills and keep moving toward your
                next opportunity.
              </p>

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-3

                  sm:mt-8
                  sm:flex-row
                  sm:flex-wrap
                "
              >
                <Link
                  href="/profile"
                  className="
                    group
                    inline-flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#1256AF]
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_10px_30px_rgba(18,86,175,0.16)]
                    transition

                    hover:-translate-y-0.5
                    hover:bg-[#0F4994]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#1256AF]/30
                    focus-visible:ring-offset-2

                    sm:w-auto
                  "
                >
                  Complete profile

                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="
                      shrink-0
                      transition-transform

                      group-hover:translate-x-1
                    "
                  />
                </Link>

                <Link
                  href="/student/courses"
                  className="
                    inline-flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    text-sm
                    font-semibold
                    text-slate-700
                    transition

                    hover:border-[#1256AF]/25
                    hover:text-[#1256AF]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#1256AF]/25
                    focus-visible:ring-offset-2

                    sm:w-auto
                  "
                >
                  <BookOpen
                    size={16}
                    aria-hidden="true"
                  />

                  Explore courses
                </Link>
              </div>
            </div>

            {/* MEMBERSHIP */}

            <div
              className="
                min-w-0
                rounded-2xl
                border
                border-slate-200
                bg-[#F8FAFC]
                p-4

                sm:rounded-[24px]
                sm:p-5
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-[#1256AF]
                    shadow-sm
                    ring-1
                    ring-slate-200
                  "
                >
                  <Crown
                    size={19}
                    aria-hidden="true"
                  />
                </div>

                {!membershipLoading && (
                  <span
                    className={`
                      inline-flex
                      max-w-full
                      items-center
                      rounded-full
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.1em]

                      ${
                        membershipActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-200/70 text-slate-600"
                      }
                    `}
                  >
                    {membershipActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                )}
              </div>

              <p
                className="
                  mt-5
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                "
              >
                Membership
              </p>

              {membershipLoading ? (
                <div
                  className="
                    mt-3
                    flex
                    min-w-0
                    items-center
                    gap-2
                    text-sm
                    text-slate-500
                  "
                  role="status"
                >
                  <LoaderCircle
                    size={15}
                    className="
                      shrink-0
                      animate-spin
                    "
                    aria-hidden="true"
                  />

                  <span className="break-words">
                    Checking membership...
                  </span>
                </div>
              ) : (
                <>
                  <h2
                    className="
                      mt-2
                      break-words
                      text-xl
                      font-bold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    {membershipActive
                      ? "Membership active"
                      : "Trailbliz membership"}
                  </h2>

                  <p
                    className="
                      mt-2
                      break-words
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {membershipActive
                      ? "Your membership is active and ready to use."
                      : "View your membership status and available access."}
                  </p>
                </>
              )}

              <Link
                href="/membership"
                className="
                  group
                  mt-5
                  inline-flex
                  min-h-10
                  max-w-full
                  items-center
                  gap-2
                  rounded-lg
                  text-sm
                  font-semibold
                  text-[#1256AF]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#1256AF]/25
                  focus-visible:ring-offset-2
                "
              >
                <span className="break-words">
                  Manage membership
                </span>

                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="
                    shrink-0
                    transition-transform

                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className="
          mx-auto
          min-w-0
          max-w-7xl
          px-4
          py-10

          sm:px-6
          sm:py-12

          lg:px-8
          lg:py-16
        "
      >
        {/* YOUR PROGRESS */}

        <section className="min-w-0">
          <SectionHeading
            eyebrow="Your progress"
            title="Keep building your foundation."
            description="Your profile, learning and technical presence work together to represent your progress."
          />

          <div
            className="
              mt-6
              grid
              min-w-0
              grid-cols-1
              gap-4

              sm:mt-7
              sm:grid-cols-2

              lg:grid-cols-3
            "
          >
            {progressActions.map(
              (action) => (
                <ActionCard
                  key={action.title}
                  action={action}
                />
              )
            )}
          </div>
        </section>

        {/* CAREER */}

        <section
          className="
            mt-12
            min-w-0
            border-t
            border-slate-200
            pt-10

            sm:mt-14
            sm:pt-12
          "
        >
          <SectionHeading
            eyebrow="Career"
            title="Move from preparation to opportunity."
            description="Discover opportunities, follow your applications and see how your progress compares."
          />

          <div
            className="
              mt-6
              grid
              min-w-0
              grid-cols-1
              gap-4

              sm:mt-7
              sm:grid-cols-2

              lg:grid-cols-3
            "
          >
            {careerActions.map(
              (action) => (
                <ActionCard
                  key={action.title}
                  action={action}
                />
              )
            )}
          </div>
        </section>

        {/* NEXT STEP */}

        <section
          className="
            mt-12
            min-w-0

            sm:mt-14
          "
        >
          <div
            className="
              min-w-0
              overflow-hidden
              rounded-2xl
              bg-[#0F2744]
              px-4
              py-7
              text-white

              sm:rounded-[28px]
              sm:px-8
              sm:py-10

              lg:flex
              lg:items-center
              lg:justify-between
              lg:gap-10
            "
          >
            <div
              className="
                min-w-0
                max-w-2xl
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-2
                  text-[#8CC8FF]
                "
              >
                <CheckCircle2
                  size={16}
                  className="shrink-0"
                  aria-hidden="true"
                />

                <span
                  className="
                    break-words
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  Keep moving
                </span>
              </div>

              <h2
                className="
                  mt-4
                  break-words
                  text-2xl
                  font-bold
                  tracking-[-0.03em]

                  sm:text-3xl
                "
              >
                Your profile is the center
                of your Trailbliz journey.
              </h2>

              <p
                className="
                  mt-3
                  max-w-xl
                  break-words
                  text-sm
                  leading-6
                  text-slate-300
                "
              >
                Keep your information,
                projects, skills, experience and
                coding profiles current so your
                progress is always represented.
              </p>
            </div>

            <div
              className="
                mt-6
                shrink-0

                lg:mt-0
              "
            >
              <Link
                href="/profile"
                className="
                  group
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  text-sm
                  font-semibold
                  text-[#0F2744]
                  transition

                  hover:bg-slate-100

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/70
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#0F2744]

                  sm:w-auto
                "
              >
                Go to profile

                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="
                    shrink-0
                    transition-transform

                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        min-w-0
        max-w-2xl
      "
    >
      <p
        className="
          break-words
          text-[10px]
          font-bold
          uppercase
          tracking-[0.17em]
          text-[#1256AF]
        "
      >
        {eyebrow}
      </p>

      <h2
        className="
          mt-2
          break-words
          text-2xl
          font-bold
          tracking-[-0.035em]
          text-slate-950

          sm:text-3xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3
          break-words
          text-sm
          leading-6
          text-slate-500
        "
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   ACTION CARD
========================================================= */

function ActionCard({
  action,
}: {
  action: StudentAction;
}) {
  const Icon = action.icon;

  return (
    <Link
      href={action.href}
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
        transition
        duration-300

        hover:-translate-y-1
        hover:border-[#1256AF]/20
        hover:shadow-[0_18px_50px_rgba(15,23,42,0.07)]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1256AF]/25
        focus-visible:ring-offset-2

        sm:min-h-[230px]
        sm:rounded-[22px]
        sm:p-5
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#1256AF]/[0.07]
          text-[#1256AF]
        "
      >
        <Icon
          size={19}
          aria-hidden="true"
        />
      </div>

      <div
        className="
          mt-4
          min-w-0

          sm:mt-5
        "
      >
        <h3
          className="
            break-words
            text-base
            font-bold
            tracking-[-0.01em]
            text-slate-900
          "
        >
          {action.title}
        </h3>

        <p
          className="
            mt-2
            break-words
            text-sm
            leading-6
            text-slate-500
          "
        >
          {action.description}
        </p>
      </div>

      <div
        className="
          mt-5
          flex
          min-w-0
          items-center
          gap-2
          pt-1
          text-sm
          font-semibold
          text-[#1256AF]

          sm:mt-auto
          sm:pt-6
        "
      >
        <span className="break-words">
          {action.label}
        </span>

        <ArrowRight
          size={14}
          aria-hidden="true"
          className="
            shrink-0
            transition-transform
            duration-200

            group-hover:translate-x-1
          "
        />
      </div>
    </Link>
  );
}