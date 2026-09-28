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

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* =========================================================
     REVEAL MILESTONES
  ========================================================= */

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
        threshold: 0.18,
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     TIMELINE SCROLL PROGRESS
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;

      if (!timeline) return;

      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight * 0.75;
      const end = viewportHeight * 0.2;

      const totalDistance = rect.height + start - end;
      const travelled = start - rect.top;

      const progress = travelled / totalDistance;

      setScrollProgress(
        Math.max(0, Math.min(1, progress))
      );
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="our-journey"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#FAFAFA]
        py-20
        sm:py-24
        lg:py-28
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
            top-40
            h-[380px]
            w-[380px]
            rounded-full
            bg-blue-50/70
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-sky-50/60
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
          sm:px-6
          lg:px-12
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#1256af]/15
              bg-[#1256af]/5
              px-4
              py-2
            "
          >
            <Sparkles
              size={14}
              className="text-[#1256af]"
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#1256af]
                sm:text-sm
              "
            >
              Our Journey
            </span>
          </div>

          <h2
            className="
              mx-auto
              mt-6
              max-w-4xl
              text-4xl
              font-semibold
              leading-[1.08]
              tracking-tight
              text-gray-900

              sm:text-5xl
              lg:text-6xl
            "
          >
            From scattered progress{" "}
            <span className="text-[#1256af]">
              to one connected trail.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              font-light
              leading-7
              text-gray-600

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
            mt-16
            max-w-6xl

            sm:mt-20
          "
        >
          {/* ===================================================
              TIMELINE LINE
          =================================================== */}

          <div
            aria-hidden="true"
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
            {/* Base line */}

            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-gray-200
              "
            />

            {/* Scroll progress */}

            <div
              className="
                absolute
                left-0
                top-0
                w-full
                rounded-full
                bg-[#1256af]
                transition-[height]
                duration-150
              "
              style={{
                height: `${scrollProgress * 100}%`,
              }}
            />

            {/* Moving marker */}

            <div
              className="
                absolute
                left-1/2
                z-30
                h-3
                w-3
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border-[3px]
                border-white
                bg-[#1256af]
                shadow-[0_4px_12px_rgba(18,86,175,0.25)]
                transition-[top,opacity]
                duration-150
              "
              style={{
                top: `${Math.min(
                  98,
                  scrollProgress * 100
                )}%`,
                opacity:
                  scrollProgress > 0 ? 1 : 0,
              }}
            />
          </div>

          {/* ===================================================
              MILESTONES
          =================================================== */}

          <div className="space-y-14 md:space-y-20">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const visible =
                visibleItems.includes(index);

              const even = index % 2 === 0;

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
                    transitionDelay: `${index * 80}ms`,
                  }}
                >
                  {/* Timeline marker */}

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
                        border-[#FAFAFA]
                        bg-[#1256af]
                        shadow-[0_4px_12px_rgba(18,86,175,0.18)]
                      "
                    />
                  </div>

                  {/* =================================================
                      ROW
                  ================================================= */}

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
                    {/* ===============================================
                        PHASE SIDE
                    =============================================== */}

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
                          border-[#1256af]/10
                          bg-white
                          px-3
                          py-1.5
                          shadow-sm
                        "
                      >
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[#1256af]
                          "
                        />

                        <span
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-gray-500
                          "
                        >
                          {milestone.phase}
                        </span>
                      </div>
                    </div>

                    {/* ===============================================
                        CARD SIDE
                    =============================================== */}

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
                          border-gray-200
                          bg-white
                          p-5
                          shadow-[0_10px_35px_rgba(17,24,39,0.045)]
                          transition-all
                          duration-300

                          hover:-translate-y-1
                          hover:border-[#1256af]/20
                          hover:shadow-[0_20px_50px_rgba(18,86,175,0.08)]

                          sm:p-6
                        "
                      >
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
                              bg-[#1256af]/[0.07]
                              text-[#1256af]
                              transition-all
                              duration-300

                              group-hover:bg-[#1256af]
                              group-hover:text-white
                            "
                          >
                            <Icon size={21} />
                          </div>

                          <span
                            className="
                              rounded-full
                              bg-gray-50
                              px-3
                              py-1.5
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.14em]
                              text-gray-400
                            "
                          >
                            {milestone.label}
                          </span>
                        </div>

                        {/* Title */}

                        <h3
                          className="
                            mt-5
                            text-xl
                            font-semibold
                            leading-tight
                            tracking-tight
                            text-gray-900

                            sm:text-2xl
                          "
                        >
                          {milestone.title}
                        </h3>

                        {/* Description */}

                        <p
                          className="
                            mt-3
                            text-sm
                            leading-6
                            text-gray-600
                          "
                        >
                          {milestone.description}
                        </p>

                        {/* Detail */}

                        <div
                          className="
                            mt-5
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-[#1256af]/10
                            bg-[#1256af]/[0.035]
                            px-4
                            py-3.5
                          "
                        >
                          <BadgeCheck
                            size={17}
                            className="
                              mt-0.5
                              shrink-0
                              text-[#1256af]
                            "
                          />

                          <p
                            className="
                              text-xs
                              leading-5
                              text-gray-500
                            "
                          >
                            {milestone.detail}
                          </p>
                        </div>

                        {/* Bottom accent */}

                        <div
                          aria-hidden="true"
                          className="
                            mt-5
                            h-[2px]
                            w-8
                            rounded-full
                            bg-[#1256af]/20
                            transition-all
                            duration-300

                            group-hover:w-14
                            group-hover:bg-[#1256af]
                          "
                        />
                      </article>
                    </div>
                  </div>
                </div>
              );
            })}
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
              rounded-[30px]
              bg-[#1256af]
              px-6
              py-10
              text-center
              shadow-[0_22px_55px_rgba(18,86,175,0.16)]

              sm:px-10
              sm:py-12
            "
          >
            {/* subtle decorations */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-16
                -top-24
                h-64
                w-64
                rounded-full
                bg-white/10
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-24
                -left-10
                h-64
                w-64
                rounded-full
                bg-blue-300/10
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
                  bg-white/10
                  text-white
                "
              >
                <Rocket size={21} />
              </div>

              <p
                className="
                  mt-6
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white/60
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
                  font-semibold
                  tracking-tight
                  text-white

                  sm:text-4xl
                "
              >
                Trailbliz is only the beginning
                of the trail.
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