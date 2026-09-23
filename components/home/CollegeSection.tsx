"use client";

const colleges = [
  "/images/colleges/image 89.svg",
  "/images/colleges/image 90.svg",
  "/images/colleges/image 92.svg",
  "/images/colleges/image 93.svg",
  "/images/colleges/image 94.svg",
  "/images/colleges/image 95.png",
  "/images/colleges/image 96.svg",
  "/images/colleges/image 104.jpg",
  "/images/colleges/image 98.svg",
  "/images/colleges/image 99.png",
  "/images/colleges/image 99.jpg",
  "/images/colleges/image 101.jpg",
  "/images/colleges/image 102.png",
  "/images/colleges/image 103.jpg",
  "/images/colleges/image 97.svg",
];

export default function CollegeSection() {
  return (
    <section
      id="colleges"
      className="relative isolate overflow-hidden bg-[#F8FBFF] py-20 sm:py-24 lg:py-28"
    >
      {/* Background glow */}
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

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* =========================
            HEADING
        ========================= */}

        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0877E8]/15 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38BDF8] opacity-30" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0877E8] shadow-[0_0_10px_rgba(8,119,232,0.5)]" />
            </span>

            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0877E8]">
              Trusted Across Campuses
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] text-[#07182E] sm:text-4xl md:text-5xl lg:text-[3.6rem]">
            Built for ambitious students

            <span className="mt-1 block bg-gradient-to-r from-[#0877E8] via-[#129CE9] to-[#32BDF7] bg-clip-text text-transparent">
              across campuses.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Students from{" "}
            <span className="font-bold text-[#07182E]">
              20+ institutions and universities
            </span>{" "}
            have benefited from Trailbliz.
          </p>
        </div>

        {/* =========================
            LOGOS
        ========================= */}

        <div className="relative mx-auto mt-14 max-w-6xl sm:mt-16">
          {/* Glow behind logos */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0877E8]/10 blur-[90px]" />

          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
            {colleges.map((src, index) => (
              <CollegeLogo
                key={`${src}-${index}`}
                src={src}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CollegeLogo({
  src,
  index,
}: {
  src: string;
  index: number;
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
      {/* Top glow line */}
      <div className="absolute left-1/2 top-0 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent transition-all duration-500 group-hover:w-[65%]" />

      {/* Hover glow */}
      <div className="pointer-events-none absolute -bottom-16 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#0877E8]/0 blur-2xl transition-all duration-500 group-hover:bg-[#0877E8]/20" />

      {/* Hover tint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0877E8]/0 to-[#38BDF8]/0 transition-all duration-500 group-hover:from-[#0877E8]/[0.02] group-hover:to-[#38BDF8]/[0.07]" />

      <img
        src={src}
        alt={`Institution ${index + 1}`}
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