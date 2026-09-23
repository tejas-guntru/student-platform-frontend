import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tejas Guntru | Developer of Trailbliz",

  description:
    "Developer credits for Trailbliz. Trailbliz was developed by Tejas Guntru from TIPIX.",

  alternates: {
    canonical: "https://www.trailbliz.in/developers",
  },

  openGraph: {
    title: "Tejas Guntru | Developer of Trailbliz",

    description:
      "Developer credits for Trailbliz. Developed by Tejas Guntru from TIPIX.",

    url: "https://www.trailbliz.in/developers",

    siteName: "Trailbliz",

    type: "profile",

    images: [
      {
        url: "https://www.trailbliz.in/aipic.png",
        width: 1200,
        height: 630,
        alt: "Tejas Guntru - Developer of Trailbliz",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Tejas Guntru | Developer of Trailbliz",

    description:
      "Developer credits for Trailbliz. Developed by Tejas Guntru from TIPIX.",

    images: [
      "https://www.trailbliz.in/aipic.png",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const tejasLinkedIn =
  "https://www.linkedin.com/in/tejas-guntru/";

const tipixLinkedIn =
  "https://www.linkedin.com/company/tipixofficial/";



export default function DevelopersPage() {
  return (
    <main className="relative overflow-hidden bg-[#020712] text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate min-h-screen overflow-hidden">
        {/* Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56,189,248,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,0.055) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
          }}
        />

        {/* Dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 0.7px, transparent 0.7px)",
            backgroundSize: "19px 19px",
          }}
        />

        {/* Main blue glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[45%]
            top-[35%]
            h-[800px]
            w-[900px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#0877E8]/15
            blur-[170px]
          "
        />

        {/* Right glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-60
            top-[5%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-[#38BDF8]/10
            blur-[150px]
          "
        />

        {/* =================================================
            NAV
        ================================================= */}

        <header
          className="
            relative
            z-30
            mx-auto
            flex
            max-w-[1500px]
            items-center
            justify-between
            px-5
            py-6
            sm:px-8
            lg:px-12
          "
        >
          <Link
            href="/"
            className="
              group
              inline-flex
              items-center
              gap-3
              text-sm
              font-semibold
              text-white/55
              transition-colors
              duration-300
              hover:text-white
            "
          >
            <span
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            >
              ←
            </span>

            Trailbliz
          </Link>

          <div
            className="
              flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-[#38BDF8]
                  opacity-30
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-[#38BDF8]
                  shadow-[0_0_12px_rgba(56,189,248,0.9)]
                "
              />
            </span>

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white/55
              "
            >
              Developer Credits
            </span>
          </div>
        </header>

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            min-h-[calc(100vh-90px)]
            max-w-[1500px]
            items-center
            gap-14
            px-5
            pb-16
            pt-8

            sm:px-8

            lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-16
            lg:px-12
            lg:pb-20
          "
        >
          {/* ===============================================
              LEFT
          =============================================== */}

          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <span
                className="
                  font-mono
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#38BDF8]
                "
              >
                01 / Developer
              </span>

              <div
                className="
                  h-px
                  w-16
                  bg-gradient-to-r
                  from-[#38BDF8]/80
                  to-transparent
                "
              />
            </div>

            <p
              className="
                mt-10
                font-mono
                text-[10px]
                font-medium
                uppercase
                tracking-[0.32em]
                text-white/30

                sm:text-xs
              "
            >
              Developed by
            </p>

            {/* NAME */}

            <h1
              className="
                mt-4
                text-[clamp(4.6rem,10vw,10rem)]
                font-black
                uppercase
                leading-[0.76]
                tracking-[-0.075em]
              "
            >
              <span className="block text-white">
                Tejas
              </span>

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#0877E8]
                  via-[#20A9F5]
                  to-[#7ADFFF]
                  bg-clip-text
                  text-transparent
                  drop-shadow-[0_0_40px_rgba(8,119,232,0.2)]
                "
              >
                Guntru.
              </span>
            </h1>

            {/* Company */}

            <div className="mt-9 flex items-center gap-4">
              <div
                className="
                  h-[2px]
                  w-10
                  bg-[#38BDF8]
                  shadow-[0_0_14px_rgba(56,189,248,0.8)]
                "
              />

              <p
                className="
                  text-lg
                  font-medium
                  tracking-[-0.02em]
                  text-white/55

                  sm:text-xl
                "
              >
                Developed from{" "}
                <span className="font-bold text-white">
                  TIPIX
                </span>
              </p>
            </div>

            {/* LinkedIn */}

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={tejasLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3

                  rounded-full
                  border
                  border-[#38BDF8]/25

                  bg-[#0877E8]/10

                  px-5
                  py-3

                  text-sm
                  font-semibold
                  text-white

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#38BDF8]/55
                  hover:bg-[#0877E8]/20
                  hover:shadow-[0_15px_40px_rgba(8,119,232,0.18)]
                "
              >
                LinkedIn

                <span
                  className="
                    text-[#38BDF8]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                >
                  ↗
                </span>
              </a>

              <a
                href="#engineering"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white/60
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-white/20
                  hover:bg-white/[0.07]
                  hover:text-white
                "
              >
                Explore build

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                >
                  ↓
                </span>
              </a>
            </div>

            {/* Engineering metadata */}

            <div
              className="
                mt-14
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-white/20

                sm:text-[10px]
              "
            >
              <span>TRAILBLIZ</span>
              <span>/</span>
              <span>ENGINEERING</span>
              <span>/</span>
              <span>TIPIX</span>
            </div>
          </div>

          {/* ===============================================
              IMAGE
          =============================================== */}

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[480px]

              lg:ml-auto
            "
          >
            {/* Giant background text */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-10
                -top-12
                z-0
                select-none
                font-mono
                text-[8rem]
                font-black
                leading-none
                tracking-[-0.08em]
                text-white/[0.025]

                sm:text-[10rem]
              "
            >
              TG
            </div>

            {/* Glow */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-1/2
                h-[75%]
                w-[80%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#0877E8]/35
                blur-[100px]
              "
            />

            {/* Frame */}

            <div
              className="
                group
                relative
                z-10
                h-[500px]
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-[#06111F]
                shadow-[0_40px_120px_rgba(0,0,0,0.45)]

                sm:h-[590px]
                lg:h-[650px]
              "
            >
              <img
                src="/aipic.png"
                alt="Tejas Guntru"
                className="
                  h-full
                  w-full
                  object-cover
                  object-top

                  transition-transform
                  duration-700

                  group-hover:scale-[1.025]
                "
              />

              {/* Photo blue treatment */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#020712]
                  via-transparent
                  to-[#0877E8]/10
                "
              />

              {/* Left shade */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  w-1/3
                  bg-gradient-to-r
                  from-[#020712]/45
                  to-transparent
                "
              />

              {/* Top line */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  left-10
                  right-10
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#38BDF8]/70
                  to-transparent
                "
              />

              {/* Image metadata */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6

                  flex
                  items-end
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-[#38BDF8]
                    "
                  >
                    Developer
                  </p>

                  <p
                    className="
                      mt-1
                      text-lg
                      font-bold
                      tracking-[-0.025em]
                      text-white
                    "
                  >
                    Tejas Guntru
                  </p>
                </div>

                <span
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-white/30
                  "
                >
                  TG / 01
                </span>
              </div>
            </div>

            {/* Floating code */}

            <div
              className="
                absolute
                -bottom-6
                -left-6
                z-20
                hidden

                rounded-[18px]
                border
                border-white/10

                bg-[#07111F]/85

                px-5
                py-4

                shadow-[0_20px_60px_rgba(0,0,0,0.35)]

                backdrop-blur-xl

                sm:block
              "
            >
              <p
                className="
                  font-mono
                  text-[10px]
                  leading-5
                  text-white/35
                "
              >
                <span className="text-[#38BDF8]">
                  &lt;developer&gt;
                </span>
                <br />
                &nbsp;&nbsp;Tejas Guntru
                <br />
                <span className="text-[#38BDF8]">
                  &lt;/developer&gt;
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom fade */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            h-40
            bg-gradient-to-b
            from-transparent
            to-[#030A16]
          "
        />
      </section>

      {/* =====================================================
          ENGINEERING / MASSIVE TYPOGRAPHY
      ===================================================== */}

      <section
        id="engineering"
        className="
          relative
          isolate
          overflow-hidden
          bg-[#030A16]
          py-28

          sm:py-36
          lg:py-44
        "
      >
        {/* glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[900px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#0877E8]/10
            blur-[160px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1500px]
            px-5
            sm:px-8
            lg:px-12
          "
        >
          <div className="flex items-center gap-4">
            <span
              className="
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#38BDF8]
              "
            >
              02 / The Build
            </span>

            <div
              className="
                h-px
                w-16
                bg-gradient-to-r
                from-[#38BDF8]/80
                to-transparent
              "
            />
          </div>

          <div className="mt-14">
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/25
              "
            >
              Designed · Engineered · Developed
            </p>

            <h2
              className="
                mt-6
                text-[clamp(4.5rem,14vw,13rem)]
                font-black
                uppercase
                leading-[0.78]
                tracking-[-0.08em]
              "
            >
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-white
                  via-white
                  to-white/35
                  bg-clip-text
                  text-transparent
                "
              >
                Trail
              </span>

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#0877E8]
                  via-[#20A9F5]
                  to-[#6AD9FF]
                  bg-clip-text
                  text-transparent
                "
              >
                bliz.
              </span>
            </h2>
          </div>

          <div
            className="
              mt-16
              flex
              flex-col
              gap-6
              border-t
              border-white/[0.08]
              pt-7

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                max-w-xl
                text-lg
                leading-8
                text-white/45

                sm:text-xl
              "
            >
              One product. One engineering vision.
            </p>

            <span
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#38BDF8]
              "
            >
              Built by Tejas Guntru
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          TIPIX
      ===================================================== */}

      <section
        className="
          relative
          isolate
          overflow-hidden
          border-y
          border-white/[0.06]
          bg-[#050D1B]
          py-28

          sm:py-36
          lg:py-44
        "
      >
        {/* Giant background TIPIX */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2

            select-none

            text-[clamp(8rem,26vw,26rem)]
            font-black
            uppercase
            leading-none
            tracking-[-0.09em]

            text-white/[0.018]
          "
        >
          TIPIX
        </div>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#0877E8]/10
            blur-[150px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1500px]
            px-5
            sm:px-8
            lg:px-12
          "
        >
          <div className="flex items-center gap-4">
            <span
              className="
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#38BDF8]
              "
            >
              03 / Studio
            </span>

            <div
              className="
                h-px
                w-16
                bg-gradient-to-r
                from-[#38BDF8]/80
                to-transparent
              "
            />
          </div>

          <div
            className="
              mt-16
              grid
              gap-12

              lg:grid-cols-[1fr_auto]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-white/30
                "
              >
                Developed from
              </p>

              <h2
                className="
                  mt-5
                  text-[clamp(5rem,14vw,12rem)]
                  font-black
                  uppercase
                  leading-[0.8]
                  tracking-[-0.08em]
                  text-white
                "
              >
                TIPIX
                <span className="text-[#38BDF8]">.</span>
              </h2>
            </div>

            <a
              href={tipixLinkedIn}
              target="_blank"
              rel="noreferrer"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-4

                rounded-full
                border
                border-white/10

                bg-white/[0.05]

                px-6
                py-4

                text-sm
                font-semibold
                text-white

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#38BDF8]/40
                hover:bg-[#0877E8]/15
                hover:shadow-[0_18px_50px_rgba(8,119,232,0.16)]
              "
            >
              TIPIX on LinkedIn

              <span
                className="
                  text-[#38BDF8]
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          SIGNATURE
      ===================================================== */}

      <section
        className="
          relative
          isolate
          overflow-hidden
          bg-[#020712]
          py-28

          sm:py-36
          lg:py-44
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-[-300px]
            left-1/2
            h-[600px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-[#0877E8]/15
            blur-[160px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-5xl
            px-5
            sm:px-8
          "
        >
          <div className="text-center">
            <span
              className="
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#38BDF8]
              "
            >
              04 / Signature
            </span>

            <h2
              className="
                mx-auto
                mt-8
                max-w-4xl

                text-[clamp(3rem,8vw,7rem)]
                font-black
                leading-[0.88]
                tracking-[-0.065em]
                text-white
              "
            >
              Built with
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#0877E8]
                  via-[#20A9F5]
                  to-[#72DEFF]
                  bg-clip-text
                  text-transparent
                "
              >
                intent.
              </span>
            </h2>
          </div>

          {/* Terminal */}

          <div
            className="
              mx-auto
              mt-16
              max-w-3xl
              overflow-hidden

              rounded-[26px]
              border
              border-white/10

              bg-[#07111F]/70

              shadow-[0_30px_100px_rgba(0,0,0,0.35)]

              backdrop-blur-xl
            "
          >
            {/* Terminal bar */}

            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-white/[0.07]

                px-5
                py-4
              "
            >
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </div>

              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-white/20
                "
              >
                credits.tsx
              </span>
            </div>

            {/* Code */}

            <div
              className="
                overflow-x-auto
                p-6
                font-mono
                text-xs
                leading-7

                sm:p-8
                sm:text-sm
              "
            >
              <p className="text-white/30">
                <span className="text-[#38BDF8]">
                  &lt;developer&gt;
                </span>
              </p>

              <p className="pl-6 text-white">
                Tejas Guntru
              </p>

              <p className="text-white/30">
                <span className="text-[#38BDF8]">
                  &lt;/developer&gt;
                </span>
              </p>

              <br />

              <p className="text-white/30">
                <span className="text-[#38BDF8]">
                  &lt;company&gt;
                </span>
              </p>

              <p className="pl-6 text-white">
                TIPIX
              </p>

              <p className="text-white/30">
                <span className="text-[#38BDF8]">
                  &lt;/company&gt;
                </span>
              </p>

              <br />

              <p className="text-white/30">
                <span className="text-[#38BDF8]">
                  &lt;product&gt;
                </span>
              </p>

              <p className="pl-6 text-white">
                Trailbliz
                <span
                  className="
                    ml-2
                    inline-block
                    h-[14px]
                    w-[6px]
                    translate-y-[2px]
                    animate-pulse
                    bg-[#38BDF8]
                  "
                />
              </p>

              <p className="text-white/30">
                <span className="text-[#38BDF8]">
                  &lt;/product&gt;
                </span>
              </p>
            </div>
          </div>

          {/* Social */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            <a
              href={tejasLinkedIn}
              target="_blank"
              rel="noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-3

                rounded-full
                border
                border-white/10

                bg-white/[0.04]

                px-5
                py-3

                text-sm
                font-semibold
                text-white/70

                transition-all
                duration-300

                hover:border-[#38BDF8]/40
                hover:bg-[#0877E8]/15
                hover:text-white
              "
            >
              Tejas Guntru

              <span
                className="
                  text-[#38BDF8]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </a>

            <a
              href={tipixLinkedIn}
              target="_blank"
              rel="noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-3

                rounded-full
                border
                border-white/10

                bg-white/[0.04]

                px-5
                py-3

                text-sm
                font-semibold
                text-white/70

                transition-all
                duration-300

                hover:border-[#38BDF8]/40
                hover:bg-[#0877E8]/15
                hover:text-white
              "
            >
              TIPIX

              <span
                className="
                  text-[#38BDF8]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </a>
          </div>

          {/* Footer */}

          <div
            className="
              mt-20
              flex
              flex-col
              gap-5

              border-t
              border-white/[0.08]

              pt-7

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div
              className="
                flex
                items-center
                gap-3

                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-white/25
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />

              Trailbliz / Engineering
            </div>

            <p
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-white/25
              "
            >
              Tejas Guntru · TIPIX
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}