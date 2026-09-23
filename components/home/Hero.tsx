"use client";

import Link from "next/link";

export default function HeroSection() {
  const features = [
    "Expert Mentorship",
    "Regular Assessments",
    "Real-World Projects",
    "Career Focused",
    "Vibrant Community",
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#064C9D]">
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(135deg,#064C9D_0%,#086BC4_45%,#1298E8_100%)]
        "
      />

      {/* Top Right Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-32 -top-44
          h-[520px] w-[520px]
          rounded-full
          bg-white/18
          blur-[130px]

          sm:h-[650px]
          sm:w-[650px]

          lg:-right-20
          lg:-top-52
          lg:h-[800px]
          lg:w-[800px]
        "
      />

      {/* Bottom Left Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-40 -left-32
          h-[420px] w-[420px]
          rounded-full
          bg-[#38BDF8]/25
          blur-[120px]

          lg:h-[600px]
          lg:w-[600px]
        "
      />

      {/* Deep Blue Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-[35%] top-[15%]
          h-[400px] w-[400px]
          rounded-full
          bg-[#003F91]/30
          blur-[140px]
        "
      />

      {/* Grid Effect */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.08]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Light Beam */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-[15%] top-[15%]
          h-[500px] w-[700px]
          rotate-[-20deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.07]
          to-transparent
          blur-3xl
        "
      />

      {/* Main Content */}
      {/* Main Content */}
<div
  className="
    relative z-10
    mx-auto
    flex
    min-h-[calc(100vh-80px)]
    max-w-7xl
    items-center
    justify-center
    px-5
    py-16
    sm:px-8
    sm:py-20
    lg:px-12
  "
>
  <div className="mx-auto w-full max-w-5xl text-center">

    {/* Badge */}
    <div
      className="
        mb-6
        inline-flex
        items-center
        gap-2.5
        rounded-full
        border border-white/20
        bg-white/10
        px-4 py-2
        backdrop-blur-md
      "
    >
      <span
        className="
          h-2 w-2
          rounded-full
          bg-[#8DDEFF]
          shadow-[0_0_14px_rgba(141,222,255,0.9)]
        "
      />

      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/90">
        Learn • Build • Get Ready
      </span>
    </div>

    {/* Main Heading */}
    <h1
      className="
        mx-auto
        max-w-5xl
        text-4xl
        font-semibold
        leading-[1.08]
        tracking-[-0.04em]
        text-white

        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        xl:text-[5.5rem]
      "
    >
      Build{" "}
      <span className="text-[#BFEAFF]">
        job-ready skills
      </span>{" "}
      that matter.
    </h1>

    {/* Secondary Heading */}
    <h2
      className="
        mt-5
        text-2xl
        font-semibold
        tracking-[-0.03em]
        text-white/90

        sm:text-3xl
        md:text-4xl
        lg:text-[2.75rem]
      "
    >
      Learn. Build.{" "}
      <span className="text-[#BFEAFF]">
        Get Ready.
      </span>
    </h2>

   {/* Description */}
<div className="mt-6 flex w-full justify-center">
  <p
    className="
      max-w-[900px]
      text-center
      text-base
      leading-relaxed
      text-white/75
      sm:text-lg
      lg:text-xl
      lg:leading-9
      [text-wrap:balance]
    "
  >
    Build real-world software skills through{" "}
    <span className="font-semibold text-white">
      expert-led coding courses
    </span>
    , hands-on projects, regular assessments, and career-focused mentorship
    designed for today&apos;s job market.
  </p>
</div>
    {/* CTA Buttons */}
    <div
      className="
        mt-9
        flex
        flex-col
        items-center
        justify-center
        gap-4
        sm:flex-row
      "
    >
      <Link
        href="/sign-in"
        className="
          group
          inline-flex
          min-h-[52px]
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-white
          px-7 py-3
          text-base
          font-semibold
          text-[#064C9D]
          shadow-[0_14px_40px_rgba(0,25,70,0.28)]
          transition-all
          duration-200

          hover:-translate-y-1
          hover:bg-[#F3FAFF]
          hover:shadow-[0_18px_48px_rgba(0,25,70,0.38)]
        "
      >
        Join Trailbliz Today

        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>

      <Link
        href="#features"
        className="
          inline-flex
          min-h-[52px]
          items-center
          justify-center
          gap-2
          rounded-xl
          border border-white/20
          bg-white/[0.08]
          px-7 py-3
          text-base
          font-semibold
          text-white
          backdrop-blur-md
          transition-all
          duration-200

          hover:border-white/35
          hover:bg-white/[0.14]
        "
      >
        Explore Platform
        <span>↓</span>
      </Link>
    </div>

    {/* Features */}
    <div
      className="
        mt-10
        flex
        flex-wrap
        items-center
        justify-center
        gap-x-6
        gap-y-3
        text-sm
        text-white/65
      "
    >
      {features.map((item) => (
        <span
          key={item}
          className="flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#8DDEFF]" />
          {item}
        </span>
      ))}
    </div>

  </div>
</div>

      {/* Bottom Fade */}
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