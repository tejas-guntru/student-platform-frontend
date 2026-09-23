"use client";

const recognitions = [
  {
    number: "01",
    title: "Ministry Recognition",
    subtitle: "Government recognised",
    image: "/images/ministries/image1.jpg",
  },
  {
    number: "02",
    title: "Startup India",
    subtitle: "DPIIT ecosystem",
    image: "/images/ministries/image2.jpg",
  },
  {
    number: "03",
    title: "MSME",
    subtitle: "Registered enterprise",
    image: "/images/ministries/image3.jpg",
  },
];

export default function RecognitionComponent() {
  return (
    <section
      id="recognition"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#06172D]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* ================= BACKGROUND ================= */}

      {/* Top blue glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -top-64
          left-1/2
          h-[600px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-[#0877E8]/20
          blur-[160px]
        "
      />

      {/* Left cyan glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-52
          top-1/3
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#18BDF5]/10
          blur-[150px]
        "
      />

      {/* Right glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-52
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#0877E8]/15
          blur-[150px]
        "
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top separator */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0
          h-px
          w-[85%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
        "
      />

      {/* ================= CONTENT ================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          {/* Eyebrow */}
          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#68D7FF]/20
              bg-[#68D7FF]/[0.06]
              px-4
              py-2
              backdrop-blur-md
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#79DDFF]
                shadow-[0_0_12px_rgba(121,221,255,0.9)]
              "
            />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#8DE3FF]
              "
            >
              Recognition & Trust
            </span>
          </div>

          {/* Heading */}
          <h2
  className="
    mt-6
    text-3xl
    font-bold
    leading-[1.08]
    tracking-[-0.045em]
    sm:text-4xl
    md:text-5xl
    lg:text-[3.5rem]
  "
>
  <span className="text-black font-bold">
    Recognised by institutions
  </span>

  <span
    className="
      mt-1
      block
      bg-gradient-to-r
      from-[#8DE3FF]
      via-[#C4F1FF]
      to-[#8DE3FF]
      bg-clip-text
      text-transparent
    "
  >
    that build India&apos;s future.
  </span>
</h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-center
              text-base
              leading-7
              text-white/55

              sm:text-lg
              sm:leading-8
            "
          >
            Trailbliz is recognised across government and startup
            ecosystems, strengthening our commitment to building
            meaningful career outcomes for students.
          </p>
        </div>

        {/* ================= CARDS ================= */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-5

            md:grid-cols-3
            md:gap-6

            lg:mt-16
          "
        >
          {recognitions.map((item) => (
            <article
              key={item.number}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.055]
                p-[1px]
                shadow-[0_25px_70px_rgba(0,0,0,0.18)]
                backdrop-blur-xl
                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-[#73D9FF]/30
                hover:shadow-[0_30px_90px_rgba(0,119,232,0.18)]
              "
            >
              {/* Hover glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-[#48C8FF]/0
                  blur-[60px]
                  transition-all
                  duration-500

                  group-hover:bg-[#48C8FF]/20
                "
              />

              <div
                className="
                  relative
                  h-full
                  rounded-[27px]
                  bg-gradient-to-b
                  from-white/[0.08]
                  to-white/[0.025]
                  p-5

                  sm:p-6
                "
              >
                {/* Number + verified */}
                <div className="flex items-center justify-between">
                  <span
                    className="
                      text-[11px]
                      font-semibold
                      tracking-[0.22em]
                      text-white/30
                    "
                  >
                    {item.number}
                  </span>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#7BDFFF]/20
                      bg-[#7BDFFF]/10
                      text-xs
                      text-[#9CE7FF]
                    "
                  >
                    ✓
                  </div>
                </div>

                {/* Logo area */}
                <div
                  className="
                    relative
                    mt-6
                    flex
                    h-[150px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-white/10
                    bg-white
                    px-7
                    py-6
                    shadow-[0_18px_50px_rgba(0,0,0,0.18)]

                    sm:h-[165px]
                  "
                >
                  {/* subtle logo background */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-[#F8FCFF]
                      via-white
                      to-[#EFF8FF]
                    "
                  />

                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      relative
                      z-10
                      max-h-[105px]
                      max-w-full
                      object-contain
                      transition-transform
                      duration-500

                      group-hover:scale-[1.05]
                    "
                  />
                </div>

                {/* Text */}
                <div className="mt-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p
                        className="
                          text-[11px]
                          font-medium
                          uppercase
                          tracking-[0.15em]
                          text-[#7ADFFF]/70
                        "
                      >
                        {item.subtitle}
                      </p>

                      <h3
                        className="
                          mt-2
                          text-xl
                          font-semibold
                          tracking-[-0.025em]
                          text-white
                        "
                      >
                        {item.title}
                      </h3>
                    </div>

                    <span
                      className="
                        mb-1
                        text-xl
                        text-white/25
                        transition-all
                        duration-300

                        group-hover:translate-x-1
                        group-hover:text-[#8DE3FF]
                      "
                    >
                      →
                    </span>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="
                      mt-5
                      h-px
                      w-full
                      overflow-hidden
                      bg-white/10
                    "
                  >
                    <div
                      className="
                        h-full
                        w-0
                        bg-gradient-to-r
                        from-[#1689F5]
                        to-[#75DEFF]
                        transition-all
                        duration-500

                        group-hover:w-full
                      "
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ================= BOTTOM TRUST LINE ================= */}

        <div
          className="
            mx-auto
            mt-12
            flex
            max-w-3xl
            items-center
            justify-center
            gap-4
          "
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />

          <p
            className="
              whitespace-nowrap
              text-center
              text-xs
              font-medium
              tracking-[0.08em]
              text-white/35

              sm:text-sm
            "
          >
            Building trust. Creating opportunities.
          </p>

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </section>
  );
}