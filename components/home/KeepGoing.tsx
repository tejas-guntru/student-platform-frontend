import Link from "next/link";

export default function KeepGoing() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#065FD1]
        via-[#0877E8]
        to-[#35BDF8]
        px-5
        py-24
        text-white

        sm:px-8
        sm:py-28

        lg:px-12
        lg:py-36
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
          -right-40
          -top-44
          h-[560px]
          w-[560px]
          rounded-full
          bg-white/25
          blur-[130px]

          lg:h-[720px]
          lg:w-[720px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-52
          -left-44
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#6DE2FF]/35
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[35%]
          top-[25%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#004EBA]/30
          blur-[120px]
        "
      />

      {/* Grid */}

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
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            TOP META
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-white/20
            pt-7
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/20
              bg-white/10
              px-4
              py-2
              backdrop-blur-md
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#B9F1FF]
                shadow-[0_0_12px_rgba(185,241,255,0.8)]
              "
            />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
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
              tracking-[0.12em]
              text-white/45

              sm:block
            "
          >
            07 / 07
          </span>
        </div>

        {/* =====================================================
            MAIN MESSAGE
        ===================================================== */}

        <div
          className="
            relative
            mt-14

            sm:mt-16

            lg:mt-20
          "
        >
          <h2
            className="
              max-w-6xl
              text-[clamp(3.8rem,9vw,8.5rem)]
              font-bold
              leading-[0.86]
              tracking-[-0.07em]
              text-white
            "
          >
            Your journey
            <span
              className="
                block
                text-[#C7F2FF]
              "
            >
              keeps moving.
            </span>
          </h2>

          {/* Decorative trail */}

          <svg
            aria-hidden="true"
            viewBox="0 0 900 220"
            fill="none"
            className="
              pointer-events-none
              absolute
              -right-20
              top-[42%]
              hidden
              h-[180px]
              w-[650px]
              overflow-visible
              opacity-60

              lg:block
            "
          >
            <path
              d="
                M20 120
                C120 120 120 45 220 65
                C320 85 300 175 410 150
                C510 125 490 45 600 70
                C700 95 720 140 810 90
                C845 70 865 55 890 35
              "
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="
                M20 120
                C120 120 120 45 220 65
                C320 85 300 175 410 150
                C510 125 490 45 600 70
                C700 95 720 140 810 90
                C845 70 865 55 890 35
              "
              stroke="#BDF0FF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 12"
            />

            <circle
              cx="20"
              cy="120"
              r="6"
              fill="#FFFFFF"
            />

            <circle
              cx="890"
              cy="35"
              r="7"
              fill="#BDF0FF"
            />

            <path
              d="M874 23 L890 35 L873 47"
              stroke="#BDF0FF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* =====================================================
            SUPPORTING COPY
        ===================================================== */}

        <div
          className="
            mt-10
            max-w-2xl

            sm:mt-12
          "
        >
          <p
            className="
              text-base
              leading-7
              text-white/72

              sm:text-lg
              sm:leading-8

              lg:text-xl
            "
          >
            Your career is not one destination. Keep learning, keep
            building, keep showing what you can do — and keep moving
            toward what comes next.
          </p>
        </div>

        {/* =====================================================
            CTA PANEL
        ===================================================== */}

        <div
          className="
            mt-14
            overflow-hidden
            rounded-[30px]
            border
            border-white/20
            bg-white/10
            p-5
            shadow-[0_24px_80px_rgba(0,61,138,0.18)]
            backdrop-blur-xl

            sm:mt-16
            sm:p-6

            lg:mt-20
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8
              rounded-[24px]
              bg-white/95
              px-6
              py-7

              sm:px-8
              sm:py-8

              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-10
            "
          >
            <div className="max-w-2xl">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#1689F5]
                "
              >
                Build what comes next
              </p>

              <h3
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]

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
                  text-[#607890]

                  sm:text-base
                "
              >
                Bring your academics, skills, projects and experience
                together in one place.
              </p>
            </div>

            <Link
              href="/register"
              className="
                group
                inline-flex
                min-h-13
                w-fit
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-[#0877E8]
                px-7
                py-3.5
                text-[15px]
                font-semibold
                text-white

                shadow-[0_12px_32px_rgba(8,119,232,0.22)]

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#126FD0]
                hover:shadow-[0_16px_40px_rgba(8,119,232,0.28)]
              "
            >
              Join Trailbliz

              <span
                aria-hidden="true"
                className="
                  text-lg
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

        {/* =====================================================
            ENDING TRAIL
        ===================================================== */}

        <div
          className="
            relative
            mt-16
            h-20
            overflow-hidden

            sm:mt-20
          "
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            className="h-full w-full"
            fill="none"
          >
            <path
              d="
                M0 55
                C170 55 150 20 310 30
                C470 40 450 80 610 62
                C770 44 760 15 900 30
                C1040 45 1080 65 1200 20
              "
              stroke="rgba(255,255,255,0.20)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="
                M0 55
                C170 55 150 20 310 30
                C470 40 450 80 610 62
                C770 44 760 15 900 30
                C1040 45 1080 65 1200 20
              "
              stroke="#B8EFFF"
              strokeWidth="3"
              strokeDasharray="6 14"
              strokeLinecap="round"
            />

            <circle
              cx="1200"
              cy="20"
              r="6"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* =====================================================
            MINI FOOTER
        ===================================================== */}

        <div
          className="
            mt-3
            flex
            flex-col
            gap-3
            border-t
            border-white/15
            pt-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/60
            "
          >
            Trailbliz
          </span>

          <span
            className="
              text-xs
              font-medium
              text-white/55
            "
          >
            Build. Show. Discover. Keep moving.
          </span>
        </div>
      </div>
    </section>
  );
}