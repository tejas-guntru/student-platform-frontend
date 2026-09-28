"use client";

import { useState } from "react";

const journey = [
  {
    number: "01",
    title: "Academics",
    text: "Your foundation and where your journey begins.",
    detail:
      "Bring your education, coursework and academic progress into one clear starting point for your career.",
  },
  {
    number: "02",
    title: "Skills",
    text: "The abilities you learn and continue improving.",
    detail:
      "Build practical technical and professional skills that prepare you for real opportunities.",
  },
  {
    number: "03",
    title: "Projects",
    text: "Real proof of what you can build and create.",
    detail:
      "Turn what you learn into hands-on projects that demonstrate your ability beyond certificates and grades.",
  },
  {
    number: "04",
    title: "Experience",
    text: "Where your knowledge becomes real-world work.",
    detail:
      "Add internships, collaborations and practical experience that show how you apply your skills.",
  },
  {
    number: "05",
    title: "Progress",
    text: "Everything coming together for your next move.",
    detail:
      "See your academics, skills, projects and experience grow together as you prepare for what comes next.",
  },
];

export default function YourTrail() {
  const [active, setActive] = useState(0);

  const activeItem = journey[active];

  return (
    <section
      id="your-trail"
      className="relative overflow-hidden bg-[#FAFAFA] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-28"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#1256af]/[0.04] blur-3xl" />

        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="mx-auto max-w-4xl text-center">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#1256af]/15
              bg-white
              px-4
              py-2
              shadow-sm
            "
          >
            <span className="h-2 w-2 rounded-full bg-[#1256af]" />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#1256af]
              "
            >
              Your Trail
            </span>
          </div>

          <h2
            className="
              mt-6
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-900
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            Every step{" "}
            <span className="text-[#1256af]">
              builds your story.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-base
              leading-7
              text-gray-600
              sm:text-lg
              sm:leading-8
            "
          >
            Your academics, skills, projects and experience are not separate
            pieces. Trailbliz brings them together into one clear career
            journey.
          </p>
        </div>

        {/* =========================================================
            DESKTOP EXPERIENCE
        ========================================================= */}

        <div
          className="
            mt-14
            hidden
            grid-cols-[0.82fr_1.18fr]
            gap-10
            lg:grid
            lg:items-stretch
            xl:gap-16
          "
        >
          {/* LEFT — step navigation */}
          <div
            className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              xl:p-6
            "
          >
            <div className="mb-5 px-2">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-gray-400
                "
              >
                Your journey
              </p>
            </div>

            <div className="relative">
              {/* Vertical base rail */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  bottom-7
                  left-[27px]
                  top-7
                  w-px
                  bg-gray-200
                "
              />

              {/* Completed rail */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-[27px]
                  top-7
                  w-px
                  bg-[#1256af]
                  transition-all
                  duration-500
                "
                style={{
                  height:
                    active === 0
                      ? "0%"
                      : `${(active / (journey.length - 1)) * 86}%`,
                }}
              />

              <div className="relative space-y-2">
                {journey.map((item, index) => {
                  const isActive = index === active;
                  const isPassed = index < active;

                  return (
                    <button
                      key={item.number}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`
                        group
                        relative
                        flex
                        w-full
                        items-center
                        gap-4
                        rounded-2xl
                        px-2
                        py-3
                        text-left
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "bg-[#1256af]/[0.05]"
                            : "hover:bg-gray-50"
                        }
                      `}
                    >
                      {/* Number */}
                      <div
                        className={`
                          relative
                          z-10
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          text-xs
                          font-bold
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? `
                                  border-[#1256af]
                                  bg-[#1256af]
                                  text-white
                                  shadow-md
                                `
                              : isPassed
                                ? `
                                    border-[#1256af]/30
                                    bg-[#1256af]/10
                                    text-[#1256af]
                                  `
                                : `
                                    border-gray-200
                                    bg-white
                                    text-gray-400
                                  `
                          }
                        `}
                      >
                        {item.number}
                      </div>

                      {/* Copy */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`
                            text-base
                            font-semibold
                            transition-colors
                            duration-300
                            xl:text-lg

                            ${
                              isActive
                                ? "text-[#1256af]"
                                : "text-gray-800"
                            }
                          `}
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-sm
                            leading-5
                            text-gray-500
                          "
                        >
                          {item.text}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`
                          mr-2
                          text-lg
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "translate-x-0 text-[#1256af] opacity-100"
                              : "-translate-x-1 text-gray-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }
                        `}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — active stage */}
          <div
            className="
              relative
              flex
              min-h-[520px]
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
              shadow-sm
            "
          >
            {/* Very subtle blue decoration */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-80
                w-80
                rounded-full
                bg-[#1256af]/[0.06]
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-36
                -left-32
                h-80
                w-80
                rounded-full
                bg-blue-50
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                flex
                w-full
                flex-col
                justify-between
                p-8
                xl:p-10
              "
            >
              <div>
                {/* Stage */}
                <div className="flex items-center justify-between">
                  <span
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-[#1256af]
                    "
                  >
                    Step {activeItem.number}
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-gray-400
                    "
                  >
                    {active + 1} / {journey.length}
                  </span>
                </div>

                {/* Large number */}
                <div
                  aria-hidden="true"
                  className="
                    mt-8
                    text-7xl
                    font-bold
                    leading-none
                    tracking-tight
                    text-[#1256af]/10
                    xl:text-8xl
                  "
                >
                  {activeItem.number}
                </div>

                <h3
                  className="
                    mt-6
                    text-4xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    xl:text-5xl
                  "
                >
                  {activeItem.title}
                </h3>

                <p
                  className="
                    mt-5
                    max-w-2xl
                    text-lg
                    leading-8
                    text-gray-600
                  "
                >
                  {activeItem.detail}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-12">
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-gray-400
                    "
                  >
                    Career journey
                  </span>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-[#1256af]
                    "
                  >
                    {Math.round(
                      ((active + 1) / journey.length) * 100
                    )}
                    %
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#1256af]
                      transition-all
                      duration-500
                      ease-out
                    "
                    style={{
                      width: `${
                        ((active + 1) / journey.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-100
                    pt-6
                  "
                >
                  <p className="text-sm text-gray-500">
                    Select any step to explore your journey.
                  </p>

                  {active < journey.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActive((current) =>
                          Math.min(
                            current + 1,
                            journey.length - 1
                          )
                        )
                      }
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-[#1256af]
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-[#1256af]
                        transition-all
                        duration-300
                        hover:bg-[#1256af]
                        hover:text-white
                      "
                    >
                      Next step

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
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActive(0)}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-200
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-gray-600
                        transition-all
                        duration-300
                        hover:border-[#1256af]
                        hover:text-[#1256af]
                      "
                    >
                      Start again
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            MOBILE / TABLET
        ========================================================= */}

        <div className="relative mt-12 lg:hidden">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-8
              left-[23px]
              top-8
              w-px
              bg-gray-200
              sm:left-[27px]
            "
          />

          <div className="relative space-y-5">
            {journey.map((item, index) => (
              <div
                key={item.number}
                className="
                  relative
                  flex
                  gap-4
                  sm:gap-5
                "
              >
                {/* Number */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#1256af]
                    bg-white
                    text-xs
                    font-bold
                    text-[#1256af]
                    shadow-sm
                    sm:h-14
                    sm:w-14
                  "
                >
                  {item.number}
                </div>

                {/* Card */}
                <div
                  className="
                    flex-1
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    sm:p-6
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#1256af]
                    "
                  >
                    Step {item.number}
                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-bold
                      text-gray-900
                      sm:text-2xl
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-600
                      sm:text-base
                      sm:leading-7
                    "
                  >
                    {item.text}
                  </p>

                  <p
                    className="
                      mt-4
                      border-t
                      border-gray-100
                      pt-4
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            END MESSAGE
        ========================================================= */}

        <div
          className="
            mt-14
            border-t
            border-gray-200
            pt-8
            text-center
            sm:mt-16
          "
        >
          <p
            className="
              text-lg
              font-semibold
              text-gray-700
              sm:text-xl
            "
          >
            Every step adds to{" "}
            <span className="text-[#1256af]">
              who you&apos;re becoming.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}