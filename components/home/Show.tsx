export default function Show() {
  return (
    <section className="overflow-hidden border-y border-[#E3E1DA] bg-[#F1F0EB] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              Show
            </p>

            <h2 className="mt-5 text-5xl font-bold leading-[0.88] tracking-[-0.065em] text-[#14213D] sm:text-6xl lg:text-7xl">
              Don&apos;t just
              <br />
              say it.
            </h2>
          </div>

          <p className="max-w-md text-lg leading-8 text-[#5F6470]">
            Your work says more than a list of words ever could.
            Put the things you&apos;ve actually done where they can be seen.
          </p>

        </div>

        {/* Showcase */}
        <div className="relative mt-20 lg:mt-24">

          {/* Background trail */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 500"
            className="absolute inset-0 h-full w-full"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M40 410 C260 410 180 90 470 120 C730 150 600 420 850 380 C1010 355 1030 180 1160 90"
              stroke="#D2CFC5"
              strokeWidth="2"
            />

            <path
              d="M40 410 C260 410 180 90 470 120 C730 150 600 420 850 380 C1010 355 1030 180 1160 90"
              stroke="#C9A227"
              strokeWidth="3"
              strokeDasharray="4 12"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative grid gap-5 lg:grid-cols-12 lg:grid-rows-[220px_220px]">

            {/* Main project */}
            <div className="group relative overflow-hidden rounded-[24px] border border-[#D8D5CC] bg-[#14213D] p-7 text-white lg:col-span-7 lg:row-span-2 lg:p-10">

              <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227]">
                  Project
                </span>

                <span className="text-xs text-white/40">
                  01
                </span>
              </div>

              <div className="mt-20 lg:mt-28">
                <h3 className="text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                  College
                  <br />
                  Payment OS
                </h3>

                <p className="mt-5 max-w-md text-sm leading-6 text-white/55">
                  A payment infrastructure layer connecting colleges,
                  students, fees, payments, and reconciliation.
                </p>
              </div>

              <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t border-white/10 pt-5 lg:bottom-10 lg:left-10 lg:right-10">
                <span className="text-xs text-white/45">
                  Java · Spring Boot · PostgreSQL
                </span>

                <span className="text-lg text-[#C9A227] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-[24px] border border-[#D8D5CC] bg-white p-7 lg:col-span-5 lg:p-8">

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#858994]">
                Skills
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Java", "React", "Spring Boot", "AWS", "PostgreSQL"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#D8D5CC] px-4 py-2 text-sm font-semibold text-[#14213D]"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>

            </div>

            {/* Progress */}
            <div className="rounded-[24px] border border-[#D8D5CC] bg-[#C9A227] p-7 text-[#14213D] lg:col-span-5 lg:p-8">

              <div className="flex items-start justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.16em]">
                  Progress
                </p>

                <span className="text-xs font-bold">
                  Growing
                </span>
              </div>

              <div className="mt-10">
                <p className="text-5xl font-bold tracking-[-0.06em]">
                  Keep going.
                </p>

                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#14213D]/15">
                  <div className="h-full w-[72%] rounded-full bg-[#14213D]" />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-16 flex items-center gap-4">
          <span className="h-px w-16 bg-[#C9A227]" />

          <p className="text-2xl font-semibold tracking-[-0.03em] text-[#14213D] sm:text-3xl">
            Don&apos;t just say it.
            <span className="text-[#C9A227]"> Show it.</span>
          </p>
        </div>

      </div>
    </section>
  );
}