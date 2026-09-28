import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tejas Guntru | Developer of Trailbliz",
  description:
    "Developer credits for Trailbliz. Trailbliz was developed by Tejas Guntru from TIPIX.",
  alternates: {
    canonical: "https://www.trailbliz.in/developers",
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
    <main className="overflow-hidden bg-[#050A12] text-[#F8FAFC]">
      {/* ======================================================
          HERO
      ====================================================== */}
      <section className="relative isolate min-h-screen overflow-hidden">
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "54px 54px",
          }}
        />

        {/* Background glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[35%]
            top-[20%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-[#2563EB]/10
            blur-[160px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[300px]
            bottom-[-200px]
            h-[650px]
            w-[650px]
            rounded-full
            bg-[#38BDF8]/5
            blur-[150px]
          "
        />

        {/* ======================================================
            NAVBAR
        ====================================================== */}
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
              text-slate-400
              transition
              hover:text-white
            "
          >
            <span className="transition-transform group-hover:-translate-x-1">
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
              bg-white/[0.035]
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#38BDF8] opacity-30" />

              <span className="relative h-2 w-2 rounded-full bg-[#38BDF8]" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Developer Credits
            </span>
          </div>
        </header>

        {/* ======================================================
            HERO CONTENT
        ====================================================== */}
        <div
          className="
            relative
            z-10
            mx-auto
            grid
            min-h-[calc(100vh-88px)]
            max-w-[1500px]
            items-center
            gap-16
            px-5
            pb-20
            pt-12
            sm:px-8
            lg:grid-cols-[1.05fr_0.95fr]
            lg:px-12
            lg:pb-24
          "
        >
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#38BDF8]">
                01 / Developer
              </span>

              <div className="h-px w-16 bg-gradient-to-r from-[#38BDF8] to-transparent" />
            </div>

            <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.32em] text-slate-500 sm:text-xs">
              Developed by
            </p>

            <h1
              className="
                mt-5
                text-[clamp(4.5rem,10vw,9.5rem)]
                font-black
                uppercase
                leading-[0.77]
                tracking-[-0.075em]
              "
            >
              <span className="block text-[#F8FAFC]">
                Tejas
              </span>

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#2563EB]
                  via-[#2688F4]
                  to-[#38BDF8]
                  bg-clip-text
                  text-transparent
                "
              >
                Guntru.
              </span>
            </h1>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-[2px] w-10 bg-[#2563EB]" />

              <p className="text-lg text-slate-400 sm:text-xl">
                Developer behind{" "}
                <span className="font-bold text-white">
                  Trailbliz
                </span>{" "}
                from{" "}
                <span className="font-bold text-white">
                  TIPIX
                </span>
                .
              </p>
            </div>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400">
              Engineering the product experience, platform
              architecture, and digital systems that bring
              Trailbliz together.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
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
                  bg-[#2563EB]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#1D4ED8]
                  hover:shadow-[0_16px_45px_rgba(37,99,235,0.25)]
                "
              >
                LinkedIn

                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
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
                  bg-white/[0.035]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-slate-300
                  transition-all
                  duration-300
                  hover:border-white/20
                  hover:bg-white/[0.07]
                  hover:text-white
                "
              >
                Explore build

                <span className="transition-transform group-hover:translate-y-1">
                  ↓
                </span>
              </a>
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600 sm:text-[10px]">
              <span>TRAILBLIZ</span>
              <span>/</span>
              <span>ENGINEERING</span>
              <span>/</span>
              <span>TIPIX</span>
            </div>
          </div>

          {/* ======================================================
              DEVELOPER CARD — NO IMAGE
          ====================================================== */}
          <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            {/* Background text */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-10
                -top-20
                select-none
                font-mono
                text-[10rem]
                font-black
                leading-none
                tracking-[-0.09em]
                text-white/[0.025]
              "
            >
              TG
            </div>

            {/* Glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[80%]
                w-[85%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#2563EB]/15
                blur-[100px]
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-[#09111D]/85
                p-7
                shadow-[0_40px_120px_rgba(0,0,0,0.4)]
                backdrop-blur-xl
                sm:p-9
              "
            >
              {/* Card glow */}
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
                  bg-[#2563EB]/20
                  blur-[90px]
                "
              />

              {/* Top */}
              <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">
                    Developer / 01
                  </span>
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
                  TG / 01
                </span>
              </div>

              {/* Identity */}
              <div className="relative py-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Developer
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                  Tejas
                  <br />
                  Guntru
                  <span className="text-[#38BDF8]">.</span>
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                  Product engineering and development for the
                  Trailbliz platform.
                </p>
              </div>

              {/* Product */}
              <div className="relative border-y border-white/[0.08] py-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-600">
                  Product
                </p>

                <div className="mt-3 flex items-end justify-between gap-6">
                  <p className="text-2xl font-bold tracking-[-0.04em] text-white">
                    Trailbliz
                    <span className="text-[#38BDF8]">.</span>
                  </p>

                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#38BDF8]">
                    Active
                  </span>
                </div>
              </div>

              {/* Engineering */}
              <div className="relative pt-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-600">
                  Engineering
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    "Next.js",
                    "TypeScript",
                    "Spring Boot",
                    "PostgreSQL",
                  ].map((technology) => (
                    <div
                      key={technology}
                      className="
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        px-4
                        py-3
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.12em]
                        text-slate-400
                      "
                    >
                      {technology}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.08] pt-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
                  TIPIX
                </span>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                    Engineering
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#070D17]" />
      </section>

      {/* ======================================================
          THE BUILD
      ====================================================== */}
      <section
        id="engineering"
        className="
          relative
          isolate
          overflow-hidden
          bg-[#070D17]
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
            left-1/2
            top-1/2
            h-[600px]
            w-[900px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#2563EB]/8
            blur-[160px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#38BDF8]">
              02 / The Build
            </span>

            <div className="h-px w-16 bg-gradient-to-r from-[#38BDF8] to-transparent" />
          </div>

          <div className="mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
              Designed · Engineered · Developed
            </p>

            <h2
              className="
                mt-7
                text-[clamp(4.5rem,14vw,13rem)]
                font-black
                uppercase
                leading-[0.77]
                tracking-[-0.085em]
              "
            >
              <span className="block text-white">
                Trail
              </span>

              <span className="block text-[#2563EB]">
                bliz<span className="text-[#38BDF8]">.</span>
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
              pt-8
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p className="max-w-xl text-lg leading-8 text-slate-400 sm:text-xl">
              One product. One engineering vision.
            </p>

            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#38BDF8]">
              Built by Tejas Guntru
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================
          TIPIX
      ====================================================== */}
      <section
        className="
          relative
          isolate
          overflow-hidden
          border-y
          border-white/[0.06]
          bg-[#09111D]
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
            bg-[#2563EB]/10
            blur-[150px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#38BDF8]">
              03 / Studio
            </span>

            <div className="h-px w-16 bg-gradient-to-r from-[#38BDF8] to-transparent" />
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
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
                bg-white/[0.04]
                px-6
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#38BDF8]/40
                hover:bg-[#2563EB]/10
              "
            >
              TIPIX on LinkedIn

              <span className="text-[#38BDF8] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================
          SIGNATURE
      ====================================================== */}
      <section className="relative isolate overflow-hidden bg-[#050A12] py-28 sm:py-36 lg:py-44">
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
            bg-[#2563EB]/12
            blur-[160px]
          "
        />

        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#38BDF8]">
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
              <span className="block text-[#2563EB]">
                intent<span className="text-[#38BDF8]">.</span>
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
              bg-[#09111D]/80
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
            "
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
                credits.tsx
              </span>
            </div>

            <div className="overflow-x-auto p-6 font-mono text-xs leading-7 sm:p-8 sm:text-sm">
              <p className="text-slate-500">
                <span className="text-[#38BDF8]">
                  &lt;developer&gt;
                </span>
              </p>

              <p className="pl-6 text-white">
                Tejas Guntru
              </p>

              <p className="text-slate-500">
                <span className="text-[#38BDF8]">
                  &lt;/developer&gt;
                </span>
              </p>

              <br />

              <p className="text-slate-500">
                <span className="text-[#38BDF8]">
                  &lt;company&gt;
                </span>
              </p>

              <p className="pl-6 text-white">
                TIPIX
              </p>

              <p className="text-slate-500">
                <span className="text-[#38BDF8]">
                  &lt;/company&gt;
                </span>
              </p>

              <br />

              <p className="text-slate-500">
                <span className="text-[#38BDF8]">
                  &lt;product&gt;
                </span>
              </p>

              <p className="pl-6 text-white">
                Trailbliz
                <span className="ml-2 inline-block h-[14px] w-[6px] translate-y-[2px] animate-pulse bg-[#38BDF8]" />
              </p>

              <p className="text-slate-500">
                <span className="text-[#38BDF8]">
                  &lt;/product&gt;
                </span>
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
                bg-white/[0.035]
                px-5
                py-3
                text-sm
                font-semibold
                text-slate-300
                transition-all
                hover:border-[#38BDF8]/30
                hover:bg-[#2563EB]/10
                hover:text-white
              "
            >
              Tejas Guntru

              <span className="text-[#38BDF8] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
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
                bg-white/[0.035]
                px-5
                py-3
                text-sm
                font-semibold
                text-slate-300
                transition-all
                hover:border-[#38BDF8]/30
                hover:bg-[#2563EB]/10
                hover:text-white
              "
            >
              TIPIX

              <span className="text-[#38BDF8] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
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
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
              Trailbliz / Engineering
            </div>

            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
              Tejas Guntru · TIPIX
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}