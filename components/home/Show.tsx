"use client";

import Link from "next/link";
import { useState } from "react";

const projectTech = ["Java", "Spring Boot", "PostgreSQL"];

const proofItems = [
  {
    id: "project",
    label: "Featured Project",
    title: "College Payment OS",
    description:
      "A structured payment platform built to manage student payments, records and transaction workflows.",
  },
  {
    id: "skills",
    label: "Skills",
    title: "What you can work with",
    description:
      "Present the technologies and abilities you have developed through learning and practical work.",
  },
  {
    id: "progress",
    label: "Progress",
    title: "How you are growing",
    description:
      "Keep your learning, projects and experience visible as your professional profile develops.",
  },
];

export default function Show() {
  const [active, setActive] = useState("project");

  return (
    <section
      id="show"
      className="
        relative
        overflow-hidden
        bg-[#FAFAFA]
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-12
        lg:py-28
      "
    >
      {/* Subtle background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            top-20
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
            bg-blue-100/25
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
                Show your work
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
              Proof speaks louder{" "}
              <span className="text-[#1256af]">
                than words.
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
            Turn your projects, skills and progress into visible proof of what
            you can actually do.
          </p>
        </div>

        {/* =========================================================
            SHOWCASE
        ========================================================= */}

        <div
          className="
            mt-14
            grid
            gap-6
            lg:mt-20
            lg:grid-cols-[1.35fr_0.65fr]
            lg:gap-8
          "
        >
          {/* =======================================================
              FEATURED PROJECT
          ======================================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
              sm:p-8
              lg:p-10
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

            <div className="relative z-10">
              {/* Top */}

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
                <div
                  className="
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    bg-[#1256af]/[0.07]
                    px-3
                    py-1.5
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1256af]" />

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#1256af]
                    "
                  >
                    Featured project
                  </span>
                </div>

                <span
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-gray-400
                  "
                >
                  Project showcase
                </span>
              </div>

              {/* Project visual */}

              <div
                className="
                  mt-8
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-[#FAFAFA]
                  p-5
                  sm:p-7
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-gray-200
                    pb-4
                  "
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  </div>

                  <span className="text-xs font-medium text-gray-400">
                    project.preview
                  </span>
                </div>

                <div
                  className="
                    grid
                    gap-4
                    pt-6
                    sm:grid-cols-[0.7fr_1.3fr]
                    sm:items-center
                  "
                >
                  <div
                    className="
                      flex
                      aspect-square
                      max-h-[190px]
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#1256af]
                      p-6
                      text-center
                      text-white
                    "
                  >
                    <div>
                      <p
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-[0.14em]
                          text-white/70
                        "
                      >
                        Project
                      </p>

                      <p
                        className="
                          mt-3
                          text-2xl
                          font-bold
                          leading-tight
                        "
                      >
                        College
                        <br />
                        Payment OS
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      p-5
                    "
                  >
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-gray-400
                      "
                    >
                      Built with
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {projectTech.map((tech) => (
                        <span
                          key={tech}
                          className="
                            rounded-lg
                            border
                            border-[#1256af]/15
                            bg-[#1256af]/[0.05]
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-[#1256af]
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="h-2 w-full rounded-full bg-gray-100" />
                      <div className="h-2 w-[86%] rounded-full bg-gray-100" />
                      <div className="h-2 w-[68%] rounded-full bg-gray-100" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project copy */}

              <div className="mt-8">
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#1256af]
                  "
                >
                  Featured work
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    sm:text-3xl
                  "
                >
                  College Payment OS
                </h3>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-6
                    text-gray-600
                    sm:text-base
                    sm:leading-7
                  "
                >
                  A project becomes more useful when it clearly communicates
                  the problem you solved, the technologies you used and what
                  you actually built.
                </p>
              </div>

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {projectTech.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-full
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-gray-600
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* =======================================================
              SUPPORTING PROOF
          ======================================================= */}

          <div className="flex flex-col gap-6">
            {/* Skills */}

            <button
              type="button"
              onClick={() => setActive("skills")}
              className={`
                group
                flex-1
                rounded-3xl
                border
                bg-white
                p-6
                text-left
                transition-all
                duration-300
                sm:p-7

                ${
                  active === "skills"
                    ? `
                        border-[#1256af]/35
                        shadow-md
                      `
                    : `
                        border-gray-200
                        shadow-sm
                        hover:border-[#1256af]/20
                        hover:shadow-md
                      `
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1256af]/10
                    text-sm
                    font-bold
                    text-[#1256af]
                  "
                >
                  01
                </div>

                <span
                  className={`
                    text-lg
                    transition-all
                    duration-300

                    ${
                      active === "skills"
                        ? "translate-x-0 text-[#1256af]"
                        : "-translate-x-1 text-gray-300 group-hover:translate-x-0 group-hover:text-[#1256af]"
                    }
                  `}
                >
                  →
                </span>
              </div>

              <p
                className="
                  mt-6
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#1256af]
                "
              >
                Skills
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
                Show what you know.
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-gray-600
                "
              >
                Make the technologies and abilities behind your work easy to
                understand.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Java", "React", "SQL", "Spring Boot"].map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-lg
                      bg-gray-50
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-gray-600
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </button>

            {/* Progress */}

            <button
              type="button"
              onClick={() => setActive("progress")}
              className={`
                group
                flex-1
                rounded-3xl
                border
                bg-white
                p-6
                text-left
                transition-all
                duration-300
                sm:p-7

                ${
                  active === "progress"
                    ? `
                        border-[#1256af]/35
                        shadow-md
                      `
                    : `
                        border-gray-200
                        shadow-sm
                        hover:border-[#1256af]/20
                        hover:shadow-md
                      `
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1256af]/10
                    text-sm
                    font-bold
                    text-[#1256af]
                  "
                >
                  02
                </div>

                <span
                  className={`
                    text-lg
                    transition-all
                    duration-300

                    ${
                      active === "progress"
                        ? "translate-x-0 text-[#1256af]"
                        : "-translate-x-1 text-gray-300 group-hover:translate-x-0 group-hover:text-[#1256af]"
                    }
                  `}
                >
                  →
                </span>
              </div>

              <p
                className="
                  mt-6
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#1256af]
                "
              >
                Progress
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
                Let your growth show.
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-gray-600
                "
              >
                Your profile develops as you learn new skills, complete
                projects and gain experience.
              </p>

              {/* No fake percentage */}

              <div className="mt-7 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Skills
                    </span>

                    <span className="text-xs font-semibold text-[#1256af]">
                      Growing
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-3/4 rounded-full bg-[#1256af]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Projects
                    </span>

                    <span className="text-xs font-semibold text-[#1256af]">
                      Building
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-2/3 rounded-full bg-[#1256af]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Experience
                    </span>

                    <span className="text-xs font-semibold text-[#1256af]">
                      Developing
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-1/2 rounded-full bg-[#1256af]" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* =========================================================
            PROOF TYPES
        ========================================================= */}

        <div
          className="
            mt-10
            grid
            gap-4
            sm:grid-cols-3
          "
        >
          {proofItems.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`
                  rounded-2xl
                  border
                  p-5
                  text-left
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                          border-[#1256af]/30
                          bg-[#1256af]/[0.04]
                        `
                      : `
                          border-gray-200
                          bg-white
                          hover:border-[#1256af]/20
                        `
                  }
                `}
              >
                <p
                  className={`
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]

                    ${
                      isActive
                        ? "text-[#1256af]"
                        : "text-gray-400"
                    }
                  `}
                >
                  {item.label}
                </p>

                <h4
                  className="
                    mt-2
                    text-base
                    font-bold
                    text-gray-900
                  "
                >
                  {item.title}
                </h4>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-500
                  "
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            END MESSAGE / CTA
        ========================================================= */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-6
            border-t
            border-gray-200
            pt-8
            sm:mt-16
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-lg
                font-semibold
                text-gray-700
                sm:text-xl
              "
            >
              Don&apos;t just say what you can do.
              <span className="text-[#1256af]">
                {" "}
                Show it.
              </span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Projects, skills and progress become part of your professional
              story.
            </p>
          </div>

          <Link
            href="/register"
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#1256af]
              px-5
              py-3
              text-sm
              font-semibold
              text-[#1256af]
              transition-all
              duration-300
              hover:bg-[#1256af]
              hover:text-white
            "
          >
            Build your profile

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
      </div>
    </section>
  );
}