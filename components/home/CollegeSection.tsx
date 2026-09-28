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
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          SUBTLE AMBIENT LIGHT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          -top-48
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#24598a]/[0.04]
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-52
          -left-44
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#c9a227]/[0.025]
          blur-[110px]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

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
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#c5d6e8]
              bg-white
              px-4
              py-2
              shadow-[0_1px_3px_rgba(23,59,99,0.05)]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#c9a227]
              "
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#173b63]
              "
            >
              Trusted Across Campuses
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-6
              text-3xl
              font-bold
              leading-[1.05]
              tracking-[-0.04em]
              text-[#122a46]

              sm:text-4xl
              md:text-5xl
              lg:text-[3.5rem]
            "
          >
            Built for ambitious students
            <span
              className="
                mt-1
                block
                text-[#24598a]
              "
            >
              across campuses.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-[#64748b]

              sm:text-lg
              sm:leading-8
            "
          >
            Students from{" "}
            <span
              className="
                font-semibold
                text-[#173b63]
              "
            >
              20+ institutions and universities
            </span>{" "}
            have benefited from Trailbliz.
          </p>
        </div>

        {/* =====================================================
            SMALL SECTION LABEL
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-14
            flex
            max-w-6xl
            items-center
            gap-5

            sm:mt-16
          "
        >
          <div
            className="
              h-px
              flex-1
              bg-gradient-to-r
              from-transparent
              to-[#dce7f3]
            "
          />

          <p
            className="
              shrink-0
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#94a3b8]

              sm:text-xs
            "
          >
            Institutions in our community
          </p>

          <div
            className="
              h-px
              flex-1
              bg-gradient-to-l
              from-transparent
              to-[#dce7f3]
            "
          />
        </div>

        {/* =====================================================
            COLLEGE LOGOS
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-8
            max-w-6xl
          "
        >
          <div
            className="
              grid
              grid-cols-2
              gap-3

              sm:grid-cols-3
              sm:gap-4

              md:grid-cols-5
            "
          >
            {colleges.map(
              (src, index) => (
                <CollegeLogo
                  key={`${src}-${index}`}
                  src={src}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COLLEGE LOGO
========================================================= */

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
        h-[105px]
        items-center
        justify-center
        overflow-hidden

        rounded-2xl

        border
        border-[#dce7f3]

        bg-white

        p-4

        shadow-[0_1px_3px_rgba(23,59,99,0.05)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#b8cee4]
        hover:shadow-[0_10px_30px_rgba(23,59,99,0.09)]

        sm:h-[115px]
        sm:p-5

        lg:h-[120px]
      "
    >
      {/* Gold hover accent */}

      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0

          h-[2px]
          w-0

          -translate-x-1/2

          rounded-full
          bg-[#c9a227]

          transition-all
          duration-300

          group-hover:w-10
        "
      />

      {/* Very subtle hover surface */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[#f7fbff]/0

          transition-colors
          duration-300

          group-hover:bg-[#f7fbff]/60
        "
      />

      {/* Logo */}

      <img
        src={src}
        alt={`Institution ${index + 1}`}
        loading="lazy"
        className="
          relative
          z-10

          max-h-[64px]
          max-w-[85%]

          object-contain

          opacity-80
          saturate-[0.9]

          transition-all
          duration-300

          group-hover:scale-[1.04]
          group-hover:opacity-100
          group-hover:saturate-100

          sm:max-h-[70px]
          lg:max-h-[74px]
        "
      />
    </div>
  );
}