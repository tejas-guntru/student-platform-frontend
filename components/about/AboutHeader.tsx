"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FolderKanban,
  GraduationCap,
  Sparkles,
  UserRound,
} from "lucide-react";

const slides = [
  {
    title: "Build your profile",
    description:
      "Bring academics, skills, projects and career details into one connected student profile.",
    icon: UserRound,
    label: "Profile",
  },
  {
    title: "Show your work",
    description:
      "Turn projects, skills and progress into proof of what you can actually do.",
    icon: FolderKanban,
    label: "Proof",
  },
  {
    title: "Discover opportunities",
    description:
      "Explore opportunities that connect with your skills, goals and career direction.",
    icon: BriefcaseBusiness,
    label: "Opportunities",
  },
];

const profileItems = [
  {
    label: "Academics",
    value: "Education & college",
    icon: GraduationCap,
  },
  {
    label: "Skills",
    value: "What you can do",
    icon: Sparkles,
  },
  {
    label: "Projects",
    value: "Proof of your work",
    icon: FolderKanban,
  },
];

export default function AboutHeader() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  const ActiveIcon = slides[activeSlide].icon;

  return (
    <section
      id="about"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#F5FAFF]
        pt-28
        sm:pt-32
        lg:pt-36
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#38BDF8]/15
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-44
          top-[-80px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#0877E8]/15
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.28]
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
          backgroundSize: "54px 54px",
        }}
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          pb-20
          sm:px-6
          lg:px-8
          lg:pb-24
        "
      >
        <div
          className="
            grid
            items-center
            gap-14
            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* =================================================
              VISUAL
          ================================================= */}

          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-xl">
              {/* floating glow */}

              <div
                className="
                  absolute
                  -inset-8
                  rounded-[44px]
                  bg-gradient-to-br
                  from-[#0877E8]/15
                  via-[#38BDF8]/10
                  to-transparent
                  blur-3xl
                "
              />

              {/* product card */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/80
                  bg-white/80
                  p-4
                  shadow-[0_30px_80px_rgba(8,119,232,0.13)]
                  backdrop-blur-2xl
                  sm:p-5
                "
              >
                {/* top bar */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-[22px]
                    border
                    border-[#DCECF8]
                    bg-[#F8FCFF]
                    px-4
                    py-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-[#6D8AA4]
                      "
                    >
                      Trailbliz
                    </p>

                    <p
                      className="
                        mt-1
                        font-semibold
                        text-[#173B63]
                      "
                    >
                      Your career profile
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-[#0877E8]
                      to-[#38BDF8]
                      text-white
                      shadow-[0_8px_20px_rgba(8,119,232,0.22)]
                    "
                  >
                    <UserRound size={18} />
                  </div>
                </div>

                {/* profile items */}

                <div className="mt-4 space-y-3">
                  {profileItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="
                          flex
                          items-center
                          gap-4
                          rounded-2xl
                          border
                          border-[#E0EDF7]
                          bg-white
                          px-4
                          py-3.5
                          shadow-[0_6px_20px_rgba(25,80,130,0.04)]
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#EAF6FF]
                            text-[#0877E8]
                          "
                        >
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-[#173B63]
                            "
                          >
                            {item.label}
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              text-[#70869B]
                            "
                          >
                            {item.value}
                          </p>
                        </div>

                        <CheckCircle2
                          size={18}
                          className="text-[#38A9ED]"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* rotating feature */}

                <div
                  className="
                    relative
                    mt-4
                    overflow-hidden
                    rounded-[22px]
                    bg-gradient-to-br
                    from-[#0877E8]
                    via-[#1294F2]
                    to-[#38BDF8]
                    p-5
                    text-white
                  "
                >
                  <div
                    className="
                      absolute
                      -right-12
                      -top-12
                      h-32
                      w-32
                      rounded-full
                      bg-white/15
                      blur-xl
                    "
                  />

                  <div className="relative flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-white/20
                        bg-white/15
                        backdrop-blur
                      "
                    >
                      <ActiveIcon size={20} />
                    </div>

                    <div>
                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.17em]
                          text-white/70
                        "
                      >
                        {slides[activeSlide].label}
                      </p>

                      <h3
                        className="
                          mt-1
                          text-lg
                          font-semibold
                        "
                      >
                        {slides[activeSlide].title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-white/80
                        "
                      >
                        {slides[activeSlide].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* indicators */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  {slides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      aria-label={`Show ${slide.title}`}
                      onClick={() => setActiveSlide(index)}
                      className={`
                        h-2
                        rounded-full
                        transition-all
                        duration-300

                        ${
                          activeSlide === index
                            ? "w-7 bg-[#0877E8]"
                            : "w-2 bg-[#C9DDEC] hover:bg-[#9FC8E7]"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>

              {/* floating card */}

              <div
                className="
                  absolute
                  -bottom-6
                  -right-3
                  hidden
                  rounded-2xl
                  border
                  border-white/80
                  bg-white/85
                  px-4
                  py-3
                  shadow-[0_14px_40px_rgba(8,119,232,0.13)]
                  backdrop-blur-xl
                  sm:block
                  lg:-right-8
                "
              >
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#6D8AA4]
                  "
                >
                  One profile
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-semibold
                    text-[#0877E8]
                  "
                >
                  Your whole journey.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="order-1 lg:order-2">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#C9E4F7]
                bg-white/70
                px-4
                py-2
                backdrop-blur
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
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-[#4C7DA7]
                "
              >
                About Trailbliz
              </span>
            </div>

            <h1
              className="
                mt-6
                max-w-2xl
                text-4xl
                font-bold
                leading-[0.98]
                tracking-[-0.055em]
                text-[#143655]

                sm:text-5xl
                lg:text-6xl
                xl:text-[68px]
              "
            >
              Built for the journey
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
                between college and career.
              </span>
            </h1>

            <p
              className="
                mt-7
                max-w-xl
                text-base
                leading-7
                text-[#58738D]

                sm:text-lg
                sm:leading-8
              "
            >
              Trailbliz helps students bring their academics, skills,
              projects and opportunities together so their growth is
              visible, organized and ready to move forward.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <Link
                href="/register"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl

                  bg-gradient-to-r
                  from-[#0877E8]
                  to-[#1FAAF4]

                  px-6
                  py-3.5

                  text-sm
                  font-semibold
                  text-white

                  shadow-[0_12px_30px_rgba(8,119,232,0.22)]

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:shadow-[0_16px_38px_rgba(8,119,232,0.28)]
                "
              >
                Start your Trailbliz

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                href="#how-trailbliz-works"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#C7DFF1]
                  bg-white/70
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#173B63]
                  backdrop-blur
                  transition-all
                  duration-200
                  hover:border-[#8ECBF2]
                  hover:bg-white
                "
              >
                How Trailbliz works
              </Link>
            </div>

            <div
              className="
                mt-9
                flex
                flex-wrap
                gap-x-6
                gap-y-3
              "
            >
              {[
                "Student-first",
                "Proof-driven",
                "Career-focused",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-[#5D7890]
                  "
                >
                  <CheckCircle2
                    size={16}
                    className="text-[#1689F5]"
                  />

                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          WHAT TRAILBLIZ CONNECTS
      ===================================================== */}

      <div
        className="
          relative
          z-10
          border-y
          border-[#DDEBF6]
          bg-white/65
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            py-10
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              grid-cols-2
              gap-4
              lg:grid-cols-4
              lg:gap-6
            "
          >
            {[
              {
                title: "Academics",
                text: "Your foundation",
              },
              {
                title: "Skills",
                text: "What you can do",
              },
              {
                title: "Projects",
                text: "Proof of your work",
              },
              {
                title: "Opportunities",
                text: "Where you go next",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
                  rounded-2xl
                  border
                  border-[#E0EDF7]
                  bg-white
                  p-5
                  shadow-[0_6px_20px_rgba(8,119,232,0.035)]
                "
              >
                <p
                  className="
                    text-lg
                    font-bold
                    tracking-[-0.025em]
                    text-[#173B63]
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-[#73889C]
                  "
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}