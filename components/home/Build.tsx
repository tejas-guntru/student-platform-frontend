export default function Build() {
  const items = [
    {
      number: "01",
      title: "Academics",
      value: "Computer Science Engineering",
      description: "Your foundation and academic journey.",
      position: "lg:ml-[2%]",
      width: "lg:w-[43%]",
    },
    {
      number: "02",
      title: "Skills",
      value: "Java · React · Spring Boot · AWS",
      description: "What you know and what you keep improving.",
      position: "lg:ml-[54%]",
      width: "lg:w-[43%]",
    },
    {
      number: "03",
      title: "Projects",
      value: "College Payment OS · Trailbliz",
      description: "Proof of what you can actually build.",
      position: "lg:ml-[8%]",
      width: "lg:w-[43%]",
    },
    {
      number: "04",
      title: "Experience",
      value: "Software Engineering Intern",
      description: "Where your skills meet real work.",
      position: "lg:ml-[57%]",
      width: "lg:w-[40%]",
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
          top-[18%]
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
          top-[40%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#CDEAFF]/70
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.38]
        "
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(8,119,232,0.08) 1px, transparent 1px)
          `,
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
            Your academics, skills, projects and experience tell a much
            bigger story when they&apos;re connected together.
          </p>
        </div>

        {/* =====================================================
            BUILD JOURNEY
        ===================================================== */}

        <div
          className="
            relative
            mt-16

            sm:mt-20

            lg:mt-28
          "
        >
          {/* ===================================================
              DESKTOP CENTER TRAIL
          =================================================== */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-[70px]
              left-1/2
              top-[40px]
              hidden
              w-[2px]
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-[#9FD6FA]
              to-transparent

              lg:block
            "
          />

          {/* Center glow */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              hidden
              h-[70%]
              w-24
              -translate-x-1/2
              -translate-y-1/2
              bg-[#55C8FF]/15
              blur-[60px]

              lg:block
            "
          />

          {/* ===================================================
              ITEMS
          =================================================== */}

          <div className="relative space-y-5 lg:space-y-14">
            {items.map((item) => (
              <div
                key={item.number}
                className={`
                  relative
                  w-full
                  ${item.position}
                  ${item.width}
                `}
              >
                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-[#D9EAF7]
                    bg-white/85
                    p-6
                    shadow-[0_14px_45px_rgba(8,119,232,0.07)]
                    backdrop-blur-xl
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#A9D7F5]
                    hover:shadow-[0_20px_60px_rgba(8,119,232,0.14)]

                    sm:p-7
                  "
                >
                  {/* Card glow */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-14
                      -top-14
                      h-36
                      w-36
                      rounded-full
                      bg-[#DDF2FF]
                      blur-[45px]
                      transition-transform
                      duration-500
                      group-hover:scale-125
                    "
                  />

                  <div className="relative">
                    {/* Number */}

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
                        "
                      >
                        {item.number}
                      </span>

                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-[#39BDF7]
                          shadow-[0_0_10px_rgba(57,189,247,0.6)]
                        "
                      />
                    </div>

                    {/* Category */}

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

                    {/* Value */}

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

                    {/* Description */}

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

                    {/* Bottom accent */}

                    <div
                      className="
                        mt-6
                        h-1
                        w-10
                        rounded-full
                        bg-gradient-to-r
                        from-[#0877E8]
                        to-[#45C6FF]
                        transition-all
                        duration-300
                        group-hover:w-20
                      "
                    />
                  </div>
                </div>

                {/* =================================================
                    DESKTOP CONNECTION DOT
                ================================================= */}

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
                    bg-[#1689F5]
                    shadow-[0_0_0_1px_#83C5F3,0_0_20px_rgba(8,119,232,0.4)]

                    lg:block

                    ${
                      item.position.includes("54") ||
                      item.position.includes("57")
                        ? "-left-[calc(10%+18px)]"
                        : "-right-[calc(18%+18px)]"
                    }
                  `}
                />
              </div>
            ))}
          </div>

          {/* ===================================================
              FINAL POINT
          =================================================== */}

          <div
            className="
              relative
              mx-auto
              mt-14
              max-w-lg

              lg:mt-24
            "
          >
            <div
              className="
                absolute
                inset-4
                rounded-[32px]
                bg-[#1AA4F6]/25
                blur-[50px]
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                bg-gradient-to-r
                from-[#0877E8]
                via-[#1294F2]
                to-[#38BDF8]
                p-[1px]
                shadow-[0_24px_70px_rgba(8,119,232,0.22)]
              "
            >
              <div
                className="
                  rounded-[27px]
                  bg-[#0A83E9]
                  px-7
                  py-8
                  text-center
                  text-white
                "
              >
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
                  Your complete journey becomes a profile that grows
                  with you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CLOSING STATEMENT
        ===================================================== */}

        <div
          className="
            mt-20
            border-t
            border-[#DCEAF6]
            pt-8

            sm:mt-24
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                text-xl
                font-semibold
                tracking-[-0.03em]
                text-[#173B63]

                sm:text-2xl
                lg:text-3xl
              "
            >
              Everything you&apos;ve done.
              <span className="text-[#1689F5]">
                {" "}
                Connected.
              </span>
            </p>

            <span
              className="
                text-sm
                font-semibold
                text-[#0877E8]
              "
            >
              This is your Trailbliz profile →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}