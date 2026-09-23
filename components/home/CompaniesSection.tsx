"use client";

const companies = [
  {
    src: "/images/companyLogos/image1.png",
    name: "Company 1",
  },
  {
    src: "/images/companyLogos/image2.png",
    name: "Company 2",
  },
  {
    src: "/images/companyLogos/image3.png",
    name: "Company 3",
  },
  {
    src: "/images/companyLogos/image4.png",
    name: "Company 4",
  },
  {
    src: "/images/companyLogos/image5.png",
    name: "Company 5",
  },
  {
    src: "/images/companyLogos/image6.png",
    name: "Company 6",
  },
  {
    src: "/images/companyLogos/image7.png",
    name: "Company 7",
  },
  {
    src: "/images/companyLogos/image8.png",
    name: "Company 8",
  },
  {
    src: "/images/companyLogos/image9.png",
    name: "Company 9",
  },
  {
    src: "/images/companyLogos/image10.png",
    name: "Company 10",
  },
  {
    src: "/images/companyLogos/image11.png",
    name: "Company 11",
  },
  {
    src: "/images/companyLogos/image12.png",
    name: "Company 12",
  },
];

export default function CompaniesSection() {
  return (
    <section
      id="companies"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-[-300px] h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-[#0877E8]/10 blur-[150px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#38BDF8]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-1/2 h-[350px] w-[350px] rounded-full bg-[#0877E8]/10 blur-[120px]" />

      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Top separator */}
      <div className="absolute left-1/2 top-0 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#0877E8]/20 to-transparent" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0877E8]/15 bg-[#F8FBFF]/80 px-4 py-2 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38BDF8] opacity-30" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0877E8] shadow-[0_0_10px_rgba(8,119,232,0.5)]" />
            </span>

            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0877E8]">
              Career Outcomes
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] text-[#07182E] sm:text-4xl md:text-5xl lg:text-[3.6rem]">
            Land Your

            <span className="ml-2 bg-gradient-to-r from-[#0877E8] via-[#129CE9] to-[#32BDF7] bg-clip-text text-transparent">
              Dream Job.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Our{" "}
            <span className="font-bold text-[#07182E]">
              150+ alumni
            </span>{" "}
            have got placed in{" "}
            <span className="font-bold text-[#07182E]">
              50+ companies
            </span>{" "}
            with{" "}
            <span className="font-bold text-[#07182E]">
              ₹75 Lakhs
            </span>{" "}
            as the highest package.
          </p>
        </div>

        {/* =====================================================
            COMPANY LOGOS
        ===================================================== */}

        <div className="relative mx-auto mt-14 max-w-6xl sm:mt-16">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0877E8]/10 blur-[90px]" />

          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {companies.map((company, index) => (
              <CompanyLogo
                key={`${company.src}-${index}`}
                src={company.src}
                name={company.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COMPANY LOGO
========================================================= */

function CompanyLogo({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <div
      className="
        group
        relative
        flex
        h-[110px]
        items-center
        justify-center
        overflow-hidden
        rounded-[20px]
        border
        border-slate-200/80
        bg-white
        p-4
        shadow-[0_8px_30px_rgba(15,23,42,0.05)]
        transition-all
        duration-500

        hover:-translate-y-2
        hover:scale-[1.02]
        hover:border-[#0877E8]/30
        hover:shadow-[0_20px_50px_rgba(8,119,232,0.15)]

        sm:h-[120px]
        sm:p-5

        lg:h-[130px]
      "
    >
      {/* Top blue line */}
      <div className="absolute left-1/2 top-0 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent transition-all duration-500 group-hover:w-[65%]" />

      {/* Bottom glow */}
      <div className="pointer-events-none absolute -bottom-16 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#0877E8]/0 blur-2xl transition-all duration-500 group-hover:bg-[#0877E8]/20" />

      {/* Hover tint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0877E8]/0 to-[#38BDF8]/0 transition-all duration-500 group-hover:from-[#0877E8]/[0.02] group-hover:to-[#38BDF8]/[0.07]" />

      {/* Logo */}
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="
          relative
          z-10
          max-h-[70px]
          max-w-full
          object-contain
          opacity-80
          transition-all
          duration-500

          group-hover:scale-110
          group-hover:opacity-100

          sm:max-h-[78px]
          lg:max-h-[85px]
        "
      />
    </div>
  );
}