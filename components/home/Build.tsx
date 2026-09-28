"use client";

import { useState } from "react";

const profileParts = [
  {
    number: "01",
    label: "Academics",
    title: "Your foundation",
    description:
      "Show where you studied, what you learned and the academic foundation behind your career journey.",
    short: "Education & learning",
  },
  {
    number: "02",
    label: "Skills",
    title: "What you can do",
    description:
      "Bring together the technical and professional skills you have learned and continue to improve.",
    short: "Technical abilities",
  },
  {
    number: "03",
    label: "Projects",
    title: "What you have built",
    description:
      "Turn projects into visible proof of your ability to solve problems and create real things.",
    short: "Practical proof",
  },
  {
    number: "04",
    label: "Experience",
    title: "Where you applied it",
    description:
      "Add internships, work and practical experience that show how your knowledge performs in the real world.",
    short: "Real-world work",
  },
];

export default function Build() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="build"
      className="
        relative
        overflow-hidden
        bg-white
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-12
        lg:py-28
      "
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            top-1/3
            h-80
            w-80
            rounded-full
            bg-[#1256af]/[0.035]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-10
            h-96
            w-96
            rounded-full
            bg-blue-50/70
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-[1fr_0.7fr]
            lg:items-end
            lg:gap-12
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
                border-[#1256af]/15
                bg-[#FAFAFA]
                px-4
                py-2
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
                Build your profile
              </span>
            </div>

            <h2
              className="
                mt-6
                max-w-4xl
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
              You&apos;re more than{" "}
              <span className="text-[#1256af]">
                a single resume.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-xl
              text-base
              leading-7
              text-gray-600
              sm:text-lg
              sm:leading-8
              lg:justify-self-end
            "
          >
            Your academics, skills, projects and experience tell different
            parts of your story. Trailbliz brings them together into one
            professional identity.
          </p>
        </div>

        {/* =========================================================
            MAIN PROFILE BUILDER
        ========================================================= */}

        <div
          className="
            mt-14
            grid
            gap-8
            lg:mt-20
            lg:grid-cols-[0.95fr_1.05fr]
            lg:items-stretch
            lg:gap-10
            xl:gap-14
          "
        >
          {/* =======================================================
              LEFT — PROFILE PARTS
          ======================================================= */}

          <div className="space-y-4">
            {profileParts.map((part, index) => {
              const isActive = active === index;

              return (
                <button
                  key={part.number}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`
                    group
                    flex
                    w-full
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    p-5
                    text-left
                    transition-all
                    duration-300
                    sm:p-6

                    ${
                      isActive
                        ? `
                            border-[#1256af]/30
                            bg-[#1256af]/[0.035]
                            shadow-md
                          `
                        : `
                            border-gray-200
                            bg-white
                            shadow-sm
                            hover:border-[#1256af]/20
                            hover:shadow-md
                          `
                    }
                  `}
                >
                  <div
                    className={`
                      flex
                      h-12
                      w-12
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
                            `
                          : `
                              border-gray-200
                              bg-[#FAFAFA]
                              text-gray-500
                              group-hover:border-[#1256af]/30
                              group-hover:text-[#1256af]
                            `
                      }
                    `}
                  >
                    {part.number}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p
                          className={`
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-[0.13em]
                            transition-colors

                            ${
                              isActive
                                ? "text-[#1256af]"
                                : "text-gray-400"
                            }
                          `}
                        >
                          {part.label}
                        </p>

                        <h3
                          className="
                            mt-1
                            text-lg
                            font-bold
                            text-gray-900
                            sm:text-xl
                          "
                        >
                          {part.title}
                        </h3>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`
                          hidden
                          text-xl
                          transition-all
                          duration-300
                          sm:block

                          ${
                            isActive
                              ? "translate-x-0 text-[#1256af] opacity-100"
                              : "-translate-x-1 text-gray-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }
                        `}
                      >
                        →
                      </span>
                    </div>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                      "
                    >
                      {part.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* =======================================================
              RIGHT — COMPLETE PROFILE PREVIEW
          ======================================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-[#FAFAFA]
              p-5
              shadow-sm
              sm:p-7
              lg:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-28
                -top-28
                h-72
                w-72
                rounded-full
                bg-[#1256af]/[0.05]
                blur-3xl
              "
            />

            <div className="relative z-10">
              {/* Profile header */}

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-sm
                  sm:p-6
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#1256af]
                        text-lg
                        font-bold
                        text-white
                      "
                    >
                      T
                    </div>

                    <div>
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.14em]
                          text-[#1256af]
                        "
                      >
                        Trailbliz Profile
                      </p>

                      <h3
                        className="
                          mt-1
                          text-xl
                          font-bold
                          text-gray-900
                          sm:text-2xl
                        "
                      >
                        Your professional story
                      </h3>
                    </div>
                  </div>

                  <div
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      rounded-full
                      bg-green-50
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-green-700
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    Growing
                  </div>
                </div>
              </div>

              {/* Profile sections */}

              <div
                className="
                  mt-5
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >
                {profileParts.map((part, index) => {
                  const isActive = active === index;

                  return (
                    <button
                      key={part.number}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        bg-white
                        p-5
                        text-left
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                                -translate-y-1
                                border-[#1256af]/40
                                shadow-md
                              `
                            : `
                                border-gray-200
                                shadow-sm
                                hover:-translate-y-0.5
                                hover:border-[#1256af]/20
                                hover:shadow-md
                              `
                        }
                      `}
                    >
                      {isActive && (
                        <div
                          aria-hidden="true"
                          className="
                            absolute
                            left-0
                            top-0
                            h-1
                            w-full
                            bg-[#1256af]
                          "
                        />
                      )}

                      <div className="flex items-center justify-between">
                        <span
                          className={`
                            text-xs
                            font-bold

                            ${
                              isActive
                                ? "text-[#1256af]"
                                : "text-gray-400"
                            }
                          `}
                        >
                          {part.number}
                        </span>

                        <span
                          className={`
                            h-2
                            w-2
                            rounded-full

                            ${
                              isActive
                                ? "bg-[#1256af]"
                                : "bg-gray-200"
                            }
                          `}
                        />
                      </div>

                      <h4
                        className="
                          mt-5
                          text-lg
                          font-bold
                          text-gray-900
                        "
                      >
                        {part.label}
                      </h4>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-gray-500
                        "
                      >
                        {part.short}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active detail */}

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-[#1256af]/15
                  bg-white
                  p-5
                  shadow-sm
                  sm:p-6
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                  "
                >
                  <div className="max-w-xl">
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[#1256af]
                      "
                    >
                      Currently viewing
                    </p>

                    <h4
                      className="
                        mt-2
                        text-xl
                        font-bold
                        text-gray-900
                      "
                    >
                      {profileParts[active].label}
                    </h4>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-600
                      "
                    >
                      {profileParts[active].description}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#1256af]/10
                      text-xs
                      font-bold
                      text-[#1256af]
                    "
                  >
                    {profileParts[active].number}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            FINAL COMBINATION
        ========================================================= */}

        <div
          className="
            relative
            mt-14
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-[#FAFAFA]
            px-5
            py-8
            sm:mt-16
            sm:px-8
            sm:py-10
            lg:mt-20
            lg:px-12
            lg:py-12
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-[#1256af]/[0.05]
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              grid
              gap-8
              lg:grid-cols-[0.8fr_1.2fr]
              lg:items-center
              lg:gap-12
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#1256af]
                "
              >
                It all comes together
              </p>

              <h3
                className="
                  mt-3
                  text-3xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  sm:text-4xl
                "
              >
                One profile.
                <span className="block text-[#1256af]">
                  Everything about you.
                </span>
              </h3>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-base
                  leading-7
                  text-gray-600
                "
              >
                Instead of scattering your story across documents,
                certificates and links, Trailbliz gives your growth one place
                to live.
              </p>
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-4
              "
            >
              {profileParts.map((part) => (
                <div
                  key={part.number}
                  className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-4
                    text-center
                    shadow-sm
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#1256af]/10
                      text-[10px]
                      font-bold
                      text-[#1256af]
                    "
                  >
                    {part.number}
                  </div>

                  <p
                    className="
                      mt-3
                      text-sm
                      font-semibold
                      text-gray-800
                    "
                  >
                    {part.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================= */}

        <div
          className="
            mt-12
            flex
            flex-col
            gap-3
            border-t
            border-gray-200
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
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
            Build more than a resume.
            <span className="text-[#1256af]">
              {" "}
              Build your story.
            </span>
          </p>

          <p className="text-sm font-medium text-gray-500">
            Academics • Skills • Projects • Experience
          </p>
        </div>
      </div>
    </section>
  );
}