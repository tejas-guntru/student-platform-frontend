import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-0 sm:px-8 lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-7xl">

        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#C9A227]" />

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5F6470]">
            Your career, connected
          </p>
        </div>

        {/* Main Hero */}
        <div className="relative mt-8 lg:mt-10">

          <h1 className="relative z-10 text-[clamp(4rem,12vw,11rem)] font-bold leading-[0.78] tracking-[-0.085em] text-[#14213D]">

            <span className="block">
              FIND
            </span>

            <span className="relative block">
              YOUR
            </span>

            <span className="relative block text-[#14213D]">
              TRAIL<span className="text-[#C9A227]">.</span>

              {/* Trail */}
              <svg
                aria-hidden="true"
                viewBox="0 0 800 220"
                fill="none"
                className="absolute left-[42%] top-[35%] h-[180px] w-[650px] overflow-visible sm:h-[210px] sm:w-[760px]"
              >
                <path
                  d="M0 110
                     C90 110 100 35 190 55
                     C270 73 260 175 355 160
                     C445 145 425 55 520 65
                     C600 73 620 145 700 105
                     C735 88 760 65 795 45"
                  stroke="#C9A227"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <circle
                  cx="0"
                  cy="110"
                  r="6"
                  fill="#C9A227"
                />

                <circle
                  cx="795"
                  cy="45"
                  r="7"
                  fill="#C9A227"
                />

                <path
                  d="M780 33 L795 45 L778 55"
                  stroke="#C9A227"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>

          {/* Small floating statement */}
          <div className="absolute bottom-2 right-0 hidden max-w-[220px] lg:block">
            <p className="text-sm leading-6 text-[#5F6470]">
              Your academics.
              <br />
              Your skills.
              <br />
              Your work.
              <br />
              <span className="font-semibold text-[#14213D]">
                Your next move.
              </span>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-[#D8D5CC] pt-8 lg:mt-20">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <p className="max-w-2xl text-lg leading-8 text-[#4B5563] sm:text-xl">
              Build a profile that represents where you are,
              what you can do, and where you want to go.
            </p>

            <div className="flex shrink-0 items-center gap-5">
              <Link
                href="/register"
                className="group inline-flex items-center gap-3 rounded-full bg-[#C9A227] px-7 py-4 text-sm font-bold text-[#14213D] transition-all duration-200 hover:bg-[#E0C766] hover:shadow-md"
              >
                Start your trail

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="#your-trail"
                className="text-sm font-semibold text-[#14213D] transition-colors hover:text-[#C9A227]"
              >
                Explore ↓
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}