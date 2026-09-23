"use client";

import { useEffect, useRef, useState } from "react";

const journey = [
  {
    number: "01",
    title: "Academics",
    text: "Your foundation and where your journey begins.",
  },
  {
    number: "02",
    title: "Skills",
    text: "The abilities you learn and continue improving.",
  },
  {
    number: "03",
    title: "Projects",
    text: "Real proof of what you can build and create.",
  },
  {
    number: "04",
    title: "Experience",
    text: "Where your knowledge becomes real-world work.",
  },
  {
    number: "05",
    title: "Progress",
    text: "Everything coming together for your next move.",
  },
];

export default function YourTrail() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const scrollableHeight =
        rect.height - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const rawProgress =
        -rect.top / scrollableHeight;

      const nextProgress = Math.min(
        1,
        Math.max(0, rawProgress)
      );

      setProgress(nextProgress);

      const nextActive = Math.min(
        journey.length - 1,
        Math.floor(
          nextProgress * journey.length
        )
      );

      setActive(nextActive);
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
      id="your-trail"
      className="
        relative
        min-h-[360vh]
        bg-[#F5FAFF]
      "
    >
      {/* =========================================
          STICKY VIEW
      ========================================= */}

      <div
        className="
          sticky
          top-0
          flex
          min-h-screen
          items-center
          overflow-hidden

          px-5
          py-20

          sm:px-8
          lg:px-12
        "
      >
        {/* =========================================
            BACKGROUND
        ========================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-40
            top-[15%]
            h-[480px]
            w-[480px]
            rounded-full
            bg-[#CDEAFF]/70
            blur-[130px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-48
            bottom-[5%]
            h-[540px]
            w-[540px]
            rounded-full
            bg-[#B9E4FF]/55
            blur-[150px]
          "
        />

        {/* moving glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            h-[420px]
            w-[420px]
            -translate-x-1/2
            rounded-full
            bg-[#38BDF8]/10
            blur-[100px]

            transition-all
            duration-700
          "
          style={{
            top: `${15 + progress * 50}%`,
          }}
        />

        {/* Grid */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.32]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(8,119,232,0.05) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(8,119,232,0.05) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "56px 56px",
          }}
        />

        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            w-full
            max-w-7xl
            gap-14

            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-center
            lg:gap-20
          "
        >
          {/* =====================================
              LEFT
          ===================================== */}

          <div>
            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full
                border
                border-[#CFE6FA]

                bg-white/80

                px-4
                py-2

                shadow-sm
                backdrop-blur-md
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#0B82EF]

                  shadow-[0_0_12px_rgba(11,130,239,0.55)]
                "
              />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#3977AC]
                "
              >
                Your Trail
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mt-6
                max-w-3xl

                text-[clamp(2.8rem,5.5vw,5.6rem)]

                font-bold
                leading-[0.92]
                tracking-[-0.06em]

                text-[#102F51]
              "
            >
              Every step

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
                builds your story.
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-lg

                text-base
                leading-7
                text-[#58708B]

                sm:text-lg
                sm:leading-8
              "
            >
              Your academics, skills, projects and
              experience are not separate pieces.
              Trailbliz brings them together into one
              clear career journey.
            </p>

            {/* Scroll indicator */}

            <div
              className="
                mt-10
                hidden
                items-center
                gap-4

                lg:flex
              "
            >
              <div
                className="
                  relative
                  h-[3px]
                  w-24
                  overflow-hidden
                  rounded-full
                  bg-[#D4E8F7]
                "
              >
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    top-0

                    bg-gradient-to-r
                    from-[#0877E8]
                    to-[#38BDF8]

                    transition-all
                    duration-300
                  "
                  style={{
                    width: `${progress * 100}%`,
                  }}
                />
              </div>

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#6B94B6]
                "
              >
                Scroll to explore
              </span>
            </div>
          </div>

          {/* =====================================
              RIGHT JOURNEY
          ===================================== */}

          <div className="relative">
            {/* Main vertical rail */}

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-8
                left-[27px]
                top-8
                w-[2px]
                bg-[#D7EAF8]

                sm:left-[31px]
              "
            />

            {/* Active vertical rail */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-[27px]
                top-8
                w-[2px]

                bg-gradient-to-b
                from-[#0877E8]
                via-[#159BF3]
                to-[#45C9FF]

                shadow-[0_0_16px_rgba(8,119,232,0.25)]

                transition-all
                duration-700
                ease-out

                sm:left-[31px]
              "
              style={{
                height: `calc(${progress * 100}% - 32px)`,
                maxHeight: "calc(100% - 64px)",
              }}
            />

            {/* Items */}

            <div className="relative space-y-3 sm:space-y-4">
              {journey.map((item, index) => {
                const isActive =
                  index === active;

                const isPassed =
                  index < active;

                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => {
                      const section =
                        sectionRef.current;

                      if (!section) return;

                      const sectionTop =
                        window.scrollY +
                        section.getBoundingClientRect()
                          .top;

                      const scrollDistance =
                        section.offsetHeight -
                        window.innerHeight;

                      const target =
                        sectionTop +
                        scrollDistance *
                          (index /
                            (journey.length - 1));

                      window.scrollTo({
                        top: target,
                        behavior: "smooth",
                      });
                    }}
                    className={`
                      group
                      relative
                      flex
                      w-full
                      items-center
                      gap-5
                      text-left

                      transition-all
                      duration-700

                      sm:gap-6

                      ${
                        isActive
                          ? "translate-x-2 opacity-100"
                          : isPassed
                            ? "opacity-65"
                            : "opacity-35"
                      }
                    `}
                  >
                    {/* =============================
                        STATION
                    ============================= */}

                    <div
                      className={`
                        relative
                        z-20

                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center

                        rounded-2xl
                        border

                        text-xs
                        font-bold
                        tracking-[0.08em]

                        transition-all
                        duration-700

                        sm:h-16
                        sm:w-16

                        ${
                          isActive
                            ? `
                              scale-110
                              border-[#1689F5]

                              bg-gradient-to-br
                              from-[#0877E8]
                              to-[#3BC3FF]

                              text-white

                              shadow-[0_12px_35px_rgba(8,119,232,0.35)]
                            `
                            : isPassed
                              ? `
                                border-[#A8D5F5]
                                bg-[#E3F4FF]
                                text-[#0877E8]
                              `
                              : `
                                border-[#D4E7F6]
                                bg-white
                                text-[#8DA3B8]
                              `
                        }
                      `}
                    >
                      {item.number}

                      {/* Active pulse */}

                      {isActive && (
                        <span
                          className="
                            absolute
                            inset-[-7px]
                            -z-10
                            animate-ping
                            rounded-[20px]
                            border
                            border-[#38BDF8]/30
                          "
                        />
                      )}
                    </div>

                    {/* =============================
                        CONTENT
                    ============================= */}

                    <div
                      className={`
                        relative
                        flex-1
                        overflow-hidden

                        rounded-[24px]
                        border

                        px-5
                        py-5

                        transition-all
                        duration-700

                        sm:px-6
                        sm:py-6

                        ${
                          isActive
                            ? `
                              scale-[1.02]

                              border-[#B7DCF7]
                              bg-white

                              shadow-[0_20px_55px_rgba(8,119,232,0.13)]
                            `
                            : `
                              scale-[0.98]

                              border-[#DBEAF6]
                              bg-white/55
                            `
                        }
                      `}
                    >
                      {/* Active glow */}

                      <div
                        aria-hidden="true"
                        className={`
                          pointer-events-none

                          absolute
                          -right-14
                          -top-14

                          h-32
                          w-32

                          rounded-full
                          bg-[#BEE9FF]

                          blur-[45px]

                          transition-all
                          duration-700

                          ${
                            isActive
                              ? "scale-100 opacity-60"
                              : "scale-50 opacity-0"
                          }
                        `}
                      />

                      {/* Top accent */}

                      <div
                        className={`
                          absolute
                          left-6
                          right-6
                          top-0

                          h-[2px]

                          bg-gradient-to-r
                          from-transparent
                          via-[#38BDF8]
                          to-transparent

                          transition-opacity
                          duration-700

                          ${
                            isActive
                              ? "opacity-70"
                              : "opacity-0"
                          }
                        `}
                      />

                      <div className="relative">
                        <p
                          className={`
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]

                            transition-colors
                            duration-500

                            ${
                              isActive
                                ? "text-[#1689F5]"
                                : "text-[#8EA2B6]"
                            }
                          `}
                        >
                          Step {item.number}
                        </p>

                        <h3
                          className={`
                            mt-1.5

                            text-xl
                            font-bold
                            tracking-[-0.03em]

                            transition-all
                            duration-500

                            sm:text-2xl

                            ${
                              isActive
                                ? "text-[#102F51]"
                                : "text-[#48637D]"
                            }
                          `}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={`
                            mt-2
                            text-sm
                            leading-6

                            transition-colors
                            duration-500

                            ${
                              isActive
                                ? "text-[#647B91]"
                                : "text-[#8799AA]"
                            }
                          `}
                        >
                          {item.text}
                        </p>

                        {/* Progress accent */}

                        <div
                          className={`
                            mt-4
                            h-1
                            rounded-full

                            bg-gradient-to-r
                            from-[#0877E8]
                            to-[#45C6FF]

                            transition-all
                            duration-700

                            ${
                              isActive
                                ? "w-14"
                                : isPassed
                                  ? "w-7 opacity-50"
                                  : "w-0"
                            }
                          `}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================
            CURRENT STEP BACKGROUND NUMBER
        ========================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            bottom-[-30px]
            right-[-10px]

            hidden

            select-none

            text-[13rem]
            font-black
            leading-none
            tracking-[-0.08em]

            text-[#0877E8]/[0.025]

            transition-all
            duration-700

            xl:block
          "
        >
          {journey[active].number}
        </div>

        {/* =========================================
            BOTTOM PROGRESS
        ========================================= */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0

            h-[3px]
            bg-[#D9EAF7]
          "
        >
          <div
            className="
              h-full

              bg-gradient-to-r
              from-[#0877E8]
              via-[#159BF3]
              to-[#45C9FF]

              shadow-[0_0_15px_rgba(8,119,232,0.45)]

              transition-all
              duration-300
            "
            style={{
              width: `${progress * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}