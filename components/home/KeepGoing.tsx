import Link from "next/link";

const journeyPoints = [
  {
    number: "01",
    label: "Learn",
  },
  {
    number: "02",
    label: "Build",
  },
  {
    number: "03",
    label: "Show",
  },
  {
    number: "04",
    label: "Discover",
  },
  {
    number: "05",
    label: "Move",
  },
];

export default function KeepGoing() {
  return (
    <section
      id="keep-going"
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
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            top-10
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
            MAIN FINAL CTA
        ========================================================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-[#1256af]
            px-5
            py-12
            text-white
            shadow-lg
            sm:px-8
            sm:py-14
            md:px-10
            lg:px-14
            lg:py-16
            xl:px-16
          "
        >
          {/* Decorative glows */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-28
              -top-32
              h-80
              w-80
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
              -bottom-40
              -left-24
              h-80
              w-80
              rounded-full
              bg-blue-300/10
              blur-3xl
            "
          />

          {/* Decorative outline */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-90px]
              top-1/2
              hidden
              h-[360px]
              w-[360px]
              -translate-y-1/2
              rounded-full
              border
              border-white/10
              lg:block
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-25px]
              top-1/2
              hidden
              h-[230px]
              w-[230px]
              -translate-y-1/2
              rounded-full
              border
              border-white/10
              lg:block
            "
          />

          <div className="relative z-10">
            {/* Top meta */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/15
                pb-7
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  py-2
                "
              >
                <span className="h-2 w-2 rounded-full bg-white" />

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-white/85
                  "
                >
                  Keep going
                </span>
              </div>

              <span
                className="
                  hidden
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white/45
                  sm:block
                "
              >
                Your journey continues
              </span>
            </div>

            {/* =====================================================
                MESSAGE
            ===================================================== */}

            <div
              className="
                mt-10
                grid
                gap-10
                lg:grid-cols-[1.15fr_0.85fr]
                lg:items-end
                lg:gap-16
              "
            >
              <div>
                <h2
                  className="
                    max-w-4xl
                    text-4xl
                    font-bold
                    leading-[1.02]
                    tracking-tight
                    text-white
                    sm:text-5xl
                    md:text-6xl
                    lg:text-7xl
                  "
                >
                  Your journey
                  <span className="block text-blue-100">
                    keeps moving.
                  </span>
                </h2>

                <p
                  className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-7
                    text-white/75
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  Your career is not one destination. Keep learning, keep
                  building, keep showing what you can do — and keep moving
                  toward what comes next.
                </p>
              </div>

              {/* Right statement */}

              <div
                className="
                  border-l-0
                  border-white/15
                  lg:border-l
                  lg:pl-8
                "
              >
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-white/50
                  "
                >
                  One journey
                </p>

                <p
                  className="
                    mt-3
                    max-w-sm
                    text-xl
                    font-semibold
                    leading-8
                    text-white
                    sm:text-2xl
                  "
                >
                  Learn. Build. Show. Discover. Move forward.
                </p>
              </div>
            </div>

            {/* =====================================================
                JOURNEY STRIP
            ===================================================== */}

            <div
              className="
                mt-12
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-5
                lg:mt-14
              "
            >
              {journeyPoints.map((point, index) => (
                <div
                  key={point.number}
                  className="
                    relative
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/[0.07]
                    px-4
                    py-4
                  "
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        text-[10px]
                        font-bold
                        tracking-[0.12em]
                        text-white/45
                      "
                    >
                      {point.number}
                    </span>

                    {index < journeyPoints.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="
                          hidden
                          text-white/30
                          sm:block
                        "
                      >
                        →
                      </span>
                    )}
                  </div>

                  <p
                    className="
                      mt-4
                      text-sm
                      font-semibold
                      text-white
                      sm:text-base
                    "
                  >
                    {point.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            PROFILE CTA
        ========================================================= */}

        <div
          className="
            relative
            z-20
            mx-auto
            -mt-1
            max-w-6xl
            px-0
            sm:-mt-2
            sm:px-5
            lg:-mt-3
            lg:px-8
          "
        >
          <div
            className="
              rounded-b-3xl
              border
              border-t-0
              border-gray-200
              bg-[#FAFAFA]
              px-5
              py-8
              sm:px-8
              sm:py-9
              lg:px-10
            "
          >
            <div
              className="
                flex
                flex-col
                gap-7
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div className="max-w-2xl">
                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#1256af]
                  "
                >
                  Build what comes next
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
                  Start building your Trailbliz profile.
                </h3>

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-6
                    text-gray-600
                    sm:text-base
                    sm:leading-7
                  "
                >
                  Bring your academics, skills, projects and experience
                  together in one place and keep building your professional
                  story.
                </p>
              </div>

              <Link
                href="/register"
                className="
                  group
                  inline-flex
                  min-h-12
                  w-fit
                  shrink-0
                  items-center
                  justify-center
                  gap-3
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
                Join Trailbliz

                <span
                  aria-hidden="true"
                  className="
                    text-lg
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

        {/* =========================================================
            FINAL MESSAGE
        ========================================================= */}

        <div
          className="
            mx-auto
            mt-12
            max-w-3xl
            text-center
            sm:mt-14
          "
        >
          <p
            className="
              text-sm
              leading-6
              text-gray-500
              sm:text-base
            "
          >
            Every skill you learn, every project you build and every
            opportunity you pursue becomes another step in your journey.
          </p>

          <div
            className="
              mx-auto
              mt-6
              h-1
              w-16
              rounded-full
              bg-[#1256af]
            "
          />
        </div>
      </div>
    </section>
  );
}