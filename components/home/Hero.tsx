import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0877E8]">
      {/* =====================================================
          BACKGROUND BASE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(135deg,#0877E8_0%,#1294F2_42%,#36B9FF_100%)]
        "
      />

      {/* =====================================================
          LARGE LIGHT GLOW — TOP RIGHT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-32 -top-44
          h-[520px] w-[520px]
          rounded-full
          bg-white/35
          blur-[120px]

          sm:h-[650px]
          sm:w-[650px]

          lg:-right-20
          lg:-top-52
          lg:h-[800px]
          lg:w-[800px]
        "
      />

      {/* =====================================================
          CYAN GLOW — BOTTOM LEFT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-40 -left-32
          h-[420px] w-[420px]
          rounded-full
          bg-[#6DE2FF]/45
          blur-[120px]

          lg:h-[600px]
          lg:w-[600px]
        "
      />

      {/* =====================================================
          DEEP BLUE GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-[35%] top-[15%]
          h-[400px] w-[400px]
          rounded-full
          bg-[#0054C7]/35
          blur-[140px]
        "
      />

      {/* =====================================================
          GRID EFFECT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.13]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* =====================================================
          LIGHT BEAM
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-[15%] top-[15%]
          h-[500px] w-[700px]
          rotate-[-20deg]
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
          blur-3xl
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          grid
          min-h-[calc(100vh-80px)]
          max-w-7xl
          items-center
          gap-14
          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:grid-cols-[1.08fr_0.92fr]
          lg:gap-16
          lg:px-12
          lg:py-24
        "
      >
        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow */}

          <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/25
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
                bg-[#9AEAFF]
                shadow-[0_0_14px_rgba(154,234,255,0.95)]
              "
            />

            <span
              className="
                text-[12px]
                font-semibold
                tracking-[0.12em]
                text-white/90
                uppercase
              "
            >
              Your career, connected
            </span>
          </div>

          {/* Main heading */}

          <h1
            className="
              max-w-[900px]
              text-[clamp(3.4rem,8vw,7.4rem)]
              font-bold
              leading-[0.88]
              tracking-[-0.065em]
              text-white
            "
          >
            Build your profile.
            <span className="block text-[#C6F1FF]">
              Find your path.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-8
              max-w-xl
              text-base
              leading-7
              text-white/75

              sm:text-lg
              sm:leading-8

              lg:text-xl
            "
          >
            Bring your academics, skills, projects and opportunities
            together in one place — and turn your progress into your
            next move.
          </p>

          {/* CTA */}

          <div
            className="
              mt-10
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-center
            "
          >
            <Link
              href="/register"
              className="
                group
                inline-flex
                min-h-13
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-white
                px-7
                py-3.5
                text-[15px]
                font-semibold
                text-[#0869D3]
                shadow-[0_14px_40px_rgba(0,67,145,0.22)]
                transition-all
                duration-200

                hover:-translate-y-1
                hover:bg-[#F3FBFF]
                hover:shadow-[0_18px_48px_rgba(0,67,145,0.3)]
              "
            >
              Join Trailbliz

              <span
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

            <Link
              href="#your-trail"
              className="
                inline-flex
                min-h-13
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-white/25
                bg-white/10
                px-6
                py-3.5
                text-[15px]
                font-semibold
                text-white
                backdrop-blur-md
                transition-all
                duration-200

                hover:bg-white/20
                hover:border-white/40
              "
            >
              Explore platform

              <span aria-hidden="true">
                ↓
              </span>
            </Link>
          </div>

          {/* Mini supporting row */}

          <div
            className="
              mt-12
              flex
              flex-wrap
              gap-x-7
              gap-y-3
              text-sm
              text-white/65
            "
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              Student profile
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              Projects
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              Opportunities
            </span>
          </div>
        </div>

        {/* ===================================================
            RIGHT VISUAL
        =================================================== */}

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[520px]

            lg:mx-0
            lg:justify-self-end
          "
        >
          {/* Outer glow */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-8
              rounded-[40px]
              bg-white/30
              blur-[70px]
            "
          />

          {/* Main glass panel */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/30
              bg-white/14
              p-4
              shadow-[0_30px_100px_rgba(0,61,138,0.28)]
              backdrop-blur-2xl

              sm:p-5
            "
          >
            {/* Top bar */}

            <div
              className="
                mb-4
                flex
                items-center
                justify-between
                px-2
                pt-1
              "
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              </div>

              <span
                className="
                  text-[11px]
                  font-semibold
                  tracking-[0.12em]
                  text-white/60
                  uppercase
                "
              >
                Trailbliz
              </span>
            </div>

            {/* Inner dashboard */}

            <div
              className="
                rounded-[24px]
                bg-white
                p-5
                shadow-[0_18px_50px_rgba(0,67,145,0.15)]

                sm:p-6
              "
            >
              {/* Profile */}

              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#1689F5]
                    to-[#55C9FF]
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                  "
                >
                  T
                </div>

                <div>
                  <p className="font-semibold text-[#122A46]">
                    Your Trail
                  </p>

                  <p className="mt-1 text-sm text-[#64748B]">
                    Build. Improve. Move forward.
                  </p>
                </div>
              </div>

              {/* Progress */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-[#DCEAF7]
                  bg-[#F5FAFF]
                  p-4
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#173B63]">
                    Profile progress
                  </span>

                  <span className="text-sm font-bold text-[#1689F5]">
                    78%
                  </span>
                </div>

                <div
                  className="
                    mt-3
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-[#DDEFFC]
                  "
                >
                  <div
                    className="
                      h-full
                      w-[78%]
                      rounded-full
                      bg-gradient-to-r
                      from-[#0877E8]
                      to-[#48C6FF]
                    "
                  />
                </div>
              </div>

              {/* Cards */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div
                  className="
                    rounded-2xl
                    border
                    border-[#DCEAF7]
                    bg-[#F8FCFF]
                    p-4
                  "
                >
                  <div
                    className="
                      mb-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#E4F3FF]
                      text-[#0877E8]
                    "
                  >
                    ◇
                  </div>

                  <p className="text-xs text-[#7A8CA3]">
                    Projects
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#173B63]">
                    Build proof
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-[#DCEAF7]
                    bg-[#F8FCFF]
                    p-4
                  "
                >
                  <div
                    className="
                      mb-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#E4F3FF]
                      text-[#0877E8]
                    "
                  >
                    ↗
                  </div>

                  <p className="text-xs text-[#7A8CA3]">
                    Opportunities
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#173B63]">
                    Move ahead
                  </p>
                </div>
              </div>

              {/* Bottom card */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#0B76E5]
                  to-[#26ACF5]
                  p-4
                  text-white
                "
              >
                <div>
                  <p className="text-xs text-white/70">
                    Your next step
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    Keep building your trail
                  </p>
                </div>

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                    text-lg
                  "
                >
                  →
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================
              FLOATING CARD 1
          =================================================== */}

          <div
            className="
              absolute
              -left-5
              top-[18%]
              hidden
              rounded-2xl
              border
              border-white/40
              bg-white/90
              px-4
              py-3
              shadow-[0_14px_40px_rgba(0,67,145,0.18)]
              backdrop-blur-xl

              sm:block
              lg:-left-12
            "
          >
            <p className="text-xs text-[#74879D]">
              Skills
            </p>

            <p className="mt-1 text-sm font-bold text-[#173B63]">
              Show what you can do
            </p>
          </div>

          {/* ===================================================
              FLOATING CARD 2
          =================================================== */}

          <div
            className="
              absolute
              -bottom-5
              right-2
              hidden
              rounded-2xl
              border
              border-white/40
              bg-white/90
              px-4
              py-3
              shadow-[0_14px_40px_rgba(0,67,145,0.18)]
              backdrop-blur-xl

              sm:block
              lg:-right-7
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#E6F5FF]
                  text-[#0877E8]
                "
              >
                ✓
              </div>

              <div>
                <p className="text-xs text-[#74879D]">
                  Profile
                </p>

                <p className="text-sm font-bold text-[#173B63]">
                  Career ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FADE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-24
          bg-gradient-to-t
          from-[#F5F9FF]
          to-transparent
        "
      />
    </section>
  );
}