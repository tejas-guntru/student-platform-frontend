export default function Discover() {
  const opportunities = [
    {
      type: "INTERNSHIP",
      category: "Technology",
      title: "Software Engineering Intern",
      company: "Technology Company",
      location: "Remote · India",
    },
    {
      type: "FULL-TIME",
      category: "Engineering",
      title: "Graduate Software Engineer",
      company: "Technology Company",
      location: "Bengaluru · India",
    },
    {
      type: "INTERNSHIP",
      category: "Product",
      title: "Frontend Developer Intern",
      company: "Technology Company",
      location: "Hyderabad · India",
    },
  ];

  return (
    <section className="overflow-hidden px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              Discover
            </p>

            <h2 className="mt-5 text-5xl font-bold leading-[0.88] tracking-[-0.065em] text-[#14213D] sm:text-6xl lg:text-7xl">
              See where
              <br />
              it takes you.
            </h2>
          </div>

          <p className="max-w-md text-lg leading-8 text-[#5F6470] lg:justify-self-end">
            Opportunities connected to your college and placement
            ecosystem — all in one place.
          </p>

        </div>

        {/* Opportunities */}
        <div className="relative mt-20 lg:mt-24">

          {/* Trail */}
          <div
            aria-hidden="true"
            className="absolute left-[18px] top-0 hidden h-full w-px bg-[#D8D5CC] lg:block"
          />

          <div className="space-y-4">

            {opportunities.map((opportunity, index) => (
              <div
                key={opportunity.title}
                className={`group relative grid overflow-hidden rounded-[22px] border border-[#D8D5CC] transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  index === 0
                    ? "bg-[#14213D] text-white lg:grid-cols-[1fr_auto]"
                    : "bg-[#F1F0EB] lg:grid-cols-[1fr_auto]"
                }`}
              >

                {/* Trail point */}
                <div
                  className={`absolute left-[12px] top-8 h-3.5 w-3.5 rounded-full ring-4 ${
                    index === 0
                      ? "bg-[#C9A227] ring-[#14213D]"
                      : "bg-[#C9A227] ring-[#F1F0EB]"
                  }`}
                />

                <div className="p-7 pl-12 sm:p-9 sm:pl-14">

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`text-xs font-bold tracking-[0.16em] ${
                        index === 0
                          ? "text-[#C9A227]"
                          : "text-[#C9A227]"
                      }`}
                    >
                      {opportunity.type}
                    </span>

                    <span
                      className={`h-1 w-1 rounded-full ${
                        index === 0
                          ? "bg-white/30"
                          : "bg-[#B8B5AC]"
                      }`}
                    />

                    <span
                      className={`text-xs font-medium ${
                        index === 0
                          ? "text-white/50"
                          : "text-[#858994]"
                      }`}
                    >
                      {opportunity.category}
                    </span>
                  </div>

                  <h3
                    className={`mt-5 text-2xl font-bold tracking-[-0.035em] sm:text-3xl ${
                      index === 0
                        ? "text-white"
                        : "text-[#14213D]"
                    }`}
                  >
                    {opportunity.title}
                  </h3>

                  <div
                    className={`mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm ${
                      index === 0
                        ? "text-white/50"
                        : "text-[#6B707B]"
                    }`}
                  >
                    <span>{opportunity.company}</span>
                    <span>{opportunity.location}</span>
                  </div>

                </div>

                {/* Action */}
                <div
                  className={`flex items-end justify-between p-7 sm:p-9 lg:min-w-[190px] lg:flex-col lg:items-end ${
                    index === 0
                      ? "border-t border-white/10"
                      : "border-t border-[#D8D5CC]"
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.14em] ${
                      index === 0
                        ? "text-white/40"
                        : "text-[#858994]"
                    }`}
                  >
                    Opportunity
                  </span>

                  <span
                    className={`text-sm font-bold transition-transform duration-300 group-hover:translate-x-1 ${
                      index === 0
                        ? "text-[#C9A227]"
                        : "text-[#14213D]"
                    }`}
                  >
                    Explore →
                  </span>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#D8D5CC] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-[#5F6470]">
            Your next opportunity could be somewhere along the trail.
          </p>

          <span className="text-sm font-bold text-[#C9A227]">
            Keep exploring →
          </span>
        </div>

      </div>
    </section>
  );
}