"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  {
    number: "01",
    title: "Academics",
    value: "Computer Science Engineering",
    description: "Your foundation and academic journey.",
    side: "left",
  },
  {
    number: "02",
    title: "Skills",
    value: "Java · React · Spring Boot · AWS",
    description: "What you know and what you keep improving.",
    side: "right",
  },
  {
    number: "03",
    title: "Projects",
    value: "Operating System",
    description: "Proof of what you can actually build.",
    side: "left",
  },
  {
    number: "04",
    title: "Experience",
    value: "Software Engineering Intern",
    description: "Where your skills meet real work.",
    side: "right",
  },
];

export default function Build() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.75;
      const end = -rect.height * 0.65;

      const rawProgress =
        (start - rect.top) / (start - end);

      const nextProgress = Math.min(
        1,
        Math.max(0, rawProgress)
      );

      setProgress(nextProgress);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        px-5
        py-20

        sm:px-8
        sm:py-24

        lg:px-12
        lg:py-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-[15%]
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#DDF1FF]
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          top-[45%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#CDEAFF]/70
          blur-[150px]
        "
      />

      {/* Dots */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.38]
        "
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(8,119,232,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            INTRO
        ===================================================== */}

        <div
          className="
            grid
            gap-10

            lg:grid-cols-[1fr_0.72fr]
            lg:items-end
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#CDE5F8]
                bg-[#F4FAFF]
                px-4
                py-2
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#0877E8]
                  shadow-[0_0_12px_rgba(8,119,232,0.5)]
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
                Build your identity
              </span>
            </div>

            <h2
              className="
                mt-6
                max-w-4xl
                text-[clamp(3rem,6vw,6rem)]
                font-bold
                leading-[0.9]
                tracking-[-0.065em]
                text-[#102F51]
              "
            >
              You&apos;re more than

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#0877E8]
                  via-[#1294F2]
                  to-[#3BC3FF]
                  bg-clip-text
                  text-transparent
                "
              >
                a single resume.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-xl
              text-base
              leading-7
              text-[#5F7690]

              sm:text-lg
              sm:leading-8

              lg:justify-self-end
            "
          >
            Your academics, skills, projects and experience
            tell a much bigger story when they&apos;re
            connected together.
          </p>
        </div>

        {/* =====================================================
            SCROLL JOURNEY
        ===================================================== */}

        <div
          className="
            relative
            mt-20

            sm:mt-24
            lg:mt-32
          "
        >
          {/* ===============================================
              CENTER TRAIL
          =============================================== */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-[110px]
              left-1/2
              top-[70px]
              hidden
              w-[2px]
              -translate-x-1/2
              overflow-hidden
              rounded-full
              bg-[#D9ECFA]

              lg:block
            "
          >
            {/* Scroll progress */}
            <div
              className="
                absolute
                left-0
                top-0
                w-full
                rounded-full
                bg-gradient-to-b
                from-[#0877E8]
                via-[#25A9F6]
                to-[#55D2FF]

                shadow-[0_0_18px_rgba(8,119,232,0.55)]
              "
              style={{
                height: `${progress * 100}%`,
              }}
            />
          </div>

          {/* Trail glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              hidden
              h-[85%]
              w-24
              -translate-x-1/2
              -translate-y-1/2
              bg-[#55C8FF]/10
              blur-[60px]

              lg:block
            "
          />

          {/* ===============================================
              ITEMS
          =============================================== */}

          <div className="relative space-y-8 lg:space-y-24">
            {items.map((item, index) => {
              const trigger = index * 0.18 + 0.05;

              const visible = progress >= trigger;

              return (
                <JourneyItem
                  key={item.number}
                  item={item}
                  visible={visible}
                />
              );
            })}
          </div>

          {/* =================================================
              FINAL DESTINATION
          ================================================= */}

          <div
            className={`
              relative
              mx-auto
              mt-20
              max-w-lg

              transition-all
              duration-1000
              ease-out

              lg:mt-28

              ${
                progress > 0.72
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-16 scale-[0.94] opacity-0"
              }
            `}
          >
            {/* Glow */}
            <div
              className="
                absolute
                inset-4
                rounded-[32px]
                bg-[#1AA4F6]/30
                blur-[55px]
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                bg-gradient-to-r
                from-[#0877E8]
                via-[#1294F2]
                to-[#38BDF8]
                p-[1px]

                shadow-[0_30px_80px_rgba(8,119,232,0.28)]
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[29px]
                  bg-[#0A83E9]
                  px-7
                  py-9
                  text-center
                  text-white
                "
              >
                {/* shine */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[-100px]
                    h-[180px]
                    w-[70%]
                    -translate-x-1/2
                    rounded-full
                    bg-white/15
                    blur-[60px]
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
                      bg-white/15
                      text-xl
                      backdrop-blur-md

                      transition-transform
                      duration-500

                      hover:scale-110
                      hover:rotate-6
                    "
                  >
                    ↗
                  </div>

                  <p
                    className="
                      mt-5
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-white/65
                    "
                  >
                    Your story
                  </p>

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-bold
                      tracking-[-0.035em]
                      text-white

                      sm:text-3xl
                    "
                  >
                    One profile. Everything about you.
                  </h3>

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-sm
                      text-sm
                      leading-6
                      text-white/70
                    "
                  >
                    Your complete journey becomes a profile
                    that grows with you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   JOURNEY ITEM
========================================================= */

function JourneyItem({
  item,
  visible,
}: {
  item: {
    number: string;
    title: string;
    value: string;
    description: string;
    side: string;
  };
  visible: boolean;
}) {
  const isLeft = item.side === "left";

  return (
    <div
      className={`
        relative
        w-full

        transition-all
        duration-1000
        ease-out

        lg:w-[43%]

        ${
          isLeft
            ? "lg:mr-auto"
            : "lg:ml-auto"
        }

        ${
          visible
            ? "translate-x-0 translate-y-0 opacity-100"
            : isLeft
              ? "-translate-x-16 translate-y-12 opacity-20"
              : "translate-x-16 translate-y-12 opacity-20"
        }
      `}
    >
      {/* ===============================================
          CONNECTION LINE
      =============================================== */}

      <div
        aria-hidden="true"
        className={`
          absolute
          top-1/2
          hidden
          h-px
          w-[16.3%]
          -translate-y-1/2

          transition-all
          duration-700

          lg:block

          ${
            isLeft
              ? "left-full"
              : "right-full"
          }

          ${
            visible
              ? "bg-[#7BC8F6]"
              : "bg-[#D9EAF7]"
          }
        `}
      />

      {/* ===============================================
          CENTER DOT
      =============================================== */}

      <div
        aria-hidden="true"
        className={`
          absolute
          top-1/2
          hidden
          h-4
          w-4
          -translate-y-1/2
          rounded-full
          border-[4px]
          border-white

          transition-all
          duration-700

          lg:block

          ${
            isLeft
              ? "left-[calc(116.3%-8px)]"
              : "right-[calc(116.3%-8px)]"
          }

          ${
            visible
              ? `
                scale-100
                bg-[#1689F5]
                shadow-[0_0_0_1px_#83C5F3,0_0_25px_rgba(8,119,232,0.55)]
              `
              : `
                scale-75
                bg-[#B8D9EF]
              `
          }
        `}
      />

      {/* ===============================================
          CARD
      =============================================== */}

      <div
        className={`
          group
          relative
          overflow-hidden
          rounded-[28px]
          border
          bg-white/90
          p-6
          backdrop-blur-xl

          transition-all
          duration-700

          sm:p-7

          ${
            visible
              ? `
                border-[#C5E2F5]
                shadow-[0_20px_60px_rgba(8,119,232,0.11)]
              `
              : `
                border-[#E5EFF6]
                shadow-[0_10px_30px_rgba(8,119,232,0.04)]
              `
          }

          hover:-translate-y-2
          hover:border-[#8CCEF5]
          hover:shadow-[0_26px_70px_rgba(8,119,232,0.16)]
        `}
      >
        {/* Card glow */}
        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            blur-[45px]

            transition-all
            duration-700

            ${
              visible
                ? "scale-100 bg-[#DDF2FF]"
                : "scale-75 bg-transparent"
            }

            group-hover:scale-125
          `}
        />

        {/* Top accent */}
        <div
          className={`
            absolute
            left-8
            right-8
            top-0
            h-[2px]

            bg-gradient-to-r
            from-transparent
            via-[#38BDF8]
            to-transparent

            transition-opacity
            duration-700

            ${
              visible
                ? "opacity-60"
                : "opacity-0"
            }
          `}
        />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span
              className="
                inline-flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#E7F4FF]

                text-xs
                font-bold
                text-[#0877E8]

                transition-all
                duration-500

                group-hover:scale-110
                group-hover:bg-[#0877E8]
                group-hover:text-white
              "
            >
              {item.number}
            </span>

            <span
              className={`
                h-2
                w-2
                rounded-full

                transition-all
                duration-700

                ${
                  visible
                    ? `
                      bg-[#39BDF7]
                      shadow-[0_0_12px_rgba(57,189,247,0.8)]
                    `
                    : "bg-[#C6DFEF]"
                }
              `}
            />
          </div>

          <p
            className="
              mt-6
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#5B8DB5]
            "
          >
            {item.title}
          </p>

          <h3
            className="
              mt-2
              text-xl
              font-bold
              leading-tight
              tracking-[-0.03em]
              text-[#173B63]

              sm:text-2xl
            "
          >
            {item.value}
          </h3>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-[#6A8198]
            "
          >
            {item.description}
          </p>

          <div
            className={`
              mt-6
              h-1
              rounded-full
              bg-gradient-to-r
              from-[#0877E8]
              to-[#45C6FF]

              transition-all
              duration-700

              ${
                visible
                  ? "w-14"
                  : "w-0"
              }

              group-hover:w-24
            `}
          />
        </div>
      </div>
    </div>
  );
}