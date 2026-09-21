export default function Build() {
  const items = [
    {
      number: "01",
      title: "Academics",
      value: "Computer Science Engineering",
      position: "lg:ml-[8%]",
    },
    {
      number: "02",
      title: "Skills",
      value: "Java · React · Spring Boot · AWS",
      position: "lg:ml-[42%]",
    },
    {
      number: "03",
      title: "Projects",
      value: "College Payment OS · Trailbliz",
      position: "lg:ml-[18%]",
    },
    {
      number: "04",
      title: "Experience",
      value: "Software Engineering Intern",
      position: "lg:ml-[52%]",
    },
  ];

  return (
    <section className="overflow-hidden px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">

        {/* Intro */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              Build
            </p>

            <h2 className="mt-5 text-5xl font-bold leading-[0.88] tracking-[-0.065em] text-[#14213D] sm:text-6xl lg:text-7xl">
              Become more
              <br />
              than a resume.
            </h2>
          </div>

          <p className="max-w-lg text-lg leading-8 text-[#5F6470] lg:justify-self-end">
            Your trail is made from everything you learn, build, and
            experience. Bring it together in one place.
          </p>
        </div>

        {/* Living profile */}
        <div className="relative mt-24 lg:mt-28">

          {/* SVG trail */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <path
              d="
                M500 0
                C500 100 260 100 260 190
                C260 280 740 240 740 350
                C740 460 180 390 180 510
                C180 610 650 520 820 680
              "
              stroke="#D8D5CC"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="
                M500 0
                C500 100 260 100 260 190
                C260 280 740 240 740 350
                C740 460 180 390 180 510
                C180 610 650 520 820 680
              "
              stroke="#C9A227"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 12"
            />
          </svg>

          {/* Profile points */}
          <div className="relative flex min-h-[700px] flex-col justify-between py-8">

            {items.map((item, index) => (
              <div
                key={item.number}
                className={`relative w-full ${item.position}`}
              >
                <div className="group relative w-fit max-w-[330px]">

                  {/* Point */}
                  <div className="absolute -left-5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#C9A227] ring-4 ring-[#F8F7F3] transition-transform duration-300 group-hover:scale-150" />

                  {/* Content */}
                  <div className="border-l border-[#E3E1DA] pl-7 transition-transform duration-300 group-hover:translate-x-1">

                    <p className="text-xs font-bold tracking-[0.16em] text-[#858994]">
                      {item.number}
                    </p>

                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-[#C9A227]">
                      {item.title}
                    </p>

                    <h3 className="mt-2 text-xl font-bold tracking-[-0.025em] text-[#14213D]">
                      {item.value}
                    </h3>

                  </div>
                </div>
              </div>
            ))}

            {/* Final point */}
            <div className="absolute bottom-0 right-[16%] hidden lg:block">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#14213D] ring-4 ring-[#F8F7F3]" />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#14213D]">
                  Your story
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-16 border-t border-[#D8D5CC] pt-7">
          <p className="text-2xl font-semibold tracking-[-0.03em] text-[#14213D] sm:text-3xl">
            Everything you&apos;ve done.
            <span className="text-[#C9A227]"> In one trail.</span>
          </p>
        </div>

      </div>
    </section>
  );
}