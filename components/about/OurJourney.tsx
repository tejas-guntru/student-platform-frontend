"use client";

import { useEffect, useRef, useState } from "react";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Compass,
  FolderKanban,
  Layers3,
  Rocket,
  Sparkles,
} from "lucide-react";

const milestones = [
  {
    phase: "The idea",
    label: "START",
    title: "Make the student journey clearer",
    description:
      "Trailbliz starts from a simple problem: students make progress throughout college, but that progress is often scattered across resumes, documents, projects and different platforms.",
    detail:
      "The goal is to bring those pieces together into one career story.",
    icon: Compass,
  },
  {
    phase: "The foundation",
    label: "BUILD",
    title: "Create one connected student profile",
    description:
      "Academics, college information, career preferences and personal details form the foundation of a student's Trailbliz profile.",
    detail:
      "One place to understand where you are before deciding where to go next.",
    icon: Layers3,
  },
  {
    phase: "The proof",
    label: "SHOW",
    title: "Turn skills into visible evidence",
    description:
      "Projects, experience, technical skills and coding profiles help students show more than a list of claims.",
    detail:
      "What you build becomes part of the story you present to opportunities.",
    icon: FolderKanban,
  },
  {
    phase: "The connection",
    label: "DISCOVER",
    title: "Connect profiles with opportunities",
    description:
      "Trailbliz brings career opportunities closer to the student profile so eligibility, preparation and applications can become part of the same journey.",
    detail:
      "The profile is not the destination — it should help students move forward.",
    icon: BriefcaseBusiness,
  },
  {
    phase: "What comes next",
    label: "GROW",
    title: "Keep building around student progress",
    description:
      "Trailbliz is designed to keep evolving as students build more skills, gain more experience and move through different stages of their careers.",
    detail:
      "The next chapter is about making that journey more connected, useful and actionable.",
    icon: Rocket,
  },
];

export default function OurJourney() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // =========================================================
  // REVEAL MILESTONES
  // =========================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(
            entry.target.getAttribute("data-index") ?? "0"
          );

          setVisibleItems((current) =>
            current.includes(index)
              ? current
              : [...current, index]
          );
        });
      },
      {
        threshold: 0.2,
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  // =========================================================
  // TIMELINE SCROLL PROGRESS
  // =========================================================

  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;

      if (!timeline) return;

      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight * 0.75;
      const end = viewportHeight * 0.2;

      const totalDistance =
        rect.height + start - end;

      const travelled =
        start - rect.top;

      const progress =
        travelled / totalDistance;

      setScrollProgress(
        Math.max(0, Math.min(1, progress))
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-journey"
      className="
        relative
        isolate
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-40
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-52
          bottom-20
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#0877E8]/10
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage:
            "radial-gradient(rgba(8,119,232,0.16) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#CBE5F8]
              bg-[#F0F9FF]
              px-4
              py-2
            "
          >
            <Sparkles
              size={14}
              className="text-[#0877E8]"
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#4D7FA8]
              "
            >
              Our journey
            </span>
          </div>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              leading-[1]
              tracking-[-0.05em]
              text-[#143655]

              sm:text-5xl
              lg:text-6xl
            "
          >
            From scattered progress
            <span
              className="
                block
                bg-gradient-to-r
                from-[#0877E8]
                via-[#1294F2]
                to-[#38BDF8]
                bg-clip-text
                text-transparent
              "
            >
              to one connected trail.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-[#607A92]

              sm:text-lg
              sm:leading-8
            "
          >
            Trailbliz is being built around the stages students
            naturally move through — understanding themselves,
            building proof and moving toward opportunity.
          </p>
        </div>

        {/* =====================================================
            TIMELINE
        ===================================================== */}

        <div
          ref={timelineRef}
          className="
            relative
            mx-auto
            mt-20
            max-w-6xl
          "
        >
          {/* ===================================================
              TIMELINE LINE
          =================================================== */}

          <div
            className="
              absolute
              bottom-0
              left-[23px]
              top-0
              w-[2px]

              md:left-1/2
              md:-translate-x-1/2
            "
          >
            {/* background */}

            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-[#DFEBF4]
              "
            />

            {/* progress */}

            <div
              className="
                absolute
                left-0
                top-0
                w-full
                rounded-full
                bg-gradient-to-b
                from-[#0877E8]
                via-[#1294F2]
                to-[#38BDF8]
                transition-[height]
                duration-200
              "
              style={{
                height: `${scrollProgress * 100}%`,
              }}
            />

            {/* moving cursor */}

            <div
              className="
                absolute
                left-1/2
                z-20
                h-4
                w-4
                -translate-x-1/2
                -translate-y-1/2
                transition-[top,opacity]
                duration-200
              "
              style={{
                top: `${
                  Math.min(
                    98,
                    scrollProgress * 100
                  )
                }%`,
                opacity:
                  scrollProgress > 0 ? 1 : 0,
              }}
            >
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-[#0877E8]/30
                  animate-ping
                "
              />

              <div
                className="
                  relative
                  h-full
                  w-full
                  rounded-full
                  border-[3px]
                  border-white
                  bg-[#0877E8]
                  shadow-[0_4px_14px_rgba(8,119,232,0.35)]
                "
              />
            </div>
          </div>

          {/* ===================================================
              ITEMS
          =================================================== */}

          <div className="space-y-14 md:space-y-20">
            {milestones.map(
              (milestone, index) => {
                const Icon = milestone.icon;
                const visible =
                  visibleItems.includes(index);

                const even =
                  index % 2 === 0;

                return (
                  <div
                    key={milestone.title}
                    data-index={index}
                    ref={(element) => {
                      itemRefs.current[index] =
                        element;
                    }}
                    className={`
                      relative
                      transition-all
                      duration-700
                      ease-out

                      ${
                        visible
                          ? `
                            translate-y-0
                            opacity-100
                          `
                          : `
                            translate-y-8
                            opacity-0
                          `
                      }
                    `}
                    style={{
                      transitionDelay:
                        `${index * 90}ms`,
                    }}
                  >
                    {/* =========================================
                        MARKER
                    ========================================= */}

                    <div
                      className="
                        absolute
                        left-[14px]
                        top-5
                        z-20

                        md:left-1/2
                        md:-translate-x-1/2
                      "
                    >
                      <div
                        className="
                          flex
                          h-[20px]
                          w-[20px]
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          border-white
                          bg-[#0877E8]
                          shadow-[0_5px_15px_rgba(8,119,232,0.22)]
                        "
                      />
                    </div>

                    {/* =========================================
                        CONTENT ROW
                    ========================================= */}

                    <div
                      className={`
                        flex
                        flex-col

                        md:flex-row

                        ${
                          even
                            ? ""
                            : "md:flex-row-reverse"
                        }
                      `}
                    >
                      {/* =======================================
                          PHASE / DATE SIDE
                      ======================================= */}

                      <div
                        className={`
                          w-full
                          pl-16

                          md:w-1/2
                          md:pl-0

                          ${
                            even
                              ? `
                                md:pr-14
                                md:text-right
                              `
                              : `
                                md:pl-14
                                md:text-left
                              `
                          }
                        `}
                      >
                        <div
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#D9E9F5]
                            bg-[#F6FBFF]
                            px-3
                            py-1.5
                          "
                        >
                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-[#0877E8]
                            "
                          />

                          <span
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.14em]
                              text-[#6685A0]
                            "
                          >
                            {milestone.phase}
                          </span>
                        </div>
                      </div>

                      {/* =======================================
                          CARD SIDE
                      ======================================= */}

                      <div
                        className={`
                          mt-4
                          w-full
                          pl-16

                          md:mt-0
                          md:w-1/2
                          md:pl-0

                          ${
                            even
                              ? "md:pl-10"
                              : "md:pr-10"
                          }
                        `}
                      >
                        <article
                          className="
                            group
                            relative
                            overflow-hidden
                            rounded-[26px]
                            border
                            border-[#DCEAF5]
                            bg-white
                            p-5
                            shadow-[0_12px_38px_rgba(8,119,232,0.055)]
                            transition-all
                            duration-300

                            hover:-translate-y-1
                            hover:border-[#B5DAF3]
                            hover:shadow-[0_22px_50px_rgba(8,119,232,0.10)]

                            sm:p-6
                          "
                        >
                          {/* glow */}

                          <div
                            className="
                              pointer-events-none
                              absolute
                              -right-16
                              -top-16
                              h-40
                              w-40
                              rounded-full
                              bg-[#38BDF8]/0
                              blur-3xl
                              transition-all
                              duration-300

                              group-hover:bg-[#38BDF8]/12
                            "
                          />

                          <div className="relative">
                            {/* top */}

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-4
                              "
                            >
                              <div
                                className="
                                  flex
                                  h-12
                                  w-12
                                  items-center
                                  justify-center
                                  rounded-2xl
                                  bg-[#EAF6FF]
                                  text-[#0877E8]
                                  transition-all
                                  duration-300

                                  group-hover:bg-[#0877E8]
                                  group-hover:text-white
                                "
                              >
                                <Icon size={21} />
                              </div>

                              <span
                                className="
                                  text-[10px]
                                  font-bold
                                  uppercase
                                  tracking-[0.15em]
                                  text-[#9AAEBF]
                                "
                              >
                                {milestone.label}
                              </span>
                            </div>

                            <h3
                              className="
                                mt-5
                                text-xl
                                font-bold
                                leading-tight
                                tracking-[-0.03em]
                                text-[#173B63]

                                sm:text-2xl
                              "
                            >
                              {milestone.title}
                            </h3>

                            <p
                              className="
                                mt-3
                                text-sm
                                leading-6
                                text-[#6B8296]
                              "
                            >
                              {
                                milestone.description
                              }
                            </p>

                            <div
                              className="
                                mt-5
                                flex
                                items-start
                                gap-3
                                rounded-2xl
                                border
                                border-[#E0EDF6]
                                bg-[#F7FBFF]
                                px-4
                                py-3.5
                              "
                            >
                              <BadgeCheck
                                size={17}
                                className="
                                  mt-0.5
                                  shrink-0
                                  text-[#0877E8]
                                "
                              />

                              <p
                                className="
                                  text-xs
                                  leading-5
                                  text-[#678198]
                                "
                              >
                                {milestone.detail}
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* =====================================================
            END POINT
        ===================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-20
            max-w-4xl
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              bg-gradient-to-r
              from-[#0877E8]
              via-[#1294F2]
              to-[#38BDF8]
              px-6
              py-10
              text-center
              shadow-[0_28px_65px_rgba(8,119,232,0.18)]

              sm:px-10
              sm:py-12
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-16
                -top-24
                h-64
                w-64
                rounded-full
                bg-white/15
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-24
                -left-10
                h-64
                w-64
                rounded-full
                bg-[#BDEBFF]/20
                blur-3xl
              "
            />

            <div className="relative">
              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/15
                  text-white
                  backdrop-blur
                "
              >
                <Rocket size={21} />
              </div>

              <p
                className="
                  mt-6
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-white/65
                "
              >
                The journey continues
              </p>

              <h3
                className="
                  mx-auto
                  mt-3
                  max-w-2xl
                  text-3xl
                  font-bold
                  tracking-[-0.04em]
                  text-white

                  sm:text-4xl
                "
              >
                Trailbliz is only the
                beginning of the trail.
              </h3>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/75

                  sm:text-base
                "
              >
                As students grow, Trailbliz will keep evolving
                around the same purpose — helping progress become
                visible and helping that progress lead somewhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}