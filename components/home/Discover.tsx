import Link from "next/link";

const opportunities = [
  {
    number: "01",
    type: "INTERNSHIP",
    category: "Technology",
    title: "Software Engineering Internship",
    description:
      "Discover internship opportunities that align with your technical skills, projects and interests.",
    location: "Remote & On-site",
    featured: true,
  },
  {
    number: "02",
    type: "GRADUATE ROLE",
    category: "Engineering",
    title: "Graduate Engineering Roles",
    description:
      "Explore early-career opportunities designed for students and recent graduates building their careers.",
    location: "Across India",
    featured: false,
  },
  {
    number: "03",
    type: "INTERNSHIP",
    category: "Product",
    title: "Product & Frontend Internships",
    description:
      "Find opportunities where your projects, frontend skills and product thinking can become real experience.",
    location: "Multiple locations",
    featured: false,
  },
];

const discoveryPoints = [
  "Relevant roles",
  "Student opportunities",
  "Profile-based discovery",
];

export default function Discover() {
  return (
    <section
      id="discover"
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
      {/* Background */}
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
            bottom-0
            h-96
            w-96
            rounded-full
            bg-blue-50
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
            lg:grid-cols-[1fr_0.72fr]
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
                Discover opportunities
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
              Find what&apos;s{" "}
              <span className="text-[#1256af]">
                next for you.
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
            Explore internships and graduate opportunities connected to your
            skills, profile and career journey.
          </p>
        </div>

        {/* =========================================================
            DISCOVERY POINTS
        ========================================================= */}

        <div
          className="
            mt-10
            flex
            flex-wrap
            gap-3
          "
        >
          {discoveryPoints.map((point) => (
            <div
              key={point}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-[#FAFAFA]
                px-4
                py-2
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#1256af]" />

              <span
                className="
                  text-xs
                  font-semibold
                  text-gray-600
                  sm:text-sm
                "
              >
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* =========================================================
            OPPORTUNITIES
        ========================================================= */}

        <div
          className="
            mt-12
            grid
            gap-6
            lg:mt-16
            lg:grid-cols-12
          "
        >
          {opportunities.map((opportunity) => {
            const isFeatured = opportunity.featured;

            return (
              <article
                key={opportunity.number}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  transition-all
                  duration-300

                  ${
                    isFeatured
                      ? `
                          border-[#1256af]
                          bg-[#1256af]
                          text-white
                          shadow-lg
                          lg:col-span-12
                        `
                      : `
                          border-gray-200
                          bg-white
                          shadow-sm
                          hover:-translate-y-1
                          hover:border-[#1256af]/25
                          hover:shadow-md
                          lg:col-span-6
                        `
                  }
                `}
              >
                {/* Featured decoration */}
                {isFeatured && (
                  <>
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-72
                        w-72
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
                        -bottom-32
                        left-1/3
                        h-64
                        w-64
                        rounded-full
                        bg-blue-300/10
                        blur-3xl
                      "
                    />
                  </>
                )}

                <div
                  className={`
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    p-6
                    sm:p-8

                    ${
                      isFeatured
                        ? "lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10"
                        : ""
                    }
                  `}
                >
                  {/* Content */}

                  <div className={isFeatured ? "max-w-3xl" : ""}>
                    <div className="flex flex-wrap items-center gap-2">
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
                                  bg-white/10
                                  text-white
                                `
                              : `
                                  bg-[#1256af]/[0.07]
                                  text-[#1256af]
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
                              ? "text-white/65"
                              : "text-gray-500"
                          }
                        `}
                      >
                        {opportunity.category}
                      </span>
                    </div>

                    <h3
                      className={`
                        mt-6
                        font-bold
                        tracking-tight

                        ${
                          isFeatured
                            ? `
                                max-w-3xl
                                text-3xl
                                text-white
                                sm:text-4xl
                                lg:text-5xl
                              `
                            : `
                                text-2xl
                                text-gray-900
                                sm:text-3xl
                              `
                        }
                      `}
                    >
                      {opportunity.title}
                    </h3>

                    <p
                      className={`
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-6
                        sm:text-base
                        sm:leading-7

                        ${
                          isFeatured
                            ? "text-white/75"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {opportunity.description}
                    </p>

                    <div
                      className={`
                        mt-6
                        flex
                        items-center
                        gap-2
                        text-sm

                        ${
                          isFeatured
                            ? "text-white/65"
                            : "text-gray-500"
                        }
                      `}
                    >
                      <span
                        className={`
                          h-1.5
                          w-1.5
                          rounded-full

                          ${
                            isFeatured
                              ? "bg-white/70"
                              : "bg-[#1256af]"
                          }
                        `}
                      />

                      {opportunity.location}
                    </div>
                  </div>

                  {/* Action */}

                  <div
                    className={`
                      mt-8
                      flex
                      items-center
                      justify-between
                      border-t
                      pt-6

                      ${
                        isFeatured
                          ? `
                              border-white/15
                              lg:mt-0
                              lg:min-w-[220px]
                              lg:border-0
                              lg:pt-0
                            `
                          : `
                              mt-auto
                              border-gray-100
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
                              : "text-gray-400"
                          }
                        `}
                      >
                        Opportunity
                      </p>

                      <p
                        className={`
                          mt-1
                          text-sm
                          font-semibold

                          ${
                            isFeatured
                              ? "text-white/80"
                              : "text-gray-600"
                          }
                        `}
                      >
                        {opportunity.number}
                      </p>
                    </div>

                    <Link
                      href="/register"
                      aria-label={`Explore ${opportunity.title}`}
                      className={`
                        inline-flex
                        min-h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        transition-all
                        duration-300

                        ${
                          isFeatured
                            ? `
                                bg-white
                                text-[#1256af]
                                shadow-sm
                                hover:-translate-y-0.5
                                hover:shadow-md
                              `
                            : `
                                border
                                border-[#1256af]
                                text-[#1256af]
                                hover:bg-[#1256af]
                                hover:text-white
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
              </article>
            );
          })}
        </div>

        {/* =========================================================
            HOW DISCOVERY CONNECTS TO PROFILE
        ========================================================= */}

        <div
          className="
            mt-14
            rounded-3xl
            border
            border-gray-200
            bg-[#FAFAFA]
            p-6
            sm:mt-16
            sm:p-8
            lg:mt-20
            lg:p-10
          "
        >
          <div
            className="
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
                Built around your journey
              </p>

              <h3
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  sm:text-3xl
                "
              >
                Your profile helps make discovery more meaningful.
              </h3>

              <p
                className="
                  mt-4
                  text-sm
                  leading-6
                  text-gray-600
                  sm:text-base
                  sm:leading-7
                "
              >
                The more your profile reflects your skills, projects and
                experience, the easier it becomes to understand which
                opportunities fit your direction.
              </p>
            </div>

            {/* Connection visual */}

            <div
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-[1fr_auto_1fr_auto_1fr]
                sm:items-center
              "
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1256af]/10
                    text-xs
                    font-bold
                    text-[#1256af]
                  "
                >
                  01
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Your profile
                </p>
              </div>

              <div
                aria-hidden="true"
                className="
                  hidden
                  text-center
                  text-xl
                  text-gray-300
                  sm:block
                "
              >
                →
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1256af]/10
                    text-xs
                    font-bold
                    text-[#1256af]
                  "
                >
                  02
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Relevant roles
                </p>
              </div>

              <div
                aria-hidden="true"
                className="
                  hidden
                  text-center
                  text-xl
                  text-gray-300
                  sm:block
                "
              >
                →
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-[#1256af]/25
                  bg-white
                  p-5
                  text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1256af]
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  03
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Your next move
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            CTA
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
              Your next opportunity could be{" "}
              <span className="text-[#1256af]">
                one step away.
              </span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Build your profile and start exploring what comes next.
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
              bg-[#1256af]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#0f4b99]
              hover:shadow-md
            "
          >
            Discover opportunities

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