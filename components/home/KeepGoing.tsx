import Link from "next/link";

export default function KeepGoing() {
  return (
    <section className="overflow-hidden px-6 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-7xl">

        {/* Top line */}
        <div className="border-t border-[#D2CFC5] pt-8">

          <div className="flex items-start justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              Keep going
            </p>

            <span className="hidden text-xs font-bold tracking-[0.15em] text-[#858994] sm:block">
              07 / 07
            </span>
          </div>

          {/* Main */}
          <div className="relative mt-14">

            <h2 className="relative z-10 max-w-5xl text-6xl font-bold leading-[0.82] tracking-[-0.075em] text-[#14213D] sm:text-7xl lg:text-[9rem]">
              Your trail
              <br />
              <span className="relative">
                doesn&apos;t end.
                <span className="text-[#C9A227]">.</span>

                {/* Trail */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 700 180"
                  fill="none"
                  className="absolute left-[42%] top-[45%] h-[120px] w-[520px] overflow-visible sm:h-[150px] sm:w-[620px]"
                >
                  <path
                    d="M0 90 C80 90 90 25 165 45 C240 65 230 145 315 125 C400 105 390 35 475 55 C545 72 575 115 640 80 C660 70 680 55 695 35"
                    stroke="#C9A227"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="0"
                    cy="90"
                    r="5"
                    fill="#C9A227"
                  />

                  <circle
                    cx="695"
                    cy="35"
                    r="6"
                    fill="#C9A227"
                  />

                  <path
                    d="M681 23 L695 35 L680 45"
                    stroke="#C9A227"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>

          </div>

          {/* CTA area */}
          <div className="mt-20 flex flex-col justify-between gap-10 border-t border-[#D2CFC5] pt-8 lg:flex-row lg:items-end">

            <div>
              <p className="max-w-xl text-lg leading-8 text-[#5F6470] sm:text-xl">
                Keep building your skills. Keep adding to your story.
                Keep moving toward what comes next.
              </p>
            </div>

            <Link
              href="/register"
              className="group inline-flex w-fit shrink-0 items-center gap-4 rounded-full bg-[#C9A227] px-7 py-4 text-sm font-bold text-[#14213D] transition-all duration-200 hover:bg-[#E0C766] hover:shadow-md"
            >
              Start your trail

              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

          {/* Ending trail */}
          <div className="relative mt-20 h-12 overflow-hidden">

            <svg
              aria-hidden="true"
              viewBox="0 0 1200 80"
              preserveAspectRatio="none"
              className="h-full w-full"
              fill="none"
            >
              <path
                d="M0 40 C180 40 150 15 300 25 C450 35 430 65 600 50 C760 35 720 10 880 25 C1020 38 1060 55 1200 18"
                stroke="#D2CFC5"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M0 40 C180 40 150 15 300 25 C450 35 430 65 600 50 C760 35 720 10 880 25 C1020 38 1060 55 1200 18"
                stroke="#C9A227"
                strokeWidth="3"
                strokeDasharray="5 14"
                strokeLinecap="round"
              />

              <circle
                cx="1200"
                cy="18"
                r="5"
                fill="#C9A227"
              />
            </svg>

          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#858994]">
              Trailbliz
            </span>

            <span className="text-xs font-medium text-[#858994]">
              Keep moving →
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}