export default function Show() {
  const skills = [
    "Java",
    "React",
    "Spring Boot",
    "AWS",
    "PostgreSQL",
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F3F9FF]
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
          -right-48
          -top-40
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#BDE5FF]/60
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-52
          -left-40
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#D9F0FF]
          blur-[130px]
        "
      />

      {/* Subtle grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.3]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(8,119,232,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,119,232,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-[#C9E4F8]
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
                Show your work
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
              Proof speaks
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#0877E8]
                  via-[#1397F3]
                  to-[#37BEF9]
                  bg-clip-text
                  text-transparent
                "
              >
                louder than words.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-base
              leading-7
              text-[#607890]
              sm:text-lg
              sm:leading-8
            "
          >
            Turn your projects, skills and progress into visible proof
            of what you can actually do.
          </p>
        </div>

        {/* =====================================================
            SHOWCASE GRID
        ===================================================== */}

        <div
          className="
            mt-14
            grid
            gap-5
            sm:mt-16
            lg:mt-20
            lg:grid-cols-12
            lg:grid-rows-[250px_250px]
          "
        >
          {/* ===================================================
              MAIN PROJECT
          =================================================== */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              bg-gradient-to-br
              from-[#075DC8]
              via-[#0877E8]
              to-[#22AAF4]
              p-7
              text-white
              shadow-[0_25px_80px_rgba(8,119,232,0.22)]

              sm:p-9

              lg:col-span-7
              lg:row-span-2
              lg:p-10
            "
          >
            {/* Main card effects */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-[330px]
                w-[330px]
                rounded-full
                bg-white/20
                blur-[85px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-40
                -left-32
                h-[360px]
                w-[360px]
                rounded-full
                bg-[#60D7FF]/25
                blur-[100px]
              "
            />

            {/* Internal grid */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.12]
              "
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative flex h-full flex-col">
              {/* Project header */}

              <div className="flex items-center justify-between">
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    px-3.5
                    py-2
                    backdrop-blur-md
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9BE9FF]" />

                  <span
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-white/85
                    "
                  >
                    Featured project
                  </span>
                </div>

                <span
                  className="
                    text-xs
                    font-semibold
                    tracking-[0.12em]
                    text-white/45
                  "
                >
                  01
                </span>
              </div>

              {/* Main project content */}

              <div
                className="
                  flex
                  flex-1
                  flex-col
                  justify-center
                  py-12
                  sm:py-16
                "
              >
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#BFEFFF]
                  "
                >
                  Backend · Fintech
                </p>

                <h3
                  className="
                    mt-4
                    max-w-lg
                    text-4xl
                    font-bold
                    leading-[0.95]
                    tracking-[-0.055em]
                    text-white
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  College
                  <br />
                  Payment OS
                </h3>

                <p
                  className="
                    mt-6
                    max-w-md
                    text-sm
                    leading-6
                    text-white/70
                    sm:text-base
                    sm:leading-7
                  "
                >
                  A payment infrastructure platform connecting colleges,
                  students, fees, payments and reconciliation in one
                  system.
                </p>
              </div>

              {/* Project footer */}

              <div
                className="
                  flex
                  flex-col
                  gap-5
                  border-t
                  border-white/15
                  pt-5

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div className="flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "PostgreSQL"].map(
                    (technology) => (
                      <span
                        key={technology}
                        className="
                          rounded-full
                          border
                          border-white/20
                          bg-white/10
                          px-3
                          py-1.5
                          text-[11px]
                          font-medium
                          text-white/80
                          backdrop-blur-md
                        "
                      >
                        {technology}
                      </span>
                    ),
                  )}
                </div>

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-lg
                    font-semibold
                    text-[#0877E8]
                    shadow-lg
                    transition-all
                    duration-300

                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                >
                  →
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              SKILLS CARD
          =================================================== */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-[#D5E8F7]
              bg-white/90
              p-7
              shadow-[0_14px_45px_rgba(8,119,232,0.07)]
              backdrop-blur-xl
              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[#AED9F5]
              hover:shadow-[0_20px_55px_rgba(8,119,232,0.12)]

              lg:col-span-5
              lg:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                -right-16
                -top-20
                h-52
                w-52
                rounded-full
                bg-[#DDF2FF]
                blur-[55px]
              "
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-[#5D8EB5]
                    "
                  >
                    Skills
                  </p>

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-bold
                      tracking-[-0.035em]
                      text-[#173B63]
                    "
                  >
                    What you know.
                  </h3>
                </div>

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#E7F5FF]
                    text-lg
                    text-[#0877E8]
                  "
                >
                  ✦
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-xl
                      border
                      border-[#D9EAF7]
                      bg-[#F6FBFF]
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-[#234B70]
                      transition-all
                      duration-200

                      hover:border-[#A9D6F5]
                      hover:bg-[#EAF6FF]
                      hover:text-[#0877E8]
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================
              PROGRESS CARD
          =================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-[#B9E1FA]
              bg-gradient-to-br
              from-[#E8F7FF]
              via-[#F3FBFF]
              to-white
              p-7
              shadow-[0_14px_45px_rgba(8,119,232,0.08)]

              lg:col-span-5
              lg:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-20
                -right-14
                h-52
                w-52
                rounded-full
                bg-[#83D7FF]/25
                blur-[55px]
              "
            />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-[#4383B5]
                    "
                  >
                    Progress
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-medium
                      text-[#668098]
                    "
                  >
                    Your profile keeps growing.
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    bg-[#DFF3FF]
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-[#0877E8]
                  "
                >
                  Growing
                </span>
              </div>

              <div className="mt-8">
                <div className="flex items-end justify-between">
                  <p
                    className="
                      text-3xl
                      font-bold
                      tracking-[-0.045em]
                      text-[#173B63]
                      sm:text-4xl
                    "
                  >
                    Keep going.
                  </p>

                  <span
                    className="
                      text-sm
                      font-bold
                      text-[#0877E8]
                    "
                  >
                    72%
                  </span>
                </div>

                <div
                  className="
                    mt-5
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-[#DCEEF9]
                  "
                >
                  <div
                    className="
                      h-full
                      w-[72%]
                      rounded-full
                      bg-gradient-to-r
                      from-[#0877E8]
                      via-[#1599F1]
                      to-[#43C7FF]
                      shadow-[0_0_18px_rgba(8,119,232,0.35)]
                    "
                  />
                </div>

                <div
                  className="
                    mt-4
                    flex
                    justify-between
                    text-[11px]
                    font-medium
                    text-[#849AAF]
                  "
                >
                  <span>Started</span>
                  <span>Career ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CLOSING
        ===================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-5
            border-t
            border-[#D7E8F5]
            pt-8

            sm:mt-16
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
            Don&apos;t just say what you can do.
            <span className="text-[#0877E8]">
              {" "}
              Show it.
            </span>
          </p>

          <div
            className="
              flex
              items-center
              gap-3
              text-sm
              font-semibold
              text-[#0877E8]
            "
          >
            <span className="h-px w-10 bg-[#6DC9FA]" />
            Build your proof
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}