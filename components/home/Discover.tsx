import Link from "next/link";

export default function Discover() {
  const opportunities = [
    {
      type: "INTERNSHIP",
      category: "Technology",
      title: "Software Engineering Intern",
      company: "Amazon",
      location: "Remote · India",
      featured: true,
    },
    {
      type: "FULL-TIME",
      category: "Engineering",
      title: "Graduate Software Engineer",
      company: "Google",
      location: "Bengaluru · India",
      featured: false,
    },
    {
      type: "INTERNSHIP",
      category: "Product",
      title: "Frontend Developer Intern",
      company: "Microsoft",
      location: "Hyderabad · India",
      featured: false,
    },
  ];

  return (
    <section
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
          BACKGROUND EFFECTS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#DDF2FF]
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-52
          bottom-0
          h-[540px]
          w-[540px]
          rounded-full
          bg-[#C8E9FF]/70
          blur-[150px]
        "
      />

      {/* Dot pattern */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.32]
        "
        style={{
          backgroundImage:
            "radial-gradient(rgba(8,119,232,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[1fr_0.72fr]
            lg:items-end
          "
        >
          <div>
            {/* Label */}

            <div
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-[#CBE4F8]
                bg-[#F5FBFF]
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
                Discover opportunities
              </span>
            </div>

            {/* Heading */}

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
              Find what&apos;s
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#0877E8]
                  via-[#1396F2]
                  to-[#36BDF8]
                  bg-clip-text
                  text-transparent
                "
              >
                next for you.
              </span>
            </h2>
          </div>

          {/* Description */}

          <p
            className="
              max-w-md
              text-base
              leading-7
              text-[#607890]

              sm:text-lg
              sm:leading-8

              lg:justify-self-end
            "
          >
            Explore internships and graduate opportunities connected to
            your skills, profile and career journey.
          </p>
        </div>

        {/* =====================================================
            OPPORTUNITIES
        ===================================================== */}

        <div
          className="
            mt-14
            grid
            gap-5

            sm:mt-16

            lg:mt-20
            lg:grid-cols-12
          "
        >
          {opportunities.map((opportunity, index) => {
            const isFeatured = opportunity.featured;

            return (
              <div
                key={opportunity.title}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  transition-all
                  duration-300

                  hover:-translate-y-1

                  ${
                    isFeatured
                      ? `
                        bg-gradient-to-br
                        from-[#075FCB]
                        via-[#0877E8]
                        to-[#22AAF4]
                        text-white
                        shadow-[0_24px_70px_rgba(8,119,232,0.22)]

                        lg:col-span-12
                      `
                      : `
                        border
                        border-[#D7E9F6]
                        bg-white/90
                        shadow-[0_12px_40px_rgba(8,119,232,0.06)]

                        hover:border-[#ADD9F5]
                        hover:shadow-[0_20px_55px_rgba(8,119,232,0.12)]

                        lg:col-span-6
                      `
                  }
                `}
              >
                {/* =================================================
                    BACKGROUND EFFECT FOR FEATURED CARD
                ================================================= */}

                {isFeatured && (
                  <>
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-32
                        h-[350px]
                        w-[350px]
                        rounded-full
                        bg-white/20
                        blur-[90px]
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -bottom-28
                        left-[30%]
                        h-[280px]
                        w-[280px]
                        rounded-full
                        bg-[#54D4FF]/25
                        blur-[90px]
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        opacity-[0.1]
                      "
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: "48px 48px",
                      }}
                    />
                  </>
                )}

                <div
                  className={`
                    relative
                    flex
                    h-full
                    flex-col
                    p-6

                    sm:p-8

                    ${
                      isFeatured
                        ? "lg:flex-row lg:items-center lg:justify-between lg:p-10"
                        : ""
                    }
                  `}
                >
                  {/* =================================================
                      LEFT
                  ================================================= */}

                  <div
                    className={
                      isFeatured
                        ? "max-w-3xl"
                        : ""
                    }
                  >
                    {/* Meta */}

                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.13em]

                          ${
                            isFeatured
                              ? `
                                border
                                border-white/20
                                bg-white/12
                                text-white
                                backdrop-blur-md
                              `
                              : `
                                bg-[#E8F5FF]
                                text-[#0877E8]
                              `
                          }
                        `}
                      >
                        {opportunity.type}
                      </span>

                      <span
                        className={`
                          text-xs
                          font-medium

                          ${
                            isFeatured
                              ? "text-white/60"
                              : "text-[#72889E]"
                          }
                        `}
                      >
                        {opportunity.category}
                      </span>
                    </div>

                    {/* Title */}

                    <h3
                      className={`
                        mt-6
                        font-bold
                        tracking-[-0.045em]

                        ${
                          isFeatured
                            ? `
                              max-w-2xl
                              text-3xl
                              text-white

                              sm:text-4xl

                              lg:text-5xl
                            `
                            : `
                              text-2xl
                              text-[#173B63]

                              sm:text-3xl
                            `
                        }
                      `}
                    >
                      {opportunity.title}
                    </h3>

                    {/* Company / Location */}

                    <div
                      className={`
                        mt-5
                        flex
                        flex-wrap
                        gap-x-5
                        gap-y-2
                        text-sm

                        ${
                          isFeatured
                            ? "text-white/65"
                            : "text-[#667D94]"
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full

                            ${
                              isFeatured
                                ? "bg-[#A7E9FF]"
                                : "bg-[#5BBBF4]"
                            }
                          `}
                        />

                        {opportunity.company}
                      </span>

                      <span className="flex items-center gap-2">
                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full

                            ${
                              isFeatured
                                ? "bg-[#A7E9FF]"
                                : "bg-[#5BBBF4]"
                            }
                          `}
                        />

                        {opportunity.location}
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <div
                    className={`
                      mt-8
                      flex
                      items-center
                      justify-between

                      ${
                        isFeatured
                          ? `
                            border-t
                            border-white/15
                            pt-6

                            lg:mt-0
                            lg:border-0
                            lg:pt-0
                          `
                          : `
                            mt-auto
                            border-t
                            border-[#E0EDF7]
                            pt-6
                          `
                      }
                    `}
                  >
                    <div>
                      <p
                        className={`
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.14em]

                          ${
                            isFeatured
                              ? "text-white/45"
                              : "text-[#8EA3B6]"
                          }
                        `}
                      >
                        Opportunity {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>

                    <Link
                      href="/register"
                      aria-label={`Explore ${opportunity.title}`}
                      className={`
                        flex
                        h-12
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        px-5
                        text-sm
                        font-semibold
                        transition-all
                        duration-300

                        ${
                          isFeatured
                            ? `
                              bg-white
                              text-[#0877E8]
                              shadow-[0_10px_30px_rgba(0,68,145,0.18)]

                              hover:-translate-y-0.5
                              hover:bg-[#F0FAFF]
                            `
                            : `
                              bg-[#EAF6FF]
                              text-[#0877E8]

                              hover:bg-[#DCEFFF]
                            `
                        }
                      `}
                    >
                      Explore

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
              </div>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <div
          className="
            relative
            mt-16
            overflow-hidden
            rounded-[30px]
            bg-gradient-to-r
            from-[#F0F9FF]
            via-white
            to-[#E8F6FF]
            p-[1px]

            sm:mt-20
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6
              rounded-[29px]
              border
              border-[#D7EAF8]
              bg-white/85
              px-6
              py-7
              backdrop-blur-xl

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-8
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#1689F5]
                "
              >
                Your next move
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-semibold
                  tracking-[-0.03em]
                  text-[#173B63]

                  sm:text-2xl
                "
              >
                The right opportunity could be one step away.
              </p>
            </div>

            <Link
              href="/register"
              className="
                group
                inline-flex
                min-h-12
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#0877E8]
                px-6
                py-3
                text-sm
                font-semibold
                text-white

                shadow-[0_10px_28px_rgba(8,119,232,0.18)]

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#126FD0]
                hover:shadow-[0_14px_34px_rgba(8,119,232,0.24)]
              "
            >
              Discover opportunities

              <span
                aria-hidden="true"
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}